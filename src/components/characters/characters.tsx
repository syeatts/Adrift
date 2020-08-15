import { Component, h, State } from '@stencil/core';
import { alignments, race, charClass, racialMods, hue } from '../../utils/characterTraits/base';
import { exotic, aasimar, element } from '../../utils/characterTraits/exotics';
import { background, role, power, job, officer, route, ward, durance, task } from '../../utils/characterTraits/shipRoles';
import { getRandomNum } from '../../utils/utilityFunctions';

const { elfType, gnomeType, dwarfType, hobbitType } = racialMods;

@Component({
  tag: 'app-characters',
  styleUrl: 'characters.css',
  shadow: true
})
export class AppCharacters {

  @State() charArray: Array<string> = [];

  buildAasimar = () => {
    return aasimar[getRandomNum(aasimar.length - 1)];
  }

  buildExotic = () => {
    const index = getRandomNum(exotic.length);
    if (index === exotic.length) {
      return this.buildAasimar()
    }
    if (exotic[index] === 'genasi') {
      return `${ element[getRandomNum(element.length - 1)]} ${ exotic[index] }`
    }

    return exotic[index];

  }

  comboMap = {
    elf: () => `${ elfType[getRandomNum(elfType.length - 1)] } elf`,
    gnome: () => `${ gnomeType[getRandomNum(gnomeType.length - 1)] } gnome`,
    dwarf: () => `${ dwarfType[getRandomNum(dwarfType.length - 1)] } dwarf`,
    halfling: () => `${ hobbitType[getRandomNum(hobbitType.length - 1)] } halfling`,
    dragonborn: () => `${ hue[getRandomNum(hue.length - 1)] } dragonborn`
  };

  buildRace = () => {
    const index = getRandomNum(race.length);
    if (index === race.length) {
      return this.buildExotic()
    }
    const comboRaces = Object.keys(this.comboMap);
    if (comboRaces.includes(race[index])) {
      return this.comboMap[race[index]]();
    }
    return race[index];
  }

  buildRole = () => role[getRandomNum(role.length - 1)]()

  buildCharacter = () => 
    `This person is a ${ alignments[getRandomNum(alignments.length - 1)] } ${ this.buildRace() } ${ charClass[getRandomNum(charClass.length - 1)] }.
    In their previous life, they were ${ background[getRandomNum(background.length -1)]() }.
    They came to the ship as ${ this.buildRole() }`;
  
  addChar = () => this.charArray = [this.buildCharacter(), ...this.charArray];

  render() {
    return (
      <div class='app-characters'>
        <p>
          Welcome to Characters.
        </p>
        <p>
          Options
        </p>
        <select-box selectOpts={alignments} selectId="Alignment: "></select-box>
        <select-box selectOpts={race} selectId="Race: "></select-box>
        <select-box selectOpts={elfType} selectId="Elf SubRace: "></select-box>
        <select-box selectOpts={gnomeType} selectId="Gnome SubRace: "></select-box>
        <select-box selectOpts={dwarfType} selectId="Dwarf SubRace: "></select-box>
        <select-box selectOpts={hobbitType} selectId="Hobbit SubRace: "></select-box>
        <select-box selectOpts={hue} selectId="Dragonborn Hue: "></select-box>
        <select-box selectOpts={[...exotic, ...aasimar]} selectId="Exotic Races: "></select-box>
        <select-box selectOpts={charClass} selectId="Class: "></select-box>
        <select-box selectOpts={background} selectId="Background: "></select-box>
        <select-box selectOpts={power} selectId="Soldier Background Power: "></select-box>
        <select-box selectOpts={role} selectId="Role: "></select-box>
        <select-box selectOpts={background} selectId="Background: "></select-box>
        <select-box selectOpts={job} selectId="Ship's Crew: "></select-box>
        <select-box selectOpts={officer} selectId="Officer Jobs: "></select-box>
        <select-box selectOpts={route} selectId="Passenger Route: "></select-box>
        <select-box selectOpts={power} selectId="Stowaway Power: "></select-box>
        <select-box selectOpts={ward} selectId="Ward: "></select-box>
        <select-box selectOpts={power} selectId="Ward Power: "></select-box>
        <select-box selectOpts={durance} selectId="Prisoner durance: "></select-box>
        <select-box selectOpts={power} selectId="Agent Power: "></select-box>
        <select-box selectOpts={task} selectId="Agent Task: "></select-box>

        <button onClick={ () => this.addChar() }>Add Character</button>
        { this.charArray.map(current => <p>{current}</p>) }
        
      </div>
    );
  }
}

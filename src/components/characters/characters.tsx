import { Component, h, State } from '@stencil/core';
import { alignments, race, charClass, racialMods, hue } from '../../utils/characterTraits/base';
import { exotic, aasimar, element } from '../../utils/characterTraits/exotics';
import { background, role } from '../../utils/characterTraits/shipRoles';
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
  buildElf = () => `${ elfType[getRandomNum(elfType.length - 1)] } elf`;
  buildGnome = () => `${ gnomeType[getRandomNum(gnomeType.length - 1)] } gnome`;
  buildDwarf = () => `${ dwarfType[getRandomNum(dwarfType.length - 1)] } dwarf`;
  buildHalfling = () => `${ hobbitType[getRandomNum(hobbitType.length - 1)] } halfling`;
  buildDragonborn = () => `${ hue[getRandomNum(hue.length - 1)] } dragonborn`;

  comboMap = {
    elf: this.buildElf,
    gnome: this.buildGnome,
    dwarf: this.buildDwarf,
    halfling: this.buildHalfling,
    dragonborn: this.buildDragonborn
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
        <button onClick={ () => this.addChar() }>Add Character</button>
        { this.charArray.map(current => <p>{current}</p>) }
        
      </div>
    );
  }
}

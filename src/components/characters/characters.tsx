//This file is over 200 LOCs. If we can get it down to below 100... it would be MUCH more readable.

import { Component, h, State, Element } from '@stencil/core';
import { alignments, race, charClass, racialMods } from '../../utils/characterTraits/base';
import { exotic, aasimar, buildExotic } from '../../utils/characterTraits/exotics';
import { traitMap, roleDescriptions, background, role, power, job, officer, route, ward, durance, task } from '../../utils/characterTraits/shipRoles';
import { getRandomNum, capitalizeFirstLetter } from '../../utils/utilityFunctions';

@Component({
  tag: 'app-characters',
  styleUrl: 'characters.css',
  shadow: true
})
export class AppCharacters {

  @Element() el;
  
  @State() charArray: Array<string> = [];
  @State() comboRaces: Array<string> = ['elf', 'gnome', 'dwarf', 'halfling', 'dragonborn',];
  @State() power: Array<string> = power;
  @State() job: Array<Function> = job;
  @State() officer: Array<string> = officer;
  @State() route: Array<string> = route;
  @State() ward: Array<string> = ward;
  @State() durance: Array<string> = durance;
  @State() task: Array<string> = task;
  @State() numberToGenerate: number = 1;

  buildCharacter = async () => `This person is a
    ${ await this.buildAlignments() }
    ${ await this.buildRace() }
    ${ await this.buildClass() }.
    In their previous life, they were ${ await this.buildBackground() }.
    They came to the ship as ${ await this.buildRole() }`;

  buildRace = async () => {
    const exotic = await this.getSelectBox('exotic').getSelection()
    if (exotic !== 'random') {
      return buildExotic(exotic);
    }
    const selection = this.getSelectBox('race').getSelection();
    return selection.then(async (res) => {
      if (res === 'random') {
        const index = getRandomNum(race.length);
        if ( index === race.length) {
          return buildExotic(exotic)
        } else {
          return this.getComboRace(race[index]);
        }
      }
      return this.getComboRace(res);
    })
  }

  getComboRace = async (baseRace: string) => {
    const mod = racialMods[`${baseRace}Type`];
    const subraceSelector = this.getSelectBox(`${baseRace}-type`);
      if (subraceSelector && this.comboRaces.includes(baseRace)) {
        return `${await this.randomOrFixed(this.getSelectBox(`${baseRace}-type`).getSelection(), mod)} ${baseRace}`;
      } else if (this.comboRaces.includes(baseRace)) {
        return `${mod[getRandomNum(mod.length - 1)]} ${baseRace}`
      }
      return baseRace;
  }

  addChar = async (generate: number) => {
    if (generate > 0) {
      this.charArray = [await this.buildCharacter(), ...this.charArray];
      this.addChar(generate - 1);
    }
  }

  buildRole = () => this.randomOrFixedFunction(this.getSelectBox('role').getSelection(), role);

  buildOfficer = () => this.randomOrFixed(this.getSelectBox('officer').getSelection(), officer);

  buildAlignments = () => this.randomOrFixed(this.getSelectBox('alignment').getSelection(), alignments);

  buildClass = () => this.randomOrFixed(this.getSelectBox('char-class').getSelection(), charClass);

  buildBackground = () => this.randomOrFixedFunction(this.getSelectBox('background').getSelection(), background);

  getSelectBox = (trait: string): HTMLSelectBoxElement => this.el.shadowRoot.getElementById(trait) as HTMLSelectBoxElement;
  
  randomOrFixed = (selectionPromise: Promise<string>, traitArray:Array<string>) => selectionPromise.then(
    res => res === 'random' ? traitArray[getRandomNum(traitArray.length - 1)] : res);

  randomOrFixedFunction = (selectionPromise: Promise<string>, traitArray:Array<Function>) => selectionPromise.then(
    async (res) => res === 'random'
      ? this.completeTrait(traitArray[getRandomNum(traitArray.length - 1)]())
      : await this.completeTrait(res));

  completeTrait = async (currentVal:string) => {
    const matcher = currentVal.match(/(?! )(?<=#).*?(?=#)(?<! )/g);
    const keys = Object.keys(traitMap).filter(key => currentVal.includes(key)).reverse();
    const selection = await Promise.all(
      keys.map(key => traitMap[key]
        ? this.getSelectBox(traitMap[key])?.getSelection() || 'random'
        : undefined
      )
    );
    const initialResult = matcher
      ? matcher.reduce((agg, curr, index) => {
        return agg.replace(`#${curr}#`, `${selection[index]}` === 'random' ? `${this.getStringOrFunction(curr)}` : selection[index]);
      }, currentVal)
      : currentVal;
    if (initialResult.match(/(?! )(?<=#).*?(?=#)(?<! )/g)) {
      return await this.completeTrait(initialResult);
    }
    return initialResult;
  }

  getStringOrFunction = (trait: string) => {
    const resolvedTrait = trait === 'agent-power' || trait === 'stowaway-power' || trait === 'ward-power' ? 'power' : trait
    const result = this[resolvedTrait][getRandomNum(this[resolvedTrait].length - 1)];
    if (typeof result !== 'string') {
      return result();
    }
    return result;
  }

  // TODO: Make appending modifiers generic/one function
  appendRacialModifiers = async (event: Event) => {
    const currentSub = this.el.shadowRoot.querySelector('#elf-type, #gnome-type, #dwarf-type, #halfling-type, #dragonborn-type');
    currentSub ? currentSub.parentNode.removeChild(currentSub) : '';
    const ref = event.currentTarget;
    const created = document.createElement('select-box');
    const currentRace = await this.getSelectBox('race').getSelection();
    if (this.comboRaces.includes(currentRace)) {
      if (currentRace !== 'random') {
        created.id = `${currentRace}-type`;
        created.selectOpts = racialMods[`${currentRace}Type`];
        created.selectId = `${capitalizeFirstLetter(currentRace)} ${ currentRace==='dragonborn' ? 'Hue: ' : 'Sub-race: '}`
      }
      (ref as HTMLSelectBoxElement).after(created);
    }
  }

  appendSoldierModifier = async (event: Event, selector: string, selectType: string, selectOpts: Array<string>, selectId: string) => {
    const currentSub = this.el.shadowRoot.querySelector(selector);
    currentSub ? currentSub.parentNode.removeChild(currentSub) : '';
    const ref = event.currentTarget;
    const created = document.createElement('select-box');
    const currentSelection = await this.getSelectBox(selectType).getSelection();
    if (currentSelection.includes('#power#')) {
      created.id = `${selector.substring(1)}`;
      created.selectOpts = selectOpts;
      created.selectId = selectId;
      (ref as HTMLSelectBoxElement).after(created);
    }
  }

  appendRoleModifier = async (event: Event, selectType: string) => {
    const ref = event.currentTarget;
    const currentSelection = await this.getSelectBox(selectType).getSelection();
    const matcher = currentSelection.match(/(?! )(?<=#).*?(?=#)(?<! )/g);
    if(selectType === 'role') {
      const currentSub: Array<HTMLSelectBoxElement> = this.el.shadowRoot.querySelectorAll('#job, #officer, #route, #stowaway-power, #ward, #ward-power, #durance, #agent-power, #task');
      Array.from(currentSub).forEach(curr => {
        if(curr && curr.id !== selectType) {
          curr.parentNode.removeChild(curr);
        }
      });
    }
    if(matcher) {
      matcher.reverse().forEach(curr => {
        const created = document.createElement('select-box');
        created.id = traitMap[curr];
        created.selectOpts = curr.includes('power') ? this.power : this[curr];
        created.selectId = roleDescriptions[curr];
        created.oninput = (e) => this.appendRoleModifier(e, curr);
        (ref as HTMLSelectBoxElement).after(created);
      })
    }
  }

  render () {
    return (
      <div class='app-characters'>
        <p>
          Welcome to Characters.
        </p>
        <p>
          Options
        </p>
        <label htmlFor='generate'># to Generate: </label>
        <input
          id="generate"
          type="number"
          value={this.numberToGenerate}
          onInput={(event) => this.numberToGenerate = +(event.target as HTMLInputElement).value}>
          </input>
        <select-box id="alignment" selectOpts={alignments} selectId="Alignment: "></select-box>
        <select-box
          id="race"
          onInput={
            (e) => this.appendRacialModifiers(e)
          }
          selectOpts={race}
          selectId="Race: ">
        </select-box>
        <select-box id="exotic" selectOpts={[...exotic, ...aasimar]} selectId="Exotic Races: "></select-box>
        <select-box id="char-class" selectOpts={charClass} selectId="Class: "></select-box>
        <select-box
          id="background"
          onInput={
            (e) => this.appendSoldierModifier(e, '#soldier-background-type', 'background', this.power, `Soldier Background Power: `)
          }
          selectOpts={background}
          selectId="Background: ">
        </select-box>
        <select-box
          id="role"
          onInput={
            (e) => this.appendRoleModifier(e, 'role')
          }
          selectOpts={role}
          selectId="Role: ">
        </select-box>

        <button onClick={ () => this.addChar(this.numberToGenerate) }>Add Character</button>
        { this.charArray.map(current => <p>{current}</p>) }
      </div>
    );
  }
}

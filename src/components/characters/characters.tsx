import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'app-characters',
  styleUrl: 'characters.css',
  shadow: true
})
export class AppCharacters {

  getRandomNum = (max: number): number => {
    const min = Math.ceil(0);
    const flooredMax = Math.floor(max);
    return Math.floor(Math.random() * (flooredMax - min + 1)) + min;
  };

  @State() charArray: Array<string> = [];

  @State() alignment: Array<string> = [
    "Lawful Good",
    "Neutral Good",
    "Chaotic Good",
    "Lawful Neutral",
    "True Neutral",
    "Chaotic Neutral",
    "Lawful Evil",
    "Neutral Evil"
  ];
  @State() race: Array<string> = [
    "human",
    "elf",
    "gnome",
    "dwarf",
    "halfling",
    "half-elf",
    "half-orc",
    "tiefling",
    "dragonborn"
  ];

  @State() elfType: Array<string> = [
    "high",
    "wood",
    "dark"
  ];

  @State() gnomeType: Array<string> = [
    "rock",
    "forest",
    "deep"
  ];

  @State() dwarfType: Array<string> = [
    "mountain",
    "gray (duergar)",
    "hill"
  ];

  @State() hobbitType: Array<string> = [
    "stout",
    "lightfoot"
  ];

  @State() hue: Array<string> = [
    "red",
    "blue",
    "green",
    "white",
    "black",
    "gold",
    "silver",
    "brass",
    "bronze",
    "copper"
  ];

  @State() exotic: Array<string> = [
    "firbolg",
    "genasi",
    "goliath"
  ];

  @State() aasimar: Array<string> = [
    "protector aasimar",
    "scourge aasimar",
    "fallen aasimar"
  ];

  @State() element: Array<string> = [
    "air",
    "fire",
    "earth",
    "water"
  ];

  @State() class: Array<string> =  [
    "barbarian",
    "bard",
    "cleric",
    "druid",
    "fighter",
    "monk",
    "paladin",
    "ranger",
    "rogue",
    "sorcerer",
    "warlock",
    "wizard"
  ];

  @State() power: Array<string> =	[
    "a kingdom or nation",
    "a church/cult",
    "a dangerous spirit",
    "an aristocratic family",
    "a ruthless syndicate",
    "an otherworldly presence"
  ];

  @State() background: Array<string> =  [
    "an Acolyte of a powerful deity",
    "a Charlatan who preyed upon the confidence of the gullible",
    "a hardened Criminal",
    "a popular Entertainer",
    "attached to the court of a royal house (Courtier)",
    "a watchman in a large city",
    "a finder of… ‘lost’ persons (Bounty Hunter)",
    "an agent of a political faction",
    "on a long journey, far from their native land (Far Traveller)",
    "an artisan (or merchant) and member in good standing of a guild",
    "the hero of the people in a small, rural village",
    "a seeker after wisdom, who lived apart from others (Hermit)",
    "the Inheritor of a mysterious object of power",
    "a Mercenary - a veteran of several campaigns",
    "a member of the nobility",
    "a knight who belonged to a brotherhood",
    "a wanderer who shunned civilization (Outlander)",
    "a scholar of esoteric subjects (Sage)",
    "a Sailor - or a pirate, depending on how one defines one’s terms",
    `a professional Soldier, in the army of a ${ this.power[this.getRandomNum(this.power.length - 1)]}`,
    "a street-dwelling Urchin, who struggled to survive urban life"
  ];

  @State() route: Array<string> =	[
    "returning home",
    "embarking on a pilgrimage",
    "touring the world for pleasure",
    "on the way to meet someone",
    "leaving to start a new life",
    "exiled from their homeland"
  ];

  @State() officer: Array<string> =	[
    "the first mate",
    "the bosun",
    "the navigator (quartermaster)",
    "the ship’s doctor (surgeon)",
    "the cook"
  ];

  @State() job: Array<string> =	[
    "They had signed on as an average sailor, perhaps to learn the trade",
    `They were ${ this.officer[this.getRandomNum(this.officer.length - 1)]}`,
    "They were there to protect the ship in some capacity - as a marine, perhaps",
    "Actually, they were the captain of this vessel"
  ];

  @State() ward: Array<string> =	[
    "a spoiled young aristocrat",
    "a religious figure",
    "a wealthy merchant",
    "a scholar weighed down with terrible knowledge",
    "someone with a mysterious object of power",
    "someone wrongfully accused of a crime"
  ];

  @State() durance: Array<string> =	[
    "wrongfully convicted of another's crime",
    "having violated a serious taboo of their home culture",
    "put in chains for outstanding debts",
    "restrained for the safety of others",
    "unrepentant of their crimes",
    "sold into bondage",
    "full of regrets for a crime of passion",
    "whose beliefs angered the rulers of a kingdom or nation"
  ];

  @State() task: Array<string> = [
    "steal a mysterious object of power",
    "assassinate someone on board",
    "sabotage the ship",
    "rescue a prisoner on board",
    "conduct surveillance on the ship and crew",
    "take control of the ship for their masters"
  ];

  @State() role: Array<string> =	[
    `a passenger, ${ this.route[this.getRandomNum(this.route.length - 1)]}`,
    `a member of the crew. ${ this.job[this.getRandomNum(this.job.length - 1)]}`,
    `a stowaway, fleeing the agents of ${ this.power[this.getRandomNum(this.power.length - 1)] }`,
    `someone's protector, defending ${ this.ward[this.getRandomNum(this.ward.length - 1)]} against the agents of ${ this.power[this.getRandomNum(this.power.length - 1)]}`,
    `a prisoner,${ this.durance[this.getRandomNum(this.durance.length - 1)]}`,
    `an agent of  ${ this.power[this.getRandomNum(this.power.length - 1)]}, on a mission to  ${ this.task[this.getRandomNum(this.task.length - 1)]}`,
  ];

  buildAasimar = () => {
    return this.aasimar[this.getRandomNum(this.aasimar.length - 1)];
  }

  buildExotic = () => {
    const index = this.getRandomNum(this.exotic.length);
    if (index === this.exotic.length) {
      return this.buildAasimar()
    }
    if (this.exotic[index] === 'genasi') {
      return `${ this.element[this.getRandomNum(this.element.length - 1)]} ${ this.exotic[index] }`
    }

    return this.exotic[index];

  }
  getElf = () => `${ this.elfType[this.getRandomNum(this.elfType.length - 1)] } elf`;
  getGnome = () => `${ this.gnomeType[this.getRandomNum(this.gnomeType.length - 1)] } gnome`;
  getDwarf = () => `${ this.dwarfType[this.getRandomNum(this.dwarfType.length - 1)] } dwarf`;
  getHalfling = () => `${ this.hobbitType[this.getRandomNum(this.hobbitType.length - 1)] } halfling`;
  getDragonborn = () => `${ this.hue[this.getRandomNum(this.hue.length - 1)] } dragonborn`;

  comboMap = {
    elf: this.getElf,
    gnome: this.getGnome,
    dwarf: this.getDwarf,
    halfling: this.getHalfling,
    dragonborn: this.getDragonborn
  };

  buildRace = () => {
    const index = this.getRandomNum(this.race.length);
    if (index === this.race.length) {
      return this.buildExotic()
    }
    const comboRaces = Object.keys(this.comboMap);
    if (comboRaces.includes(this.race[index])) {
      return this.comboMap[this.race[index]]();
    }
    return this.race[index];
  }

  buildRole = () => this.role[this.getRandomNum(this.role.length - 1)]

  buildCharacter = () => 
    `This person is a ${ this.alignment[this.getRandomNum(this.alignment.length - 1)] } ${ this.buildRace() } ${ this.class[this.getRandomNum(this.class.length - 1)] }.
    In their previous life, they were ${ this.background[this.getRandomNum(this.background.length -1)] }.
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

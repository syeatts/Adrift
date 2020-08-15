import { getRandomNum } from '../utilityFunctions'

export const officer: Array<string> =	[
    "the first mate",
    "the bosun",
    "the navigator (quartermaster)",
    "the ship’s doctor (surgeon)",
    "the cook"
];

export const route: Array<string> = [
    "returning home",
    "embarking on a pilgrimage",
    "touring the world for pleasure",
    "on the way to meet someone",
    "leaving to start a new life",
    "exiled from their homeland"
];

export const job: Array<Function> =	[
    () => "They had signed on as an average sailor, perhaps to learn the trade",
    () => `They were ${ officer[getRandomNum(officer.length - 1)] }`,
    () => "They were there to protect the ship in some capacity - as a marine, perhaps",
    () => "Actually, they were the captain of this vessel"
  ];

export const power: Array<string> =	[
    "a kingdom or nation",
    "a church/cult",
    "a dangerous spirit",
    "an aristocratic family",
    "a ruthless syndicate",
    "an otherworldly presence"
];

export const background: Array<Function> =  [
    () => "an Acolyte of a powerful deity",
    () => "a Charlatan who preyed upon the confidence of the gullible",
    () => "a hardened Criminal",
    () => "a popular Entertainer",
    () => "attached to the court of a royal house (Courtier)",
    () => "a watchman in a large city",
    () => "a finder of… ‘lost’ persons (Bounty Hunter)",
    () => "an agent of a political faction",
    () => "on a long journey, far from their native land (Far Traveller)",
    () => "an artisan (or merchant) and member in good standing of a guild",
    () => "the hero of the people in a small, rural village",
    () => "a seeker after wisdom, who lived apart from others (Hermit)",
    () => "the Inheritor of a mysterious object of power",
    () => "a Mercenary - a veteran of several campaigns",
    () => "a member of the nobility",
    () => "a knight who belonged to a brotherhood",
    () => "a wanderer who shunned civilization (Outlander)",
    () => "a scholar of esoteric subjects (Sage)",
    () => "a Sailor - or a pirate, depending on how one defines one’s terms",
    () => `a professional Soldier, in the army of a ${ power[getRandomNum(power.length - 1)]}`,
    () => "a street-dwelling Urchin, who struggled to survive urban life"
];

export const ward: Array<string> =	[
    "a spoiled young aristocrat",
    "a religious figure",
    "a wealthy merchant",
    "a scholar weighed down with terrible knowledge",
    "someone with a mysterious object of power",
    "someone wrongfully accused of a crime"
];

export const durance: Array<string> =	[
    "wrongfully convicted of another's crime",
    "having violated a serious taboo of their home culture",
    "put in chains for outstanding debts",
    "restrained for the safety of others",
    "unrepentant of their crimes",
    "sold into bondage",
    "full of regrets for a crime of passion",
    "whose beliefs angered the rulers of a kingdom or nation"
];

export const task: Array<string> = [
    "steal a mysterious object of power",
    "assassinate someone on board",
    "sabotage the ship",
    "rescue a prisoner on board",
    "conduct surveillance on the ship and crew",
    "take control of the ship for their masters"
];

export const role: Array<Function> =	[
    () => `a passenger, ${ route[getRandomNum(route.length - 1)]}`,
    () => `a member of the crew. ${ job[getRandomNum(job.length - 1)]()}`,
    () => `a stowaway, fleeing the agents of ${ power[getRandomNum(power.length - 1)] }`,
    () => `someone's protector, defending ${ ward[getRandomNum(ward.length - 1)]} against the agents of ${ power[getRandomNum(power.length - 1)]}`,
    () => `a prisoner, ${ durance[getRandomNum(durance.length - 1)]}`,
    () => `an agent of ${ power[getRandomNum(power.length - 1)]}, on a mission to  ${ task[getRandomNum(task.length - 1)]}`,
];
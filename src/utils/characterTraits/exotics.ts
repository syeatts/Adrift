import { getRandomNum } from '../utilityFunctions'

export const exotic: Array<string> = [
    "firbolg",
    "genasi",
    "goliath"
  ];

export const aasimar: Array<string> = [
    "protector aasimar",
    "scourge aasimar",
    "fallen aasimar"
];

export const element: Array<string> = [
    "air",
    "fire",
    "earth",
    "water"
];

export const buildExotic = (name: string) => {
    if (name === 'random') {
      const index = getRandomNum(exotic.length);
      if (index === exotic.length) {
        return buildAasimar()
      }
      if (exotic[index] === 'genasi') {
        return `${ element[getRandomNum(element.length - 1)]} ${ exotic[index] }`
      }

      return exotic[index];
    } else if (name === 'genasi') {
      return `${ element[getRandomNum(element.length - 1)]} ${ name }`
    }
    return name;
  }

  export const buildAasimar = () => aasimar[getRandomNum(aasimar.length - 1)];
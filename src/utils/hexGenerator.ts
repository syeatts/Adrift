interface Hex {
        value: number;
        lt: number;
        rt: number;
        tt: number;
        lb: number;
        rb: number;
        bb: number;
    }

    const rollMap = {
        2: 'rt',
        3: 'rt',
        4: 'rb',
        5: 'rb',
        6: 'bb',
        7: 'bb',
        8: 'lb',
        9: 'lb',
        10: 'lt',
        11: 'lt',
        12: 'tt'
    }

const hexArray: Array<Hex> = [
    { value: 1, lt: 2, rt: 3, tt: 5, lb: 6, rb: 4, bb: 1 },
    { value: 2, lt: 4, rt: 5, tt: 7, lb: 11, rb: 1, bb: 17 },
    { value: 3, lt: 5, rt: 6, tt: 8, lb: 1, rb: 9, bb: 18 },
    { value: 4, lt: 1, rt: 7, tt: 9, lb: 16, rb: 2, bb: 14 },
    { value: 5, lt: 7, rt: 8, tt: 10, lb: 2, rb: 3, bb: 1 },
    { value: 6, lt: 8, rt: 1, tt: 11, lb: 3, rb: 14, bb: 16 },
    { value: 7, lt: 9, rt: 10, tt: 12, lb: 4, rb: 5, bb: 2 },
    { value: 8, lt: 10, rt: 11, tt: 13, lb: 5, rb: 6, bb: 3 },
    { value: 9, lt: 3, rt: 12, tt: 14, lb: 18, rb: 7, bb: 4 },
    { value: 10, lt: 12, rt: 13, tt: 15, lb: 7, rb: 8, bb: 5 },
    { value: 11, lt: 13, rt: 2, tt: 16, lb: 8, rb: 17, bb: 6 },
    { value: 12, lt: 14, rt: 15, tt: 17, lb: 9, rb: 10, bb: 7 },
    { value: 13, lt: 15, rt: 16, tt: 18, lb: 10, rb: 11, bb: 8 },
    { value: 14, lt: 6, rt: 17, tt: 4, lb: 19, rb: 12, bb: 9 },
    { value: 15, lt: 17, rt: 18, tt: 19, lb: 12, rb: 13, bb: 10 },
    { value: 16, lt: 18, rt: 4, tt: 6, lb: 13, rb: 19, bb: 11 },
    { value: 17, lt: 11, rt: 19, tt: 2, lb: 14, rb: 15, bb: 12 },
    { value: 18, lt: 19, rt: 9, tt: 3, lb: 15, rb: 16, bb: 13 },
    { value: 19, lt: 19, rt: 19, tt: 19, lb: 17, rb: 18, bb: 15 }
];

const randomizedRoll = (max) => Math.floor(Math.random() * max) + 1;

const twoDSix = () => randomizedRoll(6) + randomizedRoll(6);

const configurations = {
    '2D6': twoDSix
}

const roll = (config) => configurations[config]();

const calculateHex = (currentHex, roll) => {
    console.log(currentHex, roll);
    return hexArray[currentHex[rollMap[roll]] - 1];
}

export const rollOnce = (currentHex, config) => {
    const hex = calculateHex(currentHex, roll(config));
    return hex;
}

// const clear = (start) => {
//     // currentHex = hexArray[start - 1];
//     return [start];
// }

export const generate = (currentRoll, max, results, currentHex, config, start) => {
    let updatedResults = [];
    
    if (results.length === max) {
        return results;
    }
        currentHex = calculateHex(currentHex, roll(config));
        updatedResults = [ ...results, ...[currentHex.value]];
        currentRoll = currentRoll - 1;
        return generate(currentRoll, max, updatedResults, currentHex, config, start);
}









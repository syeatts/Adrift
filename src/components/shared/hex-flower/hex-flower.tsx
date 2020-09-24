import { Component, h, Prop, Element, State } from '@stencil/core';

@Component({
  tag: 'hex-flower',
  styleUrl: 'hex-flower.css',
  shadow: true
})
export class HexFlower {

    @Element() el;

    @Prop() name: string = 'Test';
    @Prop() config: string = '2D6'
    @Prop() petals: Array<string> = ['1, ', '2, ', '3, ', '4, ', '5, ', '6, ', '7, ', '8, ', '9, ', '10, ', '11, ', '12, ', '13, ', '14, ', '15, ', '16, ', '17, ', '18, ', '19, ',]
    @Prop() mode = 'infinite';
    @Prop() max = 20;
    @Prop() terminal = 0;
    @Prop() start = 10;

    @State() currentRoll = this.max;
    @State() generatedArray = [];
    @State() currentHex = this.start;

    // rangeArray: Array<Array<number>> = [[2, 3, 3], [4, 5, -2], [6, 7, -5], [8, 9, -3], [10, 11, 2], [12, 12, 5]];

    // rightExit: Array<number> = [6, 11, 16];
    // bottomRightExit: Array<number> = [6];
    // topRightExit: Array<number> = [16];
    // rightRange: Array<number> = [8, 11];
    // bottomRange: [6, 7];
    // topRange: [12, 12];
    // leftExit: Array<number> = [4, 9, 14, 17];
    // bottomLeftExit: Array<number> = [4];
    // topLeftExit: Array<number> = [14];
    // leftRange: Array<number> = [2, 5];
    rollMap = {
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
    hexArray: Array<Object> = [
        { lt: 2, rt: 3, tt: 5, lb: 6, rb: 4, bb: 1 },
        { lt: 4, rt: 5, tt: 7, lb: 11, rb: 1, bb: 17 },
        { lt: 5, rt: 6, tt: 8, lb: 1, rb: 9, bb: 18 },
        { lt: 1, rt: 7, tt: 9, lb: 16, rb: 2, bb: 14 },
        { lt: 7, rt: 8, tt: 10, lb: 2, rb: 3, bb: 1 },
        { lt: 8, rt: 1, tt: 11, lb: 3, rb: 14, bb: 16 },
        { lt: 9, rt: 10, tt: 12, lb: 4, rb: 5, bb: 2 },
        { lt: 10, rt: 11, tt: 13, lb: 5, rb: 6, bb: 3 },
        { lt: 3, rt: 12, tt: 14, lb: 18, rb: 7, bb: 4 },
        { lt: 12, rt: 13, tt: 15, lb: 7, rb: 8, bb: 5 },
        { lt: 13, rt: 2, tt: 16, lb: 8, rb: 17, bb: 6 },
        { lt: 14, rt: 15, tt: 17, lb: 9, rb: 10, bb: 7 },
        { lt: 15, rt: 16, tt: 18, lb: 10, rb: 11, bb: 8 },
        { lt: 6, rt: 17, tt: 4, lb: 19, rb: 12, bb: 9 },
        { lt: 17, rt: 18, tt: 19, lb: 12, rb: 13, bb: 10 },
        { lt: 18, rt: 4, tt: 6, lb: 13, rb: 19, bb: 11 },
        { lt: 11, rt: 19, tt: 2, lb: 14, rb: 15, bb: 12 },
        { lt: 19, rt: 9, tt: 3, lb: 15, rb: 16, bb: 13 },
        { lt: 19, rt: 19, tt: 19, lb: 17, rb: 18, bb: 15 }
    ];
    // blockArray: Array<Array<number>> = [[19, 2], [19, 5], [19, 3], [14, -3], [16, -2], [1, -5]];

    randomizedRoll = (max) => Math.floor(Math.random() * max) + 1;

    twoDSix = () => this.randomizedRoll(6) + this.randomizedRoll(6);

    roll = (config) => {
        const configurations = {
            '2D6': this.twoDSix
        }
        const value = configurations[config]();
        console.log('Roll:', value, 'current', this.currentHex)
        return value;
    }

    // inRange(x, min, max) {
    //     return ((x-min)*(x-max) <= 0);
    // }

    // reduceToLowest = (current, mod, start) => {
    //     debugger;
    //     if (start === current && current === 19) {
    //         return current;
    //     }
    //     const blocked = this.blockArray.filter(curr => curr[0] === current && curr[1] === mod);
    //     if (blocked.length > 0 && current === start) {
    //         return current;
    //     }
    //     if ([15, 17, 18].includes(current)) {
    //         if (mod < 0 && current + (mod * -1)  === 20) {
    //             const oneMod = mod + 1
    //             return this.reduceToLowest(current + (oneMod * -1), mod, start);
    //         }
    //         if (start === 2 || start === 3) {
    //             return current;
    //         }
    //         return this.reduceToLowest(current + (mod * -1), mod, start);
    //     }

    //     if ([2, 3, 5].includes(current)) {
    //         if (mod > 0 && current + (mod * -1)  === 0) {
    //             const oneMod = mod - 1
    //             return this.reduceToLowest(current + (oneMod * -1), mod, start);
    //         }
    //         if (start === 17 || start === 18) {
    //             return current;
    //         }
    //         return this.reduceToLowest(current + (mod * -1), mod, start);
    //     }

    //     if (current !== start && this.edgeArray.includes(current)) {
    //         if ([18, 11, 3, 2, 9, 17].includes(start) && [18, 11, 3, 2 , 9, 17].includes(current)) {
    //             return current;
    //         }
    //         if ([14, 4, 1, 6, 16].includes(start) && [14, 4, 1, 6, 16, 19].includes(current)) {
    //             return current;
    //         } else if (![14, 4, 1, 6, 16].includes(start)) {
    //             return current;
    //         }
    //     }
    //     const oneMod = current === 1 ? mod + 1 : mod;
    //     return this.reduceToLowest(current + (oneMod * -1), mod, start);
    // }

    // topCollarCalc = (modifier) => {
    //     if (modifier > 0) {
    //         if ((this.currentHex === 17 && modifier[2] === 3) || (this.currentHex === 18 && modifier[2] === 2) || (this.currentHex === 15 && modifier[2] === 5)) {
    //             return this.currentHex + modifier[2] - 1;
    //         } else if (modifier[2] > 0 && ((this.currentHex === 17 && modifier[2] !== 3) || (this.currentHex === 18 && modifier[2] !== 2))) {
    //             return this.reduceToLowest(this.currentHex, modifier[2], this.currentHex);
    //         }
    //     }
    //     return this.currentHex + modifier[2];
    // }

    // bottomCollarCalc = (modifier) => {
    //     if ((this.currentHex === 3 && modifier[2] === -3) || (this.currentHex === 2 && modifier[2] === -2) || (this.currentHex === 5 && modifier[2] === -5)) {
    //         return this.currentHex + modifier[2] + 1;
    //     } else if (modifier[2] < 0 && ((this.currentHex === 2 && modifier[2] !== -2) || (this.currentHex === 3 && modifier[2] !== -3))) {
    //         debugger;
    //         return this.reduceToLowest(this.currentHex, modifier[2], this.currentHex);
    //     }
    //     return this.currentHex + modifier[2];
    // }

    calculateHex = (roll) => {
        const result = this.rollMap[roll];
        return this.hexArray[this.currentHex - 1][result];
        // const modifier = this.rangeArray.filter(curr => this.inRange(roll, curr[0], curr[1]))[0];
        // if ([15, 17, 18].includes(this.currentHex)) {
        //     const result = this.topCollarCalc(modifier);
        //     debugger;
        //     return result;
        // }
        // if ([2, 3, 5].includes(this.currentHex)) {
        //     const result = this.bottomCollarCalc(modifier);
        //     debugger;
        //     return result;
        // }
        // if (this.rightExit.includes(this.currentHex)) {
        //     if (modifier[2] === -5 && this.bottomRightExit.includes[this.currentHex]
        //         || modifier[2] === 5 && this.topRightExit.includes[this.currentHex]
        //         || modifier[2] === -2 || modifier[2] === 3) {
        //             debugger;
        //             return this.reduceToLowest(this.currentHex, modifier[2], this.currentHex);
        //     }
        // }
        // if (this.leftExit.includes(this.currentHex)) {
        //     if (modifier[2] === -5 && this.bottomLeftExit.includes[this.currentHex]
        //         || modifier[2] === 5 && this.topLeftExit.includes[this.currentHex]
        //         || modifier[2] === 2 || modifier[2] === -3) {
        //             debugger;
        //             return this.reduceToLowest(this.currentHex, modifier[2], this.currentHex);
        //     }
        // }
        // if (this.currentHex === 1 || this.currentHex === 19) {
        //     const signedMod = this.currentHex === 1 ? -1 : 1
        //     if (this.currentHex === 1 && modifier[2] === -5) {
        //         debugger;
        //         return this.currentHex;
        //     } else if (this.currentHex === 1 && modifier[2] < 0) {
        //         debugger;
        //         return this.reduceToLowest(this.currentHex, modifier[2], this.currentHex);
        //     }
        //     if (this.currentHex === 19 && modifier[2] > 0) {
        //         debugger;
        //         return this.currentHex;
        //     }
        //     debugger;
        //     return this.currentHex + modifier[2] + signedMod;
        // }
        // debugger;
        // return this.currentHex + modifier[2];
    }

    generate = () => {
        if (this.currentRoll > 0) {
            if (this.currentRoll === this.max) {
                this.generatedArray.length = 1;
                this.currentHex = this.start;
            }
            this.currentHex = this.calculateHex(this.roll(this.config));
            console.log(this.currentHex);
            this.generatedArray = [ ...this.generatedArray, ...[this.petals[this.currentHex -1]]];
            this.currentRoll = this.currentRoll - 1;
            console.log(this.generatedArray);
            this.generate();
        }
        this.currentRoll = this.max;

    }

    render() {
        return (
            <div class='hex-flower'>
                <h1> I'm the Hex Flower for {this.name}</h1>
                <h2>Using the {this.config} ruleset</h2>
                <button onClick = {() => this.generate()}>Generate</button>
                <p>{ this.generatedArray.map(curr => curr) }</p>
            </div>
        );
    }
}
import { Component, h, Prop, Element, State } from '@stencil/core';
import { generate, rollOnce } from '../../../utils/hexGenerator';

// interface Hex {
//     value: number;
//     lt: number;
//     rt: number;
//     tt: number;
//     lb: number;
//     rb: number;
//     bb: number;
// }

@Component({
  tag: 'hex-flower',
  styleUrl: 'hex-flower.scss',
  shadow: true
})
export class HexFlower {

    @Element() el;

    @Prop() hexArray = [
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
     
    @Prop() TerrainRules: Array<string> = [ 'Plains', 'Plains', 'Plains', 'Arid Plains', 'Plains', 'Sparse Forest', 'Arid Plains', 'Sparse Forest', 'Desert', 'Special Feature', 'Forest', 'Desert', 'Forest', 'Desert Hills', 'Hills', 'Forest Hills', 'Hills', 'Hills', 'Mountain']
    @Prop() SeaRules: Array<string> = ['Open Sea', 'Open Sea', 'Open Sea', 'Shallow Sea', 'Open Sea', 'Land Sighting', 'Shallow Sea', 'Land Sighting', 'Reefs', 'Special Event', 'Rough Shallows', 'Reefs', 'Rough Shallows', 'Foggy Reef','Large Waves', 'Choppy Seas', 'Large Waves', 'Large Waves', 'Disaster!']
    @Prop() WeatherRules: Array<string> = ['Mostly Cloudy', 'Partly Cloudy', 'Cloudy', 'Some Showers', 'Mostly Cloudy', 'Showers', 'Partly Cloudy', 'Showers', 'Sunny', 'Some Showers', 'Rainy', 'Sunny', 'Storm Clouds', 'Sunny', 'Mostly Cloudy', 'Heavy Rain', 'Scorcher', 'Thunder Storms', 'Extreme Weather']
    @Prop() name: string = 'Test';
    @Prop() config: string = '2D6'
    @Prop() petals: Array<number> = [3, 1, 2, 4, 6, 8, 5, 7, 9, 11, 13, 10, 12, 14, 16, 18, 15, 17, 19,]
    @Prop() mode = 'infinite';
    @Prop() max = 20;
    @Prop() terminal = 0;
    @Prop() start = 10;

    @State() currentRoll = this.max;
    @State() currentHex = this.hexArray[this.start - 1];
    @State() secondaryHex = this.hexArray[this.start - 1];
    @State() generatedArray = [this.currentHex.value];
    @State() secondaryArray = [this.currentHex.value];
    @State() RuleSets = {
        Land: this.TerrainRules,
        Weather: this.WeatherRules,
        Sea: this.SeaRules
    }
    @State() ResultSet = {
        Land: [this.start],
        Weather: [this.start],
        Sea: [this.start]
    }
    @State() currentRules = 'Land'
    @State() secondaryRules = ''
    @State() activeRules = ['Land']

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


    // randomizedRoll = (max) => Math.floor(Math.random() * max) + 1;

    // twoDSix = () => this.randomizedRoll(6) + this.randomizedRoll(6);

    // roll = (config) => {
    //     const configurations = {
    //         '2D6': this.twoDSix
    //     }
    //     const value = configurations[config]();
    //     return value;
    // }

    
    // calculateHex = (roll, hex) => {
    //     const result = this.rollMap[roll];
    //     return this.hexArray[hex[result] - 1];
    // }

    generate = () => {
        this.activeRules.forEach((rule, idx) => {
            this.ResultSet = {
                ...this.ResultSet,
                ...{[rule]: generate(this.currentRoll, this.max, [this.start], this.hexArray[this.start - 1], this.config, this.start)}
            };
            if (idx === 0) {
                this.ResultSet[rule].forEach((result, idx) => {
                    setTimeout(() => this.currentHex = this.hexArray[result - 1], 25 * idx);
                    
                });
            }
            
            
        })
    }

    rollOnce = () => {
        this.activeRules.forEach((rule, idx) => {
            const currentRules = this.ResultSet[rule];
            const lastRule = this.ResultSet[rule].length - 1;
            const newHex = rollOnce(this.hexArray[currentRules[lastRule] - 1], this.config);
            console.log(newHex);
            if (idx === 0) {
                this.currentHex = newHex;
            }
            this.ResultSet[rule] = [ ...this.ResultSet[rule], ...[newHex.value]]
            
        })
    }

    clear = () => {
        this.ResultSet = {
            Land: [this.start],
            Weather: [this.start],
            Sea: [this.start]
        }
        this.currentHex = this.hexArray[this.start - 1];
    }

    resetResults = (event) => {
        this.currentHex = this.hexArray[this.start - 1];
        this.secondaryHex = this.hexArray[this.start - 1];
        this.generatedArray = [this.currentHex.value];
        this.secondaryArray = [this.secondaryHex.value];
        const value = (event.target as HTMLSelectElement).value
        const splitRule = value.split(' & ');
        this.currentRules = splitRule.length === 1 ? value : splitRule[0];
        this.secondaryRules = splitRule.length === 1 ? '' : splitRule[1];

    }

    setRules = (event) => {
        this.activeRules = (event.target as HTMLSelectElement).value.split(' & ');
        this.clear();
    }

    render() {
        return (
            <div class='hex-flower'>
                <div class="hex-grid">
                    <button class="left" onClick = {() => this.generate()}>Generate</button>
                    <button onClick = {() => this.rollOnce()}>Roll</button>
                    <button class="right" onClick = {() => this.clear()}>Clear</button>
                    <div class="rules">
                        <h4>Rule Set</h4>
                        <select onChange={e => this.setRules(e)}>
                            {Object.keys(this.RuleSets).map(curr => <option value={curr}>{curr}</option>)}
                            <option>Land & Weather</option>
                            <option>Weather & Land</option>
                            <option>Sea & Weather</option>
                            <option>Weather & Sea</option>
                        </select>
                    </div>
                    <ul class="hex-grid__list">
                        { [...this.petals].reverse().map(curr => 
                        <li class="hex-grid__item">
                            <div class={`hex-grid__content ${this.currentHex.value === curr ? 'current' : ''}`}>
                                {this.activeRules.map((rule, idx) => idx > 0
                                    ? <span class="secondary"><hr/>{this.RuleSets[rule][curr - 1]}</span>
                                    : <span>{this.RuleSets[rule][curr - 1]}</span>
                                )}
                            </div>
                            
                        </li>
                        )}
                    </ul>
                    {this.activeRules.map(rule => {
                        return <div class="results">
                            <h4>{rule} Results</h4>
                            { this.ResultSet[rule].map((curr, idx) => {
                                return <p>{`${idx + 1}: ${this.RuleSets[rule][curr - 1]}`}</p>
                                })
                            }
                        </div>
                        })
                    }
                </div>
            </div>
        );
    }
}
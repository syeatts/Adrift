import { Component, State, h, Prop, Element } from '@stencil/core';
// import '../select-box/select-box';

@Component({
  tag: 'string-builder',
  styleUrl: 'string-builder.css',
  shadow: true
})
export class StringBuilder {

    @State() mainString:string;

    @State() bodyStr: string = 'body';
    
    @State() suffixStr: string = 'suffix';

    @Prop() stringSets: Object;

    @Prop() selectOpts: Array<string> =["input"];


    @Element() el;

    // selectBox!: HTMLSelectBoxElement;
    main!: HTMLDivElement;
    
    buildString = (e) => {
        console.log(e);
        this.mainString = this.bodyStr + this.suffixStr;
        console.log(this.mainString);
    }

    appendInput() {
        return '<p><input type="text"></input></p>';
    }

    async componentDidRender() {
        this.buildString(undefined)
    }


    

    render() {
        return (
            <div class='string-builder' ref={(el)=> this.main = el as HTMLDivElement }>
                {/* <select-box selectOpts={ this.selectOpts } ref={(el)=> this.selectBox = el as HTMLSelectBoxElement }></select-box> */}
                <p>{ this.mainString } awsdf</p>

                
                <p>
                    <label>{ `Body: ` }
                        <input type="text" id="body" name="body" value={ this.bodyStr } onInput={ (e: InputEvent) => console.log(e) }></input>
                    </label>
                </p>
                <p>
                    <label>{ `Suffix: ` }
                        <input type="text" id="suf" name="suf" value={ this.suffixStr } onInput={ (e) => this.buildString(e) }></input>
                    </label>
                </p>
                 {/* <button onClick={ (e) => this.buildString(e) }>Generate String</button> */}
            </div>
        );
    }
}
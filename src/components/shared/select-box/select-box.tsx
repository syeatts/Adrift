import { Component, h, Prop, Method, Element } from '@stencil/core';

@Component({
  tag: 'select-box',
  styleUrl: 'select-box.css',
  shadow: true
})
export class SelectBox {

    @Element() el;

    @Prop() selectOpts: Array<string | Function>;

    @Prop() value: string ='random';

    @Prop() selectId: string;

    select!: HTMLSelectElement;

    @Method() async getSelection() {
        return this.select.value;
    }

    disconnectedCallBack() {
        console.log('removed');
    }

    render() {
        return (
            <div class='string-builder'>
                <label htmlFor={this.selectId}>{this.selectId}</label>
                <select id={this.selectId} ref={ (el) => this.select = el as HTMLSelectElement }>
                    <option value='random'>{'random'}</option>
                    {
                        this.selectOpts.map(curr =>
                            <option value={typeof curr === 'string' ? curr : curr()}>
                                {typeof curr === 'string' ? curr : curr()}
                            </option>
                        )
                    }
                </select>
            </div>
        );
    }
}
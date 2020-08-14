import { Component, h, Prop, Method, Element } from '@stencil/core';

@Component({
  tag: 'select-box',
  styleUrl: 'select-box.css',
  shadow: true
})
export class SelectBox {

    @Element() el;

    @Prop() selectOpts: Array<string>

    select!: HTMLSelectElement;

    @Method() async getSelection() {
        return this.select.value;
    }

    render() {
        return (
            <div class='string-builder'>
                <select ref={ (el) => this.select = el as HTMLSelectElement }>
                    { this.selectOpts.map(curr => <option value={curr}>{curr}</option> )}
                </select>
            </div>
        );
    }
}
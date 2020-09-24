import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-hex',
  styleUrl: 'app-hex.css',
  shadow: true
})
export class AppHex {

  render() {
    return (
      <div class='app-hex'>
        <hex-flower name="HFGE" config="2D6"></hex-flower>
      </div>
    );
  }
}

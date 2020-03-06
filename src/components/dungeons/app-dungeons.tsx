import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-dungeons',
  styleUrl: 'app-dungeons.css',
  shadow: true
})
export class AppDungeons {

  render() {
    return (
      <div class='app-dungeons'>
        <p>
          Welcome to Dungeons.
        </p>
      </div>
    );
  }
}

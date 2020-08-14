import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-ship',
  styleUrl: 'app-ship.css',
  shadow: true
})
export class AppShip {

  render() {
    return (
      <div class='app-ship'>
        <p>
          Welcome to Ships. (Coming Soon)
        </p>
      </div>
    );
  }
}

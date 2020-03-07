import { Component, h } from '@stencil/core';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {

  render() {
    return (
      <div>
        <header>
          <h1>Adrift</h1>
        </header>

        <main>
        <stencil-route-link url='/adrift.github.io/'>
          <button>
            Home
          </button>
        </stencil-route-link>
        <stencil-route-link url='/adrift.github.io/characters'>
          <button>
            Generate characters
          </button>
        </stencil-route-link>
        <stencil-route-link url='/adrift.github.io/ships'>
          <button>
            Generate Ships
          </button>
        </stencil-route-link>
        <stencil-route-link url='/adrift.github.io/dungeons'>
          <button>
            Generate Dungeons
          </button>
        </stencil-route-link>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url='/adrift.github.io/' component='app-home' exact={true} />
              <stencil-route url='/adrift.github.io/characters' component='app-characters' />
              <stencil-route url='/adrift.github.io/ships' component='app-ship' />
              <stencil-route url='/adrift.github.io/dungeons' component='app-dungeons' />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}

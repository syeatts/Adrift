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
        {/* <header>
          <h1>Adrift</h1>
        </header> */}
        <main>
        <stencil-route-link url='/'>
          <button>
            Home
          </button>
        </stencil-route-link>
        <stencil-route-link url='/characters'>
          <button>
            Generate characters
          </button>
        </stencil-route-link>
        <stencil-route-link url='/ships'>
          <button>
            Generate Ships
          </button>
        </stencil-route-link>
        <stencil-route-link url='/dungeons'>
          <button>
            Generate Dungeons
          </button>
        </stencil-route-link>
        <stencil-route-link url='/hex'>
          <button>
            Hex Flower Game Engine
          </button>
        </stencil-route-link>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url='/' component='app-home' exact={true} />
              <stencil-route url='/characters' component='app-characters' />
              <stencil-route url='/ships' component='app-ship' />
              <stencil-route url='/dungeons' component='app-dungeons' />
              <stencil-route url='/hex' component='app-hex' />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}

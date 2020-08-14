import { Component, h } from '@stencil/core';
import '../string-builder/string-builder';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true
})
export class AppHome {

  render() {
    return (
      <div class='app-home'>
        <p>
          Welcome to Adrift.
        </p>
        <p>
          Adrift was conceived as a character-concept generator using preformatted data such as class names, backgrounds and backstories.
        </p>
        <p>
          The concept was originally intended for a naval-based game in which characters meet and interact on the high-seas, but we have plans to adapt the input to traditional games as well.
        </p>
        <p>
          We also have rules for generating dungeons and ships (and potentially much more) in the works. This is NOT a character generator, but an idea generator for players and DMs to quickly build out concepts.
        </p>
        <p>
          You are HIGHLY encouraged NOT to discard any "wacky" combinations you encounter. That Lawful Evil half-orc cleric who used to be a scholar but left that life behind to make their living as a common sailor? That might be the most interesting character you ever play! Have fun coming up with the WHY behind our WHAT!
        </p>
        <p>
          Adrift does NOT use or implement any mechanics specific to any licensed property or use any trademarked material as a part of its code. You will not get to bypass buying the books for your RPG system of choice!
        </p>
      </div>
    );
  }
}

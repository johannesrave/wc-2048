export class GameTile extends HTMLElement {
  constructor() {
    super();
    // const style = document.createElement('style');
  }

  connectedCallback() {
    this.innerHTML = `
    <style>
    game-tile {
      display: grid;
      grid-auto-flow: row;
      place-content: center;
    }
    </style>
    `;
  }
}

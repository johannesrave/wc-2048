export class GameTile extends HTMLElement {
  x!: number;
  y!: number;

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
    let xString = this.getAttribute('x') ?? '';
    this.x = parseInt(xString);

    let yString = this.getAttribute('y') ?? '';
    this.y = parseInt(yString);
  }
}

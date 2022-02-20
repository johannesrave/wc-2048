import {GameTile} from "./gameTile";

export class GameBoard extends HTMLElement {
  rows: number;
  columns: number;
  board: GameTile[] = [];

  static get observedAttributes() {
    return ['rows', 'columns'];
  }

  constructor() {
    super();
    const rowsAttribute = this.getAttribute('rows') ?? '4';
    this.rows = parseInt(rowsAttribute);
    const columnsAttribute = this.getAttribute('columns') ?? '4';
    this.columns = parseInt(columnsAttribute);
  }

  private createBoard() {
    const template = document.createElement('template');

    template.innerHTML = `
      <style>
        game-board {
          display: grid;
          grid-template-columns: repeat(${this.columns}, 1fr);
          contain: content;
          gap: 4px;
          border: solid 2px red;
          border-radius: 10px;
        }
      </style>`;
    this.replaceChildren(template.content);
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        const gameTile = document.createElement('game-tile') as GameTile;
        gameTile.setAttribute('x', x.toString());
        gameTile.setAttribute('y', y.toString());

        this.appendChild(gameTile);
        this.board.push(gameTile)
      }
    }
  }

  connectedCallback() {
    console.log("game-board connected")
  }

  attributeChangedCallback() {
    const rowsAttribute = this.getAttribute('rows') ?? '4';
    this.rows = parseInt(rowsAttribute);
    const columnsAttribute = this.getAttribute('columns') ?? '4';
    this.columns = parseInt(columnsAttribute);
    console.log('attributes changed')
    this.createBoard();
  }
}

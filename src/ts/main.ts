export {};

console.log("TypeScript is being compiled.")

const gameElement = document.getElementById('game');
/*
entities:
game
row
tile
token
scoreboard

state:
position:
  - implied by position in DOM?
    + looks nice
    + more WC-y, state could be in token component
    + harder to calculate stuff
  - in central object?
    + easier to handle
    + could imply complete redraw on every move
tokenId
value
justMerged
score
emptyTiles

-> gameState in 2D-array of tokens
-> id, position and value are saved in WC
-> redraw based on array on every turn
-> rows and tiles are static


thinking about it again:
WC don't seem to cover the usecase for this project:
these components are just meant for code-structuring,
not for reusability across projects.
maybe creating a board-component is more in the spirit of the technology:
- it could be told it's dimensions
- it could render tiles for that size
- it could render tokens with x/y positions into those tiles


 */

const tileSize = '128px';

type Row = number;


type Column = number;
type Value = number;

class GameToken extends HTMLElement {

  value: Value;
  column: Column;
  row: Row;
  id: string;

  constructor(row: Row, column: Column, value: Value, id: string) {
    super();
    this.column = column;
    this.row = row;
    this.value = value;
    this.id = id;
  }
}

class GameTile extends HTMLElement {
  constructor() {
    super();
    const style = document.createElement('style');

    this.innerHTML = `
    <style>
    game-tile {
      display: grid;
      grid-auto-flow: row;
      place-content: center;
      width: ${tileSize};
      height: ${tileSize};
      border: solid 2px blue;
      border-radius: 8px;
    }
    </style>
    `;
  }
}

class GameBoard extends HTMLElement {
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

    this.createBoard();
  }

  private createBoard() {

    const rowsAttribute = this.getAttribute('rows') ?? '4';
    this.rows = parseInt(rowsAttribute);
    const columnsAttribute = this.getAttribute('columns') ?? '4';
    this.columns = parseInt(columnsAttribute);

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
        const gameTile = document.createElement('game-tile');
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
    console.log('attributes changed')
    if (this.shadowRoot)
      this.createBoard();
  }

}

class GameScore extends HTMLElement {

  score: number = 0;

  constructor() {
    super();

    this.innerHTML = `
      <style>
        game-score {
          contain: content;
          display: grid;
          place-content: center;
          border: solid 2px blue;
          border-radius: 10px;
        }
      </style>
      <p>Score: ${this.score}</p>
    `;

    // this.innerText = this.score.toString();
  }
}


const customGameElements = {
  'game-board': GameBoard,
  'game-token': GameToken,
  'game-tile': GameTile,
  'game-score': GameScore,
};

Object.entries(customGameElements).forEach(([element, className]) => {

  customElements.define(element, className);
});

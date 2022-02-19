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
    const shadow = this.attachShadow({mode: 'open'});
    const style = document.createElement('style');

    style.innerHTML = `
    :host {
      display: grid;
      place-content: center;
      width: ${tileSize};
      height: ${tileSize};
      border: solid 2px blue;
    }`;

    shadow.appendChild(style);
    const testP = document.createElement('p')
    testP.innerText = 'TESTING'
    shadow.appendChild(testP);
    // this.innerHTML = '<p>|_|</p>'
  }
}

class GameRow extends HTMLElement {

  constructor() {
    super();


    // const style = document.createElement('style');
    //
    // style.innerHTML = `
    // :host {
    //   all: initial;
    //   display: block;
    //   contain: content;
    //   display: grid;
    //   background-color: red;
    //   width: 30px;
    //   height: 30px;
    // }`;

    // this.appendChild(style);
    // this.attachShadow({mode: 'open'}).appendChild(style);
  }
}

class GameBoard extends HTMLElement {
  rows: number;
  columns: number;
  board: GameRow[] = [];

  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});
    const style = document.createElement('style');

    style.innerHTML = `
    :host {
      all: initial;
      display: grid;
      contain: content;
      gap: 4px;
      border: solid 2px red;
    }`;

    shadow.appendChild(style);

    const rowsAttribute = this.getAttribute('rows') ?? '4';
    this.rows = parseInt(rowsAttribute);
    const columnsAttribute = this.getAttribute('rows') ?? '4';
    this.columns = parseInt(columnsAttribute);


    for (let i = 0; i < this.rows; i++) {
      const gameRow = document.createElement('game-row');
      for (let i = 0; i < this.columns; i++) {
        const gameTile = document.createElement('game-tile');

        gameRow.appendChild(gameTile);
      }
      this.board.push(gameRow)
      shadow.appendChild(gameRow);
    }
  }

  connectedCallback(){
    console.log("game-board connected")
  }

  attributeChangedCallback() {

  }

}

class GameScore extends HTMLElement {

  score: number = 0;

  constructor() {
    super();

    this.innerText = this.score.toString();
  }
}


const customGameElements = {
  'game-board': GameBoard,
  'game-token': GameToken,
  'game-row': GameRow,
  'game-tile': GameTile,
  'game-score': GameScore,
};

Object.entries(customGameElements).forEach(([element, className]) => {

  customElements.define(element, className);
});

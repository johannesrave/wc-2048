import {GameScore} from "./gameScore";
import {GameTile} from "./gameTile";
import {GameBoard} from "./gameBoard";
import {GameToken} from "./gameToken";

export {};

console.log("TypeScript is being compiled.")


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

the token could know that it is sliding...
so could implement the "transition" css-logic
 */

const customGameElements = {
  'game-board': GameBoard,
  'game-token': GameToken,
  'game-tile': GameTile,
  'game-score': GameScore,
};

Object.entries(customGameElements).forEach(([element, className]) => {
  customElements.define(element, className);
});


const gameElement = document.getElementById('game');
const board = document.getElementsByTagName('game-board')[0] as GameBoard;


function getTileByXY(x: number, y: number) {
  return board.querySelector(`game-tile[x="${x}"][y="${y}"]`);
}

function placeToken(x: number, y: number) {
  const token = document.createElement('game-token');

  const tile = getTileByXY(x, y)
  tile?.appendChild(token)
}

placeToken(2, 2);
placeToken(2, 3);
placeToken(3, 2);
placeToken(1, 2);

// console.log("placed token")
// const tokens = Array.from(board.querySelectorAll('game-token'));
// console.dir(tokens)

window.addEventListener('keydown', handleKey)

function slide(direction: "left" | "right" | "down" | "up") {
  const tokens: GameToken[] = Array.from(board.querySelectorAll('game-token'));

  // const cols = parseInt(board.getAttribute('columns') ?? '0')
  // const rows = parseInt(board.getAttribute('rows') ?? '0')

  const dirIsVertical = direction === "down" || direction === "up";
  const dirIsReversed = direction === "down" || direction === "right";

  // let laneLength = dirIsVertical ? cols : rows;
  let slideDir: 'x' | 'y' = dirIsVertical ? 'y' : 'x';
  let positionInLane: 'x' | 'y' = dirIsVertical ? 'x' : 'y';

  const lanes: GameToken[][] = [];

  sortTokensIntoLanes();

  if (dirIsReversed){
    lanes.map(lane => [...lane].reverse())
  }

  console.log(`sliding ${direction}`)

  console.dir(lanes)
  lanes.forEach((lane) =>
    lane.forEach((token, index) => {
      if (token[positionInLane] === 0) {
        return;
      }
      else if (index > 0 && lane[index-1]){
        lane[index-1].replaceWith(token);
        token.value *= 2;
      }
    })
  )

  // Array.from(tokens).forEach(token => {
  //   const oldTile = token.parentElement;
  //   const oldX = oldTile?.getAttribute('x')
  //   const oldY = oldTile?.getAttribute('y')
  //
  //   let newX: number;
  //   let newY: number;
  //
  //   switch (direction) {
  //     case "left":
  //       newX = parseInt(oldX ?? '') - 1;
  //       newY = parseInt(oldY ?? '');
  //       break;
  //     case "right":
  //       newX = parseInt(oldX ?? '') + 1;
  //       newY = parseInt(oldY ?? '');
  //       break;
  //     case "down":
  //       newX = parseInt(oldX ?? '');
  //       newY = parseInt(oldY ?? '') + 1;
  //       break;
  //     case "up":
  //       newX = parseInt(oldX ?? '');
  //       newY = parseInt(oldY ?? '') - 1;
  //       break;
  //   }
  //
  //   const newTile = getTileByXY(newX, newY);
  //   newTile?.appendChild(token)
  // })

  function sortTokensIntoLanes() {
    tokens.forEach(token => {
      const tokenLane = token[slideDir];
      if (lanes.hasOwnProperty(tokenLane)) {
        lanes[tokenLane].push(token);
      } else {
        lanes[tokenLane] = [token];
      }
    })
  }
}

function handleKey(event: KeyboardEvent) {
  const keyDirection: any = {
    "ArrowLeft": "left",
    "ArrowRight": "right",
    "ArrowDown": "down",
    "ArrowUp": "up"
  }

  if (Object.keys(keyDirection).includes(event.key)) {
    slide(keyDirection[event.key])
  }
}

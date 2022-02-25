import {GameScore} from "./gameScore";
import {GameTile} from "./gameTile";
import {GameBoard} from "./gameBoard";
import {GameToken} from "./gameToken";

const customGameElements = {
  'game-board': GameBoard,
  'game-token': GameToken,
  'game-tile': GameTile,
  'game-score': GameScore,
};

type DirectionKey = "ArrowLeft" | "ArrowRight" | "ArrowDown" | "ArrowUp";
type Direction = "up" | "down" | "left" | "right";
type Axis = "x" | "y";
type AxisInfo = { cross: Axis; main: Axis; reversed: boolean, length: 'columns' | 'rows' };

const axes: {
  [key in Direction]: AxisInfo;
} = {
  up: {main: 'x', cross: 'y', reversed: false, length: 'columns'},
  down: {main: 'x', cross: 'y', reversed: true, length: 'columns'},
  left: {main: 'y', cross: 'x', reversed: false, length: 'rows'},
  right: {main: 'y', cross: 'x', reversed: true, length: 'rows'},
}

const keyDirection: {
  [key in DirectionKey]: Direction;
} = {
  "ArrowLeft": "left",
  "ArrowRight": "right",
  "ArrowDown": "down",
  "ArrowUp": "up"
}
Object.entries(customGameElements).forEach(([element, className]) => {
  console.info(`Registering <${element}>`)

  customElements.define(element, className);

});

const board = document.getElementsByTagName('game-board')[0] as GameBoard;
const score = document.getElementsByTagName('game-score')[0] as GameScore;
const tiles: GameTile[] = Array.from(board.querySelectorAll('game-tile'));

console.log("Starting game.")

window.addEventListener('keydown', handleKey);
placeRandomToken();

function handleKey(event: KeyboardEvent) {
  if (!Object.keys(keyDirection).includes(event.key)) return;

  const boardBeforeMove = stringify(board);

  const direction = keyDirection[event.key as DirectionKey];
  slideTokens(tiles, direction)

  const boardAfterMove = stringify(board);

  if (boardAfterMove === boardBeforeMove) {
    console.log("BOARD HASN'T CHANGED");
    return;
  }

  setTimeout(placeRandomToken, 250);

  if (!isMovePossible()) {
    console.log("YOU LOST.")
    window.removeEventListener('keydown', handleKey);
  }
}

// could this logic be flipped? search through the tiles for the next token and whether it fits?
// + could be more functional, would return the modified tiles
// - would look at every tile, often more than once and unnecessarily
function slideTokens(tiles: GameTile[], direction: Direction) {
  const axisInfo = axes[direction];

  let lanes: GameTile[][] = sortTilesIntoLanes(tiles, axisInfo)
  lanes.map((lane) => {
    let tokenMerged = false;
    lane.forEach((tile, index) => {
      const token = tile.querySelector('game-token') as GameToken;
      if (!token) return;
      slideSingleToken(index, lane, token, tokenMerged);
    });
    return lane;
  })
}

function sortTilesIntoLanes(tiles: GameTile[], axisInfo: AxisInfo) {
  const laneAxis: Axis = axisInfo.main;
  return tiles.reduce((lanes: GameTile[][], tile) => {
    const lane = tile[laneAxis];
    if (lanes.hasOwnProperty(lane) && axisInfo.reversed) {
      lanes[lane].unshift(tile);
    } else if (lanes.hasOwnProperty(lane)) {
      lanes[lane].push(tile);
    } else {
      lanes[lane] = [tile]
    }
    return lanes;
  }, []);
}

function slideSingleToken(index: number, lane: GameTile[], token: GameToken, tokenMerged: boolean) {
  while (index > 0) {
    index--;
    const tileToCheck = lane[index];
    const otherToken = tileToCheck.querySelector('game-token') as GameToken;
    if (token.value === otherToken?.value && !tokenMerged) {
      mergeOnNextTile(token, otherToken);
      tokenMerged = true;
      return;
    } else if (otherToken) {
      leaveOnCurrentTile(lane, index, token);
      tokenMerged = false;
      return;
    }
  }
  leaveOnLastTile(lane, token);
}

function isMovePossible(): boolean {
  const emptyTiles = getEmptyTiles(tiles);
  if (emptyTiles) return true;

  const vertAxisInfo = axes['down'];
  const horAxisInfo = axes['right'];

  let lanes: GameTile[][] = [
    ...sortTilesIntoLanes(tiles, vertAxisInfo),
    ...sortTilesIntoLanes(tiles, horAxisInfo)
  ]
  return lanes
    .some(lane => lane
      .some((tile, index) => {
        if (index + 1 === lane.length) return false;
        const token = tile.querySelector('game-token') as GameToken;
        const nextToken = lane[index + 1].querySelector('game-token') as GameToken;
        if (!(token && nextToken)) return false;
        else if (token.value === nextToken.value) {
          return true;
        }
      })
    )
}

function mergeOnNextTile(token: GameToken, otherToken: GameToken) {
  token.value *= 2;
  score.score = score.score + token.value;
  otherToken.replaceWith(token);
}

function leaveOnCurrentTile(lane: GameTile[], searchIndex: number, token: GameToken) {
  const previousTile = lane[searchIndex + 1];
  previousTile.appendChild(token)
}

function leaveOnLastTile(lane: GameTile[], token: GameToken) {
  lane[0].appendChild(token)
}

function getEmptyTiles(tiles: GameTile[]) {
  return tiles
    .filter(tile => Array.from(tile.children)
      .every(child => !(child instanceof GameToken)));
}

function placeRandomToken() {
  const emptyTiles = getEmptyTiles(tiles);
  const randomIndex = Math.floor(Math.random() * emptyTiles.length);
  const token = document.createElement('game-token');
  emptyTiles[randomIndex].appendChild(token);
}

// stolen and modified from https://stackoverflow.com/questions/46880822/how-to-json-stringify-a-dom-element
function stringify(element: Element) {
  let obj: { name: string; attributes: Array<any>; children: Array<any> } = {
    name: element.localName,
    attributes: [],
    children: [],
  };

  Array.from(element.attributes).forEach(a => {
    obj.attributes.push({name: a.name, value: a.value});
  });
  Array.from(element.children).forEach(child => {
    obj.children.push(stringify(child));
  });

  return JSON.stringify(obj);
}

export const Game = {
  placeRandomToken
}

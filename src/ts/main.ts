import {GameScore} from "./gameScore";
import {GameTile} from "./gameTile";
import {GameBoard} from "./gameBoard";
import {GameToken} from "./gameToken";
// import {range} from "./helper";

export {};


const customGameElements = {
  'game-board': GameBoard,
  'game-token': GameToken,
  'game-tile': GameTile,
  'game-score': GameScore,
};

Object.entries(customGameElements).forEach(([element, className]) => {
  console.info(`Registering <${element}>`)
  customElements.define(element, className);
});

const gameElement = document.getElementById('game');
const board = document.getElementsByTagName('game-board')[0] as GameBoard;
const score = document.getElementsByTagName('game-score')[0] as GameScore;
const tiles: GameTile[] = Array.from(board.querySelectorAll('game-tile'));

console.log("Starting game.")
window.addEventListener('keydown', handleKey)

const keyDirection: {
  [key in DirectionKey]: Direction;
} = {
  "ArrowLeft": "left",
  "ArrowRight": "right",
  "ArrowDown": "down",
  "ArrowUp": "up"
}

function getEmptyTiles(tiles: GameTile[]) {
  return tiles
    .filter(tile => Array.from(tile.children)
      .every(child => !(child instanceof GameToken)));
}

function handleKey(event: KeyboardEvent) {
  if (Object.keys(keyDirection).includes(event.key)) {
    slideTokens(keyDirection[event.key as DirectionKey])
  }

  const emptyTiles = getEmptyTiles(tiles);
  if (emptyTiles.length === 0) {
    console.log("YOU LOST.");
    return;
  }
  let randomIndex = Math.floor(Math.random() * emptyTiles.length);
  const token = document.createElement('game-token');
  emptyTiles[randomIndex].appendChild(token);
}

type DirectionKey = "ArrowLeft" | "ArrowRight" | "ArrowDown" | "ArrowUp";
type Direction = "up" | "down" | "left" | "right";
type Axis = "x" | "y";

const axes: {
  [key in Direction]: { cross: Axis; main: Axis; reversed: boolean, length: 'columns' | 'rows' };
} = {
  up: {main: 'x', cross: 'y', reversed: false, length: 'columns'},
  down: {main: 'x', cross: 'y', reversed: true, length: 'columns'},
  left: {main: 'y', cross: 'x', reversed: false, length: 'rows'},
  right: {main: 'y', cross: 'x', reversed: true, length: 'rows'},
}

function slideTokens(direction: Direction) {

  let lanes: GameTile[][] = sortTilesIntoLanes(tiles, direction)

  lanes.forEach((lane) => {
    let tokenMerged = false;
    lane.forEach((tile, index) => {
      const token = tile.querySelector('game-token') as GameToken;
      // console.log(`(${tile.x} / ${tile.y}) at index ${index}`)
      if (!token) {
        return;
      }

      let searchIndex = index;
      while (searchIndex > 0) {
        searchIndex--;
        const tileToCheck = lane[searchIndex];
        const otherToken = tileToCheck.querySelector('game-token') as GameToken;
        if (token.value === otherToken?.value && !tokenMerged) {
          token.value *= 2;
          console.log(token.value)
          score.score = score.score + token.value;
          otherToken.replaceWith(token);
          tokenMerged = true;
          return;
        } else if (otherToken) {
          const previousTile = lane[searchIndex + 1];
          previousTile.appendChild(token)
          tokenMerged = false;
          return;
        }
      }
      lane[0].appendChild(token)
    });
  })
}

function sortTilesIntoLanes(tiles: GameTile[], direction: Direction) {
  const laneAxis: Axis = axes[direction].main;
  return tiles.reduce((lanes: GameTile[][], tile) => {
    const lane = tile[laneAxis];
    if (lanes.hasOwnProperty(lane) && axes[direction].reversed) {
      lanes[lane].unshift(tile);
    } else if (lanes.hasOwnProperty(lane)) {
      lanes[lane].push(tile);
    } else {
      lanes[lane] = [tile]
    }
    return lanes;
  }, []);
}

function placeToken(x: number, y: number) {
  const token = document.createElement('game-token');

  const tile = getTileByXY(x, y)
  tile?.appendChild(token)
}

function getTileByXY(x: number, y: number) {
  return board.querySelector(`game-tile[x="${x}"][y="${y}"]`);
}

placeToken(2, 2);
placeToken(2, 3);
placeToken(3, 2);
placeToken(1, 2);


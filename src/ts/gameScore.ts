export class GameScore extends HTMLElement {
  get score(): number {
    return this._score;
  }
  set score(value: number) {
    this._score = value;
    this.innerHTML = `
      <style>
        game-score {
          contain: content;
          display: grid;
          place-content: center;
        }
      </style>
      <p>Score: ${this._score}</p>
    `;
  }

  private _score: number = 0;

  constructor() {
    super();

    this.score = 0;
  }
}

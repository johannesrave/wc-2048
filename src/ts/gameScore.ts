export class GameScore extends HTMLElement {

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
  }
}

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
        }
      </style>
      <p>Score: ${this.score}</p>
    `;
  }
}

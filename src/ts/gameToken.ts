export class GameToken extends HTMLElement {
  x!: number;
  y!: number;
  value: number = 2;

  connectedCallback(){
    let xString = this.parentElement?.getAttribute('x') ?? '';
    this.x = parseInt(xString);
    this.setAttribute('x', this.x.toString());

    let yString = this.parentElement?.getAttribute('y') ?? '';
    this.y = parseInt(yString);
    this.setAttribute('y', this.y.toString());

    this.innerHTML = `
    <style>
      game-token {
        display: grid;
        place-content: center;
        contain: content;
      }
    </style>
    <p>${this.value}</p>`
  }
}

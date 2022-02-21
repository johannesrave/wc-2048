export class GameToken extends HTMLElement {
  x!: number;
  y!: number;
  value: number = 2;
  id!: string;

  connectedCallback(){
    let xString = this.parentElement?.getAttribute('x') ?? '';
    this.x = parseInt(xString);
    this.setAttribute('x', this.x.toString());

    let yString = this.parentElement?.getAttribute('y') ?? '';
    this.y = parseInt(yString);
    this.setAttribute('y', this.y.toString());

    this.id = (this.id === '') ? "id" + Math.random().toString(16).slice(2, 10) : this.id;
    this.setAttribute('id', this.id);

    this.innerHTML = `
    <style>
      game-token {
        display: grid;
        place-content: center;
        place-items: center;
        contain: content;
      }
    </style>
    <p>${this.value}</p>
    <p>${this.id}</p>`
  }
}

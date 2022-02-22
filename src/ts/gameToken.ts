export class GameToken extends HTMLElement {
  x!: number;
  y!: number;
  value: number = 2;
  id!: string;
  private oldOffsetTop!: number;
  private oldOffsetLeft!: number;

  connectedCallback() {
    let xString = this.parentElement?.getAttribute('x') ?? '';
    this.x = parseInt(xString);
    this.setAttribute('x', this.x.toString());

    let yString = this.parentElement?.getAttribute('y') ?? '';
    this.y = parseInt(yString);
    this.setAttribute('y', this.y.toString());

    this.id = (this.id === '') ? "id" + Math.random().toString(16).slice(2, 10) : this.id;
    this.setAttribute('id', this.id);

    this.oldOffsetLeft = this.oldOffsetLeft ? this.oldOffsetLeft : this.offsetLeft;
    this.oldOffsetTop = this.oldOffsetTop ? this.oldOffsetTop : this.offsetTop;

    this.innerHTML = `
    <style>
      game-token {
        display: grid;
        place-content: center;
        place-items: center;
        contain: content;
        position: relative;
      }


      game-token#${this.id} {
        animation: slide${this.id} 250ms ease-in-out;
      }

      @keyframes slide${this.id} {
        from{
            left: ${this.oldOffsetLeft - this.offsetLeft}px;
            top: ${this.oldOffsetTop - this.offsetTop}px;
        }
        to {
            left: 0px;
            top: 0px;
        }
      }

    </style>
    <p>${this.value}</p>
    <p>${this.id}</p>`

    console.info(`Token was at ${this.oldOffsetLeft}px / ${this.oldOffsetTop}px`)
    console.info(`Connecting Token at ${this.offsetLeft}px / ${this.offsetTop}px`)
    this.oldOffsetTop = this.offsetTop;
    this.oldOffsetLeft = this.offsetLeft;
  }


  disconnectedCallback() {
    // console.info(`Disconnecting Token at ${this.offsetLeft}px / ${this.offsetTop}px`)
  }
}

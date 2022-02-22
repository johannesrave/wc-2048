export class GameToken extends HTMLElement {
  value: number = 2;
  id!: string;
  private oldOffsetTop!: number;
  private oldOffsetLeft!: number;

  connectedCallback() {
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
            left: 0;
            top: 0;
        }
      }
    </style>
    <p>${this.value}</p>
    `

    // console.info(`Token was at ${this.oldOffsetLeft}px / ${this.oldOffsetTop}px`)
    // console.info(`Connecting Token at ${this.offsetLeft}px / ${this.offsetTop}px`)
    this.oldOffsetTop = this.offsetTop;
    this.oldOffsetLeft = this.offsetLeft;
  }
}

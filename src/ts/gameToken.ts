export class GameToken extends HTMLElement {
  value: number = 2;
  id!: string;
  init = true;

  private oldOffsetTop!: number;
  private oldOffsetLeft!: number;

  connectedCallback() {
    if (this.init) {
      this.id = "id" + Math.random().toString(16).slice(2, 10);
      this.setAttribute('id', this.id);
      this.init = false;

      this.style.contain = 'content';
      this.style.display = 'grid';
      this.style.placeContent = 'center';
      this.style.placeItems = 'center';
      this.style.position = 'relative';
      // this.style.animation = `slide${this.id} 100ms ease-in-out`;
    }

    // this.oldOffsetLeft = this.oldOffsetLeft || this.offsetLeft;
    // this.oldOffsetTop = this.oldOffsetTop || this.offsetTop;
    this.oldOffsetLeft = this.oldOffsetLeft ?? this.offsetLeft;
    this.oldOffsetTop = this.oldOffsetTop ?? this.offsetTop;

    this.innerHTML = `
    <style>
      game-token#${this.id} {
        animation: slide${this.id} 1000ms ease-in-out;
      }

      @keyframes slide${this.id} {
        from{
          transform:
            translateX(${this.oldOffsetLeft - this.offsetLeft})
            translateY(${this.oldOffsetTop - this.offsetTop});
        }
        to {
          transform:
            translateX(0)
            translateY(0);
        }
      }
    </style>
    <p>${this.value}</p>
    `

    console.info(`Token was at ${this.oldOffsetLeft}px / ${this.oldOffsetTop}px`)
    console.info(`Connecting Token at ${this.offsetLeft}px / ${this.offsetTop}px`)
    this.oldOffsetLeft = this.offsetLeft;
    this.oldOffsetTop = this.offsetTop;
  }
}

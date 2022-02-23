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
      this.style.animation = `slide${this.id} 250ms ease-in-out`;
    }

    this.oldOffsetLeft = this.oldOffsetLeft ?? this.offsetLeft;
    this.oldOffsetTop = this.oldOffsetTop ?? this.offsetTop;

    this.innerHTML = `
    <style>
      @keyframes slide${this.id} {
        from{
          transform: translate(${this.oldOffsetLeft - this.offsetLeft}px, ${this.oldOffsetTop - this.offsetTop}px);
        }
        to {
          transform: translate(0, 0);
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

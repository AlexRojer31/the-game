export class DefaultResizePlugin {
  private _width: number = window.innerWidth;
  private _height: number = window.innerHeight;
  private _currentWidth: number = window.innerWidth;
  private _currentHeight: number = window.innerHeight;

  constructor() {
    window.addEventListener("resize", () => {
      this.resize();
    });
  }

  resize(): void {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }
}

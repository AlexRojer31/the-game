import { Container, Graphics, Ticker } from "pixi.js";
import { IScene } from "../../core/loaders/scene-loader/i-scene";
import { GetApp } from "../../core/app/run";
import { ISceneLoader } from "../../core/loaders/scene-loader/i-scene-loader";
import { GetEventBus } from "../../core/event-bus/run";
import { WindowResizeEvent } from "../../core/event-bus/events/window-events/window-resize-event";

export class DefaultSceneLoader implements ISceneLoader {
  public getName(): string {
    return "DefaultScene";
  }

  public loadScene(): IScene {
    return new DefaultScene();
  }
}

export class DefaultScene extends Container implements IScene {
  private _ticker: Ticker = new Ticker();

  private _rect!: Graphics;
  private _currentColor!: number;
  private _gameWidth!: number;
  private _gameHeight!: number;

  private _xVelocity: number = 1;
  private _yVelocity: number = 1;
  private _xPosition: number = 60;
  private _yPosition: number = 120;
  private _rectWidth: number = 200;
  private _rectHeight: number = 100;

  constructor() {
    super();
    this._subscribes();

    this._rect = new Graphics();
    this._currentColor = this.randomColor();
    this._gameWidth = GetApp().screen.width;
    this._gameHeight = GetApp().screen.height;
    this.addChild(this._rect);

    this._ticker.add(() => {
      this._animate();
    });
  }

  public load(): void {
    GetApp().stage.addChild(this);
    this.visible = true;
    this._ticker.start();
  }

  public unload(): void {
    GetApp().stage.removeChild(this);
    this.visible = false;
    this._ticker.stop();
  }

  private _subscribes(): void {
    GetEventBus().on(WindowResizeEvent, (e: WindowResizeEvent) => {
      this._gameWidth = e.data.width;
      this._gameHeight = e.data.height;
    });
  }

  private _animate(): void {
    this._xPosition += this._xVelocity;
    this._yPosition += this._yVelocity;

    this._rect
      .clear()
      .rect(this._xPosition, this._yPosition, this._rectWidth, this._rectHeight)
      .fill({ color: this._currentColor });

    if (this._xPosition + this._rectWidth === this._gameWidth) {
      this._xVelocity = -1;
      this._currentColor = this.randomColor();
    }
    if (this._xPosition === 0) {
      this._xVelocity = 1;
      this._currentColor = this.randomColor();
    }
    if (this._yPosition + this._rectHeight === this._gameHeight) {
      this._yVelocity = -1;
      this._currentColor = this.randomColor();
    }
    if (this._yPosition === 0) {
      this._yVelocity = 1;
      this._currentColor = this.randomColor();
    }
  }

  private randomColor(): number {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return (red << 16) + (green << 8) + blue;
  }
}

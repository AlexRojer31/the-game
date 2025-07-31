import { Container, Graphics, Ticker } from "pixi.js";
import { IScene } from "../../core/loaders/scene-loader/i-scene";
import { GetApp } from "../../core/app/run";
import { ISceneLoader } from "../../core/loaders/scene-loader/i-scene-loader";
import { GetEventBus } from "../../core/event-bus/run";
import { WindowResizeEvent } from "../../core/event-bus/events/window-events/window-resize-event";
import { Vec2 } from "../../core/utils/vec2";

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
  private _circle!: Graphics;
  private _currentRectColor!: number;
  private _currentCircleColor!: number;
  private _gameWidth!: number;
  private _gameHeight!: number;

  private _xVelocity: number = 1;
  private _yVelocity: number = 1;
  private _xPosition: number = 60;
  private _yPosition: number = 120;
  private _rectWidth: number = 200;
  private _rectHeight: number = 100;

  private _circleRadius: number = 50;
  private _circleVelocity: Vec2 = new Vec2(200, 0);
  private _circlePosition: Vec2 = new Vec2(150, 50);

  private _gravity: Vec2 = new Vec2(0, 500);

  constructor() {
    super();
    this._subscribes();

    this._rect = new Graphics();
    this._circle = new Graphics();
    this._currentRectColor = this.randomColor();
    this._currentCircleColor = this.randomColor();
    this._gameWidth = GetApp().screen.width;
    this._gameHeight = GetApp().screen.height;
    this.addChild(this._rect, this._circle);

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

  public pause(): void {}

  private _subscribes(): void {
    GetEventBus().on(WindowResizeEvent, (e: WindowResizeEvent) => {
      this._gameWidth = e.data.width;
      this._gameHeight = e.data.height;
    });
  }

  private _animate(): void {
    this.animateRect();
    this.animateCircle();
  }

  private animateCircle(): void {
    const delta: number = this._ticker.deltaMS / 1000;
    this._circleVelocity = this._circleVelocity.add(this._gravity.scale(delta));
    this._circlePosition = this._circlePosition.add(
      this._circleVelocity.scale(delta),
    );

    if (this._circlePosition.x + this._circleRadius >= this._gameWidth) {
      const diff: number =
        this._circlePosition.x + this._circleRadius - this._gameWidth;
      this._circlePosition = new Vec2(
        this._circlePosition.x - 2 * diff,
        this._circlePosition.y,
      );
      this._circleVelocity = new Vec2(
        -this._circleVelocity.x,
        this._circleVelocity.y,
      );
      this._currentCircleColor = this.randomColor();
    }

    if (this._circlePosition.x - this._circleRadius <= 0) {
      const diff: number = this._circlePosition.x - this._circleRadius;
      this._circlePosition = new Vec2(
        this._circlePosition.x - 2 * diff,
        this._circlePosition.y,
      );
      this._circleVelocity = new Vec2(
        -this._circleVelocity.x,
        this._circleVelocity.y,
      );
      this._currentCircleColor = this.randomColor();
    }

    if (this._circlePosition.y + this._circleRadius > this._gameHeight) {
      const diff: number =
        this._circlePosition.y + this._circleRadius - this._gameHeight;
      this._circlePosition = new Vec2(
        this._circlePosition.x,
        this._circlePosition.y - 2 * diff,
      );
      this._circleVelocity = new Vec2(
        this._circleVelocity.x,
        -this._circleVelocity.y,
      );
      this._currentCircleColor = this.randomColor();
    }

    this._circle
      .clear()
      .circle(
        this._circlePosition.x,
        this._circlePosition.y,
        this._circleRadius,
      )
      .fill({ color: this._currentCircleColor });
  }

  private animateRect(): void {
    this._xPosition += this._xVelocity;
    this._yPosition += this._yVelocity;

    this._rect
      .clear()
      .rect(this._xPosition, this._yPosition, this._rectWidth, this._rectHeight)
      .fill({ color: this._currentRectColor });

    if (this._xPosition + this._rectWidth === this._gameWidth) {
      this._xVelocity = -1;
      this._currentRectColor = this.randomColor();
    }
    if (this._xPosition === 0) {
      this._xVelocity = 1;
      this._currentRectColor = this.randomColor();
    }
    if (this._yPosition + this._rectHeight === this._gameHeight) {
      this._yVelocity = -1;
      this._currentRectColor = this.randomColor();
    }
    if (this._yPosition === 0) {
      this._yVelocity = 1;
      this._currentRectColor = this.randomColor();
    }
  }

  private randomColor(): number {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return (red << 16) + (green << 8) + blue;
  }
}

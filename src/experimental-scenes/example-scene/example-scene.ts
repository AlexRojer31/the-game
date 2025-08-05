import { Graphics } from "pixi.js";
import { Vec2 } from "../../core/utils/vec2";
import { BaseScene } from "../../core/loaders/scene-loader/base-scene";

export class ExampleScene extends BaseScene {
  private _rect!: Graphics;
  private _circle!: Graphics;
  private _currentRectColor!: number;
  private _currentCircleColor!: number;

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

  constructor(sceneName: string) {
    super(sceneName);

    this._rect = new Graphics();
    this._circle = new Graphics();
    this._currentRectColor = this.randomColor();
    this._currentCircleColor = this.randomColor();
    this.addChild(this._rect, this._circle);
  }

  protected _animate(): void {
    super._animate();

    this.animateRect();
    this.animateCircle();
  }

  private animateCircle(): void {
    const delta: number = this._ticker.deltaMS / 1000;
    this._circleVelocity = this._circleVelocity.add(this._gravity.scale(delta));
    this._circlePosition = this._circlePosition.add(
      this._circleVelocity.scale(delta),
    );

    if (this._circlePosition.x + this._circleRadius >= this._sceneWidth) {
      const diff: number =
        this._circlePosition.x + this._circleRadius - this._sceneWidth;
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

    if (this._circlePosition.y + this._circleRadius > this._sceneHeight) {
      const diff: number =
        this._circlePosition.y + this._circleRadius - this._sceneHeight;
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

    if (this._xPosition + this._rectWidth === this._sceneWidth) {
      this._xVelocity = -1;
      this._currentRectColor = this.randomColor();
    }
    if (this._xPosition === 0) {
      this._xVelocity = 1;
      this._currentRectColor = this.randomColor();
    }
    if (this._yPosition + this._rectHeight === this._sceneHeight) {
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

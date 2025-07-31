import { Container, Ticker } from "pixi.js";
import { IScene } from "../../core/loaders/scene-loader/i-scene";
import { GetApp } from "../../core/app/run";
import { ISceneLoader } from "../../core/loaders/scene-loader/i-scene-loader";
import { GetEventBus } from "../../core/event-bus/run";
import { WindowResizeEvent } from "../../core/event-bus/events/window-events/window-resize-event";

export class TraineeSceneLoader implements ISceneLoader {
  public getName(): string {
    return "TraineeScene";
  }

  public loadScene(): IScene {
    return new TraineeScene();
  }
}

export class TraineeScene extends Container implements IScene {
  private _ticker: Ticker = new Ticker();

  private _sceneWidth!: number;
  private _sceneHeight!: number;

  constructor() {
    super();
    this._subscribes();

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
      this._sceneWidth = e.data.width;
      this._sceneHeight = e.data.height;
      console.log(this._sceneWidth + "x" + this._sceneHeight);
    });
  }

  private _animate(): void {}
}

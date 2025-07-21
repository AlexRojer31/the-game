import { Container, Ticker } from "pixi.js";
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

  private _subscribes(): void {
    GetEventBus().on(WindowResizeEvent, (e: WindowResizeEvent) => {
      console.log(e.data);
    });
  }

  private _animate(): void {}
}

import { Container, Ticker } from "pixi.js";
import { IScene } from "./i-scene";
import { GetApp } from "../../app/run";
import { GetEventBus } from "../../event-bus/run";
import { WindowResizeEvent } from "../../event-bus/events/window-events/window-resize-event";
import { WindowVisibilityChangeEvent } from "../../event-bus/events/window-events/window-visibility-change-event";

export class BaseScene extends Container implements IScene {
  protected _ticker: Ticker = new Ticker();
  protected _sceneWidth: number = GetApp().screen.width;
  protected _sceneHeight: number = GetApp().screen.height;

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

  public pause(): void {
    this._ticker.stop();
  }

  public resume(): void {
    this._ticker.start();
  }

  protected _subscribes(): void {
    GetEventBus().on(WindowResizeEvent, (e: WindowResizeEvent) => {
      this._sceneWidth = e.data.width;
      this._sceneHeight = e.data.height;
    });
    GetEventBus().on(
      WindowVisibilityChangeEvent,
      (e: WindowVisibilityChangeEvent) => {
        if (!e.data) {
          this.resume();
        } else {
          this.pause();
        }
      },
    );
  }

  protected _animate(): void {}
}

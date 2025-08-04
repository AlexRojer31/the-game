import { Container, Ticker } from "pixi.js";
import { IScene, ISceneSize } from "./i-scene";
import { GetApp } from "../../app/run";
import { GetEventBus } from "../../event-bus/run";
import { WindowResizeEvent } from "../../event-bus/events/window-events/window-resize-event";
import { WindowVisibilityChangeEvent } from "../../event-bus/events/window-events/window-visibility-change-event";
import { SceneLoadedEvent } from "../../event-bus/events/scene-events/scene-loaded-event";

export class BaseScene extends Container implements IScene {
  protected _sceneName: string;
  protected _doOnce: boolean = false;
  protected _ticker: Ticker = new Ticker();
  protected _sceneWidth: number = GetApp().screen.width;
  protected _sceneHeight: number = GetApp().screen.height;

  constructor(sceneName: string) {
    super();

    this._sceneName = sceneName;
    this._subscribes();
    this._ticker.add(() => {
      this._animate();
    });
  }

  public getCurrentContainer(): Container {
    return this as Container;
  }

  public getCurrentSize(): ISceneSize {
    return {
      width: this._sceneWidth,
      height: this._sceneHeight,
    };
  }

  public getCurrentTicker(): Ticker {
    return this._ticker;
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

    GetEventBus().on(SceneLoadedEvent, (e: SceneLoadedEvent) => {
      if (e.data === this._sceneName && !this._doOnce) {
        this._run();
        this._doOnce = true;
      }
    });
  }

  protected _animate(): void {}
  protected _run(): void {}
}

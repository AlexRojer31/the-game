import { Ticker } from "pixi.js";
import { RESIZING_STATE } from "./resizing-state";
import { GetEventBus } from "../../event-bus/run";
import { WindowResizeEvent } from "../../event-bus/events/window-events/window-resize-event";

export class DefaultResizePlugin {
  private _debounce: number = 30;
  private _currentDebounce: number = 0;
  private _currentWidth: number = window.innerWidth;
  private _currentHeight: number = window.innerHeight;
  private _currentState: RESIZING_STATE = RESIZING_STATE.idle;
  private _ticker: Ticker = new Ticker();

  constructor() {
    this._ticker.add(() => {
      this._animate();
    }, this);

    window.addEventListener("resize", () => {
      this._currentState = RESIZING_STATE.resizing;
      this._ticker.start();
    });
  }

  private _animate(): void {
    switch (this._currentState) {
      case RESIZING_STATE.idle:
        this._ticker.stop();
        break;
      case RESIZING_STATE.resizing:
        this._resize();
        break;
      case RESIZING_STATE.update:
        this._update();
        break;
    }
  }

  private _resize(): void {
    this._currentDebounce += this._ticker.deltaTime;
    if (this._currentDebounce < this._debounce) {
      return;
    }
    this._currentDebounce = 0;

    const width: number = window.innerWidth;
    const height: number = window.innerHeight;
    if (width != this._currentWidth) {
      this._currentWidth = width;
    }
    if (height != this._currentHeight) {
      this._currentHeight = height;
    }

    if (height == this._currentHeight && width == this._currentWidth) {
      this._currentState = RESIZING_STATE.update;
    }
  }

  private _update(): void {
    this._currentState = RESIZING_STATE.idle;

    GetEventBus().emit({
      name: WindowResizeEvent,
      data: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  }

  public getCurrentState(): RESIZING_STATE {
    return this._currentState;
  }
}

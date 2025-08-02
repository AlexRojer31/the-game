import { WindowVisibilityChangeEvent } from "../../event-bus/events/window-events/window-visibility-change-event";
import { GetEventBus } from "../../event-bus/run";
import { VISIBILITY_STATE } from "./visibility-state";

export class DefaultVisibilityPlugin {
  private _currentVisibility: VISIBILITY_STATE = VISIBILITY_STATE.visible;

  constructor() {
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        this._currentVisibility = VISIBILITY_STATE.unvisible;
        GetEventBus().emit({ name: WindowVisibilityChangeEvent, data: false });
      } else {
        this._currentVisibility = VISIBILITY_STATE.visible;
        GetEventBus().emit({ name: WindowVisibilityChangeEvent, data: true });
      }
    });
  }

  public getCurrentVisible(): VISIBILITY_STATE {
    return this._currentVisibility;
  }
}

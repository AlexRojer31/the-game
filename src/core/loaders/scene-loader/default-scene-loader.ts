import { LoadSceneEvent } from "../../event-bus/events/scene-events/load-scene-event";
import { SceneLoadedEvent } from "../../event-bus/events/scene-events/scene-loaded-event";
import { GetEventBus } from "../../event-bus/run";
import { IScene } from "./i-scene";

export class DefaultSceneLoader {
  private _scenes: Map<string, IScene> = new Map();
  private _currentScene: IScene | null = null;

  constructor() {
    this._subscribes();
  }

  private _subscribes(): void {
    GetEventBus().on(LoadSceneEvent, (e: LoadSceneEvent) => {
      this._currentScene?.unload();
      if (this._scenes.has(e.data.getName())) {
        this._scenes.get(e.data.getName())!.load();
      } else {
        this._scenes.set(e.data.getName(), e.data.loadScene());
        this._scenes.get(e.data.getName())!.load();
      }
      this._currentScene = this._scenes.get(e.data.getName())!;

      GetEventBus().emit({ name: SceneLoadedEvent, data: e.data.getName() });
    });
  }

  public getCurrentScene(): IScene | null {
    return this._currentScene;
  }
}

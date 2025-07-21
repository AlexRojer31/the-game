import { LoadSceneEvent } from "../../event-bus/events/scene-events/load-scene-event";
import { GetEventBus } from "../../event-bus/run";
import { IScene } from "./i-scene";

export class SceneLoader {
  private scenes: Map<string, IScene> = new Map();
  private currentScene: IScene | null = null;

  constructor() {
    this.subscribes();
  }

  private subscribes(): void {
    GetEventBus().on(LoadSceneEvent, (e: LoadSceneEvent) => {
      this.currentScene?.unload();
      if (this.scenes.has(e.data.getName())) {
        this.scenes.get(e.data.getName())!.load();
      } else {
        this.scenes.set(e.data.getName(), e.data.loadScene());
        this.scenes.get(e.data.getName())!.load();
      }
      this.currentScene = this.scenes.get(e.data.getName())!;
    });
  }
}

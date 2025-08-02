import { BaseScene } from "./base-scene";
import { IScene } from "./i-scene";
import { ISceneLoader } from "./i-scene-loader";

export class BaseSceneLoader implements ISceneLoader {
  protected _name: string = "BaseScene";

  public getName(): string {
    return this._name;
  }

  public loadScene(): IScene {
    return this.load();
  }

  protected load(): IScene {
    return new BaseScene();
  }
}

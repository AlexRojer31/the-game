import { BaseSceneLoader } from "../../core/loaders/scene-loader/base-scene-loader";
import { IScene } from "../../core/loaders/scene-loader/i-scene";
import { TraineeMoveScene } from "./trainee-move-scene";

export class TraineeMoveSceneLoader extends BaseSceneLoader {
  protected _name: string = "TraineeMoveScene";

  protected load(): IScene {
    return new TraineeMoveScene(this._name);
  }
}

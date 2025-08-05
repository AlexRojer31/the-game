import { BaseSceneLoader } from "../../core/loaders/scene-loader/base-scene-loader";
import { IScene } from "../../core/loaders/scene-loader/i-scene";
import { CollisionScene } from "./collision-scene";

export class CollisionSceneLoader extends BaseSceneLoader {
  protected _name: string = "CollisionScene";

  protected load(): IScene {
    return new CollisionScene(this._name);
  }
}

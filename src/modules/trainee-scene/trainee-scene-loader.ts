import { BaseSceneLoader } from "../../core/loaders/scene-loader/base-scene-loader";
import { IScene } from "../../core/loaders/scene-loader/i-scene";
import { TraineeScene } from "./trainee-scene";

export class TraineeSceneLoader extends BaseSceneLoader {
  protected _name: string = "TraineeScene";

  protected load(): IScene {
    return new TraineeScene();
  }
}

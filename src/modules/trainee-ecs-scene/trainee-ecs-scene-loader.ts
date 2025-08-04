import { BaseSceneLoader } from "../../core/loaders/scene-loader/base-scene-loader";
import { IScene } from "../../core/loaders/scene-loader/i-scene";
import { TraineeEcsScene } from "./trainee-ecs-scene";

export class TraineeEcsSceneLoader extends BaseSceneLoader {
  protected _name: string = "TraineeEcsScene";

  protected load(): IScene {
    return new TraineeEcsScene(this._name);
  }
}

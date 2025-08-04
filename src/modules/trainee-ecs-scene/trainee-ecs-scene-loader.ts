import { BaseSceneLoader } from "../../core/loaders/scene-loader/base-scene-loader";
import { IScene } from "../../core/loaders/scene-loader/i-scene";
import { TraineeEcsScene } from "./trainee-ecs-scene";

export class TraineeEcsSceneLoader extends BaseSceneLoader {
  protected _name: string = "TraineeScene";

  protected load(): IScene {
    return new TraineeEcsScene();
  }
}

import { BaseSceneLoader } from "../../core/loaders/scene-loader/base-scene-loader";
import { IScene } from "../../core/loaders/scene-loader/i-scene";
import { ExampleScene } from "./example-scene";

export class ExampleSceneLoader extends BaseSceneLoader {
  protected _name: string = "ExampleScene";

  protected load(): IScene {
    return new ExampleScene();
  }
}

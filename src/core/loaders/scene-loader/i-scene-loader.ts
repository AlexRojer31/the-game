import { IScene } from "./i-scene";

export interface ISceneLoader {
  getName(): string;
  loadScene(): IScene;
}

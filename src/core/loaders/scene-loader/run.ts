import { SceneLoader } from "./scene-loader";

let instance: SceneLoader | null = null;

export function GetSceneLoader(): SceneLoader {
  return instance!;
}

export function RunSceneLoader() {
  instance = new SceneLoader();
}

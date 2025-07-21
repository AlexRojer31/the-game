import { DefaultSceneLoader } from "./default-scene-loader";

let instance: DefaultSceneLoader | null = null;

export function GetSceneLoader(): DefaultSceneLoader {
  return instance!;
}

export function RunSceneLoader() {
  instance = new DefaultSceneLoader();
}

export interface IScene {
  load(): void;
  unload(): void;
}

export interface ISceneLoader {
  getName(): string;
  loadScene(): IScene;
}

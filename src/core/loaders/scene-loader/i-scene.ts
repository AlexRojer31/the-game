import { Container, Ticker } from "pixi.js";

export interface ISceneSize {
  width: number;
  height: number;
}

export interface IScene {
  load(): void;
  unload(): void;
  pause(): void;
  resume(): void;
  getCurrentTicker(): Ticker;
  getCurrentSize(): ISceneSize;
  getCurrentContainer(): Container;
}

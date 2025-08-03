import { Ticker } from "pixi.js";

export interface IScene {
  load(): void;
  unload(): void;
  pause(): void;
  resume(): void;
  getCurrentTicker(): Ticker;
}

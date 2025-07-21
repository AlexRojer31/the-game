import { Container, Ticker } from "pixi.js";
import { IScene } from "../../core/loaders/scene-loader/i-scene";
import { GetApp } from "../../core/app/run";
import { ISceneLoader } from "../../core/loaders/scene-loader/i-scene-loader";

export class DefaultSceneLoader implements ISceneLoader {
  public getName(): string {
    return "DefaultScene";
  }

  public loadScene(): IScene {
    return new DefaultScene();
  }
}

export class DefaultScene extends Container implements IScene {
  private ticker: Ticker = new Ticker();

  constructor() {
    super();
    this.subscribes();

    this.ticker.add(() => {
      this.animate();
    });
  }

  load(): void {
    GetApp().stage.addChild(this);
    this.visible = true;
    this.ticker.start();
  }

  unload(): void {
    GetApp().stage.removeChild(this);
    this.visible = false;
    this.ticker.stop();
  }

  private subscribes(): void {}
  private animate(): void {}
}

import { Container, Ticker } from "pixi.js";
import { IScene, ISceneLoader } from "../../core/loaders/scene-loader/i-scene";
import { app } from "../../core/app/app";

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
    app().stage.addChild(this);
    this.visible = true;
    this.ticker.start();
  }

  unload(): void {
    app().stage.removeChild(this);
    this.visible = false;
    this.ticker.stop();
  }

  private subscribes(): void {}
  private animate(): void {}
}

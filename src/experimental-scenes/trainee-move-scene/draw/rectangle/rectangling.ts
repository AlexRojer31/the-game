import { Graphics } from "pixi.js";
import { System } from "../../../../core/ecs/system";
import Rectangable, { IRectangable } from "./rectangable";
import { GetSceneLoader } from "../../../../core/loaders/scene-loader/run";

export default class Rectangling extends System {
  public rectangle: Graphics = new Graphics();

  constructor() {
    super();

    GetSceneLoader()
      .getCurrentScene()!
      .getCurrentContainer()
      .addChild(this.rectangle);
  }

  public update(): void {
    super.update();
    this.rectangle.clear();
    for (const component of this.getComponents()) {
      const c: Rectangable = component as Rectangable;
      this.rectangle
        .rect(
          c.flatMovable.position.x,
          c.flatMovable.position.y,
          c.width,
          c.height,
        )
        .fill({ color: "red" });
    }
  }

  public createRectangable(data: IRectangable): Rectangable {
    const component = new Rectangable(data);
    this.pushComponents(component);
    return component;
  }
}

import { Graphics } from "pixi.js";
import { System } from "../../../../core/ecs/system";
import Rectangable, { IRectangable } from "./rectangable";
import { GetSceneLoader } from "../../../../core/loaders/scene-loader/run";

export default class Rectangling extends System<Rectangable> {
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
      this.rectangle
        .rect(
          component.flatMovable.position.x,
          component.flatMovable.position.y,
          component.width,
          component.height,
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

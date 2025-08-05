import { Graphics } from "pixi.js";
import { System } from "../../../../core/ecs/system";
import Rectangable from "./rectangable";
import { GetSceneLoader } from "../../../../core/loaders/scene-loader/run";
import FlatMovable from "../../flat-move/flat-movable";

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
    this.rectangle.clear();
    for (const component of this._components) {
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

  public createRectangable(
    width: number,
    height: number,
    flatMovable: FlatMovable,
  ) {
    const component = new Rectangable({
      width,
      height,
      flatMovable,
    });
    this._components.push(component);
    return component;
  }
}

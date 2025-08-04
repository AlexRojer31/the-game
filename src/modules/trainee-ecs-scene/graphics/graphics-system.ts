import { Graphics } from "pixi.js";
import { System } from "../../../core/ecs/system";
import { GetApp } from "../../../core/app/run";
import { BodyGraphics } from "./body-graphics";
import { Body } from "../physics/body";
import { GetSceneLoader } from "../../../core/loaders/scene-loader/run";
import { ISceneSize } from "../../../core/loaders/scene-loader/i-scene";

export class GraphicsSystem extends System {
  public graphics: Graphics = new Graphics();
  public width: number = GetApp().screen.width;
  public height: number = GetApp().screen.height;

  constructor() {
    super();

    GetSceneLoader()
      .getCurrentScene()!
      .getCurrentContainer()
      .addChild(this.graphics);
  }

  update() {
    const currentSize: ISceneSize = GetSceneLoader()
      .getCurrentScene()!
      .getCurrentSize();

    this.width = currentSize.width;
    this.height = currentSize.height;

    this.graphics.clear();
    for (const component of this._components) {
      if (component instanceof BodyGraphics) {
        this.graphics
          .circle(
            component.body.position.x,
            component.body.position.y,
            component.body.radius,
          )
          .fill({ color: component.color });
      }
    }
  }

  createGraphicsComponent(body: Body) {
    const graphicsComponent = new BodyGraphics(body);
    this._components.push(graphicsComponent);
    return graphicsComponent;
  }
}

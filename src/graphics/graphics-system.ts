import { Graphics } from "pixi.js";
import { System } from "../core/ecs/system";
import { GetApp } from "../core/app/run";
import { BodyGraphics } from "./body-graphics";
import { Body } from "../physics/body";

export class GraphicsSystem extends System {
  public graphics: Graphics = new Graphics();
  public width: number = GetApp().screen.width;
  public height: number = GetApp().screen.height;

  constructor() {
    super();
    // this.parentElement = document.getElementById(config.rootElementId);
    // this.parentElement.appendChild(this.app.view);
    // this.app = new PIXI.Application({ width: this.width, height: this.height });
    // this.app.stage.addChild(this.graphics);
  }

  update() {
    this.graphics.clear();
    for (const component of this._components) {
      if (component instanceof BodyGraphics) {
        this.graphics
          .clear()
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

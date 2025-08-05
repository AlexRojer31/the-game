import { GetApp } from "../../../core/app/run";
import { System } from "../../../core/ecs/system";
import { ISceneSize } from "../../../core/loaders/scene-loader/i-scene";
import { GetSceneLoader } from "../../../core/loaders/scene-loader/run";
import { Vec2 } from "../../../core/utils/vec2";
import { BodyGraphics } from "../graphics/body-graphics";
import { Body } from "../physics/body";
import { ScreenEdgeBounce } from "./screen-edge-bounce";

export default class ScreenEdgeBounceSystem extends System {
  public width: number = GetApp().screen.width;
  public height: number = GetApp().screen.height;

  constructor() {
    super();
  }

  update() {
    const currentSize: ISceneSize = GetSceneLoader()
      .getCurrentScene()!
      .getCurrentSize();

    this.width = currentSize.width;
    this.height = currentSize.height;

    for (const component of this.getComponents()) {
      if (component instanceof ScreenEdgeBounce) {
        const bodyComponent = component.body;
        const graphicsComponent = component.bodyGraphics;

        if (bodyComponent.position.x + bodyComponent.radius >= this.width) {
          const diff =
            bodyComponent.position.x + bodyComponent.radius - this.width;
          bodyComponent.position = new Vec2(
            bodyComponent.position.x - 2 * diff,
            bodyComponent.position.y,
          );
          bodyComponent.velocity = new Vec2(
            -bodyComponent.velocity.x,
            bodyComponent.velocity.y,
          );
          graphicsComponent.setRandomColor();
        }

        if (bodyComponent.position.x - bodyComponent.radius <= 0) {
          const diff = bodyComponent.position.x - bodyComponent.radius;
          bodyComponent.position = new Vec2(
            bodyComponent.position.x - 2 * diff,
            bodyComponent.position.y,
          );
          bodyComponent.velocity = new Vec2(
            -bodyComponent.velocity.x,
            bodyComponent.velocity.y,
          );
          graphicsComponent.setRandomColor();
        }

        if (bodyComponent.position.y + bodyComponent.radius > this.height) {
          const diff =
            bodyComponent.position.y + bodyComponent.radius - this.height;
          bodyComponent.position = new Vec2(
            bodyComponent.position.x,
            bodyComponent.position.y - 2 * diff,
          );
          bodyComponent.velocity = new Vec2(
            bodyComponent.velocity.x,
            -bodyComponent.velocity.y,
          );
          graphicsComponent.setRandomColor();
        }
      }
    }
  }

  createScreenEdgeBounceComponent(body: Body, bodyGraphics: BodyGraphics) {
    const component = new ScreenEdgeBounce(body, bodyGraphics);
    this.pushComponents(component);
    return component;
  }
}

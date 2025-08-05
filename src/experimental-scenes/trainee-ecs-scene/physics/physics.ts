import { System } from "../../../core/ecs/system";
import { GetSceneLoader } from "../../../core/loaders/scene-loader/run";
import { Body } from "./body";

export class Physics extends System {
  protected _delta: number =
    GetSceneLoader().getCurrentScene()!.getCurrentTicker().deltaMS / 1000;

  constructor() {
    super();
  }

  public update(): void {
    for (const component of this.getComponents()) {
      if (component instanceof Body) {
        component.velocity = component.velocity.add(
          component.acceleration.scale(this._delta),
        );
        component.position = component.position.add(
          component.velocity.scale(this._delta),
        );
      }
    }
  }

  public createBodyComponent(posX: number, posY: number) {
    const component = new Body(posX, posY);
    this.pushComponents(component);
    return component;
  }
}

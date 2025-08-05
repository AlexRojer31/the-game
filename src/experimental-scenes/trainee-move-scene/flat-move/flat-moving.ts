import { System } from "../../../core/ecs/system";
import { GetSceneLoader } from "../../../core/loaders/scene-loader/run";
import { Vec2 } from "../../../core/utils/vec2";
import FlatMovable, { IFlatMovable } from "./flat-movable";

export default class FlatMoving extends System<FlatMovable> {
  private _defaultVelocity: number = 200;
  private _delta: number =
    GetSceneLoader().getCurrentScene()!.getCurrentTicker().deltaMS / 1000;

  constructor(velosity: number) {
    super();

    this._defaultVelocity = velosity;
  }

  public update(): void {
    super.update();
    for (const component of this.getComponents()) {
      let horVelocity = 0;
      let verVelocity = 0;
      if (component.WASDControlable.left && !component.WASDControlable.right) {
        horVelocity = -this._defaultVelocity;
      } else if (
        !component.WASDControlable.left &&
        component.WASDControlable.right
      ) {
        horVelocity = this._defaultVelocity;
      }
      if (component.WASDControlable.top && !component.WASDControlable.bottom) {
        verVelocity = -this._defaultVelocity;
      } else if (
        !component.WASDControlable.top &&
        component.WASDControlable.bottom
      ) {
        verVelocity = this._defaultVelocity;
      }

      component.velocity = new Vec2(horVelocity, verVelocity);
      component.position = component.position.add(
        component.velocity.scale(this._delta),
      );
    }
  }

  public createFlatMovable(data: IFlatMovable): FlatMovable {
    const component = new FlatMovable(data);
    this.pushComponents(component);
    return component;
  }
}

import { System } from "../../../core/ecs/system";
import { GetSceneLoader } from "../../../core/loaders/scene-loader/run";
import { Vec2 } from "../../../core/utils/vec2";
import WASDControlable from "../control/wasd/wasd-contolable";
import FlatMovable from "./flat-movable";

export default class FlatMoving extends System {
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
      const c: FlatMovable = component as FlatMovable;

      let horVelocity = 0;
      let verVelocity = 0;
      if (c.WASDControlable.left && !c.WASDControlable.right) {
        horVelocity = -this._defaultVelocity;
      } else if (!c.WASDControlable.left && c.WASDControlable.right) {
        horVelocity = this._defaultVelocity;
      }
      if (c.WASDControlable.top && !c.WASDControlable.bottom) {
        verVelocity = -this._defaultVelocity;
      } else if (!c.WASDControlable.top && c.WASDControlable.bottom) {
        verVelocity = this._defaultVelocity;
      }

      c.velocity = new Vec2(horVelocity, verVelocity);
      c.position = c.position.add(c.velocity.scale(this._delta));
    }
  }

  public createFlatMovable(
    posX: number,
    posY: number,
    velocity: Vec2,
    WASDControlable: WASDControlable,
  ): FlatMovable {
    const component = new FlatMovable({
      startPosition: new Vec2(posX, posY),
      velocity: velocity,
      WASDControlable: WASDControlable,
    });
    this.pushComponents(component);
    return component;
  }
}

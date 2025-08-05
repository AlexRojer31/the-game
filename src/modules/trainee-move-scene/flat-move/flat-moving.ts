import { System } from "../../../core/ecs/system";
import { GetSceneLoader } from "../../../core/loaders/scene-loader/run";
import { Vec2 } from "../../../core/utils/vec2";
import FlatMovable from "./flat-movable";

export default class FlatMoving extends System {
  private _delta: number =
    GetSceneLoader().getCurrentScene()!.getCurrentTicker().deltaMS / 1000;

  constructor() {
    super();
  }

  public update(): void {
    for (const component of this._components) {
      const c: FlatMovable = component as FlatMovable;
      c.position = c.position.add(c.velocity.scale(this._delta));
    }
  }

  public createFlatMovable(posX: number, posY: number, velocity: Vec2) {
    const component = new FlatMovable({
      startPosition: new Vec2(posX, posY),
      velocity: velocity,
    });
    this._components.push(component);
    return component;
  }
}

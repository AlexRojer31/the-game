import { Entity } from "../../core/ecs/entity";
import { BaseScene } from "../../core/loaders/scene-loader/base-scene";
import { Vec2 } from "../../core/utils/vec2";
import Rectangling from "./draw/rectangle/rectangling";
import FlatMoving from "./flat-move/flat-moving";

export class TraineeMoveScene extends BaseScene {
  private flatMoving!: FlatMoving;
  private drawRectangling!: Rectangling;

  protected _prepare(): void {
    this.flatMoving = new FlatMoving();
    this.drawRectangling = new Rectangling();

    this.createRect(50, 50);
  }

  protected _animate(): void {
    this.drawRectangling.update();
    this.flatMoving.update();

    this.drawRectangling.deleteStaleComponents();
    this.flatMoving.deleteStaleComponents();
  }

  private createRect(posX: number, posY: number): void {
    const entity = new Entity();
    const flatMovable = this.flatMoving.createFlatMovable(
      posX,
      posY,
      new Vec2(200, 200),
    );
    const drawRectangable = this.drawRectangling.createRectangable(
      100,
      100,
      flatMovable,
    );

    entity.attachComponents(flatMovable, drawRectangable);
  }
}

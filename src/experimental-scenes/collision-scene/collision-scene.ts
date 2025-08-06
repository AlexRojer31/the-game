import { GetApp } from "../../core/app/run";
import { Entity } from "../../core/ecs/entity";
import { BaseScene } from "../../core/loaders/scene-loader/base-scene";
import { Vec2 } from "../../core/utils/vec2";
import { GraphicsSystem } from "../trainee-ecs-scene/graphics/graphics-system";
import { Physics } from "../trainee-ecs-scene/physics/physics";
import ScreenEdgeBounceSystem from "../trainee-ecs-scene/screen-edge-bounce/screen-edge-bounce-system";
import WASDControling from "../trainee-move-scene/control/wasd/wasd-controling";
import Rectangling from "../trainee-move-scene/draw/rectangle/rectangling";
import FlatMoving from "../trainee-move-scene/flat-move/flat-moving";

export class CollisionScene extends BaseScene {
  private wasdControlling!: WASDControling;
  private flatMoving!: FlatMoving;
  private drawRectangling!: Rectangling;
  private physicsSystem!: Physics;
  private screenEdgeBounceSystem!: ScreenEdgeBounceSystem;
  private graphicsSystem!: GraphicsSystem;

  protected _prepare(): void {
    this.wasdControlling = new WASDControling();
    this.flatMoving = new FlatMoving(500);
    this.drawRectangling = new Rectangling();
    this.physicsSystem = new Physics();
    this.screenEdgeBounceSystem = new ScreenEdgeBounceSystem();
    this.graphicsSystem = new GraphicsSystem();

    this.createBouncingBall(50, 50);
    this.createBouncingBall(200, 70);
    this.createBouncingBall(350, 90);
    this.createBouncingBall(500, 110);

    this.createRect(
      GetApp().screen.width / 2,
      GetApp().screen.height / 2,
      150,
      50,
    );
  }

  protected _animate(): void {
    this.physicsSystem.update();
    this.screenEdgeBounceSystem.update();
    this.graphicsSystem.update();
    this.drawRectangling.update();
    this.flatMoving.update();

    this.drawRectangling.deleteStaleComponents();
    this.flatMoving.deleteStaleComponents();
    this.physicsSystem.deleteStaleComponents();
    this.screenEdgeBounceSystem.deleteStaleComponents();
    this.graphicsSystem.deleteStaleComponents();
  }

  private createRect(
    posX: number,
    posY: number,
    width: number,
    height: number,
  ): void {
    const entity = new Entity();
    const WASDControlable = this.wasdControlling.createWASDControlable();
    const flatMovable = this.flatMoving.createFlatMovable({
      startPosition: new Vec2(posX, posY),
      velocity: new Vec2(0, 0),
      WASDControlable,
    });
    const drawRectangable = this.drawRectangling.createRectangable({
      width,
      height,
      flatMovable,
    });

    entity.attachComponents(WASDControlable, flatMovable, drawRectangable);
  }

  private createBouncingBall(posX: number, posY: number): void {
    const entity = new Entity();
    const bodyComponent = this.physicsSystem.createBodyComponent(posX, posY);
    const graphicsComponent =
      this.graphicsSystem.createGraphicsComponent(bodyComponent);
    const screenEdgeBounceComponent =
      this.screenEdgeBounceSystem.createScreenEdgeBounceComponent(
        bodyComponent,
        graphicsComponent,
      );

    entity.attachComponents(
      bodyComponent,
      graphicsComponent,
      screenEdgeBounceComponent,
    );
  }
}

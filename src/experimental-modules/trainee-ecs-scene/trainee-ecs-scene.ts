import { Entity } from "../../core/ecs/entity";
import { BaseScene } from "../../core/loaders/scene-loader/base-scene";
import { GraphicsSystem } from "./graphics/graphics-system";
import { Physics } from "./physics/physics";
import ScreenEdgeBounceSystem from "./screen-edge-bounce/screen-edge-bounce-system";

export class TraineeEcsScene extends BaseScene {
  private physicsSystem!: Physics;
  private screenEdgeBounceSystem!: ScreenEdgeBounceSystem;
  private graphicsSystem!: GraphicsSystem;

  protected _prepare(): void {
    this.physicsSystem = new Physics();
    this.screenEdgeBounceSystem = new ScreenEdgeBounceSystem();
    this.graphicsSystem = new GraphicsSystem();

    this.createBouncingBall(50, 50);
    this.createBouncingBall(200, 70);
    this.createBouncingBall(350, 90);
    this.createBouncingBall(500, 110);
  }

  protected _animate(): void {
    this.physicsSystem.update();
    this.screenEdgeBounceSystem.update();

    this.physicsSystem.deleteStaleComponents();
    this.screenEdgeBounceSystem.deleteStaleComponents();

    this.graphicsSystem.update();
    this.graphicsSystem.deleteStaleComponents();
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

import { Component } from "../../../core/ecs/component";
import { Vec2 } from "../../../core/utils/vec2";

export class Body extends Component {
  public position: Vec2;
  public velocity: Vec2;
  public acceleration: Vec2;
  public radius: number = 50;

  constructor(posX: number, posY: number) {
    super();
    this.position = new Vec2(posX, posY);
    this.velocity = new Vec2(200, 0);
    this.acceleration = new Vec2(0, 500);
  }
}

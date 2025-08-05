import { Component } from "../../../core/ecs/component";
import { Vec2 } from "../../../core/utils/vec2";

export interface IFlatMovable {
  startPosition: Vec2;
  velocity: Vec2;
}

export default class FlatMovable extends Component {
  public position: Vec2;
  public velocity: Vec2;

  constructor(data: IFlatMovable) {
    super();
    this.position = data.startPosition;
    this.velocity = data.velocity;
  }
}

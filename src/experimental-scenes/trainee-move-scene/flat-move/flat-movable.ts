import { Component } from "../../../core/ecs/component";
import { Vec2 } from "../../../core/utils/vec2";
import WASDControlable from "../control/wasd/wasd-contolable";

export interface IFlatMovable {
  startPosition: Vec2;
  velocity: Vec2;
  WASDControlable: WASDControlable;
}

export default class FlatMovable extends Component {
  public position: Vec2;
  public velocity: Vec2;

  public WASDControlable: WASDControlable;

  constructor(data: IFlatMovable) {
    super();
    this.position = data.startPosition;
    this.velocity = data.velocity;
    this.WASDControlable = data.WASDControlable;
  }
}

import { Component } from "../../../../core/ecs/component";
import FlatMovable from "../../flat-move/flat-movable";

export interface IRectangable {
  width: number;
  height: number;
  flatMovable: FlatMovable;
}

export default class Rectangable extends Component {
  public width: number;
  public height: number;

  public flatMovable: FlatMovable;

  constructor(data: IRectangable) {
    super();

    this.width = data.width;
    this.height = data.height;
    this.flatMovable = data.flatMovable;
  }
}

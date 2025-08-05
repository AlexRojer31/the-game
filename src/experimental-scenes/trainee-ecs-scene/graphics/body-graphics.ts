import { Component } from "../../../core/ecs/component";
import { Body } from "../physics/body";

export class BodyGraphics extends Component {
  public body: Body;
  public color!: number;

  constructor(body: Body) {
    super();
    this.body = body;
    this.setRandomColor();
  }

  public setRandomColor() {
    this.color = this.randomColor();
  }

  public randomColor(): number {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return (red << 16) + (green << 8) + blue;
  }
}

import { Component } from "../../../core/ecs/component";
import Rectangable from "../../trainee-move-scene/draw/rectangle/rectangable";

export default class ScreenTouchable extends Component {
  public topTouch: boolean = false;
  public bottomTouch: boolean = false;
  public leftTouch: boolean = false;
  public rightTouch: boolean = false;

  public rectangable!: Rectangable;

  constructor(rectangable: Rectangable) {
    super();
    this.rectangable = rectangable;
  }
}

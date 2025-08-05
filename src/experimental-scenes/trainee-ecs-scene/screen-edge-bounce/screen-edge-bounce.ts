import { Component } from "../../../core/ecs/component";
import { BodyGraphics } from "../graphics/body-graphics";
import { Body } from "../physics/body";

export class ScreenEdgeBounce extends Component {
  public body: Body;
  public bodyGraphics: BodyGraphics;

  constructor(body: Body, bodyGraphics: BodyGraphics) {
    super();
    this.body = body;
    this.bodyGraphics = bodyGraphics;
  }
}

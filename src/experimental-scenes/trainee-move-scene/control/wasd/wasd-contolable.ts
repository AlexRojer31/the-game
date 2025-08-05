import { Component } from "../../../../core/ecs/component";

export default class WASDControlable extends Component {
  public top: boolean = false;
  public bottom: boolean = false;
  public left: boolean = false;
  public right: boolean = false;
}

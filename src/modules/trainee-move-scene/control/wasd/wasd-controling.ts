import { System } from "../../../../core/ecs/system";
import WASDControlable from "./wasd-contolable";

export default class WASDControling extends System {
  constructor() {
    super();

    window.onkeydown = (event) => {
      for (const component of this._components) {
        const c: WASDControlable = component as WASDControlable;
        if (event.code === "KeyW") {
          c.top = true;
        } else if (event.code === "KeyS") {
          c.bottom = true;
        } else if (event.code === "KeyA") {
          c.left = true;
        } else if (event.code === "KeyD") {
          c.right = true;
        }
      }
    };

    window.onkeyup = (event) => {
      for (const component of this._components) {
        const c: WASDControlable = component as WASDControlable;
        if (event.code === "KeyW") {
          c.top = false;
        } else if (event.code === "KeyS") {
          c.bottom = false;
        } else if (event.code === "KeyA") {
          c.left = false;
        } else if (event.code === "KeyD") {
          c.right = false;
        }
      }
    };
  }

  public createWASDControlable(): WASDControlable {
    const component = new WASDControlable();
    this._components.push(component);
    return component;
  }
}

import { System } from "../../../../core/ecs/system";
import WASDControlable from "./wasd-contolable";

export default class WASDControling extends System<WASDControlable> {
  constructor() {
    super();

    window.onkeydown = (event) => {
      for (const component of this.getComponents()) {
        if (event.code === "KeyW") {
          component.top = true;
        } else if (event.code === "KeyS") {
          component.bottom = true;
        } else if (event.code === "KeyA") {
          component.left = true;
        } else if (event.code === "KeyD") {
          component.right = true;
        }
      }
    };

    window.onkeyup = (event) => {
      for (const component of this.getComponents()) {
        if (event.code === "KeyW") {
          component.top = false;
        } else if (event.code === "KeyS") {
          component.bottom = false;
        } else if (event.code === "KeyA") {
          component.left = false;
        } else if (event.code === "KeyD") {
          component.right = false;
        }
      }
    };
  }

  public createWASDControlable(): WASDControlable {
    const component = new WASDControlable();
    this.pushComponents(component);
    return component;
  }
}

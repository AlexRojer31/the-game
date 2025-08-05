import { System } from "../../../../core/ecs/system";
import WASDControlable from "./wasd-contolable";

export default class WASDControling extends System {
  constructor() {
    super();
  }

  public update(): void {
    super.update();
  }

  public createWASDControlable(): WASDControlable {
    return new WASDControlable();
  }
}

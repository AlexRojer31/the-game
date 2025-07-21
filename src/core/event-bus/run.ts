import { EventBus } from "./event-bus";
import { IEventBus } from "./i-event-bus";

let instance: IEventBus | null = null;

export function GetEventBus(): IEventBus {
  return instance!;
}

export function RunEventBus() {
  instance = new EventBus();
}

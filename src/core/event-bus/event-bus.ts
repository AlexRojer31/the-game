import { EventEmitter } from "@pixi/utils";
import { IEventBus } from "./i-event-bus";
import { IEvent } from "./i-event";

export class EventBus implements IEventBus {
  private _eventEmitter!: EventEmitter;

  constructor() {
    this._eventEmitter = new EventEmitter();
  }

  public emit<T extends IEvent>(event: T): void {
    this._eventEmitter.emit(event.name, event);
  }

  public on<T extends IEvent>(
    eventName: string,
    action: (event: T) => void,
    context?: unknown,
  ): void {
    this._eventEmitter.addListener(eventName, action, context);
  }

  public off(eventName: string): void {
    this._eventEmitter.removeListener(eventName);
  }
}

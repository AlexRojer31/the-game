import { IEvent } from "./i-event";

export interface IEventBus {
  emit<T extends IEvent>(event: T): void;
  on<T extends IEvent>(
    eventName: string,
    action: (event: T) => void,
    context?: unknown,
  ): void;
  off(eventName: string): void;
}

import { IEvent } from "../../i-event";

export const SceneLoadedEvent: string = "SceneLoadedEvent";
export interface SceneLoadedEvent extends IEvent {
  data: string;
}

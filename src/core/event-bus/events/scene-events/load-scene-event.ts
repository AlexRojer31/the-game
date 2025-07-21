import { IEvent } from "../../i-event";

export const LoadSceneEvent: string = "LoadSceneEvent";
export interface LoadSceneEvent extends IEvent {
  data: string;
}

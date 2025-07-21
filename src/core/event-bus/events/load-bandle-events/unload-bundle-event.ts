import { IEvent } from "../../i-event";

export const UnloadBandleEvent: string = "UnloadBandleEvent";
export interface UnloadBandleEvent extends IEvent {
  data: string;
}

import { IEvent } from "../../i-event";

export const LoadBandleEvent: string = "LoadBandleEvent";
export interface LoadBandleEvent extends IEvent {
  data: string;
}

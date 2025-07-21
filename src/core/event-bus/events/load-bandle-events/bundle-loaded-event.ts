import { IEvent } from "../../i-event";

export const BandleLoadedEvent: string = "BandleLoadedEvent";
export interface BandleLoadedEvent extends IEvent {
  data: string;
}

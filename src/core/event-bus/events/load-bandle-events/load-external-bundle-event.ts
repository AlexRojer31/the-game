import { IEvent } from "../../i-event";

export const LoadExternalBandleEvent: string = "LoadExternalBandleEvent";
export interface LoadExternalBandleEvent extends IEvent {
  data: {
    alias: string;
    src: string;
  };
}

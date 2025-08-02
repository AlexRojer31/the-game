import { IEvent } from "../../i-event";

export const WindowVisibilityChangeEvent: string =
  "WindowVisibilityChangeEvent";

export interface WindowVisibilityChangeEvent extends IEvent {
  data: boolean;
}

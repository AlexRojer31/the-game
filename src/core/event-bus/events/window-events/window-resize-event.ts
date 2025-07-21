import { IEvent } from "../../i-event";

interface IWindowResize {
  width: number;
  height: number;
}

export const WindowResizeEvent: string = "WindowResizeEvent";
export interface WindowResizeEvent extends IEvent {
  data: IWindowResize;
}

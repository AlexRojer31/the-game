import { DefaultResizePlugin } from "./default-resize-plagin";

let instance: DefaultResizePlugin | null = null;

export function GetResizePlugin(): DefaultResizePlugin {
  return instance!;
}

export function RunResizePlugin() {
  instance = new DefaultResizePlugin();
}

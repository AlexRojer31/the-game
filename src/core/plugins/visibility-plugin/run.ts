import { DefaultVisibilityPlugin } from "./default-visibility-plagin";

let instance: DefaultVisibilityPlugin | null = null;

export function GetVisibilityPlugin(): DefaultVisibilityPlugin {
  return instance!;
}

export function RunVisibilityPlugin() {
  instance = new DefaultVisibilityPlugin();
}

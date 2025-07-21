import { DefaultBandleLoader } from "./default-bandle-loader";

let instance: DefaultBandleLoader | null = null;

export function GetBandleLoader(): DefaultBandleLoader {
  return instance!;
}

export function RunBundleLoader() {
  instance = new DefaultBandleLoader();
}

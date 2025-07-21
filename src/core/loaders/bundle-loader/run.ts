import { BandleLoader } from "./bandle-loader";

let instance: BandleLoader | null = null;

export function GetBandleLoader(): BandleLoader {
  return instance!;
}

export function RunBundleLoader() {
  instance = new BandleLoader();
}

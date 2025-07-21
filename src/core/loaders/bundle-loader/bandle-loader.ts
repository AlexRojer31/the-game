import { Assets } from "pixi.js";
import "@esotericsoftware/spine-pixi-v8";
import { BANDLE_LOADING_STATES } from "./bandle-loading-states";
import { LoadBandleEvent } from "../../event-bus/events/load-bandle-events/load-bundle-event";
import { BandleLoadedEvent } from "../../event-bus/events/load-bandle-events/bundle-loaded-event";
import { UnloadBandleEvent } from "../../event-bus/events/load-bandle-events/unload-bundle-event";
import { LoadExternalBandleEvent } from "../../event-bus/events/load-bandle-events/load-external-bundle-event";
import { GetEventBus } from "../../event-bus/run";

export class BandleLoader {
  private loadedBandles: Map<string, BANDLE_LOADING_STATES> = new Map();

  constructor() {
    this.subscribes();
  }

  private subscribes(): void {
    GetEventBus().on(LoadBandleEvent, (e: LoadBandleEvent) => {
      this.load(e.data).then((result: boolean) => {
        if (result) {
          GetEventBus().emit({ name: BandleLoadedEvent, data: e.data });
        }
      });
    });

    GetEventBus().on(UnloadBandleEvent, (e: UnloadBandleEvent) => {
      this.unload(e.data);
    });

    GetEventBus().on(LoadExternalBandleEvent, (e: LoadExternalBandleEvent) => {
      this.loadExternal(e.data.alias, e.data.src).then((result: boolean) => {
        if (result) {
          GetEventBus().emit({ name: BandleLoadedEvent, data: e.data.alias });
        }
      });
    });
  }

  private async loadExternal(alias: string, src: string): Promise<boolean> {
    if (
      this.loadedBandles.has(alias) &&
      this.loadedBandles.get(alias) === BANDLE_LOADING_STATES.loaded
    ) {
      return true;
    }

    const asset = await Assets.load({
      alias,
      src,
    });
    if (asset) {
      this.loadedBandles.set(alias, BANDLE_LOADING_STATES.loaded);
      return true;
    }

    return false;
  }

  private async load(bandleName: string): Promise<boolean> {
    if (
      this.loadedBandles.has(bandleName) &&
      this.loadedBandles.get(bandleName) === BANDLE_LOADING_STATES.loaded
    ) {
      return true;
    }

    const asset = await Assets.loadBundle(bandleName);
    if (asset) {
      this.loadedBandles.set(bandleName, BANDLE_LOADING_STATES.loaded);
      return true;
    }

    return false;
  }

  private async unload(bandleName: string): Promise<void> {
    if (this.loadedBandles.get(bandleName) === BANDLE_LOADING_STATES.unloaded) {
      return;
    }

    if (this.loadedBandles.get(bandleName) === BANDLE_LOADING_STATES.loaded) {
      this.loadedBandles.set(bandleName, BANDLE_LOADING_STATES.unloaded);
    }
    return await Assets.unloadBundle(bandleName);
  }
}

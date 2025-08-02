import { Assets } from "pixi.js";
import "@esotericsoftware/spine-pixi-v8";
import { BANDLE_LOADING_STATE } from "./bandle-loading-state";
import { LoadBandleEvent } from "../../event-bus/events/load-bandle-events/load-bundle-event";
import { BandleLoadedEvent } from "../../event-bus/events/load-bandle-events/bundle-loaded-event";
import { UnloadBandleEvent } from "../../event-bus/events/load-bandle-events/unload-bundle-event";
import { LoadExternalBandleEvent } from "../../event-bus/events/load-bandle-events/load-external-bundle-event";
import { GetEventBus } from "../../event-bus/run";

export class DefaultBandleLoader {
  private _loadedBandles: Map<string, BANDLE_LOADING_STATE> = new Map();

  constructor() {
    this._subscribes();
  }

  private _subscribes(): void {
    GetEventBus().on(LoadBandleEvent, (e: LoadBandleEvent) => {
      this._load(e.data).then((result: boolean) => {
        if (result) {
          GetEventBus().emit({ name: BandleLoadedEvent, data: e.data });
        }
      });
    });

    GetEventBus().on(UnloadBandleEvent, (e: UnloadBandleEvent) => {
      this._unload(e.data);
    });

    GetEventBus().on(LoadExternalBandleEvent, (e: LoadExternalBandleEvent) => {
      this._loadExternal(e.data.alias, e.data.src).then((result: boolean) => {
        if (result) {
          GetEventBus().emit({ name: BandleLoadedEvent, data: e.data.alias });
        }
      });
    });
  }

  private async _loadExternal(alias: string, src: string): Promise<boolean> {
    if (
      this._loadedBandles.has(alias) &&
      this._loadedBandles.get(alias) === BANDLE_LOADING_STATE.loaded
    ) {
      return true;
    }

    const asset = await Assets.load({
      alias,
      src,
    });
    if (asset) {
      this._loadedBandles.set(alias, BANDLE_LOADING_STATE.loaded);
      return true;
    }

    return false;
  }

  private async _load(bandleName: string): Promise<boolean> {
    if (
      this._loadedBandles.has(bandleName) &&
      this._loadedBandles.get(bandleName) === BANDLE_LOADING_STATE.loaded
    ) {
      return true;
    }

    const asset = await Assets.loadBundle(bandleName);
    if (asset) {
      this._loadedBandles.set(bandleName, BANDLE_LOADING_STATE.loaded);
      return true;
    }

    return false;
  }

  private async _unload(bandleName: string): Promise<void> {
    if (this._loadedBandles.get(bandleName) === BANDLE_LOADING_STATE.unloaded) {
      return;
    }

    if (this._loadedBandles.get(bandleName) === BANDLE_LOADING_STATE.loaded) {
      this._loadedBandles.set(bandleName, BANDLE_LOADING_STATE.unloaded);
    }
    return await Assets.unloadBundle(bandleName);
  }
}

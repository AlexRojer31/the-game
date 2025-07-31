import { Application, Assets, AssetsBundle, AssetsManifest } from "pixi.js";
import * as utils from "@pixi/utils";
import { GetEventBus, RunEventBus } from "../event-bus/run";
import { RunBundleLoader } from "../loaders/bundle-loader/run";
import { RunSceneLoader } from "../loaders/scene-loader/run";
import { RunResizePlugin } from "../plugins/resize-plugin/run";
import { LoadSceneEvent } from "../event-bus/events/scene-events/load-scene-event";
import { config } from "../../config";

export class App {
  private _application: Application = new Application();

  public async init(): Promise<void> {
    await this._application.init({
      antialias: true,
      backgroundAlpha: 0,
      resizeTo: window,
    });
    document
      .getElementById("pixi-container")!
      .appendChild(this._application.canvas);
  }

  public async preloadBandles(): Promise<void> {
    const baseUrl = "assets";
    const resolution = Math.min(
      utils.isMobile.any ? window.devicePixelRatio : 3,
      3,
    );
    const response = await fetch(baseUrl + "/manifest.json");
    const manifest = (await response.json()) as AssetsManifest;
    if (!manifest.bundles) {
      throw new Error("[Assets] Invalid assets manifest");
    }

    await Assets.init({
      basePath: baseUrl,
      manifest,
      texturePreference: {
        resolution: [resolution, 1],
        format: ["webp", "png"],
      },
    });
    Assets.backgroundLoadBundle(
      manifest.bundles.map((b: AssetsBundle) => b.name),
    );
  }

  public getApp(): Application {
    return this._application;
  }

  public run(): void {
    RunEventBus();

    this.runLoaders();
    this.runPlugin();

    this.emitFirstEvents();
  }

  public runLoaders(): void {
    RunBundleLoader();
    RunSceneLoader();
  }

  public runPlugin(): void {
    RunResizePlugin();
  }

  public emitFirstEvents(): void {
    GetEventBus().emit({ name: LoadSceneEvent, data: config.firstScene });
  }
}

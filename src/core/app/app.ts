import { Application, Assets, AssetsBundle, AssetsManifest } from "pixi.js";
import * as utils from "@pixi/utils";

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

  public async loadBandles(): Promise<void> {
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
}

import { Application, Assets, AssetsBundle, AssetsManifest } from "pixi.js";
import * as utils from "@pixi/utils";
import { RunBundleLoader } from "../loaders/bundle-loader/run";
import { RunSceneLoader } from "../loaders/scene-loader/run";
import { GetEventBus, RunEventBus } from "../event-bus/run";
import { LoadSceneEvent } from "../event-bus/events/scene-events/load-scene-event";
import { DefaultSceneLoader } from "../../modules/default-scene/default-scene";
let application: Application | null = null;

export function app(): Application {
  return application!;
}

export async function Run(): Promise<void> {
  application = new Application();
  await init(application);
  await loadBandles();

  RunEventBus();
  RunBundleLoader();
  RunSceneLoader();

  GetEventBus().emit({ name: LoadSceneEvent, data: new DefaultSceneLoader() });
}

async function init(application: Application): Promise<void> {
  await application.init({
    antialias: true,
    backgroundAlpha: 0,
    resizeTo: window,
  });
  document.getElementById("pixi-container")!.appendChild(application.canvas);
}

async function loadBandles(): Promise<void> {
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
    texturePreference: { resolution: [resolution, 1], format: ["webp", "png"] },
  });
  Assets.backgroundLoadBundle(
    manifest.bundles.map((b: AssetsBundle) => b.name),
  );
}

import { Application } from "pixi.js";
import { App } from "./app";
import { GetEventBus, RunEventBus } from "../event-bus/run";
import { RunBundleLoader } from "../loaders/bundle-loader/run";
import { RunSceneLoader } from "../loaders/scene-loader/run";
import { LoadSceneEvent } from "../event-bus/events/scene-events/load-scene-event";
import { RunResizePlugin } from "../plugins/resize-plugin/run";
import { TraineeSceneLoader } from "../../modules/trainee-scene/trainee-scene";

let application!: Application;

export function GetApp(): Application {
  return application!;
}

export async function Run(): Promise<void> {
  const app = new App();
  await app.init();
  await app.loadBandles();
  application = app.getApp();

  RunEventBus();
  RunBundleLoader();
  RunSceneLoader();
  RunResizePlugin();

  GetEventBus().emit({ name: LoadSceneEvent, data: new TraineeSceneLoader() });
}

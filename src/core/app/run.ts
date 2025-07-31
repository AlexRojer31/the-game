import { Application } from "pixi.js";
import { App } from "./app";
let application!: Application;

export function GetApp(): Application {
  return application!;
}

export async function Run(): Promise<void> {
  const app = new App();
  await app.init();
  await app.preloadBandles();

  application = app.getApp();

  app.run();
}

// vite.config.mts
import type { AssetPackConfig } from "@assetpack/core";
import { AssetPack } from "@assetpack/core";
import { pixiPipes } from "@assetpack/core/pixi";
import type { Plugin, ResolvedConfig } from "vite";

export function assetpackPlugin() {
  const apConfig = {
    entry: "./assets",
    pipes: [
      ...pixiPipes({
        resolutions: { high: 3, default: 2, low: 1 },
        cacheBust: false,
        manifest: {
          trimExtensions: true,
        },
        texturePacker: {
          texturePacker: {
            removeFileExtension: true,
          },
        },
      }),
    ],
  } as AssetPackConfig;
  let mode: ResolvedConfig["command"];
  let ap: AssetPack | undefined;

  return {
    name: "vite-plugin-assetpack",
    configResolved(resolvedConfig) {
      mode = resolvedConfig.command;
      if (!resolvedConfig.publicDir) return;
      if (apConfig.output) return;
      // remove the root from the public dir
      const publicDir = resolvedConfig.publicDir.replace(process.cwd(), "");

      if (process.platform === "win32") {
        apConfig.output = `${publicDir}/assets/`;
      } else {
        apConfig.output = `.${publicDir}/assets/`;
      }
    },
    buildStart: async () => {
      if (mode === "serve") {
        if (ap) return;
        ap = new AssetPack(apConfig);
        await ap.watch();
      } else {
        await new AssetPack(apConfig).run();
      }
    },
    buildEnd: async () => {
      if (ap) {
        await ap.stop();
        ap = undefined;
      }
    },
  } as Plugin;
}

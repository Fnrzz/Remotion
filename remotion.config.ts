/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { existsSync } from "node:fs";
import { Config } from "@remotion/cli/config";

// The bundled headless shell on this machine is missing its ICU data.
// Prefer a locally installed Chrome when it is available.
const localChrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
if (existsSync(localChrome)) {
  Config.setBrowserExecutable(localChrome);
}

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);

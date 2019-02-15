import { VoxaApp } from "voxa";

export function register(app: VoxaApp) {
  app.onIntent("LaunchIntent", () => ({ reply: "Intent.Launch", to: "entry" }));
  app.onIntent("HelpIntent", () => ({
    reply: "Intent.Help",
    to: "die"
  }));
};

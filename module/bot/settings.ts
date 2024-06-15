import { join } from "https://deno.land/std@0.140.0/path/mod.ts";

const cwd = Deno.cwd();
export const publicPath = join(cwd, "public");
export const imagesPath = join(publicPath, "images");

const TOKEN = Deno.env.get("DRIVER_BOT");
if (!!TOKEN === false) {
  console.log("[ ERROR   ]  DRIVER_BOT не встановлено!");
  console.log("[ MESSAGE ]  Встановити в id телеграм бота.")
  Deno.exit(0);
}

export const DATABASE = Deno.env.get("DATABASE") ?? join(cwd, "DRIVING.db");
export const URL_BASE = `https://api.telegram.org/bot${TOKEN}/`;

export const userSettings = {
  trafficRule: true,
  testPdr: true,
  medicine: false,
  roadSign: true,
  roadMark: true,
};

export const botCommands = {
  start: "/start",
  unsubscribe: "/unsubscribe",
};

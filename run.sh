#!/bin/sh

clear
date >> cron.log

$HOME/.deno/bin/deno run --allow-net --allow-read --allow-write --allow-env bot.ts 2>&1 | tee -a BOT_ERROR.log

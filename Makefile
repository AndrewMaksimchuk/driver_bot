bot:
	clear
	@deno run --allow-net --allow-read --allow-write --allow-env=DRIVE_BOT bot.ts

parser:
	clear
	@deno run --allow-net --allow-read --allow-write parser.ts
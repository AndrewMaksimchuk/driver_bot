bot:
	clear
	@deno run --allow-net --allow-read --allow-write --allow-env=DRIVER_BOT bot.ts

parser:
	clear
	@deno run --allow-net --allow-read --allow-write parser.ts

test-ideas:
	clear
	@deno run --allow-net --allow-read test.ts
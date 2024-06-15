bot:
	clear
	@deno run --allow-net --allow-read --allow-write --allow-env bot.ts

parser:
	clear
	@deno run --allow-net --allow-read --allow-write --allow-env parser.ts

ideas:
	clear
	@deno run --allow-net --allow-read --allow-write --allow-env ideas.ts

tests:
	clear
	deno test

tests_coverage:
	clear
	deno test --coverage=cov_profile && deno coverage cov_profile

format:
	deno fmt

lint:
	clear
	deno lint
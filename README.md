# Driver bot

Telegram bot for sends traffic rules messages to 
known users.

All commands for work locate in `Makefile`.

For "parser" need environment variable  
`DRIVER_BOT_PATH` set to path to vodiy project.  
You can use next command in terminal:  
`DRIVER_BOT_PATH=path_to_vodiy make parser`

vodiy project source link: [https://github.com/AndrewMaksimchuk/vodiy](https://github.com/AndrewMaksimchuk/vodiy)

## Database

Used sqlite but file inself not included.  
Need set environment variable `DATABASE` to  
path to database file.

## Images

Not included.

## Experiment

In directory `native` used `bun` runtime to build 
in one executable file with database data.

Result file name is `pdr_bun`.

If run it, you will see in stdout a random rule.

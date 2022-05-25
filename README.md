## Working process

input() -> processing() -> output()

'Warning_signs' have 58 documents but 65 images

For telegram bot need set env variable named "DRIVER_BOT" with value of bot token.  

## Image
1. Upload to telegram server
2. Save response (file_id) and data to db
3. Send photo to user

## Create cron job:
crontab -e  

## Cron job description:
DRIVER_BOT=value_bot_token  
*/30 * * * * cd path_to_project_directory && ./run.sh

# Global state ???
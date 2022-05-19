const TOKEN = Deno.env.get("DRIVE_BOT"); // fix env to "DRIVER_BOT"
export const URL_BASE = `https://api.telegram.org/bot${TOKEN}/`;
export const DATABASE_NAME = 'DRIVING.db';

export default URL_BASE;
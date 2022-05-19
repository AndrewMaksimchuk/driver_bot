const TOKEN = Deno.env.get("DRIVER_BOT");
export const URL_BASE = `https://api.telegram.org/bot${TOKEN}/`;
export const DATABASE_NAME = 'DRIVING.db';

export default URL_BASE;
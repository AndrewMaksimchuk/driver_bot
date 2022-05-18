const log = <T>(data: T) => {
  console.log(data);
  Deno.writeTextFileSync(
    "BOT_LOG.log",
    `${new Date().toLocaleString("uk-UA").padStart(20)} ` +
      JSON.stringify(data) +
      "\n",
    {
      append: true,
    }
  );
};

const error = (error: Error) =>
  Deno.writeTextFileSync(
    "BOT_ERROR.log",
    `${new Date().toLocaleString("uk-UA").padStart(20)} ` + error + "\n",
    { append: true }
  );

export default {
  log,
  error,
};

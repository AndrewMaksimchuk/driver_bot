const files = {
  log: "BOT_LOG.log",
  error: "BOT_ERROR.log",
};

const writeErrorString = (error: string) =>
  Deno.writeTextFileSync(files.error, error + "\n", {
    append: true,
  });

const writeErrorObject = (error: Error) => {
  const message = `${new Date().toLocaleString("uk-UA").padStart(20)} ${
    error.message
  }\n`;
  Deno.writeTextFileSync(files.error, message, { append: true });
  error.stack && writeErrorString(error.stack);
};

const log = <T>(data: T) => {
  const message = `${new Date()
    .toLocaleString("uk-UA")
    .padStart(20)} ${JSON.stringify(data)}\n`;
  Deno.writeTextFileSync(files.log, message, { append: true });
};

const error = (error: Error | string) => {
  if (typeof error === "string") return writeErrorString(error);
  writeErrorObject(error);
};

export default {
  log,
  error,
};

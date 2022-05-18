import URL_BASE from "./settings.ts";

type TCommon = string | number | boolean;

const setEntriesToObject = ([key, value]: [string, TCommon]) => ({
  [key]: String(value),
});

const setKeyValueToString = <T>(obj: T): Record<string, string> =>
  Object.entries(obj).reduce((acc, item) => {
    return { ...acc, ...setEntriesToObject(item) };
  }, {});

const setQueryParameters = <T>(url: URL, query: T): void => {
  const setQueryParametersHandler = ([key, value]: [string, string]) =>
    url.searchParams.set(key, value);
  Object.entries(setKeyValueToString(query)).forEach(setQueryParametersHandler);
};

export const setUrl = <T>(method: string, query?: T): string => {
  const url = new URL(URL_BASE);
  url.pathname += method;
  if (query) setQueryParameters(url, query);
  return url.toString();
};

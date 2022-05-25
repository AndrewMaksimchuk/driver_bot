import { join } from "https://deno.land/std@0.140.0/path/mod.ts";
import { URL_BASE, publicPath, imagesPath } from "./settings.ts";
import db from "./database.ts";
import Log from "./Log.ts";

type TCommon = string | number | boolean;

/**
 * Convert entries [key, value] to object shape { key: value }.
 */
const setEntriesToObject = ([key, value]: [string, TCommon]) => ({
  [key]: String(value),
});

/**
 * Return object where all values represent in string type
 */
const setKeyValueToString = <T>(obj: T): Record<string, string> =>
  Object.entries(obj).reduce((acc, item) => {
    return { ...acc, ...setEntriesToObject(item) };
  }, {});

/**
 * Add to URL object query parameters.
 */
const setQueryParameters = <T>(url: URL, query: T): void => {
  const setQueryParametersHandler = ([key, value]: [string, string]) =>
    url.searchParams.set(key, value);
  Object.entries(setKeyValueToString(query)).forEach(setQueryParametersHandler);
};

/**
 * Return url in string representation with given method for telegram bot api and query parameters for this method.
 */
export const setUrl = <T>(method: string, query?: T): string => {
  const url = new URL(URL_BASE);
  url.pathname += method;
  if (query) setQueryParameters(url, query);
  return url.toString();
};

/**
 * Return random number from 0 to given number included.
 */
export const setRandomNumberFromRange = (range: number): number =>
  Math.floor(Math.random() * range);

export interface IGetFile {
  path: string;
  fileName: string;
}
/**
 * Return `File` object for add to `FormData` object by `append` method.
 */
export const getFile = async (fileName: string, path: string = publicPath) => {
  try {
    const file = await Deno.readFile(path);
    return new File([file], fileName);
  } catch (error) {
    Log.error(error);
    Log.error(`Відсутній файл "${fileName}" за адресом у системі: ${path}`);
    return null;
  }
};

/**
 *  Extends "getFile" function
 */
export const getImage = async (fileName: string) =>
  await getFile(fileName, join(imagesPath, fileName));

/**
 * Get one random row of data from selected database table
 */
export const getRandomRow = <T extends unknown[]>(tableName: string) => {
  const items = db.selectAll<T>(tableName);
  const randomIndex = setRandomNumberFromRange(items.length);
  return items[randomIndex];
};

/**
 * Conver tuple (is database row) to object
 */
export const tupleToObject = <R>(tuple: unknown[], objectKeys: string[]) => {
  return objectKeys.reduce((previousValue, currentValue, currentIndex) => {
    return { ...previousValue, [currentValue]: tuple[currentIndex] };
  }, {}) as R;
};

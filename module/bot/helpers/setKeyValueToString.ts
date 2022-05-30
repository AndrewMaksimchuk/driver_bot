import setEntriesToObject from "./setEntriesToObject.ts";

type Return<T> = { [x in keyof T]: string };

/**
 * Return object where all values represent in string type
 */
export default <T>(obj: T) =>
  Object.entries(obj).reduce((acc, item) => {
    return { ...acc, ...setEntriesToObject(item) };
  }, {}) as Return<T>;

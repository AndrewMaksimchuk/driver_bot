import setEntriesToObject from "./setEntriesToObject.ts";

/**
 * Return object where all values represent in string type
 */

export default <T>(obj: T): Record<string, string> =>
  Object.entries(obj).reduce((acc, item) => {
    return { ...acc, ...setEntriesToObject(item) };
  }, {});

// export default <T>(
//   obj: T
// ):
//   | {
//       [x in keyof T]: string;
//     }
//   | Record<never, never> =>
//   Object.entries(obj).reduce((acc, item) => {
//     return { ...acc, ...setEntriesToObject(item) };
//   }, {});

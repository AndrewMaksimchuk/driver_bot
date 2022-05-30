import setKeyValueToString from "./setKeyValueToString.ts";

/**
 * Add to URL object query parameters.
 */
export default <T>(url: URL, query: T): void => {
  const setQueryParametersHandler = ([key, value]: [string, string]) =>
    url.searchParams.set(key, value);
  Object.entries<string>(setKeyValueToString(query)).forEach(
    setQueryParametersHandler,
  );
};

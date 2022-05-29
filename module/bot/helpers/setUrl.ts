import { URL_BASE } from "../settings.ts";
import setQueryParameters from "./setQueryParameters.ts";

/**
 * Return url in string representation with given method for telegram bot api and query parameters for this method.
 */
export default <T>(method: string, query?: T): string => {
  const url = new URL(URL_BASE);
  url.pathname += method;
  if (query && Object.keys(query).length !== 0) setQueryParameters(url, query);
  return url.toString();
};

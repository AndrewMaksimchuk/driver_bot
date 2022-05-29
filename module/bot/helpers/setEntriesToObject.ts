type TCommon = string | number | boolean;

/**
 * Convert entries [key, value] to object shape { key: value } where 'value' convert to string type.
 */
export default <T>([key, value]: [string, TCommon | T]) => {
  return typeof value === "object"
    ? { [key]: JSON.stringify(value) }
    : { [key]: String(value) };
};

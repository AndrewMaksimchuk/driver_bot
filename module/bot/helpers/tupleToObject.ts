/**
 * Conver tuple (is database row) to object
 */
export default <R>(tuple: unknown[], objectKeys: string[]) => {
  return objectKeys.reduce((previousValue, currentValue, currentIndex) => {
    return { ...previousValue, [currentValue]: tuple[currentIndex] };
  }, {}) as R;
};

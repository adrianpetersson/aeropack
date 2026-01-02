export const gramsToKg = (grams: number, withUnit: boolean = true): string => {
  return withUnit
    ? `${(grams / 1000).toFixed(2)} kg`
    : (grams / 1000).toFixed(2);
};

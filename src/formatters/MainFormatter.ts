const DecimalPlaces = 2;

export const MainFormatter = {
  formatPercentValue: (value: number): string => {
    if (value) {
      return MainFormatter.formatDecimalValue(value * 100);
    }
    return "";
  },

  formatDecimalValue: (value: number): string => {
    if (value) {
      return `${(value).toFixed(DecimalPlaces)}`;
    }
    return "";
  }
};

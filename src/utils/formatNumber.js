function formatNumber(number) {
  const numberLength = number.length;

  if (numberLength <= 3) {
    return number;
  }
  if (numberLength === 4) {
    return `${Math.round(number / 100) / 10}k`;
  }
  if (numberLength <= 6) {
    return `${Math.round(number / 1000)}K`;
  }
  if (numberLength === 7) {
    return `${Math.round(number / 100000) / 10}M`;
  }
  if (numberLength <= 9) {
    return `${Math.round(number / 1000000)}M`;
  }
  if (numberLength === 10) {
    return `${Math.round(number / 100000000) / 10}B`;
  }
  if (numberLength <= 12) {
    return `${Math.round(number / 1000000000)}B`;
  }
  return number;
}

export { formatNumber };

export const truncateSha256Id = (id: string) => {
  return `0x${id.slice(0, 6)}...${id.slice(-6)}`;
};

export const shortenString = (str: string, length: number): string => {
  const strTrimmed = str.trim();

  if (strTrimmed.length <= length) {
    return strTrimmed;
  }

  return `${strTrimmed.slice(0, length)}...`;
};

const formatCharsDate: { [key: string]: string } = {
  D: "[0-3]",
  d: "[0-9]",
  M: "[01]",
  m: "[0-9]",
  9: "[0-9]",
};

const isValidDay = (day: string): boolean => {
  if (day.length < 2) return true;
  const dayNum = parseInt(day);
  return dayNum >= 1 && dayNum <= 31;
};

const isValidMonth = (month: string): boolean => {
  if (month.length < 2) return true;
  const monthNum = parseInt(month);
  return monthNum >= 1 && monthNum <= 12;
};

const isValidDayForMonth = (day: string, month: string): boolean => {
  if (day.length < 2 || month.length < 2) return true;

  const dayNum = parseInt(day);
  const monthNum = parseInt(month);

  const thirtyOneDayMonths = [1, 3, 5, 7, 8, 10, 12];

  if (dayNum === 31 && !thirtyOneDayMonths.includes(monthNum)) {
    return false;
  }

  if (dayNum >= 30 && monthNum === 2) {
    return false;
  }

  return true;
};

const beforeMaskedValueChangeDate = (
  newState: {
    value: string;
    selection: { start: number; end: number } | null;
  },
  oldState: {
    value: string;
    selection: { start: number; end: number } | null;
  },
  _userInput: string,
) => {
  const { value, selection } = newState;

  if (value === oldState.value) {
    return { value, selection };
  }

  const day = value.substring(0, 2);
  const month = value.substring(3, 5);

  if (
    !isValidDay(day) ||
    !isValidMonth(month) ||
    !isValidDayForMonth(day, month)
  ) {
    return { value: oldState.value, selection: oldState.selection };
  }

  return { value, selection };
};

export const useMaskedDate = () => {
  return {
    mask: "Dd/Mm/9999",
    formatChars: formatCharsDate,
    beforeMaskedValueChange: beforeMaskedValueChangeDate,
  };
};

const addExtraZero = (number) => {
  if (number < 10) return "0" + number;

  return number;
};

const convertToFinalDate = (date, month, year) => {
  const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

  return `${addExtraZero(date)}/${months[month]}/${year}`;
};

export { addExtraZero, convertToFinalDate };

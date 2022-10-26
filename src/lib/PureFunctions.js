let dateN = () => {
  const date = new Date();

  let dt = "";
  if (date.getDate() <= 9) dt = "0" + date.getDate();
  else dt = date.getDate();

  return dt + "-" + getMonthName(date.getMonth()) + "-" + date.getFullYear();
};

let getMonthName = (num) => {
  const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

  return months[num];
};

let dateToString = (args) => {
  let { date, month, year } = args;

  let dt = "";

  if (date <= 9) dt = "0" + date;
  else dt = date;

  return dt + "-" + getMonthName(month) + "-" + year;
};

let StandardDate = (args) => {
  let { date, month, year } = args;

  const dt = new Date();

  if (dt.getDate() == date && dt.getMonth() === month && dt.getFullYear() === year) return "Today";
  else if (dt.getDate() - 1 == date && dt.getMonth() === month && dt.getFullYear() === year) return "Yesterday";
  else return dateToString(args);
};

export { dateN, getMonthName, dateToString, StandardDate };

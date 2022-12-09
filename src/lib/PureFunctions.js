let dateN = () => {
  const date = new Date();

  let dt = "";
  if (date.getDate() <= 9) dt = "0" + date.getDate();
  else dt = date.getDate();

  return dt + "-" + getMonthName(date.getMonth()) + "-" + date.getFullYear();
};

let getMonthName = (num) => {
  const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

  return months[num - 1];
};

let dateToString = (args) => {
  let { date, month, year } = args;

  let dt = "";

  if (date <= 9) dt = "0" + date;
  else dt = date;

  return dt + "-" + getMonthName(month) + "-" + year;
};

let StandardDate = (args) => {
  console.log("\n\n 🚀 ~ file: PureFunctions.js ~ line 29 ~ StandardDate ~ args", args);
  let { date, month, year } = args;

  const dt = new Date();

  if (dt.getDate() == date && dt.getMonth() === month && dt.getFullYear() === year) return "Today";
  else if (dt.getDate() - 1 == date && dt.getMonth() === month && dt.getFullYear() === year) return "Yesterday";
  else return dateToString(args);
};

const addExtraZero = (number) => {
  if (number < 10) return "0" + number;

  return number;
};

const convertToFinalDate = (date, month, year) => {
  const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

  return `${addExtraZero(date)}/${months[month - 1]}/${year}`;
};

let NumberToString = (num) => {
  let str = "";

  let tempFunc = (num) => {
    const ls = {
      1: "One",
      2: "Two",
      3: "Three",
      4: "Four",
      5: "Five",
      6: "Six",
      7: "Seven",
      8: "Eight",
      9: "Nine",
      10: "Ten",
      11: "Eleven",
      12: "Twelve",
      13: "Thirteen",
      14: "Fouteen",
      15: "Fifteen",
      16: "Sixteen",
      17: "Seventeen",
      18: "Eighteen",
      19: "Ninteen",
      20: "Twenty",
      30: "Thirty",
      40: " Fourty",
      50: "Fifty",
      60: "Sixty",
      70: "Seventy",
      80: "Eighty",
      90: "Ninty",
    };

    if (num === 0) return;
    if (ls[num]) {
      str = str + ls[num] + " ";
    } else if (parseInt(num / 10) <= 9) {
      str += ls[parseInt(num / 10) * 10] + " ";
      tempFunc(num % 10);
    } else if (("" + num).length === 3) {
      str += "Hundred ";
      tempFunc(num % 100);
    } else if (("" + num).length === 4) {
      str += ls[parseInt(num / 1000)] + " Thousand ";
      tempFunc(num % 1000);
    } else if (("" + num).length === 5) {
      tempFunc(parseInt(num / 1000));
      str += "Thousand ";
      tempFunc(num % 1000);
    } else if (("" + num).length === 6) {
      str += ls[parseInt(num / 100000)] + " Lakh ";
      tempFunc(num % 100000);
    } else if (("" + num).length === 7) {
      tempFunc(parseInt(num / 100000));
      str += "Lakh ";
      tempFunc(num % 100000);
    } else if (("" + num).length === 8) {
      str += ls[parseInt(num / 10000000)] + " Crore ";
      tempFunc(num % 10000000);
    } else if (("" + num).length === 9) {
      tempFunc(parseInt(num / 10000000));
      str += "Crore ";
      tempFunc(num % 10000000);
    }
  };

  tempFunc(num);
  return str;
};

let currentDate = () => {
  const dt = new Date();

  return {
    date: dt.getDate(),
    month: dt.getMonth() + 1,
    year: dt.getFullYear(),
    hour: dt.getHours(),
    min: dt.getMinutes(),
  };
};

export {
  dateN,
  getMonthName,
  dateToString,
  StandardDate,
  addExtraZero,
  convertToFinalDate,
  NumberToString,
  currentDate,
};

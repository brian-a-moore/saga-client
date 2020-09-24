const moment = require("moment");

const dateMap = (start, end) => {
  if (!moment(start).isValid() || !moment(end).isValid())
    throw new Error("Start and end dates must be valid dates");
  else if (moment(start).isAfter(moment(end)))
    throw new Error("Start date cannot be after end date");
  else if (moment(start) === moment(end))
    throw new Error("Start and end date cannot be the same");
  else if (moment(end).isAfter(moment())) {
    throw new Error("End date cannot be later than today");
  } else {
    const firstYear = parseInt(moment(start).format("YYYY"));
    const firstYearMonth = parseInt(moment(start).format("M"));
    const lastYear = parseInt(moment(end).format("YYYY"));
    const lastYearMonth = parseInt(moment(end).format("M"));
    const numOfYears = lastYear - firstYear + 1;
    const lastYearNumOfMonths = parseInt(moment(end).format("M"));

    const generateMonths = (year, start, end) => {
      let arr = [];
      for (let x = start; x < end + 1; x++) {
        let month = moment(`${year}-${x < 10 ? `0${x}` : x}-01`).format();
        arr.push({
          year,
          month: moment(`${year}-${x < 10 ? `0${x}` : x}-01`).format("MMMM"),
          startDate: moment(month).subtract(1, "d"),
          endDate: moment(month).add(1, "M"),
        });
      }

      return arr;
    };

    let map = [];

    if (numOfYears < 2) {
      map.push({
        year: firstYear,
        months: generateMonths(firstYear, firstYearMonth, lastYearMonth),
      });
    } else if (numOfYears === 2) {
      map.push({
        year: firstYear,
        months: generateMonths(firstYear, firstYearMonth, 12),
      });
      map.push({
        year: lastYear,
        month: generateMonths(lastYear, 1, lastYearNumOfMonths),
      });
    } else {
      map.push({
        year: firstYear,
        months: generateMonths(firstYear, firstYearMonth, 12),
      });
      for (let i = firstYear + 1; i < lastYear; i++) {
        map.push({
          year: i,
          months: generateMonths(i, 1, 12),
        });
      }
      map.push({
        year: lastYear,
        month: generateMonths(lastYear, 1, lastYearNumOfMonths),
      });
    }
    return map;
  }
};

export default dateMap;

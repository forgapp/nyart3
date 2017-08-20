import setMonth from 'date-fns/set_month';
import differenceInMonths from 'date-fns/difference_in_months';
import addMonths from 'date-fns/add_months';
import startOfMonth from 'date-fns/start_of_month';
import endOfMonth from 'date-fns/end_of_month';
import format from 'date-fns/format';

var beginningOfFiscalYear = setMonth(new Date(), 3);

function getNFiscalQuarter(quarters) {
  const quarterStartMonth = addMonths(beginningOfFiscalYear, quarters * 3);
  const quarterEndMonth = addMonths(quarterStartMonth, 2);
  const startOfFiscalQuarter = startOfMonth(quarterStartMonth);
  const endOfFiscalQuarter = endOfMonth(quarterEndMonth);

  return [format(startOfFiscalQuarter, 'YYYY-MM-DD'), format(endOfFiscalQuarter, 'YYYY-MM-DD')];
}

export function formatPeriodRange(period) {
  return `[${period[0]} TO ${period[1]}]`;
}

export function getThisFiscalQuarter() {
  const quarters = Math.floor(differenceInMonths(new Date(), beginningOfFiscalYear) / 3);

  return getNFiscalQuarter(quarters);
}

export function getLastFiscalQuarter() {
  const quarters = Math.floor(differenceInMonths(new Date(), beginningOfFiscalYear) / 3);

  return getNFiscalQuarter(quarters - 1);
}

function getStartEndOfMonth(date) {
  const start = startOfMonth(date);
  const end = endOfMonth(date);

  return [format(start, 'YYYY-MM-DD'), format(end, 'YYYY-MM-DD')];
}

export function getThisMonth() {
  const date = new Date();

  return getStartEndOfMonth(date);
}

export function getLastMonth() {
  const date = addMonths(new Date(), -1);

  return getStartEndOfMonth(date);
}

export function calculateAge(dateOfBirth) {
  const today = new Date();
  const dob = new Date(dateOfBirth);
  const age = today.getFullYear() - dob.getFullYear();

  if(today.getMonth() <= dob.getMonth() && today.getDate() < dob.getDate()) {
    return age - 1;
  }

  return age;
}

export function formatdateForInput(date) {
  // const month = ("0" + (date.getMonth() + 1)).slice(-2);
  // const day = ("0" + (date.getDate() + 1)).slice(-2);

  // return `${date.getFullYear()}-${month}-${day}`;
  return format(date, 'YYYY-MM-DD');
}

export function difference(date1, date2) {
  const diff = date2.getTime() - date1.getTime();
  const seconds = diff / 1000;
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);

  return Math.round(hours / 24);
}

export function differenceFromToday(date) {
  return difference(date, new Date());
}
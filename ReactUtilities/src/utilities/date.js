import { isDate, isNumber, isString } from './utils';

export const monthNames = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];

export const shortMonthNames = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic'
];

export const daysOfWeekNames = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
];

export const shortDaysOfWeekNames = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

export const padWithZeros = (num, length = 2) => {
  if (!isNumber(length)) return num;
  if (!isNumber(num) && !isString(num)) return num;
  return num.toString().padStart(length, '0');
};

export const haveDate = value => {
  if (isDate(value)) return value;
  if (isString(value)) {
    const date = new Date(value);
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    );
  }
  return new Date('invalid-date');
};

export const getDay = value => {
  const date = value ? haveDate(value) : new Date();
  if (!isDate(date)) return date;
  return date.getDate();
};

export const getMonth = value => {
  const date = value ? haveDate(value) : new Date();
  if (!isDate(date)) return date;
  return date.getMonth();
};

export const getYear = value => {
  const date = value ? haveDate(value) : new Date();
  if (!isDate(date)) return date;
  return date.getFullYear();
};

export const setDay = (value, num) => {
  const date = haveDate(value);
  if (!isDate(date) || !isNumber(num)) return date;
  date.setDate(num);
  return date;
};

export const setMonth = (value, num) => {
  const date = haveDate(value);
  if (!isDate(date) || !isNumber(num)) return date;
  date.setMonth(num);
  return date;
};

export const setYear = (value, num) => {
  const date = haveDate(value);
  if (!isDate(date) || !isNumber(num)) return date;
  date.setFullYear(num);
  return date;
};

export const addHours = (value, num = 1) => {
  const date = haveDate(value);
  if (!isDate(date) || !isNumber(num)) return date;
  date.setHours(date.getHours() + num);
  return date;
};

export const addMinutes = (value, num = 1) => {
  const date = haveDate(value);
  if (!isDate(date) || !isNumber(num)) return date;
  date.setMinutes(date.getMinutes() + num);
  return date;
};

export const addSeconds = (value, num = 1) => {
  const date = haveDate(value);
  if (!isDate(date) || !isNumber(num)) return date;
  date.setSeconds(date.getSeconds() + num);
  return date;
};

export const addDays = (value, num = 1) => {
  const date = haveDate(value);
  if (!isDate(date) || !isNumber(num)) return date;
  date.setDate(date.getDate() + num);
  return date;
};

export const addMonths = (value, num = 1) => {
  const date = haveDate(value);
  if (!isDate(date) || !isNumber(num)) return date;
  date.setMonth(date.getMonth() + num);
  return date;
};

export const addYears = (value, num = 1) => {
  const date = haveDate(value);
  if (!isDate(date) || !isNumber(num)) return date;
  date.setFullYear(date.getFullYear() + num);
  return date;
};

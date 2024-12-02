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

export const setStartOfDay = value => {
  const date = haveDate(value);
  if (!isDate(date)) return date;
  date.setHours(0, 0, 0, 0);
  return date;
};

export const setEndOfDay = value => {
  const date = haveDate(value);
  if (!isDate(date)) return date;
  date.setHours(23, 59, 59, 999);
  return date;
};

export const formatDate = (value, separator = '/') => {
  const date = haveDate(value);
  if (!isDate(date)) return 'Invalid Date';
  if (!isString(separator)) {
    separator = '/';
  }
  const day = padWithZeros(date.getDate());
  const month = padWithZeros(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}${separator}${month}${separator}${year}`;
};

export const formatDateShort = (value, abbr = false) => {
  const date = haveDate(value);
  if (!isDate(date)) return 'Invalid Date';
  if (!isString(abbr)) {
    abbr = false;
  }
  const day = padWithZeros(date.getDate());
  const month = abbr
    ? shortMonthNames[date.getMonth()]
    : monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

export const formatDateLong = value => {
  const date = haveDate(value);
  if (!isDate(date)) return 'Invalid Date';
  const day = padWithZeros(date.getDate());
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} de ${month} del ${year}`;
};

export const formatDateWithDay = value => {
  const date = haveDate(value);
  if (!isDate(date)) return 'Invalid Date';
  const dayOfWeek = daysOfWeekNames[(date.getDay() + 6) % 7];
  const formattedDate = formatDateLong(value);
  return `${dayOfWeek}, ${formattedDate}`;
};

export const formatTime = (value, withSeconds = true) => {
  const date = haveDate(value);
  if (!isDate(date)) return 'Invalid Date';
  const hours = padWithZeros(date.getHours());
  const minutes = padWithZeros(date.getMinutes());
  const seconds = padWithZeros(date.getSeconds());

  return `${hours}:${minutes}${withSeconds ? ':' + seconds : ''}`;
};

export const formatTime12Hour = (value, capitalize = true) => {
  const date = haveDate(value);
  if (!isDate(date)) return 'Invalid Date';
  const hours = padWithZeros(date.getHours() % 12 || 12);
  const minutes = padWithZeros(date.getMinutes());
  const ampm = date.getHours() < 12 ? 'AM' : 'PM';

  return `${hours}:${minutes} ${capitalize ? ampm : ampm.toLocaleLowerCase()}`;
};

export const formatDateTime = value => {
  const date = haveDate(value);
  if (!isDate(date)) return 'Invalid Date';
  const formattedDate = formatDate(date, '-');
  const formattedTime = formatTime(date);
  return `${formattedDate} ${formattedTime}`;
};

export const formatDateTimeLong = value => {
  const date = haveDate(value);
  if (!isDate(date)) return 'Invalid Date';
  const dayOfWeek = daysOfWeekNames[(date.getDay() + 6) % 7];
  const formattedDate = formatDateLong(date);
  const formattedTime = formatTime12Hour(date);
  return `${dayOfWeek}, ${formattedDate} a las ${formattedTime}`;
};

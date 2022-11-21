import { DateTime } from 'luxon';

export const formatDateTime = (date, format = 'dd/MM/yy HH:mm') => DateTime.fromISO(date)
  .setLocale('pt-br')
  .toFormat(format);

export const getCurrentDate = (locale = 'BR') => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate();
  if (locale === 'BR') return `${day}/${month}/${year}`;
  return `${year}/${month}/${day}`;
};

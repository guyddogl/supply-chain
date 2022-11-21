import { DateTime } from 'luxon';

export const formatDateTime = (date, format = 'dd/MM/yy HH:mm') => DateTime.fromISO(date)
  .setLocale('pt-br')
  .toFormat(format);

export const getInitialDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  return `${year}-${month}-01T00:00`;
};

export const getFinalDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}T23:59`;
};

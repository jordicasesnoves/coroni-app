import { baseURL } from '../config/api';

export const getDataByDateRange = (
  initialDate: any,
  finalDate: any
): Promise<Response> => {
  return fetch(`${baseURL}?date_from=${initialDate}&date_to=${finalDate}`);
};

export const getCountries = (): Promise<Response> => {
  return fetch(`${baseURL}/countries`);
};

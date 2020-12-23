import { baseURL } from '../config/api';

export const getDataByDateRange = (
  initialDate: string,
  finalDate: string
): Promise<Response> => {
  return fetch(`${baseURL}?date_from=${initialDate}&date_to=${finalDate}`);
};

export const getCountries = (): Promise<Response> => {
  return fetch(`${baseURL}/countries`);
};

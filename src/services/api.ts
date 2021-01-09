import { baseURL } from '../config/api';

// https://documenter.getpostman.com/view/10831675/SzYZ1eNY#ff37b951-f03b-4f23-8bc4-a362e86fb46c
export const getCountryDataByDate = async (
  date: string,
  country: string
): Promise<Response> => {
  return await fetch(`${baseURL}/${date}/country/${country}`);
};

// https://documenter.getpostman.com/view/10831675/SzYZ1eNY#490faf30-4613-4dbe-a4f9-ce88cc54f520
export const getCountryDataByDateRange = async (
  initialDate: string,
  finalDate: string,
  country: string
): Promise<Response> => {
  return await fetch(
    `${baseURL}/country/${country}?date_from=${initialDate}&date_to=${finalDate}`
  );
};

// https://documenter.getpostman.com/view/10831675/SzYZ1eNY#cb5ec096-a897-49dd-a4a1-e27fe32605df
export const getCountries = async (): Promise<Response> => {
  return await fetch(`${baseURL}/countries`);
};

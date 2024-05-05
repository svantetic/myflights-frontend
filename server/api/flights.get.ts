import { AirportsResponse } from "~/types/airport.types";
export default defineEventHandler(async (event) => {
  const { backendHost, backendPort } = useRuntimeConfig(event);

  try {
    const data = (await $fetch(
      getApiFlightsRoute(backendHost, backendPort),
    )) as AirportsResponse;

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
});

const getApiBaseUrl = (host: string, port: string): string => {
  return `http://${host}:${port}/api`;
};

const getApiFlightsRoute = (host: string, port: string, limit = 50): string => {
  return `${getApiBaseUrl(host, port)}/flights?limit=${limit}`;
};

const getApiBaseUrl = (host: string, port: string): string => {
  return `https://${host}:${port}/api`;
}

export const getApiFlightsRoute = (host: string, port: string, limit = 50): string => {
  return `${getApiBaseUrl(host, port)}/flights?limit=${limit}`;
}


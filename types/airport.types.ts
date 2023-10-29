
export type Airport = {
  name: string;
  icao: string;
};

export type AirportDocs = Array<{
    from: Airport;
    to: Airport;
}>;

export type AirportsResponse = {
  docs: {
    from: Airport;
    to: Airport;
  }[];
};

export type ExtendedAirport = Airport & {
  lat: number;
  lon: number;
}

export type AirportFromToNumber = {
  from: number;
  to: number;
}

export type AirportTrafficDetails = Record<string, AirportFromToNumber>;

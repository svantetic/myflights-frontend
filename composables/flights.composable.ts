import { AirportTrafficDetails } from "~/types/airport.types";

export const useFlights = () => {
  const flights = useState('flights') as Ref<Flight[]>;
  const flightsDetails = useState<AirportTrafficDetails>('flightsDetails');

  const calculateDetails = () => {
   const uniqueAirports = new Set<string>(flights.value.flatMap((f) => {
      return [f.to.icao, f.from.icao];
    }));

    const airportsFlightsCount = {};

    for (const icao of uniqueAirports) {
      Object.assign(airportsFlightsCount, {
        [icao]: {
          from: flights.value.filter((f) => {
            return f.from.icao === icao;
          }).length,
          to: flights.value.filter((f) => {
            return f.to.icao === icao;
          }).length,
        }
      })
    }

    flightsDetails.value = airportsFlightsCount;
  };

  return {
    flights,
    flightsDetails,
    calculateDetails,
  }
}

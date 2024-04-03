import { type Ref } from "vue";
import L, { LatLngTuple, Map, Polyline } from "leaflet";

import marker from "@/assets/icons/marker.png";

const KATOWICE_LAT_LON: LatLngTuple = [50.270908, 19.039993];

const createPopupText = (details: AirportFromToNumber): string => {
  return `<p>From ${details.from}</p>
          <p>To: ${details.to}</p>`;
};

export const useMap = (map: Ref<Map>) => {
  const { flightsDetails } = useFlights();

  let line: Polyline;
  const clearMapMarkers = (map: Ref) => {
    map.value.eachLayer((layer: any) => {
      if (layer.options.title !== undefined) {
        layer.remove();
      }
    });
  };

  const getMarkerIcon = () => {
    return L.icon({
      iconUrl: marker,
      iconSize: [20, 20],
    });
  };

  const clearLines = () => {
    if (line) line.remove();
  };

  const fromMarkers: any[] = [];
  const toMarkers: any[] = [];

  const markerRenderer = L.canvas();
  const lineRenderer = L.canvas();
  const drawFlightsOnMap = async (flights: Ref<any[]>) => {
    clearMapMarkers(map);
    clearLines();

    for (const trip of flights.value) {
      if (isNaN(trip.to?.lat)) {
        console.error("Missing lat", trip.to);
        continue;
      }

      if (isNaN(trip.to?.lon)) {
        console.error("Missing lon", trip.to);
        continue;
      }

      if (isNaN(trip.from?.lat)) {
        console.error("Missing lat", trip.to);
        continue;
      }

      if (isNaN(trip.from?.lon)) {
        console.error("Missing lat", trip.to);
        continue;
      }
      const fromLat = Number.parseFloat(trip.from?.lat!);
      const fromLon = Number.parseFloat(trip.from?.lon!);

      const toLat = Number.parseFloat(trip.to?.lat!);
      const toLon = Number.parseFloat(trip.to?.lon!);

      const fromMarker = L.marker([fromLat, fromLon], {
        title: trip.from?.icao,
        icon: getMarkerIcon(),
      });

      const toMarker = L.marker([toLat, toLon], {
        title: trip.to?.icao,
        icon: getMarkerIcon(),
      });

      if (!fromMarkers.includes(trip.from.icao)) {
        fromMarker
          .addTo(map.value)
          .bindPopup(createPopupText(flightsDetails.value[trip.from.icao]));
      }

      if (!toMarkers.includes(trip.to.icao)) {
        toMarker
          .addTo(map.value)
          .bindPopup(createPopupText(flightsDetails.value[trip.to.icao]));
      }

      fromMarkers.push(trip.from.icao);
      toMarkers.push(trip.to.icao);

      const pointFrom = new L.LatLng(fromLat, fromLon);
      const pointTo = new L.LatLng(toLat, toLon);

      line = new L.Polyline([pointFrom, pointTo], {
        fill: true,
        color: "#9611c5",
        weight: 3,
        opacity: 1,
        renderer: lineRenderer,
      });

      line.addTo(map.value);
    }

    map.value.setView(KATOWICE_LAT_LON, 4);
  };

  const initializeMap = (map: Map) => {
    map = L.map("map").setView([25, 0], 3);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 40,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      className: "map-tile",
    }).addTo(map);

    return map;
  };

  return {
    drawFlightsOnMap,
    initializeMap,
  };
};

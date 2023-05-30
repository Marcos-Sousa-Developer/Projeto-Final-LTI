import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  FullscreenControl,
  GeolocateControl,
  StaticMap,
  Source,
  Layer,
} from "react-map-gl";
import { useEffect, useState } from "react";

function Maping({lat, lng, destLat, destLng}) {

  function distance() {
    const R = 6371; // Raio médio da Terra em quilômetros
    const dLat = (destLat - lat) * (Math.PI / 180); // Diferença de latitude em radianos
    const dLon = (destLng - lng) * (Math.PI / 180); // Diferença de longitude em radianos
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat * (Math.PI / 180)) *
        Math.cos(destLat * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = R * c;
  
    return distancia;
  }

  return (
    <div className="App">
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        style={{
          width: "250px",
          height: "250px",
          borderRadius: "15px",
        }}
        latitude={lat}
        longitude={lng}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        interactive
        dragPan={true}
      >
        <Marker longitude={lng} latitude={lat} >
          
        </Marker>
        <Marker longitude={destLng} latitude={destLat} >
          
        </Marker>

        <NavigationControl />
        <FullscreenControl></FullscreenControl>

        <Source
          type="geojson"
          data={{
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: [[lng, lat], [destLng, destLat]],
                },
              },
            ],
          }}
        >
          <Layer
            id="route"
            type="line"
            
            paint={{
              "line-color": "red",
              "line-width": 3,
            }}
          />
        </Source>

        <Popup
          longitude={lng}
          latitude={lat}
          closeButton={false}
          anchor="top"
        >
          Distância: {distance().toFixed(0)} km
        </Popup>

      </Map>
    </div>
  );
}

export default Maping;
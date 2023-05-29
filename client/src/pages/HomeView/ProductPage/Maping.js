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
import { useState } from "react";

function Maping() {

  const [lng, setLng] = useState(54.37585762735543);
  const [lat, setLat] = useState(24.45677614934833);
  const [destLng, setDestLng] = useState(54.372123);
  const [destLat, setDestLat] = useState(24.453234);// Destination latitude



  return (
    <div className="App">
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "15px",
          border: "2px solid red",
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
          longitude={destLng}
          latitude={destLat}
          closeButton={false}
          anchor="top"
        >
          Distance: {10} km
        </Popup>

      </Map>
    </div>
  );
}

export default Maping;
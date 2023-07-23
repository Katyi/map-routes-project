import React from "react";
import { MapContainer, TileLayer, Popup, Polyline } from "react-leaflet";
import { useSelector } from "react-redux";
import AutoFitBound from "../../components/AutoFitBound";
import Marker from "../../components/Marker";
import { selectRoute } from "../../features/router/routerSlice";

const DrawMap = ({ center, zoom }) => {
  const route = useSelector(selectRoute);
  const [points, setPoints] = React.useState([]);
  const [originMarker, setOriginMarker] = React.useState(null);
  const [destinationMarker, setDestinationMarker] = React.useState(null);
  const [intermediateMarker, setIntermediateMarker] = React.useState(null);
  const [bounds, setBounds] = React.useState([]);

  React.useEffect(() => {
    // Строим линию маршрута - координаты lat и Ing
    if (route) {
      const points = route.routes[0].geometry.coordinates.map((item) => [
        item[1],
        item[0],
      ]);

      // lat и Ing Tочки 2
      const latOfSecondPoint = route.waypoints[1].location[1];
      const lngOfSecondPoint = route.waypoints[1].location[0];
      
      // Определяем Точки 1, 2 и 3 на маршруте
      setPoints(points);
      const minDistanceArr =  points.map((item) => Math.sqrt(Math.pow((item[0] - latOfSecondPoint), 2) + Math.pow((item[1] - lngOfSecondPoint), 2)))
      const minDistanceItem = Math.min(...minDistanceArr);
      const secondPoint = minDistanceArr.findIndex(item => item === minDistanceItem);
      const originPoint = { lat: points[0][0], lng: points[0][1] };

      const intermediatePoint = {
        lat: points[secondPoint][0],
        lng: points[secondPoint][1],
      };

      const destinationPoint = {
        lat: points[points.length - 1][0],
        lng: points[points.length - 1][1],
      };
      setOriginMarker(originPoint);
      setIntermediateMarker(intermediatePoint);
      setDestinationMarker(destinationPoint);
      const newBounds = [originPoint, intermediatePoint, destinationPoint].map((m) => [
        m.lat,
        m.lng,
      ]);
      setBounds(newBounds);
    }
  }, [route]);

  const handleSetBounds = (bounds) => {
    setBounds(bounds);
  };

  return (
    <MapContainer bounds={bounds} center={center} zoom={zoom}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />

      <Polyline color={"red"} opacity={0.7} weight={8} positions={points}>
        <Popup>Polygon</Popup>
      </Polyline>

      {originMarker && <Marker position={originMarker} text="Точка 1" />}

      {intermediateMarker && <Marker position={intermediateMarker} text="Точка 2" />}

      {destinationMarker && (
        <Marker position={destinationMarker} text="Точка 3" />
      )}

      <AutoFitBound bounds={bounds} handleSetBounds={handleSetBounds} />
    </MapContainer>
  );
};

export default DrawMap;

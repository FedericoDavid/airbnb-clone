"use client";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMap, Circle } from "react-leaflet";
import { useEffect } from "react";

import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface ViewOnlyMapProps {
  center?: number[];
  precisionRadius?: number;
}

const ChangeMapView: React.FC<{ center?: number[] }> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView([center[0], center[1]], 13);
    }
  }, [center, map]);

  return null;
};

const ViewOnlyMap: React.FC<ViewOnlyMapProps> = ({
  center,
  precisionRadius = 100,
}) => {
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const defaultCenter: L.LatLngExpression = [51, -0.09];

  return (
    <div className="mb-8">
      <MapContainer
        center={(center as L.LatLngExpression) || defaultCenter}
        zoom={center ? 13 : 2}
        scrollWheelZoom={true}
        className="h-[35vh] rounded-lg"
      >
        <TileLayer url={tileUrl} attribution={attribution} />
        {center && (
          <>
            <Marker position={center as L.LatLngExpression} />
            <Circle
              center={center as L.LatLngExpression}
              radius={precisionRadius}
              color="blue"
              fillColor="blue"
              fillOpacity={0.1}
            />
            <ChangeMapView center={center} />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default ViewOnlyMap;

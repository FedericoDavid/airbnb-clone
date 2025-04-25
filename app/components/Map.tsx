"use client";

import React, { useEffect, useRef } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { MapContainer, TileLayer, Marker, useMap, Circle } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";

const mapSearchStyles = `
  .leaflet-control-geosearch form input {
    color: black !important;
    background-color: white !important;
    border: 1px solid #ccc !important;
    padding: 8px 12px !important;
    width: 100% !important;
    font-size: 14px !important;
    border-radius: 4px !important;
  }
  .leaflet-control-geosearch form {
    background-color: white !important;
    padding: 4px !important;
    border-radius: 4px !important;
  }
  .leaflet-control-geosearch .results {
    background-color: white !important;
    color: black !important;
  }
  .leaflet-control-geosearch .results > * {
    color: black !important;
    padding: 6px 12px !important;
  }
`;

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[];
  onLocationSelect?: (location: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
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

const SearchControl: React.FC<{
  onLocationSelect?: (location: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
}> = ({ onLocationSelect }) => {
  const map = useMap();
  const searchControlRef = useRef<any>(null);

  useEffect(() => {
    if (!document.getElementById("map-search-styles")) {
      const styleEl = document.createElement("style");
      styleEl.id = "map-search-styles";
      styleEl.innerHTML = mapSearchStyles;
      document.head.appendChild(styleEl);
    }

    const provider = new OpenStreetMapProvider();
    const searchControl = new (GeoSearchControl as any)({
      provider,
      style: "bar",
      showMarker: true,
      showPopup: true,
      popupFormat: ({ result }: any) => result.label,
      maxMarkers: 1,
      retainZoomLevel: false,
      autoClose: true,
      searchLabel: "Enter an address",
      autoComplete: true,
      autoCompleteDelay: 250,
    });

    searchControlRef.current = searchControl;
    map.addControl(searchControl);

    const handleLocationSelect = (result: any) => {
      if (onLocationSelect) {
        onLocationSelect({
          lat: result.location.y,
          lng: result.location.x,
          address: result.location.label,
        });
      }
    };

    map.on("geosearch/showlocation", handleLocationSelect);

    return () => {
      map.removeControl(searchControl);
      map.off("geosearch/showlocation", handleLocationSelect);
    };
  }, [map, onLocationSelect]);

  return null;
};

const Map: React.FC<MapProps> = ({
  center,
  onLocationSelect,
  precisionRadius = 100,
}) => {
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const defaultCenter: L.LatLngExpression = [51, -0.09];

  return (
    <MapContainer
      center={(center as L.LatLngExpression) || defaultCenter}
      zoom={center ? 13 : 2}
      scrollWheelZoom={true}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer url={tileUrl} attribution={attribution} />
      <SearchControl onLocationSelect={onLocationSelect} />
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
  );
};

export default Map;

import React, { useEffect, useState } from 'react';
import { useMap, GeoJSON, CircleMarker } from 'react-leaflet';
import { LatLngBounds, LatLngTuple } from 'leaflet';
import { Feature, LineString } from 'geojson';
import { GeoJSONFileNode } from '../types';
import { isActiveEntry } from '../ActiveEntryContext';
import Elevation from './Elevation';

export default function GeoJSONForUrl({ publicURL, name } : GeoJSONFileNode) {
    const [geoJson, setGeoJson] = useState<Feature<LineString>>();
    const map = useMap();
    const [date, _activityType] = name.split('_');
    const isActive = isActiveEntry(date) && geoJson?.properties?.activityType === 'hiking';
    const color = isActive ? '#228B22' : 'gray';
    if (geoJson && isActive) {
      const bounds = new LatLngBounds(
        [geoJson.bbox![1], geoJson.bbox![0]], // Southwest corner
        [geoJson.bbox![4]!, geoJson.bbox![3]]  // Northeast corner
      );
      map.flyToBounds(bounds, { duration: 1 });
    }
    useEffect(() => {
      fetch(publicURL)
        .then(resp => resp.json())
        .then(setGeoJson);
    }, []);
    const firstCoordinateCenter = (coords: number[][]) => [coords[0][1], coords[0][0]] as LatLngTuple;
    const lastCoordinateCenter = (coords: number[][]) => {
      const lastCoord = coords[coords.length - 1];
      return [lastCoord[1], lastCoord[0]] as LatLngTuple;
    }
    return geoJson &&
      <>
        <GeoJSON data={geoJson} style={{ color }} eventHandlers={{
          click: () => { document.getElementById(date)!.scrollIntoView(true); }
        }} />
        {isActive &&
          <>
            <CircleMarker center={firstCoordinateCenter(geoJson.geometry.coordinates)} radius={6} color={color} pathOptions={{ fillOpacity: 0.9 }} />
            <CircleMarker center={lastCoordinateCenter(geoJson.geometry.coordinates)} radius={6} color="black" pathOptions={{ fillOpacity: 0.5 }} />
            <Elevation url={publicURL} />
          </>}
      </>;
  }
  
  
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { Feature, LineString } from 'geojson';
import { GeoJSONFileNode } from '../types';
import { isActiveEntry } from '../ActiveEntryContext';
import loadable from '@loadable/component';
const Elevation = loadable(() => import('./Elevation'));

export default function GeoJSONForUrl({ publicURL, name }: GeoJSONFileNode) {
  const [geoJson, setGeoJson] = useState<Feature<LineString>>();
  const [date, _activityType] = name.split('_');
  const isActive = isActiveEntry(date) && geoJson?.properties?.activityType === 'hiking';
  useEffect(() => {
    fetch(publicURL)
      .then(resp => resp.json())
      .then(setGeoJson);
  }, []);
  return geoJson &&
    (
      (isActive)
        ? <Elevation data={geoJson} />
        : <GeoJSON data={geoJson} style={{ color: 'gray' }} eventHandlers={{
          click: () => { document.getElementById(date)!.scrollIntoView(true); }
        }} />
    );
}


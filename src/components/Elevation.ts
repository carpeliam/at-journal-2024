import * as d3 from 'd3';
import type { GeoJsonObject } from 'geojson';
import * as toGeoJSON from '@tmcw/togeojson';
import L, { Control, ControlOptions } from 'leaflet';
import 'leaflet-geometryutil';
import 'leaflet-almostover';
import { Distance } from '@raruto/leaflet-elevation/src/handlers/distance.js';
import { Altitude } from '@raruto/leaflet-elevation/src/handlers/altitude.js';
import '@raruto/leaflet-elevation/libs/leaflet-hotline.min.js';
import '@raruto/leaflet-elevation/src/index.js';
import '@raruto/leaflet-elevation/src/index.css';
import { Chart } from '@raruto/leaflet-elevation/src/components/chart.js';
import { Marker } from '@raruto/leaflet-elevation/src/components/marker.js';
import { Summary } from '@raruto/leaflet-elevation/src/components/summary.js';
import { createControlComponent } from '@react-leaflet/core';
global.d3 = d3;
global.toGeoJSON = toGeoJSON;

L.Control.Elevation.include({
  __btnIcon: './images/elevation.svg',
  import(src, component) {
    if (Array.isArray(src)) {
      return Promise.all(src.map(m => this.import!(m)));
    }
    switch (src) {
      case this.__LCHART: component = { Chart }; break;
      case this.__LMARKER: component = { Marker }; break;
      case this.__LSUMMARY: component = { Summary }; break;
    }

    return Promise.resolve(component);
  },
});


type ElevationProps = ControlOptions & {
  data: GeoJsonObject;
};

function createElevation({ data, position = 'bottomleft' }: ElevationProps): Control {
  const controlElevation = L.control.elevation({
    position,
    almostOver: true,
    collapsed: true,
    detached: false,
    distance: false,
    distanceMarkers: false,
    edgeScale: false,
    imperial: true,
    legend: false,
    marker: undefined,
    // theme: 'steelblue-theme',
    time: false,
    handlers: [
      Distance,
      Altitude,
    ],
  });
  controlElevation.once('add', () => {
    controlElevation.load(JSON.stringify(data));
  });
  controlElevation.once('remove', () => {
    controlElevation.clear();
  });
  return controlElevation;
}

export default createControlComponent(createElevation);

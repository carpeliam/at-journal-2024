import * as d3 from 'd3';
import type { GeoJsonObject } from 'geojson';
import * as toGeoJSON from '@tmcw/togeojson';
import L, { Control, ControlOptions } from 'leaflet';
import 'leaflet-geometryutil';
import 'leaflet-almostover';
import { Distance } from '@raruto/leaflet-elevation/src/handlers/distance.js';
import { Time } from '@raruto/leaflet-elevation/src/handlers/time.js';
import { Altitude } from '@raruto/leaflet-elevation/src/handlers/altitude.js';
import { Slope } from '@raruto/leaflet-elevation/src/handlers/slope.js';
import { Speed } from '@raruto/leaflet-elevation/src/handlers/speed.js';
import { Acceleration } from '@raruto/leaflet-elevation/src/handlers/acceleration.js';
// import * as _ from '@raruto/leaflet-elevation/src/utils';
import '@raruto/leaflet-elevation/libs/leaflet-hotline.min.js';
import '@raruto/leaflet-elevation/libs/leaflet-distance-marker.min.js';
import '@raruto/leaflet-elevation/src/index.js';
import '@raruto/leaflet-elevation/src/index.css';
import { Chart } from '@raruto/leaflet-elevation/src/components/chart.js';
import { Marker } from '@raruto/leaflet-elevation/src/components/marker.js';
import { Summary } from '@raruto/leaflet-elevation/src/components/summary.js';
import { createControlComponent } from '@react-leaflet/core';
global.d3 = d3;
global.toGeoJSON = toGeoJSON;


L.Control.Elevation.include({
  __btnIcon: './elevation/elevation.svg',
  // Chart,
  // Marker,
  // Summary,
  import: function (src, component) {
    if (Array.isArray(src)) {
      return Promise.all(src.map(m => this.import(m)));
    }
    switch (src) {
      case this.__LCHART: component = { Chart }; break;
      case this.__LMARKER: component = { Marker }; break;
      case this.__LSUMMARY: component = { Summary }; break;
    }

    // return component ? Promise.resolve(component) : Promise.resolve();
    return Promise.resolve(component);
  },
});


type ElevationProps = ControlOptions & {
  data: GeoJsonObject;
};

function createElevation(props: ElevationProps): Control {
  const position = props.position || 'bottomleft';
  const data = JSON.stringify(Object.assign({ name: '2024-07-17_hiking.geojson' }, props.data));
  const controlElevation = L.control.elevation({
    collapsed: true,
    // theme: 'steelblue-theme',
    detached: false,
    time: false,
    distance: false,
    imperial: true,
    // summary: false,
    downloadLink: false,
    ruler: false,
    legend: false,
    distanceMarkers: false,
    waypoints: false,
    wptLabels: false,
    edgeScale: false,

    position, handlers: [
      Distance,
      // Time,
      Altitude,
      Slope,
      Speed,
      Acceleration,
    ],

  });
  controlElevation.on('remove', () => {
    controlElevation.clear();
  });
  controlElevation.on('add', () => {
    controlElevation.load(data);
  });
  return controlElevation;
}

const Elevation = createControlComponent(createElevation);

export default Elevation;

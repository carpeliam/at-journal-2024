import React from 'react';
import * as d3 from 'd3';
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
import * as _ from '@raruto/leaflet-elevation/src/utils';
import '@raruto/leaflet-elevation/libs/leaflet-hotline.min.js';
import '@raruto/leaflet-elevation/libs/leaflet-distance-marker.min.js';
// import '@raruto/leaflet-elevation/libs/leaflet-edgescale.min.js';
import '@raruto/leaflet-elevation/src/index.js';
import '@raruto/leaflet-elevation/src/index.css';
import { Chart } from '@raruto/leaflet-elevation/src/components/chart.js';
import { Marker } from '@raruto/leaflet-elevation/src/components/marker.js';
import { Summary } from '@raruto/leaflet-elevation/src/components/summary.js';
// import '@raruto/leaflet-elevation/src/components/chart.js';
// import '@raruto/leaflet-elevation/src/components/marker.js';
// import '@raruto/leaflet-elevation/src/components/summary.js';
import { createControlComponent } from '@react-leaflet/core';
global.d3 = d3;
global.toGeoJSON = toGeoJSON;


      // console.log('D3', typeof d3 !== 'object');
 			// console.log('TOGEOJSON', typeof toGeoJSON !== 'object');
 			// console.log('LGEOMUTIL', typeof L.GeometryUtil !== 'object');
 			// console.log('LALMOSTOVER', typeof L.Handler.AlmostOver  !== 'function');
 			// console.log('LDISTANCEM', typeof L.DistanceMarkers  !== 'function');
 			// console.log('LEDGESCALE', typeof L.Control.EdgeScale !== 'function');
 			// console.log('LHOTLINE', typeof L.Hotline  !== 'function');

       L.Control.Elevation.include({
        __btnIcon: './elevation/elevation.svg',
        // Chart,
        // Marker,
        // Summary,
        import: function (src, condition) {
          if (Array.isArray(src)) {
            return Promise.all(src.map(m => this.import(m)));
          }
          let component = null;
          switch (src) {
        //     // case this.__D3: condition = typeof d3 !== 'object'; break;
        //     // case this.__TOGEOJSON: condition = typeof toGeoJSON !== 'object'; break;
        //     // case this.__LGEOMUTIL: condition = typeof L.GeometryUtil !== 'object'; break;
        //     // case this.__LALMOSTOVER: condition = typeof L.Handler.AlmostOver !== 'function'; break;
        //     // case this.__LDISTANCEM: condition = typeof L.DistanceMarkers !== 'function'; break;
        //     // case this.__LEDGESCALE: condition = typeof L.Control.EdgeScale !== 'function'; break;
        //     // case this.__LHOTLINE: condition = typeof L.Hotline !== 'function'; break;

            case this.__LCHART:        component = {Chart}; break;
            case this.__LMARKER:       component = {Marker}; break;
            case this.__LSUMMARY:      component = {Summary}; break;
          
          }
    
        //   // Add the ignore comment for webpack
          return component ? Promise.resolve(component) : Promise.resolve();
        },
      });


// function createElevation(props, context) {
//     const controlElevation = L.control.elevation({});


//     // const square = new L.Rectangle(getBounds(props))
//     // return createElementObject(
//     //   square,
//     //   extendContext(context, { overlayContainer: square }),
//     // )
//     return controlElevation;
//   }

type ElevationProps = ControlOptions & {
  url: string;
};

function createElevation(props: ElevationProps): Control {
  const position = props.position || 'bottomleft';
  const url = props.url;// || "/static/5d12067b2b24a9a30e9373437f0f19f7/2024-07-27_hiking.geojson";
  const controlElevation = L.control.elevation({
    // autohideMarker: false,
    // autohide: true,
    collapsed: true,
    theme: 'steelblue-theme',
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

    preferCanvas: false,
    edgeScale: false,

    position, handlers: [
      Distance,
      Time,
      Altitude,
      Slope,
      Speed,
      Acceleration,

      // Chart,
      // Marker,
      // Summary,
    ],
    
  });
  controlElevation.load(url);
  return controlElevation;
}



//   function updateSquare(instance, props, prevProps) {
//     if (props.center !== prevProps.center || props.size !== prevProps.size) {
//       instance.setBounds(getBounds(props))
//     }
//   }



//   createControlHook(createElevation)

//   const Square = createPathComponent(createSquare, updateSquare)
const Elevation = createControlComponent(createElevation);

export default Elevation;


// export default function Elevation(props: {}) {
//     return false;
// }
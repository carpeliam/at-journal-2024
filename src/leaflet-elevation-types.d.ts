declare module '@raruto/leaflet-elevation/src/components/chart.js';
declare module '@raruto/leaflet-elevation/src/components/marker.js';
declare module '@raruto/leaflet-elevation/src/components/summary.js';

declare module '@raruto/leaflet-elevation/src/handlers/acceleration.js' {
    export function Acceleration(): Object;
}
declare module '@raruto/leaflet-elevation/src/handlers/altitude.js' {
    export function Altitude(): Object;
}
declare module '@raruto/leaflet-elevation/src/handlers/distance.js' {
    export function Distance(): Object;
}
declare module '@raruto/leaflet-elevation/src/handlers/slope.js' {
    export function Slope(): Object;
}
declare module '@raruto/leaflet-elevation/src/handlers/speed.js' {
    export function Speed(): Object;
}

declare namespace L {
    declare namespace Control.Elevation {
        type IncludeType = {
            __LCHART?: string;
            __LMARKER?: string;
            __LSUMMARY?: string;
    
            __btnIcon?: string;
            import?(src: string | string[], component?: Object): Promise<Object | undefined>;
        }
    
        export function include(obj: IncludeType);
    }

    declare namespace control {
        type ElevationOptions = {
            almostOver?: boolean;
            collapsed?: boolean;
            theme?: string;
            detached?: boolean;
            time?: boolean;
            distance?: boolean;
            imperial?: boolean;
            summary?: boolean;
            downloadLink?: boolean;
            ruler?: boolean;
            legend?: boolean;
            distanceMarkers?: boolean;
            waypoints?: boolean;
            wptLabels?: boolean;
            edgeScale?: boolean;
            position?: string;
            handlers?: Function[];
        }

        class ElevationControl extends Control {
            on(event: 'add' | 'remove', fn: Function): void;
            once(event: 'add' | 'remove', fn: Function): void;
            clear(): void;
            load(data: string): void;
        }

        export function elevation(options: ElevationOptions): ElevationControl;
    }
}

// export as namespace toGeoJSON;
// export function toGeoJSON() {}

// declare global {
//     interface Global {
//       toGeoJSON: typeof toGeoJSON;
//     }
//   }
// declare global {
//     function toGeoJSON(): Object;
// }

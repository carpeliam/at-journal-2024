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
            detached?: boolean;
            distance?: boolean;
            distanceMarkers?: boolean;
            downloadLink?: boolean;
            edgeScale?: boolean;
            followMarker?: boolean;
            handlers?: Function[];
            imperial?: boolean;
            legend?: boolean;
            marker?: 'position-marker' | 'elevation-line';
            position?: string;
            ruler?: boolean;
            summary?: boolean;
            theme?: string;
            time?: boolean;
            waypoints?: boolean;
            wptLabels?: boolean;
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

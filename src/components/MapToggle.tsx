import React, { RefObject, useState } from 'react';
import { TbMapPlus, TbMapMinus } from 'react-icons/tb';
import { ImperativePanelGroupHandle } from 'react-resizable-panels';
import { useMapWidth } from '../mediaQueries';

export default function MapToggle({ panelGroupRef, onCollapse }: { panelGroupRef: RefObject<ImperativePanelGroupHandle>, onCollapse: (callback: EventListener) => void }) {
    const mapWidth = useMapWidth();
    const [isMapVisible, setMapVisible] = useState(mapWidth.initial > 0);
    onCollapse(() => setMapVisible(false));
    function expand() {
        panelGroupRef.current?.setLayout([mapWidth.expanded, 100 - mapWidth.expanded]);
        setMapVisible(true);
    }
    function collapse() {
        panelGroupRef.current?.setLayout([0, 100]);
        setMapVisible(false);
    }
    return (isMapVisible)
        ? <TbMapMinus className="toggle-map" onClick={collapse} />
        : <TbMapPlus className="toggle-map closed" onClick={expand} />;
}

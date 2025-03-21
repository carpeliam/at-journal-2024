import { useContext, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { ActiveEntryContext } from '../ActiveEntryContext';

export default function ScreenListener({ onResize }: { onResize: (callback: EventListener) => void }) {
  const { activeEntry } = useContext(ActiveEntryContext)!;
  const map = useMap();
  onResize(() => {
    setTimeout(() => {
      map.invalidateSize();
    });
  });
  useEffect(() => {
    map.invalidateSize();
  }, []);
  if (activeEntry === undefined) {
    map.flyTo([39.717330464, -77.503664652], 5, { duration: 0.75 });
  }
  return false;
}

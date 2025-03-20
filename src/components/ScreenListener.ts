import { useContext, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { ActiveEntryContext } from '../ActiveEntryContext';

export default function ScreenListener({ isVisible }: { isVisible: boolean }) {
  const { activeEntry } = useContext(ActiveEntryContext)!;
  const map = useMap();
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        map.invalidateSize();
      }, 450);
    }
  }, [isVisible]);
  if (activeEntry === undefined) {
    map.flyTo([39.717330464, -77.503664652], 5, { duration: 0.75 });
  }
  return false;
}

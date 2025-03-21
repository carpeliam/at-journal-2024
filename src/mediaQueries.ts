import { useMediaQuery } from 'react-responsive';

export function useIsMobile() {
  return useMediaQuery({ maxWidth: 768 });
}

export function useMapWidth() {
  const isMobile = useIsMobile();
  const initial = (isMobile) ? 0 : 25;
  const expanded = (isMobile) ? 100 : 25;
  return { initial, expanded };
}

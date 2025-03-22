import { createContext, useContext } from 'react';
import { InViewHookResponse, useInView } from 'react-intersection-observer';
import { useTimeZone } from './timeZone';

type ActiveEntryContextType = {
    activeEntry: string | undefined;
    setActiveEntry: (entry: string | undefined) => void;
}
export const ActiveEntryContext = createContext<ActiveEntryContextType | undefined>(undefined);

export function isActiveEntry(entry: string): boolean {
  const activeEntryContext = useContext(ActiveEntryContext);
  const localTimeZone = useTimeZone();
  if (!activeEntryContext) {
    return false;
  }
  const { activeEntry } = activeEntryContext;
  if (!activeEntry) {
    return false;
  }
  const activeDate = new Date(activeEntry).toLocaleDateString('en-US', { timeZone: 'UTC' });
  const entryTimeZone = (entry.indexOf('T') !== -1) ? localTimeZone : 'UTC';
  const entryDate = new Date(entry).toLocaleDateString('en-US', { timeZone: entryTimeZone });
  return activeDate === entryDate;
}

export function activateOnFocus(entry: string | undefined): InViewHookResponse["ref"] {
  const activeEntryContext = useContext(ActiveEntryContext)!;
  const { setActiveEntry } = activeEntryContext;
  const { ref } = useInView({
    /* Optional options */
    threshold: 0,
    rootMargin: '0px 0px -98% 0px',
    // TODO consider sending more updates to context and letting a reducer sift through and return the active entry
    onChange: (_inView, intersectionObserverEntry) => {
      if (intersectionObserverEntry.isIntersecting) {
        setActiveEntry(entry);
      }
    }
  });
  return ref;
}

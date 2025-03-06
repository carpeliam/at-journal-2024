import { createContext, useContext } from 'react';

type ActiveEntryContextType = {
    activeEntry: string | undefined;
    setActiveEntry: (entry: string | undefined) => void;
}
export const ActiveEntryContext = createContext<ActiveEntryContextType | undefined>(undefined);

export function isActiveEntry(entry: string): boolean {
  const activeEntryContext = useContext(ActiveEntryContext);
  if (!activeEntryContext) {
    return false;
  }
  const { activeEntry } = activeEntryContext;
  if (!activeEntry) {
    return false;
  }
  const activeDate = new Date(activeEntry).toLocaleDateString('en-US', { timeZone: 'UTC'});
  const entryTimeZone = (entry.indexOf('T') !== -1) ? 'America/New_York' : 'UTC';
  const entryDate = new Date(entry).toLocaleDateString('en-US', { timeZone: entryTimeZone});
  return activeDate === entryDate;
}
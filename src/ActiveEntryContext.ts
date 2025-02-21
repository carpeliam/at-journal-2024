import { createContext } from 'react';

type ActiveEntryContextType = {
    activeEntry: string | undefined;
    setActiveEntry: (entry: string | undefined) => void;
}
export const ActiveEntryContext = createContext<ActiveEntryContextType | undefined>(undefined);

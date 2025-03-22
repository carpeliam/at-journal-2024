import { vi, describe, it, expect, beforeEach, afterEach, Mock } from 'vitest';
import React from 'react';
import { useStaticQuery } from 'gatsby';
import { render, screen } from '@testing-library/react';
import { ActiveEntryContext, isActiveEntry } from '../src/ActiveEntryContext';

function activeEntryValue(value: string | undefined) {
  return {
    activeEntry: value,
    setActiveEntry: () => {}
  };
}

function IsActiveEntry({ entry }) {
  return <div>{isActiveEntry(entry) ? 'true' : 'false'}</div>;
}

describe('ActiveEntryContext', () => {
  beforeEach(() => {
    (useStaticQuery as Mock).mockImplementation(() => ({
      site: {
        siteMetadata: {
          timeZone: 'America/New_York',
        }
      },
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('isActiveEntry', () => {
    it('returns false if no ActiveEntryContext', () => {
      render(
        <IsActiveEntry entry={new Date().toISOString()} />
      );
      screen.getByText('false');
    });

    it('returns false if undefined', () => {
      render(
        <ActiveEntryContext.Provider value={activeEntryValue(undefined)}>
          <IsActiveEntry entry={new Date().toISOString()} />
        </ActiveEntryContext.Provider>
      );
      screen.getByText('false');
    });

    it('returns true if it is the same date', () => {
      const dateString = '2022-04-03';
      render(
        <ActiveEntryContext.Provider value={activeEntryValue(dateString)}>
          <IsActiveEntry entry={dateString} />
        </ActiveEntryContext.Provider>
      );
      expect(screen.getByText('true')).toBeInTheDocument();
    });

    it('returns false if it is not the same date', () => {
      render(
        <ActiveEntryContext.Provider value={activeEntryValue('2022-04-03')}>
          <IsActiveEntry entry="2022-01-01" />
        </ActiveEntryContext.Provider>
      );
      expect(screen.getByText('false')).toBeInTheDocument();
    });

    it('returns true if it is the same date in a different timezone', () => {
      render(
        <ActiveEntryContext.Provider value={activeEntryValue('2022-04-03')}>
          <IsActiveEntry entry={new Date('2022-04-03T22:00:00-04:00').toISOString()} />
        </ActiveEntryContext.Provider>
      );
      expect(screen.getByText('true')).toBeInTheDocument();
    });
  });
});

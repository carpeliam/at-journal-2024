import { vi, describe, it, beforeEach, afterEach, expect, Mock } from 'vitest';
import { useStaticQuery } from 'gatsby';
import { useDateFormat, useTimeZone } from '../src/timeZone';

beforeEach(() => {
  (useStaticQuery as Mock).mockImplementation(() => ({
    site: {
      siteMetadata: {
        timeZone: 'America/Argentina/San_Juan',
      }
    },
  }));
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('useTimeZone()', () => {
  it('fetches the configured timezone from the site metadata', () => {
    expect(useTimeZone()).toEqual('America/Argentina/San_Juan');
  });
});

describe('useDateFormat()', () => {
  it('formats dates given the timezone from useTimeZone()', () => {
    const dateFormat = useDateFormat();
    const date = new Date('2020-01-01T12:00:00.000-03:00')
    expect(dateFormat.format(date)).toEqual('1/1/20, 12:00:00 PM');
  });
});

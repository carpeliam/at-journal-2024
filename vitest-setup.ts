import { vi, beforeAll, afterEach, afterAll } from 'vitest';
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { server } from './spec/fetchmock/node';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

window.IntersectionObserver = class implements IntersectionObserver {
  root: Document | Element | null;
  rootMargin: string;
  thresholds: readonly number[];
  disconnect() {}
  observe(target: Element) {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
  unobserve(target: Element) {}
}

vi.mock(`gatsby`, async () => {
  const gatsby = await vi.importActual<typeof import("gatsby")>(`gatsby`)
  return {
    ...gatsby,
    graphql: vi.fn(),
    Link: vi.fn().mockImplementation(({ to, ...rest }) =>
      React.createElement(`a`, {
        ...rest,
        href: to,
      })
    ),
    StaticQuery: vi.fn(),
    useStaticQuery: vi.fn(),
  }
});

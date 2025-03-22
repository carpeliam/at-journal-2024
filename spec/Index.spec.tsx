import { vi, describe, it, expect, beforeEach, afterEach, Mock } from 'vitest';
import React from 'react';
import { useStaticQuery, PageProps } from 'gatsby';
import { render, screen } from '@testing-library/react';
import IndexPage from '../src/pages/index.tsx';
import { IndexData } from '../src/types.ts';

describe('IndexPage', () => {
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

  it('renders successfully', () => {
    const data: IndexData = {
      site: {
        siteMetadata: {
          description: '',
          mapBoxApiToken: '',
          title: 'Some stupid website',
        }
      },
      geojson: {
        nodes: [{
          name: '',
          publicURL: '/static/abc/2024-04-03-day1.geojson',
        }]
      },
      images: {
        nodes: []
      },
      movies: {
        nodes: []
      },
      allMarkdownRemark: {
        edges: []
      }
    };
    const props = { data } as PageProps<IndexData>;
    render(<IndexPage {...props} />);

    expect(screen.getByText('Some stupid website')).toBeInTheDocument();
  });
});

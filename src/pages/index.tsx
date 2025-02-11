import React, { useEffect, useState, useContext } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import { useInView } from 'react-intersection-observer';;
import { ActiveEntryContext } from './ActiveEntryContext';
import { LatLngBounds } from 'leaflet';
import imgHeader from '../images/trail-with-blaze.jpeg';

console.log(imgHeader);
function GeoJSONForUrl({ publicURL, name } : GeoJSONFileNode) {
  const { activeEntry } = useContext(ActiveEntryContext);
  const [geoJson, setGeoJson] = useState();
  const map = useMap();
  const isActive = name.startsWith(activeEntry) && geoJson?.features[0]?.properties?.activityType === 'hiking';
  const color = isActive ? '#228B22' : 'gray';
  if (geoJson && isActive) {
    const bounds = new LatLngBounds(
      [geoJson.bbox[1], geoJson.bbox[0]], // Southwest corner
      [geoJson.bbox[3], geoJson.bbox[2]]  // Northeast corner
    );
    map.flyToBounds(bounds, { duration: 1 });
  }
  useEffect(() => {
    fetch(publicURL)
      .then(resp => resp.json())
      .then(setGeoJson);
  }, []);
  return geoJson && <GeoJSON data={geoJson} style={{ color }} eventHandlers={{
    click: (e) => {
      document.getElementById(name.split('_')[0]).scrollIntoView(true);
    }
  }} />;
}

type GeoJSONFileNode = {
  publicURL: string;
  name: string;
}
type MarkdownNode = {
  frontmatter: {
    title: string;
    date: string;
    miles: string;
  }
  fields: {
    slug: string;
  }
  excerpt: string;
  html: string;
}
type IndexData = {
  allFile: {
    edges: { node: GeoJSONFileNode }[]
  }
  allMarkdownRemark: {
    edges: {node: MarkdownNode}[]
  }
}

function Preface({ metadata }) {
  const { setActiveEntry } = useContext(ActiveEntryContext);
  const { ref } = useInView({
    /* Optional options */
    threshold: 0,
    rootMargin: '0px 0px -96% 0px',
    onChange: (inView, entry) => {
      if (entry.isIntersecting) {
        setActiveEntry(null);
      }
    }
  });
  return (
    <header className="mb-12" ref={ref}>
      <div className="w-full bg-center bg-cover"
        style={{backgroundImage: `url(${imgHeader})`}}>
        <div className="bg-gray-300/15 py-36">
            <h1 className="text-center lg:text-5xl text-gray-100">{metadata.title}</h1>
        </div>
      </div>
      {metadata.description}
    </header>
  )
}

function Entry({ fields, frontmatter, html, excerpt }: MarkdownNode) {
  const { setActiveEntry } = useContext(ActiveEntryContext);
  const { ref } = useInView({
    /* Optional options */
    threshold: 0,
    rootMargin: '0px 0px -96% 0px',
    // TODO consider sending more updates to context and letting a reducer sift through and return the active entry
    onChange: (inView, entry) => {
      if (entry.isIntersecting) {
        setActiveEntry(frontmatter.date.split('T')[0]);
      }
    }
  });
  // FIXME use the slug, if we can get that into activeEntry
  const pocId = frontmatter.date.split('T')[0];
  return (
    <article key={fields.slug} ref={ref}>
      <h3 style={{margin: 0}} id={pocId}>
        {frontmatter.title}
      </h3>
      <small>{frontmatter.date}</small>
      <div>{frontmatter.miles} miles</div>
      <div dangerouslySetInnerHTML={{ __html: html }}>{excerpt}</div>
    </article>
  )
}

function ScreenListener() {
  const { activeEntry } = useContext(ActiveEntryContext);
  const map = useMap();
  if (activeEntry === null) {
    map.flyTo([39.717330464, -77.503664652], 5, { duration: 0.75 });
  }
  return false;
}

function IndexPage({ data }: PageProps<IndexData>) {
  const geojsonComponents = data.allFile.edges.map(({node }) => <GeoJSONForUrl key={node.name} {...node} />);
  const [activeEntry, setActiveEntry] = useState<String>();
  return (
    <main>
      <ActiveEntryContext.Provider value={{ activeEntry, setActiveEntry }}>
      <div style={{position: 'fixed'}}>
        <MapContainer style={{ height: '100vh', width: 425 }} center={[39.717330464, -77.503664652]} zoom={5} scrollWheelZoom={false}>
          <ScreenListener />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {geojsonComponents}
        </MapContainer>
      </div>
      <div style={{ marginLeft: 425, padding: 10 }}>
        <Preface metadata={data.site.siteMetadata} />
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <Entry key={node.fields.slug} {...node} />
        ))}
      </div>
      </ActiveEntryContext.Provider>
    </main>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        description
        siteUrl
        title
      }
    }
    allMarkdownRemark(
      filter: {fileAbsolutePath: {glob: "/**/src/entries/*"}}
      sort: {frontmatter: {date: ASC}}
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            miles
          }
          html
          fields {
            slug
          }
        }
      }
    }
    allFile(filter: {sourceInstanceName: {eq: "geojson"}}) {
      edges {
        node {
          publicURL
          name
        }
      }
    }
  }
`;
/*
 Fetching all images with GPS data
 allFile(
      filter: {sourceInstanceName: {eq: "images"}, fields: {liamgps: {latitude: {ne: null}, longitude: {ne: null}}}}
    ) {
      edges {
        node {
          birthTime
          fields {
            liamgps {
              latitude
              longitude
            }
          }
          publicURL
          relativePath
        }
      }
    }
*/


export default IndexPage

export const Head: HeadFC = ({ data }) => <title>{data.site.siteMetadata.title}</title>;

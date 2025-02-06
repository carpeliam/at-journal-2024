import React, { useEffect, useState, useContext } from 'react'
import type { HeadFC, PageProps } from "gatsby"
import { useStaticQuery, graphql, Link } from "gatsby"
import { StaticImage } from 'gatsby-plugin-image'
import { MapContainer, Marker, Popup, TileLayer, GeoJSON, useMap } from "react-leaflet"
import { useInView } from "react-intersection-observer";
import { ActiveEntryContext } from './ActiveEntryContext'
import { LatLngBounds } from 'leaflet'

function GeoJSONForUrl({ publicURL, name } : GeoJSONFileNode) {
  const {activeEntry, setActiveEntry} = useContext(ActiveEntryContext);
  const [geoJson, setGeoJson] = useState();
  const map = useMap();
  // console.log(activeEntry === name, name);
  const isActive = name.startsWith(activeEntry) && geoJson?.features[0]?.properties?.activityType === 'hiking';
  const color = isActive ? '#228B22' : 'gray';
  if (geoJson && isActive) {
    const bounds = new LatLngBounds(
      [geoJson.bbox[1], geoJson.bbox[0]], // Southwest corner
      [geoJson.bbox[3], geoJson.bbox[2]]  // Northeast corner
    );
    map.flyToBounds(bounds);
    console.log(JSON.stringify(geoJson));
  }
  useEffect(() => {
    fetch(publicURL)
      .then(resp => resp.json())
      .then(json => {
        setGeoJson(json);
      });
  }, []);
  return geoJson && <GeoJSON data={geoJson} style={{ color }} eventHandlers={{
    click: (e) => {
      console.log('marker clicked', e, JSON.stringify(e.propagatedFrom.feature))
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

function Entry({ fields, frontmatter, html, excerpt }: MarkdownNode) {
  const {activeEntry, setActiveEntry} = useContext(ActiveEntryContext);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    rootMargin: '0px 0px -96% 0px',
    // TODO consider sending more updates to context and letting a reducer sift through and return the active entry
    onChange: (inView, entry) => {
      console.log(frontmatter.title, entry.isIntersecting);
      if (entry.isIntersecting) {
        setActiveEntry(frontmatter.date.split('T')[0]);
      }
    }
  });
  return (
    <div key={fields.slug} ref={ref}>
      <h3 style={{margin: 0}}>
        {frontmatter.title}
      </h3>
      <small>{frontmatter.date}</small>
      <p dangerouslySetInnerHTML={{ __html: html }}>{excerpt}</p>
    </div>
  )
}

function IndexPage({ data }: PageProps<IndexData>) {
  const geojsonUrls : string[] = data.allFile.edges.map(({node }) => node.publicURL);
  const geojsonComponents = data.allFile.edges.map(({node }) => <GeoJSONForUrl key={node.name} {...node} />);
  const [activeEntry, setActiveEntry] = useState<String>();
  return (
    <main>
      <ActiveEntryContext.Provider value={{activeEntry, setActiveEntry}}>
      <div style={{position: 'fixed'}}>
        <MapContainer style={{ height: '100vh', width: 425 }} center={[39.717330464, -77.503664652]} zoom={5} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {geojsonComponents}
        </MapContainer>
      </div>
      <div style={{ marginLeft: 425, padding: 10 }}>
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
    allMarkdownRemark(
      filter: {fileAbsolutePath: {glob: "/**/src/entries/*"}}
      sort: {frontmatter: {date: ASC}}
    ) {
      edges {
        node {
          frontmatter {
            title
            date
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

export const Head: HeadFC = () => <title>Home Page</title>

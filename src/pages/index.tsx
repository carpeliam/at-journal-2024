import React, { useEffect, useState } from 'react';
import { graphql, PageProps } from 'gatsby';
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import Modal from 'react-modal';
import { TbMapPlus, TbMapMinus } from 'react-icons/tb';
import classNames from 'classnames';
import { ActiveEntryContext } from '../ActiveEntryContext';
import { IndexData } from '../types';
import Epilogue from '../content/Epilogue.mdx';
import ScreenListener from '../components/ScreenListener';
import GeoJSONForUrl from '../components/GeoJSONForUrl';
import Entry from '../components/Entry';
import { ImageAtLocation, MovieAtLocation } from '../components/MediaAtLocation';
import Preface from '../components/Preface';


export default function IndexPage({ data }: PageProps<IndexData>) {
  const geojsonComponents = data.geojson.nodes.map(node => <GeoJSONForUrl key={node.name} {...node} />);
  const images = data.images.nodes.map(node => <ImageAtLocation key={node.id} {...node} />);
  const movies = data.movies.nodes.map(node => <MovieAtLocation key={node.id} {...node} />);
  const [activeEntry, setActiveEntry] = useState<string>();
  const [isMapVisible, setMapVisible] = useState(true);
  useEffect(() => {
    if (process.env.NODE_ENV !== 'test')
      Modal.setAppElement('#___gatsby');
  }, []);
  return (
    <main>
      <ActiveEntryContext.Provider value={{ activeEntry, setActiveEntry }}>
        <div className={classNames('map', { open: isMapVisible })}>
          <MapContainer style={{ height: '100vh' }} center={[39.717330464, -77.503664652]} zoom={5} scrollWheelZoom={false}>
            <ScreenListener isVisible={isMapVisible} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {isMapVisible && geojsonComponents}
            <MarkerClusterGroup maxClusterRadius={15} showCoverageOnHover={true}>
              {[...images, ...movies]}
            </MarkerClusterGroup>
          </MapContainer>
          {isMapVisible
            ? <TbMapMinus className="toggle-map" onClick={() => setMapVisible(false)} />
            : <TbMapPlus className="toggle-map closed" onClick={() => setMapVisible(true)} />
          }
        </div>
        <div className={classNames('articles', { 'with-map': isMapVisible })}>
          <Preface metadata={data.site.siteMetadata} />
          {data.allMarkdownRemark.edges.map(({ node, previous }) => (
            <Entry key={node.frontmatter.day} previous={previous?.frontmatter} {...node} />
          ))}
          <Epilogue />
        </div>
      </ActiveEntryContext.Provider>
    </main>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
        description
      }
    }
    allMarkdownRemark(
      filter: {fileAbsolutePath: {glob: "/**/src/entries/*"}}
      sort: {frontmatter: {date: ASC}}
    ) {
      edges {
        node {
          frontmatter {
            day
            date
            start
            destination
            end
            sleep
            mood
            sleepScore
            garminFeedback
            trainingReadiness
          }
          html
        }
        previous {
          frontmatter {
            start
            destination
            end
          }
        }
      }
    }
    geojson: allFile(filter: {sourceInstanceName: {eq: "geojson"}}) {
      nodes {
        name
        publicURL
      }
    }
    images: allFile(
      filter: {sourceInstanceName: {eq: "images"}, extension: {eq: "jpeg"}, fields: {coordinates: {latitude: {ne: null}, longitude: {ne: null}}}}
      sort: {birthTime: ASC}
    ) {
      nodes {
        id
        fields {
          coordinates {
            latitude
            longitude
          }
          createDate
        }
        childImageSharp {
          gatsbyImageData
        }
      }
    }
    movies: allFile(
      filter: {sourceInstanceName: {eq: "images"}, extension: {eq: "mp4"}, fields: {coordinates: {latitude: {ne: null}, longitude: {ne: null}}}}
      sort: {birthTime: ASC}
    ) {
      nodes {
        id
        fields {
          coordinates {
            latitude
            longitude
          }
          createDate
        }
        publicURL
      }
    }
  }
`;

export function Head({ data }: PageProps<IndexData>) {
  return <title>{data.site.siteMetadata.title}</title>;
}

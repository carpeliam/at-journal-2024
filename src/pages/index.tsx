import React, { useEffect, useRef, useState } from 'react';
import { graphql, PageProps } from 'gatsby';
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { ImperativePanelGroupHandle, Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Modal from 'react-modal';
import { ActiveEntryContext } from '../ActiveEntryContext';
import { IndexData } from '../types';
import Epilogue from '../content/Epilogue.mdx';
import ScreenListener from '../components/ScreenListener';
import GeoJSONForUrl from '../components/GeoJSONForUrl';
import Entry from '../components/Entry';
import { ImageAtLocation, MovieAtLocation } from '../components/MediaAtLocation';
import Preface from '../components/Preface';
import MapToggle from '../components/MapToggle';
import { useMapWidth } from '../mediaQueries';

class PanelEventListener {
  private eventTarget: EventTarget;
  constructor() {
    this.eventTarget = new EventTarget();
  }
  dispatchResize = () => this.dispatch('resize')
  dispatchCollapse = () => this.dispatch('collapse')
  onResize = (callback: EventListener) => this.on('resize', callback)
  onCollapse = (callback: EventListener) => this.on('collapse', callback)
  private dispatch(type: 'resize' | 'collapse') {
    this.eventTarget.dispatchEvent(new Event(type));
  }
  private on(type: 'resize' | 'collapse', callback: EventListener) {
    this.eventTarget.addEventListener(type, callback);
  }
}

export default function IndexPage({ data }: PageProps<IndexData>) {
  const geojsonComponents = data.geojson.nodes.map(node => <GeoJSONForUrl key={node.name} {...node} />);
  const images = data.images.nodes.map(node => <ImageAtLocation key={node.id} {...node} />);
  const movies = data.movies.nodes.map(node => <MovieAtLocation key={node.id} {...node} />);
  const { mapBoxApiToken } = data.site.siteMetadata;
  const [activeEntry, setActiveEntry] = useState<string>();
  const panelGroupRef = useRef<ImperativePanelGroupHandle>(null);
  const listener = new PanelEventListener();
  const mapWidth = useMapWidth();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'test')
      Modal.setAppElement('#___gatsby');
  }, []);

  return (
    <main>
      <ActiveEntryContext.Provider value={{ activeEntry, setActiveEntry }}>
        <PanelGroup direction="horizontal" style={{ overflow: 'visible' }} ref={panelGroupRef}>
          <Panel collapsible defaultSize={mapWidth.initial} style={{ overflow: 'visible' }} onResize={listener.dispatchResize} onCollapse={listener.dispatchCollapse}>
            <MapContainer style={{ position: 'sticky', top: 0, height: '100vh' }} center={[39.717330464, -77.503664652]} zoom={5} scrollWheelZoom={false}>
              <ScreenListener onResize={listener.onResize} />
              <TileLayer
                attribution='&copy; <a href="https://www.mapbox.com/about/maps">Mapbox</a>
                  &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>
                  <a href="https://apps.mapbox.com/feedback/" target="_blank">Improve this map</a>'
                url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/tiles/256/{z}/{x}/{y}@2x?access_token=${mapBoxApiToken}`}
              />
              {geojsonComponents}
              <LayersControl position="topright">
                <LayersControl.Overlay name="Photos/Videos" checked>
                  <MarkerClusterGroup maxClusterRadius={15} showCoverageOnHover>
                    {[...images, ...movies]}
                  </MarkerClusterGroup>
                </LayersControl.Overlay>
              </LayersControl>
            </MapContainer>
          </Panel>
          <PanelResizeHandle style={{ position: 'sticky', top: 0, height: '100vh', zIndex: 1 }} className="w-1 bg-green-950">
            <MapToggle panelGroupRef={panelGroupRef} onCollapse={listener.onCollapse} />
          </PanelResizeHandle>
          <Panel defaultSize={100 - mapWidth.initial}>
            <div style={{ padding: 10 }}>
              <Preface metadata={data.site.siteMetadata} />
              {data.allMarkdownRemark.edges.map(({ node, previous }) => (
                <Entry key={node.frontmatter.day} previous={previous?.frontmatter} {...node} />
              ))}
              <Epilogue />
            </div>
          </Panel>
        </PanelGroup>
      </ActiveEntryContext.Provider>
    </main>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        mapBoxApiToken
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

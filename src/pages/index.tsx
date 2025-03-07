import React, { useEffect, useState, useContext, useRef } from 'react';
import type { PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import { StaticImage, GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { MapContainer, TileLayer, GeoJSON, useMap, Marker, CircleMarker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { LatLngBounds, LatLngTuple } from 'leaflet';
import Modal from 'react-modal';
import type { Feature, LineString } from 'geojson';
import Epilogue from '../content/Epilogue.mdx';
import { activateOnFocus, ActiveEntryContext, isActiveEntry } from '../ActiveEntryContext';

Modal.setAppElement("#___gatsby");

function GeoJSONForUrl({ publicURL, name } : GeoJSONFileNode) {
  const [geoJson, setGeoJson] = useState<Feature<LineString>>();
  const map = useMap();
  const [date, _activityType] = name.split('_');
  const isActive = isActiveEntry(date) && geoJson?.properties?.activityType === 'hiking';
  const color = isActive ? '#228B22' : 'gray';
  if (geoJson && isActive) {
    const bounds = new LatLngBounds(
      [geoJson.bbox![1], geoJson.bbox![0]], // Southwest corner
      [geoJson.bbox![4]!, geoJson.bbox![3]]  // Northeast corner
    );
    map.flyToBounds(bounds, { duration: 1 });
  }
  useEffect(() => {
    fetch(publicURL)
      .then(resp => resp.json())
      .then(setGeoJson);
  }, []);
  const firstCoordinateCenter = (coords: number[][]) => [coords[0][1], coords[0][0]] as LatLngTuple;
  const lastCoordinateCenter = (coords: number[][]) => {
    const lastCoord = coords[coords.length - 1];
    return [lastCoord[1], lastCoord[0]] as LatLngTuple;
  }
  return geoJson &&
    <>
      <GeoJSON data={geoJson} style={{ color }} eventHandlers={{
        click: () => { document.getElementById(date)!.scrollIntoView(true); }
      }} />
      {isActive &&
        <>
          <CircleMarker center={firstCoordinateCenter(geoJson.geometry.coordinates)} radius={6} color={color} pathOptions={{ fillOpacity: 0.9 }} />
          <CircleMarker center={lastCoordinateCenter(geoJson.geometry.coordinates)} radius={6} color="black" pathOptions={{ fillOpacity: 0.5 }} />
        </>}
    </>;
}

function ImageAtLocation({ fields, birthTime, childImageSharp: { gatsbyImageData } }: ImageFileNode) {
  const [isOpen, setOpen] = useState(false);
  return isActiveEntry(birthTime) && <>
    <Marker position={[fields.coordinates.latitude, fields.coordinates.longitude]} eventHandlers={{
      click: () => { setOpen(true); }
    }} />
    <Modal style={{ overlay: { display: 'flex', justifyContent: 'center' }, content: { position: 'static', margin: 40, maxWidth: gatsbyImageData.width, maxHeight: gatsbyImageData.height }}} isOpen={isOpen} onRequestClose={() => { setOpen(false); }}>
      <GatsbyImage image={gatsbyImageData} style={{ maxWidth: '100%', maxHeight: '100%' }} alt={`image taken at ${new Date(birthTime).toLocaleString('en-US', { timeZone: 'America/New_York' })}`} />
    </Modal>
  </>;
}

type GarminFeedback =
  'TIME_TO_RECHARGE' | 'LISTEN_TO_YOUR_BODY' | 'FOCUS_ON_RECOVERY' | 'FIND_TIME_TO_RELAX' | 'LET_YOUR_BODY_RECOVER' | 'TAKE_IT_EASY' | 'TIME_TO_SLOW_DOWN' |

  'BALANCE_STRESS_AND_RECOVERY' | 'FOCUS_ON_SLEEP_PATTERNS' | 'FOCUS_ON_SLEEP_QUALITY' | 'FOCUS_ON_ENERGY_LEVELS' |

  'RECOVERY_IN_PROGRESS' |

  'GOOD_SLEEP_LAST_NIGHT' | 'GOOD_RECOVERY' | 'WELL_RECOVERED' |

  'RECOVERED_AND_READY' | 'READY_FOR_THE_DAY' | 'TAKE_ON_THE_DAY';

type GeoJSONFileNode = {
  publicURL: string;
  name: string;
}
type ImageFileNode = {
  fields: {
    coordinates: {
      latitude: number;
      longitude: number;
    }
  }
  id: string;
  birthTime: string;
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData;
  }
};
type MarkdownNode = {
  frontmatter: {
    day: number;
    date: string;
    start: string | null;
    destination: string | null;
    end: number;
    sleep: 'Tent' | 'Shelter' | 'Building';
    mood: '🙂' | '😐';
    sleepScore: number;
    garminFeedback: GarminFeedback;
    trainingReadiness: number;
}
  html: string;
}
type IndexData = {
  site: {
    siteMetadata: {
      description: string;
      siteUrl: string;
      title: string;
    }
  }
  geojson: {
    edges: { node: GeoJSONFileNode }[];
  }
  images: {
    edges: { node: ImageFileNode }[];
  }
  allMarkdownRemark: {
    edges: {
      node: MarkdownNode;
      previous: Pick<MarkdownNode, "frontmatter"> | null;
    }[];
  }
}

function Preface({ metadata }: { metadata: IndexData["site"]["siteMetadata"] }) {
  const ref = activateOnFocus(undefined);
  return (
    <header className="mb-12" ref={ref}>
      <div style={{ display: "grid" }}>
      <StaticImage
        src="../images/trail-with-blaze.jpeg" alt="My tent on the trail"
        style={{ gridArea: "1/1" }}
        layout="fullWidth"
        aspectRatio={2 / 1}
      />
      <div className="relative grid place-items-center" style={{ gridArea: "1/1" }}>
        <h1 className="text-center lg:text-5xl text-gray-100">{metadata.title}</h1>
      </div>
      </div>
      {metadata.description}
    </header>
  )
}

function title(today: MarkdownNode["frontmatter"], yesterday: Pick<MarkdownNode["frontmatter"], "destination" | "end"> | undefined) {
  let startLocation;
  let daySummary;
  if (!yesterday) {
    startLocation = today.start;
  } else {
    startLocation = yesterday.destination || `Mile ${yesterday.end}`;
  }
  const endLocation = today.destination || `Mile ${today.end}`;
  if (startLocation === endLocation) {
    daySummary = endLocation;
  } else {
    daySummary = `${startLocation} to ${endLocation}`;
  }
  return `AT Day ${today.day}: ${daySummary}`
}

function Entry({ frontmatter, html, previous }: MarkdownNode & { previous: Pick<MarkdownNode["frontmatter"], "destination" | "end"> | undefined }) {
  const date = frontmatter.date.split('T')[0];
  const linkRef = useRef<HTMLElement | null>(null);
  const focusRef = activateOnFocus(date);
  const combinedRef = (element: HTMLElement) => {
    linkRef.current = element;
    focusRef(element);
  }
  const miles = {
    traveled: (frontmatter.end - (previous?.end || 0)).toFixed(1),
    start: previous?.end || 0,
    end: frontmatter.end,
  };

  return (
    <article ref={combinedRef} className={(isActiveEntry(date) ? "entry entry-active" : "entry")}>
      <h3 className="m-0 cursor-pointer" id={date} onClick={() => linkRef.current?.scrollIntoView()}>
        {title(frontmatter, previous)}
      </h3>
      <div className="flex gap-4 text-sm">
        <div>{new Date(frontmatter.date).toLocaleDateString('en-US', { timeZone: 'UTC'})}</div>
        <div>{miles.traveled} miles</div>
        <div>{miles.start} to {miles.end} miles</div>
      </div>
      <div className="flex gap-4 text-sm">
        <div>Sleep: {frontmatter.sleep}</div>
        <div>Sleep score: {frontmatter.sleepScore}/100</div>
        <div>State: {frontmatter.garminFeedback}</div>
        <div>Mood: {frontmatter.mood}</div>
        <div>Readiness: {frontmatter.trainingReadiness}/100</div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  )
}

function ScreenListener() {
  const { activeEntry } = useContext(ActiveEntryContext)!;
  const map = useMap();
  if (activeEntry === undefined) {
    map.flyTo([39.717330464, -77.503664652], 5, { duration: 0.75 });
  }
  return false;
}

export default function IndexPage({ data }: PageProps<IndexData>) {
  const geojsonComponents = data.geojson.edges.map(({node }) => <GeoJSONForUrl key={node.name} {...node} />);
  const images = data.images.edges.map(({ node }) => <ImageAtLocation key={node.id} {...node} />);
  const [activeEntry, setActiveEntry] = useState<string>();
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
          <MarkerClusterGroup maxClusterRadius={15} showCoverageOnHover={false}>
            {images}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
      <div style={{ marginLeft: 425, padding: 10 }}>
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
      edges {
        node {
          publicURL
          name
        }
      }
    }
    images: allFile(
      filter: {sourceInstanceName: {eq: "images"}, fields: {coordinates: {latitude: {ne: null}, longitude: {ne: null}}}}
    ) {
      edges {
        node {
          fields {
            coordinates {
              latitude
              longitude
            }
          }
          id
          birthTime
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`;

export function Head ({ data }: PageProps<IndexData>) {
  return <title>{data.site.siteMetadata.title}</title>;
}

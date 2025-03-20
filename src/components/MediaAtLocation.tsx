import React, { PropsWithChildren, useState } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Modal from 'react-modal';
import { useMediaQuery } from 'react-responsive';
import { TbX } from 'react-icons/tb';
import { isActiveEntry } from '../ActiveEntryContext';
import { MediaNode, ImageFileNode, MovieNode } from '../types';
import MediaMarker from './MediaMarker';

type MediaProps = PropsWithChildren & {
  media: ImageFileNode | { fields: MediaNode["fields"], type: 'video' };
}

function MediaAtLocation({ media: imageOrMovie, children }: MediaProps) {
  const media = imageOrMovie.type || imageOrMovie;
  const { createDate, coordinates: { latitude, longitude } } = imageOrMovie.fields;
  const isFullscreen = useMediaQuery({ maxWidth: 768 });
  const [isOpen, setOpen] = useState(false);
  const style: Modal.Styles = (isFullscreen)
    ? {
      overlay: { zIndex: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' },
      content: { position: 'relative', padding: 0, inset: 0, maxHeight: '100vh' },
    }
    : {
      overlay: { zIndex: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' },
      content: { position: 'relative', margin: 40, inset: 0, maxHeight: '100vh' },
    };

  return isActiveEntry(createDate) && <>
    <MediaMarker media={media} position={[latitude, longitude]}
      eventHandlers={{ click: () => { setOpen(true); } }} />
    <Modal style={style} isOpen={isOpen} onRequestClose={() => { setOpen(false); }}>
      <button onClick={() => setOpen(false)}
        style={{ position: 'absolute', top: 0, right: 0, zIndex: 10, cursor: 'pointer', fontSize: '3em', backgroundColor: 'rgb(0,0,0,0.25)', borderBottomLeftRadius: 12 }}>
        <TbX />
      </button>
      {children}
    </Modal>
  </>;
}

export function ImageAtLocation(image: ImageFileNode) {
  return (
    <MediaAtLocation media={image}>
      <GatsbyImage image={getImage(image)!} objectFit="contain" style={{ maxWidth: '100%', maxHeight: '100%' }} alt={`image taken at ${new Date(image.fields.createDate).toLocaleString('en-US', { timeZone: 'America/New_York' })}`} />
    </MediaAtLocation>
  );
}

export function MovieAtLocation({ publicURL, fields }: MovieNode) {
  return (
    <MediaAtLocation media={{ fields, type: 'video' }}>
      <video src={publicURL} autoPlay controls style={{ maxWidth: '100%', maxHeight: '100%' }} />
    </MediaAtLocation>
  );
}

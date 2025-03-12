import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Marker } from 'react-leaflet';
import React, { PropsWithChildren, useState } from 'react';
import { isActiveEntry } from '../ActiveEntryContext';
import { MediaNode, ImageFileNode, MovieNode } from '../types';
import Modal from 'react-modal';
import { useMediaQuery } from 'react-responsive';
import { TbX } from 'react-icons/tb';

function MediaAtLocation({ fields, children }: Omit<MediaNode, 'id'> & PropsWithChildren) {
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

  return isActiveEntry(fields.createDate) && <>
    <Marker position={[fields.coordinates.latitude, fields.coordinates.longitude]}
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
    <MediaAtLocation fields={image.fields}>
      <GatsbyImage image={getImage(image)!} objectFit="contain" style={{ maxWidth: '100%', maxHeight: '100%' }} alt={`image taken at ${new Date(image.fields.createDate).toLocaleString('en-US', { timeZone: 'America/New_York' })}`} />
    </MediaAtLocation>
  );
}

export function MovieAtLocation({ publicURL, ...mediaProps }: MovieNode) {
  return (
    <MediaAtLocation {...mediaProps}>
      <video src={publicURL} autoPlay controls style={{ maxWidth: '100%', maxHeight: '100%' }} />
    </MediaAtLocation>
  );
}

import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Marker } from 'react-leaflet';
import React, { PropsWithChildren, useState } from 'react';
import { isActiveEntry } from '../ActiveEntryContext';
import { MediaNode, ImageFileNode, MovieNode } from '../types';
import Modal from 'react-modal';
import PhotoMarker from './PhotoMarker';

function MediaAtLocation({ fields, image, children }: Omit<MediaNode, 'id'> & {image: ImageFileNode | undefined} & PropsWithChildren) {
  const [isOpen, setOpen] = useState(false);
  return isActiveEntry(fields.createDate) && <>
    <PhotoMarker position={[fields.coordinates.latitude, fields.coordinates.longitude]} image={image} eventHandlers={{
      click: () => { setOpen(true); }
    }} />
    <Modal style={{ overlay: { display: 'flex', justifyContent: 'center', alignItems: 'center' }, content: { position: 'static', margin: 40 } }} isOpen={isOpen} onRequestClose={() => { setOpen(false); }}>
      {children}
    </Modal>
  </>;
}

export function ImageAtLocation(image: ImageFileNode) {
  return (
    <MediaAtLocation fields={image.fields} image={image}>
      <GatsbyImage image={getImage(image)!} style={{ maxWidth: '100%', maxHeight: '100%' }} alt={`image taken at ${new Date(image.fields.createDate).toLocaleString('en-US', { timeZone: 'America/New_York' })}`} />
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

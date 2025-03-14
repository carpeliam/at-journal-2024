import React, { useEffect } from 'react';
import { useLeafletContext } from '@react-leaflet/core';
import * as L from 'leaflet';
import { ImageFileNode } from '../types';
import { getImage, getSrcSet } from 'gatsby-plugin-image';
import { ImageDataLike } from 'gatsby-plugin-image';
import { Marker } from 'react-leaflet';
require('../vendor/leaflet.photomarker');

export default function PhotoMarker({ position: [lat, lng], eventHandlers, image }: { position: [number, number], eventHandlers: any, image: ImageDataLike | undefined }) {
  console.log(eventHandlers);
  let src: string;
  let size: [number, number];
  if (image) {
    const imageData = getImage(image)!;
    const srcSet = getSrcSet(image)!;
    src = srcSet.split(",\n")[0].split(' ')[0];
    const ratio = imageData.width / imageData.height;
    const width = 100;
    // oW / oH == 20 / h
    // 100 / 50 = 20 / h
    // 2 / 
    const height = width / ratio;
    size = [width, height];
  }
  const context = useLeafletContext();


  useEffect(() => {
    if (image) {
      const marker = L.photoMarker([lat, lng], {
        src,
        size,
      });
      marker.on('click', () => {
        console.log('clicked!');
        eventHandlers.click();
      });
      const container = context.layerContainer || context.map;
      container.addLayer(marker);

      return () => {
        container.removeLayer(marker);
      }
    }
  }, []);

  return (image) ? null : <Marker position={[lat, lng]} eventHandlers={eventHandlers} />;
}
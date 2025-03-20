import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import MediaMarker from '../src/components/MediaMarker';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { MapContainer } from 'react-leaflet';

const position = [0, 0];

describe('MediaMarker', () => {
    describe('for photos', () => {
        it('shrinks landscape photos', () => {
            renderPhotoMarker({ dimensions: [1280, 960] });
            const { width, height } = screen.getByRole('button', { name: 'Marker' }).style;
            expect([width, height]).toEqual(['51.2px', '38.4px']);
        });

        it('shrinks portrait photos', () => {
            renderPhotoMarker({ dimensions: [960, 1280] });
            const { width, height } = screen.getByRole('button', { name: 'Marker' }).style;
            expect([width, height]).toEqual(['38.4px', '51.2px']);
        });

        it('uses the smallest image from the source set as an icon', () => {
            renderPhotoMarker({ srcSet: 'img1.jpg 360w\nimg2.jpg 720w' });
            expect(screen.getByRole('button', { name: 'Marker' }).getAttribute('src')).toEqual('img1.jpg');
        });

        function renderPhotoMarker({ dimensions = [1, 1], srcSet = 'img1.jpg' }: { dimensions?: [number, number], srcSet?: string }) {
            const [width, height] = dimensions;
            const image: IGatsbyImageData = {
                layout: 'fixed',
                width,
                height,
                images: {
                    fallback: { src: 'img.jpg', srcSet },
                },
            };
            return render(
                <MapContainer style={{ width: 100, height: 100 }} center={[0, 0]} zoom={5}>
                    <MediaMarker media={image} position={[0, 0]} />
                </MapContainer>
            );
        }
    });

    describe('for videos', () => {
        it('renders an icon', () => {
            renderVideoMarker();
            const marker = screen.getByRole('button', { name: '' });
            expect(marker.getElementsByTagName('svg')).not.toHaveLength(0);
        });

        function renderVideoMarker() {
            return render(
                <MapContainer style={{ width: 100, height: 100 }} center={[0, 0]} zoom={5}>
                    <MediaMarker media="video" position={[0, 0]} />
                </MapContainer>
            );
        }
    });
});

import React from 'react';
import { Icon, icon as leafletIcon, divIcon, BaseIconOptions } from 'leaflet';
import { Marker, MarkerProps } from 'react-leaflet';
import { getImage, getSrcSet, ImageDataLike } from 'gatsby-plugin-image';
import { FcVideoCall } from "react-icons/fc";
import { renderToString } from 'react-dom/server';

interface MediaMarkerProps extends MarkerProps {
    media: ImageDataLike | 'video';
}

export default function MediaMarker({ media, ...markerProps }: MediaMarkerProps) {
    let icon: Icon<BaseIconOptions>;
    if (media === 'video') {
        icon = divIcon({
            html: renderToString(<FcVideoCall style={{ width: '100%', height: '100%' }} />),
            iconSize: [35, 35],
            className: undefined,
        });
    } else {
        const image = getImage(media)!;
        const srcSet = getSrcSet(media)!;
        const smallestImage = srcSet.split(',').sort((a, b) => sourceInfo(a).width - sourceInfo(b).width)[0];
        const iconUrl = sourceInfo(smallestImage).url;
        icon = leafletIcon({ iconUrl, iconSize: [image.width / 25, image.height / 25] });
    }
    return <Marker icon={icon} {...markerProps} />;
}

function sourceInfo(srcSetMember: string) {
    const { url, width } = srcSetMember.match(/\s*(?<url>[^\s]+)(\s(?<width>\d+)w)?/)?.groups!;
    return { url, width: parseInt(width, 10) };
}

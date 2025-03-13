import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import { activateOnFocus } from '../ActiveEntryContext';
import { IndexData } from '../types';

export default function Preface({ metadata }: { metadata: IndexData["site"]["siteMetadata"] }) {
    const ref = activateOnFocus(undefined);
    return (
      <header className="mb-4" ref={ref}>
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
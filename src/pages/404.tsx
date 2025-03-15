import React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

export default function NotFoundPage() {
  return (
    <>
      <header>
        <StaticImage
          src="../images/IMG_7088.jpeg"
          alt="This is not the AT"
          layout="fullWidth"
          loading="eager"
          aspectRatio={3 / 1}
          transformOptions={{ cropFocus: 'centre' }}
        />
      </header>
      <main className="m-4">
        <h1>You've found yourself off trail.</h1>
        <Link to="/">Return home</Link>.
      </main>
    </>
  )
}

export function Head() {
  return <title>Not found</title>;
}

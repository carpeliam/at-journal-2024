# Trail Journal

## Run

1. Place images and movies in `src/images`. Media should have exif data containing creation date and latitude/longitude.
2. Start up the app:
    ```sh
    npm install
    npm start
    ```

## Fork

This journal is made to be easily forkable, so that you can tailor it to your own adventure. Here are some steps to customize:

1. Update `siteMetadata` title and description in the `gatsby-config.ts` file.
2. Replace `src/entries` with markdown data detailing journal entries. The app currently assumes that each entry will have Garmin health data around Sleep Score, Feedback, Recovery Time, etc. That can be collected from a Garmin export. If you place `TrainingReadiness*.json` data in the `scripts` directory, you can use the `./scripts/transform-frontmatter.js` to populate relevant Garmin data for any entries that already exist in the `src/entries` directory.
3. Replace `src/geojson` with geojson data detailing map data for each given day, with each file following a naming convention of `yyyy-mm-dd_hiking.geojson`. Currently, elevation data is ignored. I developed [a tool to extract and convert relevant geojson data from a Garmin export](https://github.com/carpeliam/bulk_fit2geojson), if that's helpful.
4. Add images and media to `src/images` with exif tags for creation date and latitude/longitude. If you export images and videos from MacOS Photos, you can use `./scripts/media.sh` to compress images and movies to a smaller size suitable for web. Before running, you'll need to install `HandbrakeCLI` and `jpegoptim`.
5. After tweaking the site, you can deploy it to GitHub Pages via `npm run deploy`.

import { graphql, useStaticQuery } from 'gatsby';

export function useTimeZone() {
  const { site: { siteMetadata: { timeZone } } } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          timeZone
        }
      }
    }
  `);
  return timeZone;
}

export function useDateFormat() {
  const timeZone = useTimeZone();
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'medium', timeZone });
}

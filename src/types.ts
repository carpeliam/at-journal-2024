import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks';

export type GeoJSONFileNode = {
    publicURL: string;
    name: string;
  }
  export type MediaNode = {
    fields: {
      coordinates: {
        latitude: number;
        longitude: number;
      }
      createDate: string;
    }
    id: string;
  };

  export type ImageFileNode = MediaNode & FileNode;
  export type MovieNode = MediaNode & {
    publicURL: string;
  }

  type GarminFeedback =
    'TIME_TO_RECHARGE' | 'LISTEN_TO_YOUR_BODY' | 'FOCUS_ON_RECOVERY' | 'FIND_TIME_TO_RELAX' | 'LET_YOUR_BODY_RECOVER' | 'TAKE_IT_EASY' | 'TIME_TO_SLOW_DOWN' |

    'BALANCE_STRESS_AND_RECOVERY' | 'FOCUS_ON_SLEEP_PATTERNS' | 'FOCUS_ON_SLEEP_QUALITY' | 'FOCUS_ON_ENERGY_LEVELS' |

    'RECOVERY_IN_PROGRESS' |

    'GOOD_SLEEP_LAST_NIGHT' | 'GOOD_RECOVERY' | 'WELL_RECOVERED' |

    'RECOVERED_AND_READY' | 'READY_FOR_THE_DAY' | 'TAKE_ON_THE_DAY';
  export type MarkdownNode = {
    frontmatter: {
      day: number;
      date: string;
      start: string | null;
      destination: string | null;
      end: number;
      sleep: 'Tent' | 'Shelter' | 'Building';
      mood: '🙂' | '😐';
      sleepScore: number;
      garminFeedback: GarminFeedback;
      trainingReadiness: number;
  }
    html: string;
  }
  export type IndexData = {
    site: {
      siteMetadata: {
        description: string;
        siteUrl: string;
        title: string;
      }
    }
    geojson: {
      nodes: GeoJSONFileNode[];
    }
    images: {
      nodes: ImageFileNode[];
    }
    movies: {
      nodes: MovieNode[];
    }
    allMarkdownRemark: {
      edges: {
        node: MarkdownNode;
        previous: Pick<MarkdownNode, "frontmatter"> | null;
      }[];
    }
  }

import { http, HttpResponse } from 'msw'
 
export const handlers = [
  http.get('/static/abc/2024-04-03-day1.geojson', () => {
    return HttpResponse.json({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {type: 'LineString', coordinates: [[-84.25019346177578,34.55811277963221,571.8], [-84.24980311654508,34.55809216015041,571.8]]}
        }
      ]
    })
  }),
]
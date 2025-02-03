import {describe, expect, test, it} from '@jest/globals';

import React from "react"
import { render, screen } from "@testing-library/react"
import IndexPage from "../src/pages/index.tsx"
// import { graphql } from '../__mocks__/gatsby.js';
// import { graphql} from 'gatsby';
// jest.mock('gatsby');


// You have to write data-testid
const Title = () => <h1 data-testid="hero-title">Gatsby is awesome!</h1>

test("Displays the correct title", () => {
  require('gatsby').useStaticQuery.mockReturnValue({ file: { publicURL: "/static/abc/2024-04-03-day1.geojson" } } )
  render(<IndexPage />)
  // Assertion
  // expect(getByTestId("hero-title")).toHaveTextContent("Gatsby is awesome!")
  expect(screen.getByText(/you just made a Gatsby site!/)).toBeInTheDocument()
  // --> Test will pass
})



const props = {
  "path":"/","location":{"pathname":"/","search":"","hash":"","href":"http://localhost:8000/","origin":"http://localhost:8000","protocol":"http:","host":"localhost:8000","hostname":"localhost","port":"8000","state":null,"key":"initial"},"pageResources":{"component":{},"head":{},"json":{"pageContext":{},"serverData":null},"page":{"componentChunkName":"component---src-pages-index-tsx","path":"/","webpackCompilationHash":"123","staticQueryHashes":["1225649899"],"slicesMap":{}},"staticQueryResults":{"1225649899":{"data":{"allFile":{"edges":[{"node":{"publicURL":"/static/a20ffba041e11c62c0d494e1b4dec44f/liam@carpeliam.com_245557262066.fit.geojson"}},{"node":{"publicURL":"/static/abab60ffb04661019f93ac7cf5d19b01/liam@carpeliam.com_245553021231.fit.geojson"}},{"node":{"publicURL":"/static/701a1784896d4f39946dbb03dff14cf1/liam@carpeliam.com_245853360717.fit.geojson"}},{"node":{"publicURL":"/static/dd8cdfe9d8433ac15bf11d59987ae56c/liam@carpeliam.com_245557878343.fit.geojson"}},{"node":{"publicURL":"/static/9f83a87ad6f81f4e1e51cfb75f57445e/liam@carpeliam.com_245956353427.fit.geojson"}},{"node":{"publicURL":"/static/6ca78131b4ad1f27d155956da2e7de93/liam@carpeliam.com_247195433171.fit.geojson"}},{"node":{"publicURL":"/static/35831354ee0f55b2e3e62722a9aae2cf/liam@carpeliam.com_246861680918.fit.geojson"}},{"node":{"publicURL":"/static/354322f4269f4e3c4b56543aa6bd77b3/liam@carpeliam.com_247195688670.fit.geojson"}},{"node":{"publicURL":"/static/85f8dbcd3bcf847326e59623f216b957/liam@carpeliam.com_247279435641.fit.geojson"}},{"node":{"publicURL":"/static/3428479d33084c7b88a6da3d549a0491/liam@carpeliam.com_247597771975.fit.geojson"}},{"node":{"publicURL":"/static/5a055f204937aa0b40e7fe1e5d804f8c/liam@carpeliam.com_247280165056.fit.geojson"}},{"node":{"publicURL":"/static/07cb1f31c17a9a8782a6bdaba7f400e8/liam@carpeliam.com_247598025376.fit.geojson"}},{"node":{"publicURL":"/static/5f02c4b13932c33c693ac6c3b0025901/liam@carpeliam.com_248747947054.fit.geojson"}},{"node":{"publicURL":"/static/8347fb099dcc74c98624fee6d20f6dbc/liam@carpeliam.com_248894945204.fit.geojson"}},{"node":{"publicURL":"/static/011be9e19afac6aa183d13659fbc68a3/liam@carpeliam.com_248901652499.fit.geojson"}},{"node":{"publicURL":"/static/1890e92407e260f9c807d305df2dc17e/liam@carpeliam.com_248902125405.fit.geojson"}},{"node":{"publicURL":"/static/105401fbcbbee3405074b5670c5500ca/liam@carpeliam.com_248900264629.fit.geojson"}},{"node":{"publicURL":"/static/868a24b3e7323b4954c7c7e75fcebfe1/liam@carpeliam.com_248900947341.fit.geojson"}},{"node":{"publicURL":"/static/24d8ec11bcedc321826d1b7abffeacd8/liam@carpeliam.com_249181954763.fit.geojson"}},{"node":{"publicURL":"/static/f70ec748ce4f75c1a0cfb7c5d2967eb7/liam@carpeliam.com_248902216828.fit.geojson"}},{"node":{"publicURL":"/static/cfcb0dc43731faa3704b5f2858555b37/liam@carpeliam.com_249786987207.fit.geojson"}},{"node":{"publicURL":"/static/514fb1d0be369844e97bc8442dacc232/liam@carpeliam.com_249786704623.fit.geojson"}},{"node":{"publicURL":"/static/224aa632cf48e32cd062f7492f9109bc/liam@carpeliam.com_249758004698.fit.geojson"}},{"node":{"publicURL":"/static/4b91c07846666d1cdac60ac1af90797e/liam@carpeliam.com_247597154816.fit.geojson"}}]},"file":{"publicURL":"/static/a20ffba041e11c62c0d494e1b4dec44f/liam@carpeliam.com_245557262066.fit.geojson"}}}}},"uri":"/","pageContext":{},"serverData":null,"params":{}
}

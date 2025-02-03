import "@testing-library/jest-dom"
import { beforeAll, afterEach, afterAll } from "@jest/globals"
import { server } from "./spec/fetchmock/node"

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
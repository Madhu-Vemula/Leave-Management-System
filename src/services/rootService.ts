import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3000"

/**
 * The `rootApi` is an instance of `createApi` from Redux Toolkit Query (RTK Query).
 * It serves as the central API service for managing API calls and caching in the application.
 *
 * @constant
 * @type {Api}
 *
 * @property {string} reducerPath - The unique key used to identify the API slice in the Redux store.
 * @property {BaseQueryFn} baseQuery - The base query function used to make HTTP requests. 
 * It is configured with a `baseUrl` for all API calls.
 * @property {string[]} tagTypes - An array of tag names used for cache invalidation and refetching.
 * In this case, it includes "Employee" and "Leave".
 * @property {(builder: EndpointBuilder) => Record<string, EndpointDefinition>} endpoints - 
 * A function that defines the API endpoints. Currently, it is an empty object.
 *
 * @see {@link https://redux-toolkit.js.org/rtk-query/overview} for more details on RTK Query.
 */
const rootApi = createApi({
    reducerPath: "rootApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ["Employee", 'Leave'],
    endpoints: () => ({})
})
export default rootApi
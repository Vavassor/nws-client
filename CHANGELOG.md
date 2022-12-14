# Versions

## v0.7.0

Released November 27, 2022.

### @vavassor/nws-client v0.7.0

- Fixes type errors where many endpoints were mistakenly returning the type `Promise<string>`.
- Adds fetching stations and alerts by URI, to improve pagination support.

## v0.6.0

Released November 27, 2022.

### @vavassor/nws-client v0.6.0

- Reverts the non-working fix for Network Inspect in React Native Debugger.
- Adds aviation endpoints.
- Adds Terminal Aerodrome Forecast (TAF) endpoints.
- Adds pagination support to all station endpoints.
- Adds support for XML formats including ATOM, CAP, DWML, IWXXM, OXML, and USWX.

## v0.5.0

Released November 17, 2022.

### @vavassor/nws-client v0.5.0

- Fixes an issue where [Network Inspect in React Native Debugger causes calls to fail](https://github.com/lquixada/cross-fetch/issues/71).

## v0.4.0

Released November 15, 2022.

### @vavassor/nws-client v0.4.0

- Fixes endpoints that return data in JSON-LD format throwing an error despite succeeding.
- Makes endpoint argument objects optional when there are no required arguments.

## v0.3.0

Released November 4, 2022.

### @vavassor/nws-client v0.3.0

- Creates separate functions for endpoints that return data in either GeoJSON or JSON-LD format. This is so that users writing Typescript don't have to cast the return value, or use typeguards.
- Removes the previous functions that let you specify the format as a parameter.

## v0.2.0

Released November 4, 2022.

### @vavassor/nws-client v0.2.0

- Fixes React Native compatibility due to [React Native's URL implementation](https://github.com/facebook/react-native/blob/44f3234d1f4d21f779f2dfb3b9dbe16249e7c9d2/Libraries/Blob/URL.js) not supporting many methods.
- Fixes type errors in all resources.

## v0.1.0

Released October 27, 2022.

### @vavassor/nws-client v0.1.0

- Added full support for all endpoints in the NWS API.
- Added a client to help obtain forecasts.
- Added utilities to work with the data returned from the API.

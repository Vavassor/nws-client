import crossFetch from "cross-fetch";

declare let global: any;

export const fetchPonyfill = global.fetch
  ? global.fetch.bind(global)
  : crossFetch;

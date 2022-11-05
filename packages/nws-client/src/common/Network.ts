import { isProblemDetail } from "./CommonTypeguards";
import { ProblemDetail, ResponseWithoutBodyError } from "./CommonTypes";
import fetch from "cross-fetch";

type QueryStringValue =
  | boolean
  | boolean[]
  | number[]
  | number
  | string
  | string[];

export interface JsonArgs {
  body?: string | FormData;
  endpoint: string;
  headers: Record<string, string>;
  method: "GET" | "POST" | "PUT" | "DELETE";
  signal?: AbortSignal;
}

export interface SimpleGetRequestArgs {
  endpoint: string;
  format: string;
  userAgent?: string;
}

export const addQueryString = (
  path: string,
  parameters: Partial<Record<string, QueryStringValue>>
) => {
  // The below implementation avoids using URLSearchParams because most of its
  // methods aren't supported in React Native.
  // https://github.com/facebook/react-native/blob/87c356d56c73c3289da3d5911288909720b11994/Libraries/Blob/URL.js#L56
  const pathWithSlash = ensureEnd(path, "/");
  const entries = Object.entries(parameters)
    .map(([key, value]) => [key, getQueryValue(value)])
    .filter(
      (entry): entry is [string, string] => typeof entry[1] !== "undefined"
    );
  const sortedEntries = Array.from(entries).sort((a, b) =>
    a[0] > b[0] ? 1 : -1
  );
  const queryString = sortedEntries
    .map(
      ([key, value]) =>
        `${encodeUriComponentRfc3986(key)}=${encodeUriComponentRfc3986(value)}`
    )
    .join("&");

  return queryString ? `${pathWithSlash}?${queryString}` : pathWithSlash;
};

export const getStringRecord = (
  headers: Record<string, string | undefined>
): Record<string, string> => {
  return Object.entries(headers)
    .filter((entry): entry is [string, string] => typeof entry[1] !== "string")
    .reduce((obj, [key, val]) => {
      obj[key] = val;
      return obj;
    }, {} as Record<string, string>);
};

export const getStringArrayHeader = (values: string[] | undefined) => {
  return values && values.length > 0 ? values.join(", ") : undefined;
};

export async function jsonRequest<ResponseType>(
  args: JsonArgs
): Promise<ResponseType> {
  const { endpoint, method, headers, body, signal } = args;
  const options: RequestInit = {
    method,
    headers,
    body,
    mode: "cors",
    signal,
  };
  const response = await fetch(endpoint, options);

  if (!response.ok) {
    let problemDetail: ProblemDetail;
    try {
      const json = await response.json();
      if (!isProblemDetail(json)) {
        throw Error("The response body was not a ProblemDetail.");
      }
      problemDetail = json;
    } catch (error) {
      const genericError: ResponseWithoutBodyError = {
        message: "Something went wrong",
        status: response.status,
        statusText: response.statusText,
      };
      throw genericError;
    }
    throw problemDetail;
  }

  return await response.json();
}

export function simpleGetRequest<T>({
  endpoint,
  format,
  userAgent,
}: SimpleGetRequestArgs) {
  return jsonRequest<T>({
    endpoint,
    headers: getStringRecord({
      Accept: format,
      "User-Agent": userAgent,
    }),
    method: "GET",
  });
}

/**
 * Encodes characters in part of a URI that are reserved according to RFC 3986.
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc3986 | RFC 3986}
 */
const encodeUriComponentRfc3986 = (value: string) => {
  return encodeURIComponent(value).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
  );
};

const ensureEnd = (value: string, end: string) => {
  return value.endsWith(end) ? value : value.concat(end);
};

const getQueryValue = (value: QueryStringValue | undefined) => {
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  } else if (typeof value === "number") {
    return value.toString();
  } else if (typeof value === "string" && value.length > 0) {
    return value;
  } else if (Array.isArray(value) && value.length > 0) {
    return value.join(",");
  } else {
    return undefined;
  }
};

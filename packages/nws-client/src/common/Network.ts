import { isErrorResponse } from "./CommonTypeguards";
import { ErrorResponse, ResponseWithoutBodyError } from "./CommonTypes";

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

export interface JsonReturnType<T> {
  json: T;
  status: number;
  ok: boolean;
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
  const urlSearchParams = new URLSearchParams();

  Object.entries(parameters).forEach(([key, value]) => {
    const stringValue = getQueryValue(value);
    if (typeof stringValue !== "undefined") {
      urlSearchParams.set(key, stringValue);
    }
  });

  urlSearchParams.sort();

  const queryString = urlSearchParams.toString();

  if (queryString.length > 0) {
    return `${path}?${queryString}`;
  } else {
    return path;
  }
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
): Promise<JsonReturnType<ResponseType>> {
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
    let errorResponse: ErrorResponse;
    try {
      const json = await response.json();
      if (!isErrorResponse(json)) {
        throw Error("The response body was not an ErrorResponse.");
      }
      errorResponse = json;
    } catch (error) {
      const genericError: ResponseWithoutBodyError = {
        message: "Something went wrong",
        status: response.status,
        statusText: response.statusText,
      };
      throw genericError;
    }
    throw errorResponse;
  }

  const json = await response.json();

  return {
    json,
    status: response.status,
    ok: response.ok,
  };
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

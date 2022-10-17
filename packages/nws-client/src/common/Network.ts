import { isErrorResponse } from "./CommonTypeguards";
import { ErrorResponse, ResponseWithoutBodyError } from "./CommonTypes";

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
}

export const addQueryString = (
  path: string,
  parameters: Partial<Record<string, string>>
) => {
  const urlSearchParams = new URLSearchParams();
  Object.entries(parameters).forEach(([key, value]) => {
    if (value) {
      urlSearchParams.set(key, value);
    }
  });
  const queryString = urlSearchParams.toString();

  if (queryString.length > 0) {
    return `${path}?${queryString}`;
  } else {
    return path;
  }
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
}: SimpleGetRequestArgs) {
  return jsonRequest<T>({
    endpoint,
    headers: {
      Accept: format,
    },
    method: "GET",
  });
}

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

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const isErrorResponse = (value: unknown): value is ErrorResponse => {
  return (
    isRecord(value) &&
    typeof value.correlationId === "string" &&
    typeof value.instance === "string"
  );
};

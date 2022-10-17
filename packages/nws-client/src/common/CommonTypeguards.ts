import { ErrorResponse, ResponseWithoutBodyError } from "./CommonTypes";

export const isErrorResponse = (value: unknown): value is ErrorResponse => {
  return (
    isRecord(value) &&
    typeof value.correlationId === "string" &&
    typeof value.instance === "string"
  );
};

export const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

export const isResponseWithoutBodyError = (
  value: unknown
): value is ResponseWithoutBodyError => {
  return (
    isRecord(value) &&
    typeof value.message === "string" &&
    typeof value.status === "number" &&
    typeof value.statusText === "string"
  );
};

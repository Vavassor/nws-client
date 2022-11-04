import { Format } from "./CommonTypes";

type GenericRequest<ArgsType> = (
  args: ArgsType,
  format: Format
) => Promise<unknown>;

type ResultTypeguard<ResultType> = (value: unknown) => value is ResultType;

/** Request data and check that the result is the expected format. */
export async function requestInFormat<ArgsType, ReturnType>(
  args: ArgsType,
  format: Format,
  typeguard: ResultTypeguard<ReturnType>,
  request: GenericRequest<ArgsType>
) {
  const result = await request(args, format);
  if (typeguard(result)) {
    return result;
  } else {
    throw Error(`The response body does not match format ${format}.`);
  }
}

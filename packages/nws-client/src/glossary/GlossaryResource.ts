import { BaseEndpointArgs, Format } from "../common";
import { apiRoot } from "../common/CommonConstants";
import { simpleGetRequest } from "../common/Network";
import { Glossary } from "./GlossaryTypes";

/**
 * Get all glossary definitions.
 */
export const getGlossary = (args: BaseEndpointArgs = {}) => {
  const { userAgent } = args;
  return simpleGetRequest<Glossary>({
    endpoint: `${apiRoot}/glossary`,
    format: Format.JsonLd,
    userAgent,
  });
};

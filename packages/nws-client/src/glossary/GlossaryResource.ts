import { BaseEndpointArgs, Format } from "../common";
import { apiRoot } from "../common/CommonConstants";
import { simpleGetRequest } from "../common/Network";
import { Glossary } from "./GlossaryTypes";

export const getGlossary = ({ userAgent }: BaseEndpointArgs = {}) => {
  return simpleGetRequest<Glossary>({
    endpoint: `${apiRoot}/glossary`,
    format: Format.JsonLd,
    userAgent,
  });
};

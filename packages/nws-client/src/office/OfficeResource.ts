import { BaseEndpointArgs, Format } from "../common";
import { apiRoot } from "../common/CommonConstants";
import { simpleGetRequest } from "../common/Network";
import {
  Office,
  OfficeHeadline,
  OfficeHeadlineCollection,
} from "./OfficeTypes";

interface GetOfficeArgs extends BaseEndpointArgs {
  officeId: string;
}

interface GetOfficeByUriArgs extends BaseEndpointArgs {
  uri: string;
}

interface GetOfficeHeadlineArgs extends BaseEndpointArgs {
  headlineId: string;
  officeId: string;
}

interface GetOfficeHeadlinesArgs extends BaseEndpointArgs {
  officeId: string;
}

export const getOffice = (args: GetOfficeArgs) => {
  const { officeId, userAgent } = args;
  return simpleGetRequest<Office>({
    endpoint: `${apiRoot}/offices/${officeId}`,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getOfficeByUri = (args: GetOfficeByUriArgs) => {
  const { uri, userAgent } = args;
  return simpleGetRequest<Office>({
    endpoint: uri,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getOfficeHeadline = (args: GetOfficeHeadlineArgs) => {
  const { headlineId, officeId, userAgent } = args;
  return simpleGetRequest<OfficeHeadline>({
    endpoint: `${apiRoot}/offices/${officeId}/headlines/${headlineId}`,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getOfficeHeadlines = (args: GetOfficeHeadlinesArgs) => {
  const { officeId, userAgent } = args;
  return simpleGetRequest<OfficeHeadlineCollection>({
    endpoint: `${apiRoot}/offices/${officeId}/headlines`,
    format: Format.JsonLd,
    userAgent,
  });
};

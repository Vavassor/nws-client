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

interface GetOfficeHeadlineArgs extends BaseEndpointArgs {
  headlineId: string;
  officeId: string;
}

interface GetOfficeHeadlinesArgs extends BaseEndpointArgs {
  officeId: string;
}

export const getOffice = ({ officeId, userAgent }: GetOfficeArgs) => {
  return simpleGetRequest<Office>({
    endpoint: `${apiRoot}/offices/${officeId}`,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getOfficeHeadline = ({
  headlineId,
  officeId,
  userAgent,
}: GetOfficeHeadlineArgs) => {
  return simpleGetRequest<OfficeHeadline>({
    endpoint: `${apiRoot}/offices/${officeId}/headlines/${headlineId}`,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getOfficeHeadlines = ({
  officeId,
  userAgent,
}: GetOfficeHeadlinesArgs) => {
  return simpleGetRequest<OfficeHeadlineCollection>({
    endpoint: `${apiRoot}/offices/${officeId}/headlines`,
    format: Format.JsonLd,
    userAgent,
  });
};

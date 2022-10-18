import { Format } from "../common";
import { apiRoot } from "../common/CommonConstants";
import { simpleGetRequest } from "../common/Network";
import {
  Office,
  OfficeHeadline,
  OfficeHeadlineCollection,
} from "./OfficeTypes";

interface GetOfficeArgs {
  officeId: string;
}

interface GetOfficeHeadlineArgs {
  headlineId: string;
  officeId: string;
}

interface GetOfficeHeadlinesArgs {
  officeId: string;
}

export const getOffice = ({ officeId }: GetOfficeArgs) => {
  return simpleGetRequest<Office>({
    endpoint: `${apiRoot}/offices/${officeId}`,
    format: Format.JsonLd,
  });
};

export const getOfficeHeadline = ({
  headlineId,
  officeId,
}: GetOfficeHeadlineArgs) => {
  return simpleGetRequest<OfficeHeadline>({
    endpoint: `${apiRoot}/offices/${officeId}/headlines/${headlineId}`,
    format: Format.JsonLd,
  });
};

export const getOfficeHeadlines = ({ officeId }: GetOfficeHeadlinesArgs) => {
  return simpleGetRequest<OfficeHeadlineCollection>({
    endpoint: `${apiRoot}/offices/${officeId}/headlines`,
    format: Format.JsonLd,
  });
};

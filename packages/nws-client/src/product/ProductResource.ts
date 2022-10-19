import { BaseEndpointArgs, Format } from "../common";
import { apiRoot } from "../common/CommonConstants";
import { addQueryString, simpleGetRequest } from "../common/Network";
import {
  TextProduct,
  TextProductCollection,
  TextProductLocationCollection,
  TextProductTypeCollection,
} from "./ProductTypes";

interface GetProductArgs extends BaseEndpointArgs {
  productId: string;
}

interface GetProductLocationsByTypeArgs extends BaseEndpointArgs {
  typeId: string;
}

interface GetProductTypesByLocationArgs extends BaseEndpointArgs {
  locationId: string;
}

interface GetProductsArgs extends BaseEndpointArgs {
  end?: string;
  limit?: number;
  location?: string[];
  office?: string[];
  start?: string;
  type?: string[];
  wmoid?: string[];
}

interface GetProductsByTypeAndLocationArgs extends BaseEndpointArgs {
  locationId: string;
  typeId: string;
}

interface GetProductsByTypeArgs extends BaseEndpointArgs {
  typeId: string;
}

export const getProduct = ({ productId, userAgent }: GetProductArgs) => {
  return simpleGetRequest<TextProduct>({
    endpoint: `${apiRoot}/products/${productId}`,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getProductLocations = ({ userAgent }: BaseEndpointArgs) => {
  return simpleGetRequest<TextProductLocationCollection>({
    endpoint: `${apiRoot}/products/locations`,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getProductLocationsByType = ({
  typeId,
  userAgent,
}: GetProductLocationsByTypeArgs) => {
  return simpleGetRequest<TextProductLocationCollection>({
    endpoint: `${apiRoot}/products/types/${typeId}/locations`,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getProductTypes = ({ userAgent }: BaseEndpointArgs) => {
  return simpleGetRequest<TextProductTypeCollection>({
    endpoint: `${apiRoot}/products/types`,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getProductTypesByLocation = ({
  locationId,
  userAgent,
}: GetProductTypesByLocationArgs) => {
  return simpleGetRequest<TextProductTypeCollection>({
    endpoint: `${apiRoot}/products/locations/${locationId}/types`,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getProducts = ({
  end,
  limit,
  location,
  office,
  start,
  type,
  userAgent,
  wmoid,
}: GetProductsArgs) => {
  const endpoint = addQueryString(`${apiRoot}/products`, {
    end,
    limit,
    location,
    office,
    start,
    type,
    wmoid,
  });

  return simpleGetRequest<TextProductCollection>({
    endpoint,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getProductsByType = ({
  typeId,
  userAgent,
}: GetProductsByTypeArgs) => {
  return simpleGetRequest<TextProductCollection>({
    endpoint: `${apiRoot}/products/types/${typeId}`,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getProductsByTypeAndLocation = ({
  locationId,
  typeId,
  userAgent,
}: GetProductsByTypeAndLocationArgs) => {
  return simpleGetRequest<TextProductCollection>({
    endpoint: `${apiRoot}/products/types/${typeId}/locations/${locationId}`,
    format: Format.JsonLd,
    userAgent,
  });
};

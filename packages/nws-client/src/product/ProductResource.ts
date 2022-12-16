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

export const getProduct = (args: GetProductArgs) => {
  const { productId, userAgent } = args;
  return simpleGetRequest<TextProduct>({
    endpoint: `${apiRoot}/products/${productId}`,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getProductLocations = (args: BaseEndpointArgs = {}) => {
  const { userAgent } = args;
  return simpleGetRequest<TextProductLocationCollection>({
    endpoint: `${apiRoot}/products/locations`,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getProductLocationsByType = (
  args: GetProductLocationsByTypeArgs
) => {
  const { typeId, userAgent } = args;
  return simpleGetRequest<TextProductLocationCollection>({
    endpoint: `${apiRoot}/products/types/${typeId}/locations`,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getProductTypes = (args: BaseEndpointArgs = {}) => {
  const { userAgent } = args;
  return simpleGetRequest<TextProductTypeCollection>({
    endpoint: `${apiRoot}/products/types`,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getProductTypesByLocation = (
  args: GetProductTypesByLocationArgs
) => {
  const { locationId, userAgent } = args;
  return simpleGetRequest<TextProductTypeCollection>({
    endpoint: `${apiRoot}/products/locations/${locationId}/types`,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getProducts = (args: GetProductsArgs = {}) => {
  const { end, limit, location, office, start, type, userAgent, wmoid } = args;
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

export const getProductsByType = (args: GetProductsByTypeArgs) => {
  const { typeId, userAgent } = args;
  return simpleGetRequest<TextProductCollection>({
    endpoint: `${apiRoot}/products/types/${typeId}`,
    format: Format.JsonLd,
    userAgent,
  });
};

export const getProductsByTypeAndLocation = (
  args: GetProductsByTypeAndLocationArgs
) => {
  const { locationId, typeId, userAgent } = args;
  return simpleGetRequest<TextProductCollection>({
    endpoint: `${apiRoot}/products/types/${typeId}/locations/${locationId}`,
    format: Format.JsonLd,
    userAgent,
  });
};

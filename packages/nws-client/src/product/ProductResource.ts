import { Format } from "../common";
import { apiRoot } from "../common/CommonConstants";
import { addQueryString, simpleGetRequest } from "../common/Network";
import {
  TextProduct,
  TextProductCollection,
  TextProductLocationCollection,
  TextProductTypeCollection,
} from "./ProductTypes";

interface GetProductArgs {
  productId: string;
}

interface GetProductLocationsByTypeArgs {
  typeId: string;
}

interface GetProductTypesByLocationArgs {
  locationId: string;
}

interface GetProductsArgs {
  end?: string;
  limit?: number;
  location?: string[];
  office?: string[];
  start?: string;
  type?: string[];
  wmoid?: string[];
}

interface GetProductsByTypeAndLocationArgs {
  locationId: string;
  typeId: string;
}

interface GetProductsByTypeArgs {
  typeId: string;
}

export const getProduct = ({ productId }: GetProductArgs) => {
  return simpleGetRequest<TextProduct>({
    endpoint: `${apiRoot}/products/${productId}`,
    format: Format.JsonLd,
  });
};

export const getProductLocations = () => {
  return simpleGetRequest<TextProductLocationCollection>({
    endpoint: `${apiRoot}/products/locations`,
    format: Format.JsonLd,
  });
};

export const getProductLocationsByType = ({
  typeId,
}: GetProductLocationsByTypeArgs) => {
  return simpleGetRequest<TextProductLocationCollection>({
    endpoint: `${apiRoot}/products/types/${typeId}/locations`,
    format: Format.JsonLd,
  });
};

export const getProductTypes = () => {
  return simpleGetRequest<TextProductTypeCollection>({
    endpoint: `${apiRoot}/products/types`,
    format: Format.JsonLd,
  });
};

export const getProductTypesByLocation = ({
  locationId,
}: GetProductTypesByLocationArgs) => {
  return simpleGetRequest<TextProductTypeCollection>({
    endpoint: `${apiRoot}/products/locations/${locationId}/types`,
    format: Format.JsonLd,
  });
};

export const getProducts = ({
  end,
  limit,
  location,
  office,
  start,
  type,
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
  });
};

export const getProductsByType = ({ typeId }: GetProductsByTypeArgs) => {
  return simpleGetRequest<TextProductCollection>({
    endpoint: `${apiRoot}/products/types/${typeId}`,
    format: Format.JsonLd,
  });
};

export const getProductsByTypeAndLocation = ({
  locationId,
  typeId,
}: GetProductsByTypeAndLocationArgs) => {
  return simpleGetRequest<TextProductCollection>({
    endpoint: `${apiRoot}/products/types/${typeId}/locations/${locationId}`,
    format: Format.JsonLd,
  });
};

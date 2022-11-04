import { JsonLdContext } from "../common";

export interface TextProduct {
  "@context"?: JsonLdContext;
  "@id"?: string;
  id: string;
  issuingOffice: string;
  issuanceTime: string;
  productCode: string;
  productName: string;
  productText?: string;
  wmoCollectiveId: string;
}

export interface TextProductCollection {
  "@context": JsonLdContext;
  "@graph": TextProduct[];
}

export interface TextProductLocationCollection {
  "@context": JsonLdContext;
  locations: Record<string, string | null>;
}

export interface TextProductType {
  productCode: string;
  productName: string;
}

export interface TextProductTypeCollection {
  "@context": JsonLdContext;
  "@graph": TextProductType[];
}

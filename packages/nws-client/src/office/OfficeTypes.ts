import { JsonLdContext } from "../common";

export interface Office {
  "@context": JsonLdContext;
  "@id": string;
  "@type": "GovernmentOrganization";
  address: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    streetAddress: string;
  };
  approvedObservationStations: string[];
  email: string;
  faxNumber: string;
  id: string;
  name: string;
  nwsRegion: string;
  parentOrganization: string;
  responsibleCounties: string[];
  responsibleFireZones: string[];
  responsibleForecastZones: string[];
  sameAs: string;
  telephone: string;
}

export interface OfficeHeadline {
  "@context": JsonLdContext;
  "@id": string;
  content: string;
  office: string;
  important: boolean;
  issuanceTime: string;
  link: string;
  name: string;
  summary?: string | null;
  title: string;
}

export interface OfficeHeadlineCollection {
  "@context": JsonLdContext;
  "@graph": OfficeHeadline[];
}

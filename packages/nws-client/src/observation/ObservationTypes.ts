import { FeatureGeoJson, JsonLdContext, QuantitativeValue } from "../common";

type MetarPhenomenonIntensity = "heavy" | "light";

type MetarPhenomenonModifier =
  | "blowing"
  | "freezing"
  | "low_drifting"
  | "partial"
  | "patches"
  | "shallow"
  | "showers";

type MetarPhenomenonWeather =
  | "fog_mist"
  | "dust_storm"
  | "dust"
  | "drizzle"
  | "funnel_cloud"
  | "fog"
  | "smoke"
  | "hail"
  | "snow_pellets"
  | "haze"
  | "ice_crystals"
  | "ice_pellets"
  | "dust_whirls"
  | "spray"
  | "rain"
  | "sand"
  | "snow_grains"
  | "snow"
  | "squalls"
  | "sand_storm"
  | "thunderstorms"
  | "unknown"
  | "volcanic_ash";

export interface MetarPhenomenon {
  inVicinity: boolean;
  intensity: MetarPhenomenonIntensity;
  modifier: MetarPhenomenonModifier;
  rawString: string;
  weather: MetarPhenomenonWeather;
}

export interface MetarPhenomenonCloudLayer {
  amount: MetarSkyCoverage;
  base: QuantitativeValue;
}

export type MetarSkyCoverage =
  | "OVC"
  | "BKN"
  | "SCT"
  | "FEW"
  | "SKC"
  | "CLR"
  | "VV";

export interface Observation {
  "@context": JsonLdContext;
  "@id": string;
  "@type": "wx:ObservationStation";
  barometricPressure: QuantitativeValue;
  cloudLayers: MetarPhenomenonCloudLayer[];
  dewpoint: QuantitativeValue;
  elevation: QuantitativeValue;
  geometry?: string | null;
  heatIndex: QuantitativeValue;
  maxTemperatureLast24Hours: QuantitativeValue;
  minTemperatureLast24Hours: QuantitativeValue;
  precipitationLastHour: QuantitativeValue;
  precipitationLast3Hours: QuantitativeValue;
  precipitationLast6Hours: QuantitativeValue;
  presentWeather: MetarPhenomenon[];
  rawMessage: string;
  relativeHumidity: QuantitativeValue;
  seaLevelPressure: QuantitativeValue;
  station: string;
  temperature: QuantitativeValue;
  textDescription: string;
  timestamp: string;
  visibility: QuantitativeValue;
  windChill: QuantitativeValue;
  windDirection: QuantitativeValue;
  windGust: QuantitativeValue;
  windSpeed: QuantitativeValue;
}

export interface ObservationCollectionGeoJson {
  "@context": JsonLdContext;
  features: FeatureGeoJson<Observation>[];
  type: "FeatureCollection";
}

export interface ObservationCollectionJsonLd {
  "@context": JsonLdContext;
  "@graph": Observation[];
}

export type ObservationGeoJson = FeatureGeoJson<Observation>;

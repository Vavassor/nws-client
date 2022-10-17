import {
  FeatureGeoJson,
  JsonLdContext,
  QuantitativeValue,
  UnitType,
} from "../common";

type Coverage =
  | "areas"
  | "brief"
  | "chance"
  | "definite"
  | "few"
  | "frequent"
  | "intermittent"
  | "isolated"
  | "likely"
  | "numerous"
  | "occasional"
  | "patchy"
  | "periods"
  | "scattered"
  | "slight_chance"
  | "widespread";

type WeatherAttribute =
  | "damaging_wind"
  | "dry_thunderstorms"
  | "flooding"
  | "gusty_wind"
  | "heavy_rain"
  | "large_hail"
  | "small_hail"
  | "tornadoes";

type WeatherIntensity = "heavy" | "light" | "moderate" | "very_light";

type WeatherType =
  | "blowing_dust"
  | "blowing_sand"
  | "blowing_snow"
  | "drizzle"
  | "fog"
  | "freezing_fog"
  | "freezing_drizzle"
  | "freezing_rain"
  | "freezing_spray"
  | "frost"
  | "hail"
  | "haze"
  | "ice_crystals"
  | "ice_fog"
  | "rain"
  | "rain_showers"
  | "sleet"
  | "smoke"
  | "snow"
  | "snow_showers"
  | "thunderstorms"
  | "volcanic_ash"
  | "water_spouts";

export interface Gridpoint {
  "@context": JsonLdContext;
  "@id": string;
  "@type": "wx:Gridpoint";
  apparentTemperature?: GridpointQuantitativeValueLayer;
  atmosphericDispersionIndex?: GridpointQuantitativeValueLayer;
  ceilingHeight?: GridpointQuantitativeValueLayer;
  davisStabilityIndex?: GridpointQuantitativeValueLayer;
  dewpoint?: GridpointQuantitativeValueLayer;
  dispersionIndex?: GridpointQuantitativeValueLayer;
  elevation: QuantitativeValue;
  forecastOffice: string;
  geometry?: null | string;
  grasslandFireDangerIndex?: GridpointQuantitativeValueLayer;
  gridId: string;
  gridX: number;
  gridY: number;
  hainesIndex?: GridpointQuantitativeValueLayer;
  hazards: {
    values: GridpointHazardValue[];
  };
  heatIndex?: GridpointQuantitativeValueLayer;
  iceAccumulation?: GridpointQuantitativeValueLayer;
  lightningActivityLevel?: GridpointQuantitativeValueLayer;
  lowVisibilityOccurrenceRiskIndex?: GridpointQuantitativeValueLayer;
  maxTemperature?: GridpointQuantitativeValueLayer;
  minTemperature?: GridpointQuantitativeValueLayer;
  mixingHeight?: GridpointQuantitativeValueLayer;
  potentialOf15mphWinds?: GridpointQuantitativeValueLayer;
  potentialOf25mphWinds?: GridpointQuantitativeValueLayer;
  potentialOf35mphWinds?: GridpointQuantitativeValueLayer;
  potentialOf45mphWinds?: GridpointQuantitativeValueLayer;
  potentialOf20mphWindGusts?: GridpointQuantitativeValueLayer;
  potentialOf30mphWindGusts?: GridpointQuantitativeValueLayer;
  potentialOf40mphWindGusts?: GridpointQuantitativeValueLayer;
  potentialOf50mphWindGusts?: GridpointQuantitativeValueLayer;
  potentialOf60mphWindGusts?: GridpointQuantitativeValueLayer;
  pressure?: GridpointQuantitativeValueLayer;
  primarySwellDirection?: GridpointQuantitativeValueLayer;
  primarySwellHeight?: GridpointQuantitativeValueLayer;
  probabilityOfHurricaneWinds?: GridpointQuantitativeValueLayer;
  probabilityOfPrecipitation?: GridpointQuantitativeValueLayer;
  probabilityOfThunder?: GridpointQuantitativeValueLayer;
  probabilityOfTropicalStormWinds?: GridpointQuantitativeValueLayer;
  quantitativePrecipitation?: GridpointQuantitativeValueLayer;
  redFlagThreatIndex?: GridpointQuantitativeValueLayer;
  relativeHumidity?: GridpointQuantitativeValueLayer;
  secondarySwellDirection?: GridpointQuantitativeValueLayer;
  secondarySwellHeight?: GridpointQuantitativeValueLayer;
  skyCover?: GridpointQuantitativeValueLayer;
  snowLevel?: GridpointQuantitativeValueLayer;
  snowfallAmount?: GridpointQuantitativeValueLayer;
  stability?: GridpointQuantitativeValueLayer;
  temperature?: GridpointQuantitativeValueLayer;
  transportWindDirection?: GridpointQuantitativeValueLayer;
  transportWindSpeed?: GridpointQuantitativeValueLayer;
  twentyFootWindDirection?: GridpointQuantitativeValueLayer;
  twentyFootWindSpeed?: GridpointQuantitativeValueLayer;
  updateTime: string;
  validTimes: string;
  visibility?: GridpointQuantitativeValueLayer;
  waveDirection?: GridpointQuantitativeValueLayer;
  waveHeight?: GridpointQuantitativeValueLayer;
  wavePeriod?: GridpointQuantitativeValueLayer;
  wavePeriod2?: GridpointQuantitativeValueLayer;
  weather: {
    values: GridpointWeatherValue[];
  };
  windChill?: GridpointQuantitativeValueLayer;
  windDirection?: GridpointQuantitativeValueLayer;
  windGust?: GridpointQuantitativeValueLayer;
  windSpeed?: GridpointQuantitativeValueLayer;
  windWaveHeight?: GridpointQuantitativeValueLayer;
}

export interface GridpointForecast {
  "@context": JsonLdContext;
  elevation: QuantitativeValue;
  forecastGenerator: string;
  geometry?: string | null;
  generatedAt: string;
  periods: GridpointForecastPeriod[];
  units: UnitType;
  updateTime: string;
  validTimes: string;
}

export type GridpointForecastGeoJson = FeatureGeoJson<GridpointForecast>;

export interface GridpointForecastPeriod {
  detailedForecast: string;
  endTime: string;
  isDaytime: boolean;
  name: string;
  number: number;
  shortForecast: string;
  startTime: string;
  temperature: number | QuantitativeValue;
  temperatureTrend?: string | null;
  windGust: string | QuantitativeValue;
  windSpeed: string | QuantitativeValue;
}

export type GridpointGeoJson = FeatureGeoJson<Gridpoint>;

export interface GridpointHazardValue {
  validTime: string;
  value: GridpointHazardValueValue[];
}

export interface GridpointHazardValueValue {
  event_number?: number | null;
  phenomenon: string;
  significance: string;
}

export interface GridpointQuantitativeValueLayer {
  uom: string;
  values: GridpointQuantitativeValueLayerValue[];
}

export interface GridpointQuantitativeValueLayerValue {
  validTime: string;
  value: number | null;
}

export interface GridpointWeatherValue {
  validTime: string;
  value: GridpointWeatherValueValue[];
}

export interface GridpointWeatherValueValue {
  attributes: WeatherAttribute[];
  coverage: Coverage | null;
  intensity: WeatherIntensity | null;
  visibility: QuantitativeValue;
  weather: WeatherType | null;
}

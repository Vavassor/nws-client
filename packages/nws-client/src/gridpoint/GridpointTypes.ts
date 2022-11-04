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

type WindDirection =
  | "N"
  | "NNE"
  | "NE"
  | "ENE"
  | "E"
  | "ESE"
  | "SE"
  | "SSE"
  | "S"
  | "SSW"
  | "SW"
  | "WSW"
  | "W"
  | "WNW"
  | "NW"
  | "NNW";

/** Raw forecast data for a 2.5km grid square. */
export interface Gridpoint {
  "@context"?: JsonLdContext;
  /** URI of this resource. */
  "@id"?: string;
  /** Type of this resource. */
  "@type": "wx:Gridpoint";
  apparentTemperature?: GridpointQuantitativeValueLayer;
  atmosphericDispersionIndex?: GridpointQuantitativeValueLayer;
  ceilingHeight?: GridpointQuantitativeValueLayer;
  davisStabilityIndex?: GridpointQuantitativeValueLayer;
  dewpoint?: GridpointQuantitativeValueLayer;
  dispersionIndex?: GridpointQuantitativeValueLayer;
  elevation: QuantitativeValue;
  /** URI of the forecast office. */
  forecastOffice: string;
  /** Geometry represented in Well-Known Text (WKT) format. */
  geometry?: null | string;
  grasslandFireDangerIndex?: GridpointQuantitativeValueLayer;
  /** Three-letter identifier for a NWS office. */
  gridId: string;
  gridX: string;
  gridY: string;
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
  /**
   * Update time of the forecast.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  updateTime: string;
  /**
   * Time interval during which this data is valid.
   *
   * @see {@link https://www.iso.org/standard/70907.html | ISO 8601-1:2019}
   */
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

/** Raw forecast data for a 2.5km grid square. */
export interface GridpointJsonLd {
  "@context": JsonLdContext;
  /** URI of this resource. */
  "@id": string;
  /** Type of this resource. */
  "@type": "wx:Gridpoint";
  apparentTemperature?: GridpointQuantitativeValueLayer;
  atmosphericDispersionIndex?: GridpointQuantitativeValueLayer;
  ceilingHeight?: GridpointQuantitativeValueLayer;
  davisStabilityIndex?: GridpointQuantitativeValueLayer;
  dewpoint?: GridpointQuantitativeValueLayer;
  dispersionIndex?: GridpointQuantitativeValueLayer;
  elevation: QuantitativeValue;
  /** URI of the forecast office. */
  forecastOffice: string;
  /** Geometry represented in Well-Known Text (WKT) format. */
  geometry?: null | string;
  grasslandFireDangerIndex?: GridpointQuantitativeValueLayer;
  /** Three-letter identifier for a NWS office. */
  gridId: string;
  gridX: string;
  gridY: string;
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
  /**
   * Update time of the forecast.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  updateTime: string;
  /**
   * Time interval during which this data is valid.
   *
   * @see {@link https://www.iso.org/standard/70907.html | ISO 8601-1:2019}
   */
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

/** A multi-day forecast for a 2.5km grid square. */
export interface GridpointForecast {
  "@context"?: JsonLdContext;
  elevation: QuantitativeValue;
  /**
   * The internal generator class used to create the forecast text (used for
   * NWS debugging).
   */
  forecastGenerator: string;
  /** Geometry represented in Well-Known Text (WKT) format. */
  geometry?: string | null;
  /**
   * The time this forecast data was generated.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  generatedAt: string;
  periods: GridpointForecastPeriod[];
  /** Denotes the units used in the textual portions of the forecast. */
  units: UnitType;
  /** @deprecated */
  updated: string;
  /**
   * Update time of the forecast.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  updateTime: string;
  /**
   * Time interval during which this data is valid.
   *
   * @see {@link https://www.iso.org/standard/70907.html | ISO 8601-1:2019}
   */
  validTimes: string;
}

export type GridpointForecastGeoJson = FeatureGeoJson<GridpointForecast>;

/** A multi-day forecast for a 2.5km grid square. */
export interface GridpointForecastJsonLd {
  "@context": JsonLdContext;
  elevation: QuantitativeValue;
  /**
   * The internal generator class used to create the forecast text (used for
   * NWS debugging).
   */
  forecastGenerator: string;
  /** Geometry represented in Well-Known Text (WKT) format. */
  geometry?: string | null;
  /**
   * The time this forecast data was generated.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  generatedAt: string;
  periods: GridpointForecastPeriod[];
  /** Denotes the units used in the textual portions of the forecast. */
  units: UnitType;
  /** @deprecated */
  updated: string;
  /**
   * Update time of the forecast.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  updateTime: string;
  /**
   * Time interval during which this data is valid.
   *
   * @see {@link https://www.iso.org/standard/70907.html | ISO 8601-1:2019}
   */
  validTimes: string;
}

/**
 * An object containing forecast information for a specific time period
 * (generally 12-hour or 1-hour).
 */
export interface GridpointForecastPeriod {
  /** A detailed textual forecast for the period. */
  detailedForecast: string;
  /**
   * The ending time that this forecast period is valid for.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  endTime: string;
  /** @deprecated */
  icon: string;
  /** Indicates whether this period is daytime or nighttime. */
  isDaytime: boolean;
  /**
   * A textual identifier for the period. This value will not be present for
   * hourly forecasts.
   */
  name: string;
  /** Sequential period number. */
  number: number;
  /** A brief textual forecast summary for the period. */
  shortForecast: string;
  /**
   * The starting time that this forecast period is valid for.
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc3339 | RFC 3339}
   */
  startTime: string;
  /**
   * High/low temperature for the period, depending on whether the period is
   * day or night.
   *
   * This property as an integer value is deprecated. Future
   * versions will express this value as a quantitative value object. To make
   * use of the future standard format now, set the "forecast_temperature_qv"
   * feature flag on the request.
   */
  temperature: number | QuantitativeValue;
  /**
   * If not null, indicates a non-diurnal temperature trend for the period
   * (either rising temperature overnight, or falling temperature during the
   * day).
   */
  temperatureTrend?: string | null;
  /** @deprecated */
  temperatureUnit: string;
  /**
   * The prevailing direction of the wind for the period, using a 16-point
   * compass.
   */
  windDirection: WindDirection;
  /**
   * Peak wind gust for the period.
   *
   * This property as an string value is deprecated. Future versions will
   * express this value as a quantitative value object. To make use of the
   * future standard format now, set the "forecast_wind_speed_qv" feature flag
   * on the request.
   */
  windGust?: string | QuantitativeValue;
  /**
   * Wind speed for the period.
   *
   * This property as an string value is deprecated. Future versions will
   * express this value as a quantitative value object. To make use of the
   * future standard format now, set the "forecast_wind_speed_qv" feature flag
   * on the request.
   */
  windSpeed: string | QuantitativeValue;
}

export type GridpointGeoJson = FeatureGeoJson<Gridpoint>;

export interface GridpointHazardValue {
  /**
   * The time interval of the value.
   *
   * @see {@link https://www.iso.org/standard/70907.html | ISO 8601-1:2019}
   */
  validTime: string;
  value: GridpointHazardValueValue[];
}

/** A value object representing an expected hazard. */
export interface GridpointHazardValueValue {
  /**
   * Event number. If this hazard refers to a national or regional center
   * product (such as a Storm Prediction Center convective watch), this value
   * will be the sequence number of that product.
   */
  event_number?: number | null;
  /**
   * Hazard code. This value will correspond to a P-VTEC phenomenon code as
   * defined in NWS Directive 10-1703.
   */
  phenomenon: string;
  /**
   * Significance code. This value will correspond to a P-VTEC significance code
   * as defined in NWS Directive 10-1703. This will most frequently be "A" for a
   * watch or "Y" for an advisory.
   */
  significance: string;
}

/**
 * A gridpoint layer consisting of quantitative values (numeric values with
 * associated units of measure).
 */
export interface GridpointQuantitativeValueLayer {
  /**
   * A unit of measure, in the format "unit" or "namespace:unit".
   *
   * Units with the namespace "wmo" or "wmoUnit" are defined in the
   * {@link http://codes.wmo.int/common/unit | World Meteorological Organization Codes Registry}
   * and should be canonically resolvable to
   * http://codes.wmo.int/common/unit/{unit}.
   *
   * Units with the namespace "nwsUnit" are currently custom and do not align
   * to any standard.
   *
   * Units with no namespace or the namespace "uc" are compliant with the
   * {@link https://unitsofmeasure.org/ | Unified Code for Units of Measure}
   * syntax.  This also aligns with recent versions of the Geographic Markup
   * Language (GML) standard, the IWXXM standard, and OGC Observations and
   * Measurements v2.0 (ISO/DIS 19156).
   *
   * Namespaced units are considered deprecated. NWS will be aligning the API to
   * use the same standards as GML/IWXXM in the future.
   */
  uom?: string;
  values: GridpointQuantitativeValueLayerValue[];
}

export interface GridpointQuantitativeValueLayerValue {
  /**
   * The time interval of the value.
   *
   * @see {@link https://www.iso.org/standard/70907.html | ISO 8601-1:2019}
   */
  validTime: string;
  value: number | null;
}

export interface GridpointWeatherValue {
  /**
   * The time interval of the value.
   *
   * @see {@link https://www.iso.org/standard/70907.html | ISO 8601-1:2019}
   */
  validTime: string;
  value: GridpointWeatherValueValue[];
}

/** A value object representing expected weather phenomena. */
export interface GridpointWeatherValueValue {
  attributes: WeatherAttribute[];
  coverage: Coverage | null;
  intensity: WeatherIntensity | null;
  visibility: QuantitativeValue;
  weather: WeatherType | null;
}

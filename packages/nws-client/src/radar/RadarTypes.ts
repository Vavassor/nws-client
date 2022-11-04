import { FeatureGeoJson, JsonLdContext, QuantitativeValue } from "../common";

export interface RadarServer {
  "@context"?: JsonLdContext;
  "@id": string;
  "@type": "wx:RadarServer";
  active?: boolean;
  aggregate?: boolean;
  collectionTime: string;
  command?: RadarServerCommand;
  hardware: RadarServerHardware;
  id: string;
  ldm: RadarServerLdm;
  locked?: boolean;
  network: RadarServerNetwork;
  ping: RadarServerPing;
  primary?: boolean;
  radarNetworkUp?: boolean;
  reportingHost: string;
  type: string;
}

export interface RadarServerCollection {
  "@context": JsonLdContext;
  "@graph": RadarServer[];
}

export interface RadarServerCommand {
  lastExecuted: string;
  lastExecutedTime: string;
  lastNexradDataTime: string;
  lastReceived: string;
  lastReceivedTime: string;
  timestamp: string;
}

export interface RadarServerHardware {
  cpuIdle: number;
  disk: number;
  ioUtilization: number;
  load1: number;
  load15: number;
  load5: number;
  memory: number;
  timestamp: string;
  uptime: string;
}

export interface RadarServerLdm {
  active: boolean;
  count: number;
  latestProduct: string;
  oldestProduct: string;
  storageSize: number;
  timestamp: string;
}

export interface RadarServerNetwork {
  eth1: RadarServerNetworkEth;
  eth0: RadarServerNetworkEth;
  timestamp: string;
}

export interface RadarServerNetworkEth {
  active: boolean;
  interface: string;
  recvDropped: number;
  recvError: number;
  recvNoError: number;
  recvOverrun: number;
  transDropped: number;
  transError: number;
  transNoError: number;
  transOverrun: number;
}

export interface RadarServerPing {
  targets: {
    client: RadarServerPingClient | [];
    ldm: RadarServerPingLdm;
    misc: {
      backupIp?: boolean;
      eth0: boolean;
      eth1: boolean;
      rocRouter?: boolean;
      tocRouter?: boolean;
    };
    server: RadarServerPingLdm;
    radar: Record<string, boolean> | [];
  };
  timestamp: string;
}

export interface RadarServerPingClient {
  centralRegionHeadquarters: boolean;
  easternRegionHeadquarters: boolean;
  eductionResearchConsortium: boolean;
  ncep: boolean;
  purdueUniversity: boolean;
  radarOperationsCenter: boolean;
  unidata: boolean;
  universityOfOklahoma: boolean;
}

interface RadarServerPingLdm {
  ldm1?: boolean;
  ldm2?: boolean;
  ldm3?: boolean;
  ldm4?: boolean;
  rds?: boolean;
  tds?: boolean;
}

export interface RadarStation {
  "@id": string;
  "@type": "wx:RadarStation";
  adaptation: {
    properties: {
      ameHorzizontalTestSignalPower: QuantitativeValue;
      ameNoiseSourceHorizontalExcessNoiseRatio: QuantitativeValue;
      antennaGainIncludingRadome: QuantitativeValue;
      cohoPowerAtA1J4: QuantitativeValue;
      horizontalReceiverNoiseLongPulse: QuantitativeValue;
      horizontalReceiverNoiseShortPulse: QuantitativeValue;
      pathLossA6ArcDetector: QuantitativeValue;
      pathLossAT4Attenuator: QuantitativeValue;
      pathLossHorzontalIFHeliaxTo4AT17: QuantitativeValue;
      pathLossIFDBurstAntiAliasFilter: QuantitativeValue;
      pathLossIFDRIFAntiAliasFilter: QuantitativeValue;
      pathLossTransmitterCouplerCoupling: QuantitativeValue;
      pathLossVerticalIFHeliaxTo4AT16: QuantitativeValue;
      pathLossWaveguideKlystronToSwitch: QuantitativeValue;
      pathLossWG02HarmonicFilter: QuantitativeValue;
      pathLossWG04Circulator: QuantitativeValue;
      pathLossWG06SpectrumFilter: QuantitativeValue;
      pulseWidthTransmitterOutputLongPulse: QuantitativeValue;
      pulseWidthTransmitterOutputShortPulse: QuantitativeValue;
      staloPowerAtA1J2: QuantitativeValue;
      transmitterFrequency: QuantitativeValue;
      transmitterPowerDataWattsFactor: QuantitativeValue;
      transmitterSpectrumFilterInstalled: string;
    };
    reportingHost: string;
    timestamp: string;
  };
  elevation: QuantitativeValue;
  /** Geometry represented in Well-Known Text (WKT) format. */
  geometry?: null | string;
  id: string;
  latency: {
    average: QuantitativeValue;
    current: QuantitativeValue;
    host: string;
    levelTwoLastReceivedTime: string;
    max: QuantitativeValue;
    maxLatencyTime: string;
    reportingHost: string;
  };
  name: string;
  performance: {
    properties: {
      azimuthEncoderLight: string;
      commandChannel: string;
      dynamicRange: QuantitativeValue;
      elevationEncoderLight: string;
      fuelLevel: QuantitativeValue;
      horizontalDeltadBZ0: QuantitativeValue;
      horizontalLongPulseNoise: QuantitativeValue;
      horizontalNoiseTemperature: QuantitativeValue;
      horizontalShortPulseNoise: QuantitativeValue;
      linearity: number;
      longPulseHorizontaldBZ0: QuantitativeValue;
      ntp_status: number;
      performanceCheckTime: string;
      powerSource: string;
      radomeAirTemperature: QuantitativeValue;
      receiverBias: QuantitativeValue;
      shelterTemperature: QuantitativeValue;
      shortPulseHorizontaldBZ0: QuantitativeValue;
      transitionalPowerSource: string;
      transmitterPeakPower: QuantitativeValue;
      transmitterImbalance: QuantitativeValue;
      transmitterLeavingAirTemperature: QuantitativeValue;
      transmitterRecycleCount: number;
      verticalDeltadBZ0: QuantitativeValue;
    };
    reportingHost: string;
    timestamp: string;
  };
  rda: {
    properties: {
      alarmSummary: string;
      averageTransmitterPower: QuantitativeValue;
      buildNumber: number;
      controlStatus: string;
      generatorState: string;
      mode: string;
      nl2Path: string;
      operabilityStatus: string;
      reflectivityCalibrationCorrection: QuantitativeValue;
      resolutionVersion: number;
      status: string;
      superResolutionStatus: string;
      volumeCoveragePattern: string;
    };
    reportingHost: string;
    timestamp: string;
  };
  stationType: string;
  timeZone: string;
}

export interface RadarStationAlarm {
  "@type": "wx:RadarStationAlarm";
  message: string;
  stationId: string;
  status: string;
  timestamp: string;
}

export interface RadarStationAlarmCollection {
  "@context": JsonLdContext;
  "@graph": RadarStationAlarm[];
  "@id": string;
}

export interface RadarStationJsonLd extends RadarStation {
  "@context": JsonLdContext;
}

export type RadarStationGeoJson = FeatureGeoJson<RadarStation>;

export interface RadarStationCollectionJsonLd {
  "@context": JsonLdContext;
  "@graph": RadarStation[];
}

export interface RadarStationCollectionGeoJson {
  "@context": JsonLdContext;
  features: RadarStationGeoJson[];
  type: "FeatureCollection";
}

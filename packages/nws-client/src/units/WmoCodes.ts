interface WmoCode {
  label: string;
  ucumCode: string | null;
  wmoCode: string;
}

export const wmoCodes: WmoCode[] = [
  {
    label: "minute (angle)",
    ucumCode: "'",
    wmoCode: "'",
  },
  {
    label: "second (angle)",
    ucumCode: "''",
    wmoCode: "''",
  },
  {
    label: "parts per thousand",
    ucumCode: "[ppth]",
    wmoCode: "0.001",
  },
  {
    label: "Dimensionless",
    ucumCode: "1",
    wmoCode: "1",
  },
  {
    label: "ampere",
    ucumCode: "A",
    wmoCode: "A",
  },
  {
    label: "astronomic unit",
    ucumCode: "AU",
    wmoCode: "AU",
  },
  {
    label: "becquerel",
    ucumCode: "Bq",
    wmoCode: "Bq",
  },
  {
    label: "becquerels per litre",
    ucumCode: "Bq/L",
    wmoCode: "Bq_l-1",
  },
  {
    label: "becquerels per square metre",
    ucumCode: "Bq/m2",
    wmoCode: "Bq_m-2",
  },
  {
    label: "becquerels per cubic metre",
    ucumCode: "Bq/m3",
    wmoCode: "Bq_m-3",
  },
  {
    label: "becquerel seconds per cubic metre",
    ucumCode: "Bq.s/m3",
    wmoCode: "Bq_s_m-3",
  },
  {
    label: "coulomb",
    ucumCode: "C",
    wmoCode: "C",
  },
  {
    label: "degrees Celsius per 100 metres",
    ucumCode: null,
    wmoCode: "C_-1",
  },
  {
    label: "degrees Celsius per metre",
    ucumCode: null,
    wmoCode: "C_m-1",
  },
  {
    label: "degree Celsius",
    ucumCode: "Cel",
    wmoCode: "Cel",
  },
  {
    label: "Dobson Unit (9)",
    ucumCode: null,
    wmoCode: "DU",
  },
  {
    label: "farad",
    ucumCode: "F",
    wmoCode: "F",
  },
  {
    label: "gray",
    ucumCode: "Gy",
    wmoCode: "Gy",
  },
  {
    label: "henry",
    ucumCode: "H",
    wmoCode: "H",
  },
  {
    label: "hertz",
    ucumCode: "Hz",
    wmoCode: "Hz",
  },
  {
    label: "joule",
    ucumCode: "J",
    wmoCode: "J",
  },
  {
    label: "joules per kilogram",
    ucumCode: "J/kg",
    wmoCode: "J_kg-1",
  },
  {
    label: "joules per square metre",
    ucumCode: "J/m2",
    wmoCode: "J_m-2",
  },
  {
    label: "kelvin",
    ucumCode: "K",
    wmoCode: "K",
  },
  {
    label: "kelvins per metre",
    ucumCode: "K/m",
    wmoCode: "K_m-1",
  },
  {
    label: "kelvin square metres per kilogram per second",
    ucumCode: "K.m2/kg/s",
    wmoCode: "K_m2_kg-1_s-1",
  },
  {
    label: "kelvin metres per second",
    ucumCode: "K.m/s",
    wmoCode: "K_m_s-1",
  },
  {
    label: "newton",
    ucumCode: "N",
    wmoCode: "N",
  },
  {
    label: "newtons per square metre",
    ucumCode: "N/m2",
    wmoCode: "N_m-2",
  },
  {
    label: "N units",
    ucumCode: null,
    wmoCode: "N_units",
  },
  {
    label: "ohm",
    ucumCode: "Ohm",
    wmoCode: "Ohm",
  },
  {
    label: "pascal",
    ucumCode: "Pa",
    wmoCode: "Pa",
  },
  {
    label: "pascals per second",
    ucumCode: "Pa/s",
    wmoCode: "Pa_s-1",
  },
  {
    label: "siemens",
    ucumCode: "S",
    wmoCode: "S",
  },
  {
    label: "siemens per metre",
    ucumCode: "S/m",
    wmoCode: "S_m-1",
  },
  {
    label: "sievert",
    ucumCode: "Sv",
    wmoCode: "Sv",
  },
  {
    label: "tesla",
    ucumCode: "T",
    wmoCode: "T",
  },
  {
    label: "volt",
    ucumCode: "V",
    wmoCode: "V",
  },
  {
    label: "watt",
    ucumCode: "W",
    wmoCode: "W",
  },
  {
    label: "watts per metre per steradian",
    ucumCode: "W/m/sr",
    wmoCode: "W_m-1_sr-1",
  },
  {
    label: "watts per square metre",
    ucumCode: "W/m2",
    wmoCode: "W_m-2",
  },
  {
    label: "watts per square metre per steradian",
    ucumCode: "W/m2/sr",
    wmoCode: "W_m-2_sr-1",
  },
  {
    label: "watts per square metre per steradian centimetre",
    ucumCode: "W.m-2.sr-1.cm",
    wmoCode: "W_m-2_sr-1_cm",
  },
  {
    label: "watts per square metre per steradian metre",
    ucumCode: "W.m-2.sr-1.m",
    wmoCode: "W_m-2_sr-1_m",
  },
  {
    label: "watts per cubic metre per steradian",
    ucumCode: "W/m3/sr",
    wmoCode: "W_m-3_sr-1",
  },
  {
    label: "weber",
    ucumCode: "Wb",
    wmoCode: "Wb",
  },
  {
    label: "year",
    ucumCode: "a",
    wmoCode: "a",
  },
  {
    label: "centibars per 12 hours",
    ucumCode: "cbar/(12.h)",
    wmoCode: "cb_-1",
  },
  {
    label: "centibars per second",
    ucumCode: "cbar/s",
    wmoCode: "cb_s-1",
  },
  {
    label: "candela",
    ucumCode: "cd",
    wmoCode: "cd",
  },
  {
    label: "centimetre",
    ucumCode: "cm",
    wmoCode: "cm",
  },
  {
    label: "centimetres per hour",
    ucumCode: "cm/h",
    wmoCode: "cm_h-1",
  },
  {
    label: "centimetres per second",
    ucumCode: "cm/s",
    wmoCode: "cm_s-1",
  },
  {
    label: "day",
    ucumCode: "d",
    wmoCode: "d",
  },
  {
    label: "decibel (6)",
    ucumCode: "dB",
    wmoCode: "dB",
  },
  {
    label: "decibels per degree",
    ucumCode: "dB/deg",
    wmoCode: "dB_deg-1",
  },
  {
    label: "decibels per metre",
    ucumCode: "dB/m",
    wmoCode: "dB_m-1",
  },
  {
    label: "decipascals per second (microbar per second)",
    ucumCode: "dPa/s",
    wmoCode: "dPa_s-1",
  },
  {
    label: "dekapascal",
    ucumCode: "daPa",
    wmoCode: "daPa",
  },
  {
    label: "square degrees",
    ucumCode: "deg2",
    wmoCode: "deg2",
  },
  {
    label: "degrees Celsius (8)",
    ucumCode: "Cel",
    wmoCode: "degC",
  },
  {
    label: "degrees per second",
    ucumCode: "deg/s",
    wmoCode: "deg_s-1",
  },
  {
    label: "degree (angle)",
    ucumCode: "deg",
    wmoCode: "degree_(angle)",
  },
  {
    label: "degrees true",
    ucumCode: null,
    wmoCode: "degrees_true",
  },
  {
    label: "decimetre",
    ucumCode: "dm",
    wmoCode: "dm",
  },
  {
    label: "electron volt",
    ucumCode: "eV",
    wmoCode: "eV",
  },
  {
    label: "foot",
    ucumCode: "[ft_i]",
    wmoCode: "ft",
  },
  {
    label: "acceleration due to gravity",
    ucumCode: "[g]",
    wmoCode: "g",
  },
  {
    label: "grams per kilogram",
    ucumCode: "g/kg",
    wmoCode: "g_kg-1",
  },
  {
    label: "grams per kilogram per second",
    ucumCode: "g/kg/s",
    wmoCode: "g_kg-1_s-1",
  },
  {
    label: "geopotential metre",
    ucumCode: null,
    wmoCode: "gpm",
  },
  {
    label: "hour",
    ucumCode: "h",
    wmoCode: "h",
  },
  {
    label: "hectopascal",
    ucumCode: "hPa",
    wmoCode: "hPa",
  },
  {
    label: "hectopascals per 3 hours",
    ucumCode: "hPa/(3.h)",
    wmoCode: "hPa_-1",
  },
  {
    label: "hectopascals per hour",
    ucumCode: "hPa/h",
    wmoCode: "hPa_h-1",
  },
  {
    label: "hectopascals per second",
    ucumCode: "hPa/s",
    wmoCode: "hPa_s-1",
  },
  {
    label: "hectare",
    ucumCode: "har",
    wmoCode: "ha",
  },
  {
    label: "kilopascal",
    ucumCode: "kPa",
    wmoCode: "kPa",
  },
  {
    label: "kilogram",
    ucumCode: "kg",
    wmoCode: "kg",
  },
  {
    label: "per square kilogram per second",
    ucumCode: "/kg2/s",
    wmoCode: "kg-2_s-1",
  },
  {
    label: "kilograms per kilogram",
    ucumCode: "kg/kg",
    wmoCode: "kg_kg-1",
  },
  {
    label: "kilograms per kilogram per second",
    ucumCode: "kg/kg/s",
    wmoCode: "kg_kg-1_s-1",
  },
  {
    label: "kilograms per metre",
    ucumCode: "kg/m",
    wmoCode: "kg_m-1",
  },
  {
    label: "kilograms per square metre",
    ucumCode: "kg/m2",
    wmoCode: "kg_m-2",
  },
  {
    label: "kilograms per square metre per second",
    ucumCode: "kg/m2/s",
    wmoCode: "kg_m-2_s-1",
  },
  {
    label: "kilograms per cubic metre",
    ucumCode: "kg/m3",
    wmoCode: "kg_m-3",
  },
  {
    label: "kilometre",
    ucumCode: "km",
    wmoCode: "km",
  },
  {
    label: "kilometres per day",
    ucumCode: "km/d",
    wmoCode: "km_d-1",
  },
  {
    label: "kilometres per hour",
    ucumCode: "km/h",
    wmoCode: "km_h-1",
  },
  {
    label: "knot",
    ucumCode: "[kn_i]",
    wmoCode: "kt",
  },
  {
    label: "knots per 1000 metres",
    ucumCode: "[kn_i]/km",
    wmoCode: "kt_km-1",
  },
  {
    label: "litre",
    ucumCode: "L",
    wmoCode: "l",
  },
  {
    label: "lumen",
    ucumCode: "lm",
    wmoCode: "lm",
  },
  {
    label: "logarithm per metre",
    ucumCode: null,
    wmoCode: "log_(m-1)",
  },
  {
    label: "logarithm per square metre",
    ucumCode: null,
    wmoCode: "log_(m-2)",
  },
  {
    label: "lux",
    ucumCode: "lx",
    wmoCode: "lx",
  },
  {
    label: "metre",
    ucumCode: "m",
    wmoCode: "m",
  },
  {
    label: "per metre",
    ucumCode: "/m",
    wmoCode: "m-1",
  },
  {
    label: "square metres",
    ucumCode: "m2",
    wmoCode: "m2",
  },
  {
    label: "metres to the two thirds power per second",
    ucumCode: null,
    wmoCode: "m2_-1",
  },
  {
    label: "square metres per hertz",
    ucumCode: "m2/Hz",
    wmoCode: "m2_Hz-1",
  },
  {
    label: "square metres per radian squared",
    ucumCode: "m2/rad2",
    wmoCode: "m2_rad-1_s",
  },
  {
    label: "square metres second",
    ucumCode: "m2.s",
    wmoCode: "m2_s",
  },
  {
    label: "square metres per second",
    ucumCode: "m2/s",
    wmoCode: "m2_s-1",
  },
  {
    label: "square metres per second squared",
    ucumCode: "m2/s2",
    wmoCode: "m2_s-2",
  },
  {
    label: "cubic metres",
    ucumCode: "m3",
    wmoCode: "m3",
  },
  {
    label: "cubic metres per cubic metre",
    ucumCode: "m3/m3",
    wmoCode: "m3_m-3",
  },
  {
    label: "cubic metres per second",
    ucumCode: "m3/s",
    wmoCode: "m3_s-1",
  },
  {
    label: "metres to the fourth power",
    ucumCode: "m4",
    wmoCode: "m4",
  },
  {
    label: "millisievert",
    ucumCode: "mSv",
    wmoCode: "mSv",
  },
  {
    label: "metres per second",
    ucumCode: "m/s",
    wmoCode: "m_s-1",
  },
  {
    label: "metres per second per 1000 metres",
    ucumCode: "m/s/km",
    wmoCode: "m_s-1_km-1",
  },
  {
    label: "metres per second per metre",
    ucumCode: "m/s/m",
    wmoCode: "m_s-1_m-1",
  },
  {
    label: "metres per second squared",
    ucumCode: "m/s2",
    wmoCode: "m_s-2",
  },
  {
    label: "minute (time)",
    ucumCode: "min",
    wmoCode: "min",
  },
  {
    label: "millimetre",
    ucumCode: "mm",
    wmoCode: "mm",
  },
  {
    label: "millimetres per the sixth power per cubic metre",
    ucumCode: "mm6/m3",
    wmoCode: "mm6_m-3",
  },
  {
    label: "millimetres per hour",
    ucumCode: "mm/h",
    wmoCode: "mm_h-1",
  },
  {
    label: "millimetres per seconds",
    ucumCode: "mm/s",
    wmoCode: "mm_s-1",
  },
  {
    label: "mole",
    ucumCode: "mol",
    wmoCode: "mol",
  },
  {
    label: "moles per mole",
    ucumCode: "mol/mol",
    wmoCode: "mol_mol-1",
  },
  {
    label: "month",
    ucumCode: "mo",
    wmoCode: "mon",
  },
  {
    label: "nautical mile",
    ucumCode: "[nmi_i]",
    wmoCode: "nautical_mile",
  },
  {
    label: "nanobar = hPa 10^-6",
    ucumCode: "nbar",
    wmoCode: "nbar",
  },
  {
    label: "eighths of cloud",
    ucumCode: null,
    wmoCode: "okta",
  },
  {
    label: "pH unit",
    ucumCode: "[pH]",
    wmoCode: "pH_unit",
  },
  {
    label: "parsec",
    ucumCode: "pc",
    wmoCode: "pc",
  },
  {
    label: "per cent",
    ucumCode: "%",
    wmoCode: "percent",
  },
  {
    label: "radian",
    ucumCode: "rad",
    wmoCode: "rad",
  },
  {
    label: "radians per metre",
    ucumCode: "rad/m",
    wmoCode: "rad_m-1",
  },
  {
    label: "second",
    ucumCode: "s",
    wmoCode: "s",
  },
  {
    label: "per second (same as hertz)",
    ucumCode: "/s",
    wmoCode: "s-1",
  },
  {
    label: "per second squared",
    ucumCode: "/s2",
    wmoCode: "s-2",
  },
  {
    label: "seconds per metre",
    ucumCode: "s/m",
    wmoCode: "s_m-1",
  },
  {
    label: "steradian",
    ucumCode: "sr",
    wmoCode: "sr",
  },
  {
    label: "tonne",
    ucumCode: "t",
    wmoCode: "t",
  },
  {
    label: "atomic mass unit",
    ucumCode: "u",
    wmoCode: "u",
  },
  {
    label: "week",
    ucumCode: "wk",
    wmoCode: "week",
  },
];

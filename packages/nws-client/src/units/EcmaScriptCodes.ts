interface EcmaScriptCode {
  ecmaScriptCode: string;
  label: string;
  ucumCode: string;
}

/**
 * @see {@link https://unicode.org/reports/tr35/tr35-general.html#62-unit-identifiers | Unit identifiers}
 * @see {@link https://tc39.es/proposal-unified-intl-numberformat/section6/locales-currencies-tz_proposed_out.html#table-sanctioned-simple-unit-identifiers | Simple units sanctioned for use in ECMAScript}
 */
export const ecmaScriptCodes: EcmaScriptCode[] = [
  { ecmaScriptCode: "acre", label: "acre", ucumCode: "[acr_us]" },
  { ecmaScriptCode: "bit", label: "bit", ucumCode: "bit" },
  { ecmaScriptCode: "byte", label: "byte", ucumCode: "By" },
  { ecmaScriptCode: "celsius", label: "degree Celsius", ucumCode: "Cel" },
  {
    ecmaScriptCode: "celsius-per-meter",
    label: "degree Celsius per meter",
    ucumCode: "Cel/m",
  },
  { ecmaScriptCode: "centimeter", label: "centimeter", ucumCode: "cm" },
  {
    ecmaScriptCode: "centimeter-per-hour",
    label: "centimeter per hour",
    ucumCode: "cm/h",
  },
  {
    ecmaScriptCode: "centimeter-per-second",
    label: "centimeter per second",
    ucumCode: "cm/s",
  },
  { ecmaScriptCode: "day", label: "day", ucumCode: "d" },
  { ecmaScriptCode: "degree", label: "degree", ucumCode: "deg" },
  { ecmaScriptCode: "fahrenheit", label: "fahrenheit", ucumCode: "[degF]" },
  { ecmaScriptCode: "fluid-ounce", label: "fluid ounce", ucumCode: "[foz_us]" },
  { ecmaScriptCode: "foot", label: "foot", ucumCode: "[ft_i]" },
  { ecmaScriptCode: "gallon", label: "gallon", ucumCode: "[gal_us]" },
  { ecmaScriptCode: "gigabit", label: "gigabit", ucumCode: "Gbit" },
  { ecmaScriptCode: "gigabyte", label: "gigabyte", ucumCode: "GBy" },
  { ecmaScriptCode: "gram", label: "gram", ucumCode: "g" },
  { ecmaScriptCode: "hectare", label: "hectare", ucumCode: "har" },
  { ecmaScriptCode: "hour", label: "hour", ucumCode: "h" },
  { ecmaScriptCode: "inch", label: "inch", ucumCode: "[in_i]" },
  { ecmaScriptCode: "kilobit", label: "kilobit", ucumCode: "kbit" },
  { ecmaScriptCode: "kilobyte", label: "kilobyte", ucumCode: "kBy" },
  { ecmaScriptCode: "kilogram", label: "kilogram", ucumCode: "kg" },
  {
    ecmaScriptCode: "kilogram-per-meter",
    label: "kilogram per meter",
    ucumCode: "kg/m",
  },
  { ecmaScriptCode: "kilometer", label: "kilometer", ucumCode: "km" },
  {
    ecmaScriptCode: "kilometer-per-day",
    label: "kilometer per day",
    ucumCode: "km/d",
  },
  {
    ecmaScriptCode: "kilometer-per-hour",
    label: "kilometer per hour",
    ucumCode: "km/h",
  },
  { ecmaScriptCode: "liter", label: "liter", ucumCode: "L" },
  {
    ecmaScriptCode: "liter-per-kilometer",
    label: "liter per kilometer",
    ucumCode: "L/km",
  },
  { ecmaScriptCode: "megabit", label: "megabit", ucumCode: "Mbit" },
  { ecmaScriptCode: "megabyte", label: "megabyte", ucumCode: "MBy" },
  { ecmaScriptCode: "meter", label: "meter", ucumCode: "m" },
  {
    ecmaScriptCode: "meter-per-second",
    label: "meter per second",
    ucumCode: "m/s",
  },
  { ecmaScriptCode: "mile", label: "mile", ucumCode: "[mi_i]" },
  {
    ecmaScriptCode: "mile-per-gallon",
    label: "mile per gallon",
    ucumCode: "[mi_i]/[gal_us]",
  },
  {
    ecmaScriptCode: "mile-per-hour",
    label: "mile per hour",
    ucumCode: "[mi_i]/h",
  },
  { ecmaScriptCode: "mile-scandinavian", label: "mil", ucumCode: "[mil_i]" },
  { ecmaScriptCode: "milliliter", label: "milliliter", ucumCode: "mL" },
  { ecmaScriptCode: "millimeter", label: "millimeter", ucumCode: "mm" },
  {
    ecmaScriptCode: "millimeter-per-hour",
    label: "millimeter per hour",
    ucumCode: "mm/h",
  },
  {
    ecmaScriptCode: "millimeter-per-second",
    label: "millimeter per second",
    ucumCode: "mm/s",
  },
  { ecmaScriptCode: "millisecond", label: "millisecond", ucumCode: "ms" },
  { ecmaScriptCode: "minute", label: "minute", ucumCode: "min" },
  { ecmaScriptCode: "month", label: "month", ucumCode: "mo" },
  { ecmaScriptCode: "ounce", label: "ounce", ucumCode: "[oz_av]" },
  { ecmaScriptCode: "percent", label: "percent", ucumCode: "%" },
  { ecmaScriptCode: "petabyte", label: "petabyte", ucumCode: "PBy" },
  { ecmaScriptCode: "pound", label: "pound", ucumCode: "[lb_av]" },
  { ecmaScriptCode: "second", label: "second", ucumCode: "s" },
  { ecmaScriptCode: "stone", label: "stone", ucumCode: "[stone_av]" },
  { ecmaScriptCode: "terabit", label: "terabit", ucumCode: "Tbit" },
  { ecmaScriptCode: "terabyte", label: "terabyte", ucumCode: "TBy" },
  { ecmaScriptCode: "week", label: "week", ucumCode: "wk" },
  { ecmaScriptCode: "yard", label: "yard", ucumCode: "[yd_i]" },
  { ecmaScriptCode: "year", label: "year", ucumCode: "a" },
];

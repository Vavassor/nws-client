import { isZoneGeoJson } from "@vavassor/nws-client";
import { useEffect, useState } from "react";
import { getCurrentPosition } from "./getCurrentPosition";
import { nwsClient } from "./nws";

export const useZone = () => {
  const [name, setName] = useState<string | undefined>();
  const [state, setState] = useState<string | undefined>();

  useEffect(() => {
    const updateZone = async () => {
      const position = await getCurrentPosition({
        timeout: 5000,
      });

      const zone = await nwsClient.getZone({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      if (isZoneGeoJson(zone)) {
        setName(zone.properties.name);
        setState(zone.properties.state);
      }
    };

    updateZone();
  }, []);

  return { name, state };
};

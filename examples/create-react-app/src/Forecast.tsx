import { getPoint } from "@vavassor/nws-client";
import React, { FC, useEffect } from "react";

export const Forecast: FC = () => {
  useEffect(() => {
    getPoint({ latitude: 37.5247764, longitude: -77.5633017 }).then((point) => {
      console.log(point);
    });
  }, []);

  return (
    <section>
      <h2>Forecast</h2>
    </section>
  );
};

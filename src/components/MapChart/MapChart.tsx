import React, { useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
  ZoomableGroup,
  Graticule,
} from 'react-simple-maps';
import { scaleQuantize } from 'd3-scale';

import geoUrl from '../../data/provincias.json';

const geoUrl2 =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

interface MapChartProps {
  domainData: any;
  countryData: any;
}

const MapChart = ({ domainData, countryData }: MapChartProps): JSX.Element => {
  console.log(countryData);
  const colorScale = scaleQuantize<string>()
    .domain([domainData[0].number, domainData[1].number])
    .range(['#ffedea', '#ffad9f', '#e2492d']);

  return (
    <ComposableMap width={600} height={400} projectionConfig={{ scale: 1800 }}>
      <ZoomableGroup center={[-4.5, 40]}>
        <Geographies geography={geoUrl2}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#9998A3"
                  stroke="#EAEAEC"
                  strokeWidth={0.5}
                />
              ))}
            </>
          )}
        </Geographies>
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => {
                let cur: any = null;

                countryData.forEach((region: any) => {
                  if (region.sub_regions.length > 0) {
                    region.sub_regions.forEach((subRegion: any) => {
                      if (
                        subRegion.name === geo.properties.NAME_2 ||
                        subRegion.name === geo.properties.VARNAME_2
                      ) {
                        cur = subRegion;
                      }
                    });
                  } else {
                    if (
                      region.name === geo.properties.NAME_2 ||
                      region.name === geo.properties.VARNAME_2
                    ) {
                      cur = region;
                    }
                  }
                });

                console.log(cur);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={colorScale(cur ? cur.today_new_confirmed : '#EEE')}
                    stroke="#EAEAEC"
                    strokeWidth={0.5}
                  />
                );
              })}
            </>
          )}
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default MapChart;

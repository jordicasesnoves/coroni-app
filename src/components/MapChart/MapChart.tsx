import React, { useState, useEffect, memo } from 'react';
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
  setTooltipContent: any;
  selectedProperty: any;
}

const rounded = (num: number) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + 'Bn';
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + 'M';
  } else {
    return Math.round(num / 100) / 10 + 'K';
  }
};

const scale = () => {};

const MapChart = ({
  domainData,
  countryData,
  setTooltipContent,
  selectedProperty,
}: MapChartProps): JSX.Element => {
  console.log(selectedProperty);
  const colorScale = scaleQuantize<string>()
    // Dominio: 0, 4000
    .domain([domainData[0].number, domainData[1].number / 4])
    .range([
      '#ffedea',
      '#ffcec5',
      '#ffad9f',
      '#ff8a75',
      '#ff5533',
      '#e2492d',
      '#be3d26',
      '#9a311f',
      '#782618',
    ]);

  return (
    <ComposableMap
      data-tip=""
      width={600}
      height={400}
      projectionConfig={{ scale: 1800 }}
    >
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

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={colorScale(cur ? cur[selectedProperty] : '#EEE')}
                    stroke="#EAEAEC"
                    strokeWidth={0.5}
                    onMouseEnter={() => {
                      const { NAME_2 } = geo.properties;
                      const property = cur[selectedProperty];
                      setTooltipContent(`${NAME_2} — ${rounded(property)}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent('');
                    }}
                    style={{
                      hover: {
                        fill: '#F53',
                        outline: 'none',
                      },
                    }}
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

export default memo(MapChart);

import React from 'react';
import Chart from 'react-apexcharts';
import { simpleChartOptions } from '../../config/chart';
export interface GridDataCardProps {
  title: number;
  subtitle: string;
  percentage?: number;
  chartData?: any;
  chartColor?: string;
}

const GridDataCard = ({
  title,
  subtitle,
  percentage,
  chartData,
  chartColor,
}: GridDataCardProps): JSX.Element => {
  const series = [
    {
      name: subtitle,
      data: chartData,
    },
  ];

  const options = simpleChartOptions(chartColor);

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg  bg-white whitespace-nowrap">
      <div className="flex px-5 py-4 justify-between items-center">
        <div className="flex flex-col ">
          <span className="text-gray-500 uppercase font-medium text-sm">
            {subtitle}
          </span>
          <span className="text-2xl font-semibold ">{title}</span>
        </div>
        <div>
          <span
            className={
              `px-2 py-1 rounded-lg font-semibold text-sm bg-opacity-10 ` +
              (percentage! >= 0
                ? `text-green-500 bg-green-500`
                : `text-red-500 bg-red-500`)
            }
          >
            {percentage! >= 0 ? '+' : '-'} {Math.abs(percentage!)}%
          </span>
        </div>
      </div>
      {chartData && (
        <div className="max-h-32 h-full rounded-lg">
          {' '}
          <Chart
            height={'100%'}
            options={options}
            series={series}
            type="area"
          />
        </div>
      )}
    </div>
  );
};

export default GridDataCard;

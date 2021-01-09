import React from 'react';
import Chart from 'react-apexcharts';

export interface GridDataCardProps {
  title: number;
  subtitle: string;
  percentage?: number;
  chartData?: any;
}

const GridDataCard = ({
  title,
  subtitle,
  percentage,
  chartData,
}: GridDataCardProps): JSX.Element => {
  const series = [
    {
      name: 'test',
      data: chartData,
    },
  ];
  const options = {
    colors: ['#F7931A'],
    chart: {
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      x: {
        format: 'dd MMM HH:mm',
      },
    },
    xaxis: {
      show: false,
      type: 'datetime',
      categories: [],
      labels: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: true,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    stroke: {
      width: 3,
      curve: 'smooth',
    },
  };

  return (
    <div className="flex flex-col border border-gray-200 rounded  bg-white whitespace-nowrap">
      <div className="flex flex-col px-5 py-4">
        <span className="text-gray-500">{subtitle}</span>
        <span className="text-3xl font-medium ">{title}</span>
      </div>
      {percentage && <span>{percentage * 100}</span>}
      {chartData && (
        <div className="max-h-32 h-full">
          {' '}
          <Chart
            height={'100%'}
            options={options}
            series={series}
            type="line"
          />
        </div>
      )}
    </div>
  );
};

export default GridDataCard;

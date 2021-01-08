import React from 'react';

export interface GridDataCardProps {
  title: number;
  subtitle: string;
  percentage?: number;
}

const GridDataCard = ({
  title,
  subtitle,
  percentage,
}: GridDataCardProps): JSX.Element => {
  return (
    <div className="flex flex-col shadow-lg rounded px-5 py-4 bg-white whitespace-nowrap">
      <span className="text-gray-500">{subtitle}</span>
      <span className="text-3xl font-medium ">{title}</span>
      {percentage && <span>{percentage * 100}</span>}
    </div>
  );
};

export default GridDataCard;

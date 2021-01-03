import React from 'react';

export interface GridDataCardProps {
  title: number;
  subtitle: string;
}

const GridDataCard = ({ title, subtitle }: GridDataCardProps): JSX.Element => {
  return (
    <div className="flex flex-col shadow-lg rounded px-5 py-4 bg-white">
      <span className="text-gray-500">{subtitle}</span>
      <span className="text-3xl font-medium">{title}</span>
    </div>
  );
};

export default GridDataCard;

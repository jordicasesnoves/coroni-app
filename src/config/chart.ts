export const simpleChartOptions = (color?: any): any => {
  let options = {
    colors: color ? [color] : ['#F7931A'],
    chart: {
      locales: [
        {
          name: 'es',
          options: {
            months: [
              'Enero',
              'Febrero',
              'Marzo',
              'Abril',
              'Mayo',
              'Junio',
              'Julio',
              'Agosto',
              'Septiembre',
              'Octubre',
              'Noviembre',
              'Diciembre',
            ],
            shortMonths: [
              'Ene',
              'Feb',
              'Mar',
              'Abr',
              'May',
              'Jun',
              'Jul',
              'Ago',
              'Sep',
              'Oct',
              'Nov',
              'Dic',
            ],
          },
        },
      ],
      defaultLocale: 'es',
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
        format: 'dd MMM',
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

  return options;
};

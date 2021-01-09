import { useState, useEffect } from 'react';
import {
  getCountryDataByDate,
  getCountryDataByDateRange,
} from '../../services/api';
import ReactTooltip from 'react-tooltip';
import { GridDataCard, MapChart } from '../../components';
import {
  calcTopProvinces,
  calculateDomain,
  getDataSet,
  getTodayDate,
  getTimeAgoDate,
  getYesterdayDate,
} from '../../utils/utils';

const HomePage = () => {
  const [totalData, setTotalData] = useState<any>(null);
  const [countryData, setCountryData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [content, setContent] = useState<string>('');
  const [domainData, setDomainData] = useState<any>(null);
  const [selectedProperty, setSelectedProperty] = useState<string>(
    'today_confirmed'
  );
  const [dataSet, setDataSet] = useState<any>(null);
  const [topProvinces, setTopProvinces] = useState<any>(null);

  const [allData, setAllData] = useState<any>(null);

  useEffect(() => {
    getData();
  }, [selectedProperty]);

  const getData = (): any => {
    let todayDate = getTodayDate();
    let yesterdayDate = getYesterdayDate();
    let weekAgoDate = getTimeAgoDate(60);

    let date = new Date();
    let hours = date.getHours();

    // load today data when >= 0am
    let shouldLoadTodayItems: boolean = hours > 0;

    getCountryDataByDateRange(
      weekAgoDate,
      shouldLoadTodayItems ? todayDate : yesterdayDate,
      'Spain'
    )
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .then((data) => {
        let selectedDate = shouldLoadTodayItems ? todayDate : yesterdayDate;
        const regionsData = data.dates[selectedDate].countries.Spain.regions;
        setAllData(data);

        setTotalData(data.dates[selectedDate].countries.Spain);
        setCountryData(regionsData);
        setDomainData(calculateDomain(regionsData, selectedProperty));
        setDataSet(getDataSet(regionsData, selectedProperty));
        setTopProvinces(
          calcTopProvinces(
            regionsData,
            data.dates[selectedDate].countries.Spain,
            selectedProperty
          )
        );
        setLoading(false);
      });
  };

  const calcChartData = (data: any, property: any): any => {
    let _data: any = data.dates;
    let keys: any = Object.keys(_data);
    let chartData: any[] = [];

    for (let i = 0; i < keys.length; i++) {
      let dataNumber: number = _data[keys[i]].countries.Spain[property];
      if (dataNumber > 0) {
        let date = keys[i];
        date = date.split('-');
        // yyyy, mm, dd

        let newDate = new Date(date[0], date[1] - 1, date[2]);
        const timestamp = newDate.getTime();

        // only upload monday's data

        chartData.push([timestamp, dataNumber]);
      }
    }

    return chartData;
  };

  const handlePropertyChange = (event: any): any => {
    let newProperty = event.target.value;
    setSelectedProperty(newProperty);
  };

  if (loading) return <span>Loading...</span>;

  return (
    <div className="flex flex-col space-y-12">
      <span className="text-2xl">Datos a fecha de: {totalData.date}</span>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <GridDataCard
          title={totalData.today_confirmed}
          subtitle={'Confirmados'}
          chartData={calcChartData(allData, ['today_confirmed'])}
        />
        <GridDataCard
          title={totalData.today_new_confirmed}
          subtitle={'Nuevos confirmados'}
          chartData={calcChartData(allData, ['today_new_confirmed'])}
        />
        <GridDataCard
          title={totalData.today_new_deaths}
          subtitle={'Nuevas muertes'}
          chartData={calcChartData(allData, ['today_new_deaths'])}
        />
        <GridDataCard
          title={totalData.today_new_open_cases}
          subtitle={'Nuevos casos abiertos'}
          chartData={calcChartData(allData, ['today_new_open_cases'])}
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="flex h-96 md:h-128 flex-col col-span-4 md:col-span-3 justify-between">
          <div className="flex mb-4 items-center justify-between">
            <span className="text-3xl font-medium">Mapa provincial</span>
            <select
              className="bg-transparent self-center text-gray-600"
              value={selectedProperty}
              onChange={handlePropertyChange}
            >
              <option value="today_confirmed">Total confirmados</option>
              <option value="today_new_confirmed">Confirmados 24h</option>
              <option value="today_deaths">Total muertes</option>
              <option value="today_new_deaths">Muertes 24h</option>
            </select>
          </div>
          <div className="flex-1 h-64 md:h-96 bg-white rounded-lg border border-gray-200 ">
            <MapChart
              dataSet={dataSet}
              domainData={domainData}
              countryData={countryData}
              setTooltipContent={setContent}
              selectedProperty={selectedProperty}
            />
            <ReactTooltip>{content}</ReactTooltip>
          </div>
        </div>
        <div className="overflow-auto h-96 md:h-128 col-span-4 md:col-span-1 bg-white rounded-lg border border-gray-200 px-4 py-2 flex flex-col space-y-2">
          <span className="text-xl font-medium">Top provincias</span>
          <ul>
            {topProvinces.map((province: any, index: number) => (
              <li
                key={`${index}-${province.name}`}
                className="flex justify-between items-end mb-3"
              >
                <div className="truncate">{province.name}</div>{' '}
                <div className="font-medium text-md">
                  {province.percentage >= 1
                    ? province.percentage.toFixed(0)
                    : province.percentage.toFixed(1)}
                  %
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

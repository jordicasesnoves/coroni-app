import { useState, useEffect } from 'react';
import { getCountryDataByDate } from '../../services/api';
import ReactTooltip from 'react-tooltip';
import { GridDataCard, MapChart } from '../../components';
import { calculateDomain, getTodayDate } from '../../utils/utils';

const HomePage = () => {
  const [totalData, setTotalData] = useState<any>(null);
  const [countryData, setCountryData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [content, setContent] = useState<string>('');
  const [domainData, setDomainData] = useState<any>(null);
  const [selectedProperty, setSelectedProperty] = useState<string>(
    'today_confirmed'
  );

  useEffect(() => {
    // API's date format
    // yyyy-mm-dd

    let todayDate = getTodayDate();

    getCountryDataByDate(todayDate, 'Spain')
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .then((data) => {
        console.log(data);
        setTotalData(data.dates[todayDate].countries.Spain);
        const regionsData = data.dates[todayDate].countries.Spain.regions;
        setCountryData(regionsData);
        setDomainData(calculateDomain(regionsData, selectedProperty));
        calcTopProvinces(regionsData);
        setLoading(false);
      });
  }, []);

  const handlePropertyChange = (event: any): any => {
    let newProperty = event.target.value;
    setSelectedProperty(newProperty);
    setDomainData(calculateDomain(countryData, newProperty));
  };

  const calcTopProvinces = (data: any): void => {
    console.log(data);
  };

  if (loading) return <span>Loading...</span>;

  return (
    <div className="flex flex-col space-y-12">
      <div className="mt-4 grid grid-cols-4 gap-4">
        <GridDataCard
          title={totalData.today_new_confirmed}
          subtitle={'Nuevos confirmados'}
        />
        <GridDataCard
          title={totalData.today_new_deaths}
          subtitle={'Nuevas muertes'}
        />
        <GridDataCard
          title={totalData.today_new_recovered}
          subtitle={'Nuevos recuperados'}
        />
        <GridDataCard
          title={totalData.today_new_open_cases}
          subtitle={'Nuevos casos abiertos'}
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2 flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-medium">Mapa provincias</span>
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
          <div className="bg-white rounded-lg shadow-lg">
            <MapChart
              domainData={domainData}
              countryData={countryData}
              setTooltipContent={setContent}
              selectedProperty={selectedProperty}
            />
            <ReactTooltip>{content}</ReactTooltip>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg px-4 py-2 col-span-1 flex flex-col space-y-2">
          <span className="text-xl font-medium">Top provincias</span>
        </div>
      </div>

      <span>Datos a fecha de: {totalData.date}</span>
    </div>
  );
};

export default HomePage;

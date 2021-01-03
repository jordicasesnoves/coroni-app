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
        setLoading(false);
      });
  }, []);

  const handlePropertyChange = (event: any): any => {
    let newProperty = event.target.value;
    setSelectedProperty(newProperty);
    setDomainData(calculateDomain(countryData, newProperty));
  };

  if (loading) return <span>Loading...</span>;

  return (
    <>
      <span>Datos a fecha de: {totalData.date}</span>

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

      {/* <div>
        <select value={selectedProperty} onChange={handlePropertyChange}>
          <option value="today_confirmed">Total confirmados</option>
          <option value="today_new_confirmed">Confirmados 24h</option>
          <option value="today_deaths">Total muertes</option>
          <option value="today_new_deaths">Muertes 24h</option>
        </select>
      </div> */}

      {/* <div className="w-64">
        <MapChart
          domainData={domainData}
          countryData={countryData}
          setTooltipContent={setContent}
          selectedProperty={selectedProperty}
        />
        <ReactTooltip>{content}</ReactTooltip>
      </div> */}
    </>
  );
};

export default HomePage;

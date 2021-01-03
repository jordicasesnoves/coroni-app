import { useState, useEffect } from 'react';
import MapChart from '../../components/MapChart/MapChart';
import { getCountryDataByDate } from '../../services/api';
import ReactTooltip from 'react-tooltip';

import { calculateDomain, getTodayDate } from '../../utils/utils';

const HomePage = () => {
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
    <div>
      <span>Home Page</span>
      <select value={selectedProperty} onChange={handlePropertyChange}>
        <option value="today_confirmed">Confirmados Hoy</option>
        <option value="today_new_confirmed">Confirmados 24h</option>
        <option value="today_deaths">Muertes hoy</option>
        <option value="today_new_deaths">Muertes 24h</option>
      </select>
      <div
        style={{
          width: 600,
          height: 400,
          margin: '0 auto',
          border: '1px solid black',
        }}
      >
        <MapChart
          domainData={domainData}
          countryData={countryData}
          setTooltipContent={setContent}
          selectedProperty={selectedProperty}
        />
        <ReactTooltip>{content}</ReactTooltip>
      </div>
    </div>
  );
};

export default HomePage;

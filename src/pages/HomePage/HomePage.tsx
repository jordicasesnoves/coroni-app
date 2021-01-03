import { useState, useEffect } from 'react';
import MapChart from '../../components/MapChart/MapChart';
import { getCountryDataByDate } from '../../services/api';
import ReactTooltip from 'react-tooltip';

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

    const today = new Date();
    let dd: string = today.getDate().toString();
    let mm: string = (today.getMonth() + 1).toString();
    const yyyy: string = today.getFullYear().toString();

    if (parseInt(dd) < 10) {
      dd = `0${dd}`;
    }

    if (parseInt(mm) < 10) {
      mm = `0${mm}`;
    }

    const todayDate = `${yyyy}-${mm}-${dd}`;

    getCountryDataByDate(todayDate, 'Spain')
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .then((data) => {
        console.log(data);
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

  const calculateDomain = (data: any, property: any): any => {
    let propertyCriteria = property;

    // Calculate max
    // -------------
    let maxRegion = {
      name: '',
      number: 0,
      date: '',
    };

    data.forEach((region: any) => {
      // there are sub regions
      if (region.sub_regions.length > 0) {
        region.sub_regions.forEach((subRegion: any) => {
          if (subRegion[propertyCriteria] > maxRegion.number) {
            maxRegion.number = subRegion[propertyCriteria];
            maxRegion.name = subRegion.name;
            maxRegion.date = subRegion.date;
          }
        });
      } else {
        if (region[propertyCriteria] > maxRegion.number) {
          maxRegion.number = region[propertyCriteria];
          maxRegion.name = region.name;
          maxRegion.date = region.date;
        }
      }
    });

    // Calculate min
    // -------------
    let minRegion = {
      name: '',
      number: maxRegion.number,
      date: '',
    };

    data.forEach((region: any) => {
      if (region.sub_regions.length > 0) {
        region.sub_regions.forEach((subRegion: any) => {
          if (subRegion[propertyCriteria] < minRegion.number) {
            minRegion.number = subRegion[propertyCriteria];
            minRegion.name = subRegion.name;
            minRegion.date = subRegion.date;
          }
        });
      } else {
        if (region[propertyCriteria] < minRegion.number) {
          minRegion.number = region[propertyCriteria];
          minRegion.name = region.name;
          minRegion.date = region.date;
        }
      }
    });
    return [minRegion, maxRegion];
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

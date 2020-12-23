import { useState, useEffect } from 'react';

import { getCountries, getDataByDateRange } from '../../services/api';

const HomePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getDataByDateRange('2020-12-22', '2020-12-23')
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <span>Loading...</span>;

  return <span>Home Page</span>;
};

export default HomePage;

import React, { useState, useEffect } from 'react';

import { getCountries, getDataByDateRange } from '../../services/api';

const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDataByDateRange('2020-12-22', '2020-12-23')
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return <span>Home Page works!</span>;
};

export default HomePage;

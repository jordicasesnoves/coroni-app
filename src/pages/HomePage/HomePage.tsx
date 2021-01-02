import { useState, useEffect } from 'react';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

import { getCountryDataByDate } from '../../services/api';

const HomePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 2020-03-22
    // yyyy-mm-dd

    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    const todayDate = `${yyyy}-${mm}-${dd}`;

    getCountryDataByDate(todayDate, 'Spain')
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .then((data) => {
        console.log(data);
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <span>Loading...</span>;

  return <span>Home Page</span>;
};

export default HomePage;

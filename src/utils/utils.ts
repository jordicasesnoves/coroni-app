export const rounded = (num: number): string => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + 'Bn';
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + 'M';
  } else if (num > 100) {
    return Math.round(num / 100) / 10 + 'K';
  } else {
    return `${num}`;
  }
};

export const getDataSet = (data: any, property: any): any => {
  let propertyCriteria = property;
  let numbers: any[] = [];

  data.forEach((region: any) => {
    // there are sub regions
    if (region.sub_regions.length > 0) {
      region.sub_regions.forEach((subRegion: any) => {
        numbers.push(subRegion[propertyCriteria]);
      });
    } else {
      numbers.push(region[propertyCriteria]);
    }
  });

  return numbers;
};

export const calculateDomain = (data: any, property: any): any => {
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

export const calcTopProvinces = (
  regions: any,
  allData: any,
  property: any
): any => {
  let selectedProp = property;
  let topProvinces: any = [];
  regions.forEach((region: any) => {
    if (region.sub_regions.length > 0) {
      region.sub_regions.forEach((subRegion: any) => {
        if (subRegion[selectedProp]) {
          let percentage =
            (subRegion[selectedProp] / allData[selectedProp]) * 100;
          topProvinces.push({
            name: subRegion.name,
            percentage: percentage,
          });
        }
      });
    } else {
      if (region[selectedProp]) {
        let percentage = (region[selectedProp] / allData[selectedProp]) * 100;
        topProvinces.push({
          name: region.name,
          percentage: percentage,
        });
      }
    }
  });

  topProvinces.sort((a: any, b: any) => (a.percentage > b.percentage ? -1 : 1));

  return topProvinces;
};

export const getTodayDate = (): string => {
  // API's date format
  // yyyy-mm-dd
  let todayDate = '';

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

  todayDate = `${yyyy}-${mm}-${dd}`;

  return todayDate;
};

export const getYesterdayDate = (): string => {
  // API's date format
  // yyyy-mm-dd
  let yesterdayDate = '';

  const today = new Date();
  today.setDate(today.getDate() - 1);

  let dd: string = today.getDate().toString();
  let mm: string = (today.getMonth() + 1).toString();
  const yyyy: string = today.getFullYear().toString();

  if (parseInt(dd) < 10) {
    dd = `0${dd}`;
  }

  if (parseInt(mm) < 10) {
    mm = `0${mm}`;
  }

  yesterdayDate = `${yyyy}-${mm}-${dd}`;

  return yesterdayDate;
};

export const getTimeAgoDate = (timeAgo: number): string => {
  let timeAgoDate = '';

  let date = new Date();
  let hours = date.getHours();

  // load today data when >= 9am
  let shouldLoadTodayItems: boolean = hours > 9;

  const today = new Date();
  today.setDate(
    today.getDate() - (shouldLoadTodayItems ? timeAgo - 1 : timeAgo)
  );

  let dd: string = today.getDate().toString();
  let mm: string = (today.getMonth() + 1).toString();
  const yyyy: string = today.getFullYear().toString();

  if (parseInt(dd) < 10) {
    dd = `0${dd}`;
  }

  if (parseInt(mm) < 10) {
    mm = `0${mm}`;
  }

  timeAgoDate = `${yyyy}-${mm}-${dd}`;

  return timeAgoDate;
};

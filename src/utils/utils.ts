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

export const getTodayDate = (): string => {
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

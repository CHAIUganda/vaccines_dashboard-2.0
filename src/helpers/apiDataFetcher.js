import { useState, useEffect } from "react";

// const proxyurl = "https://cors-anywhere.herokuapp.com/";
// const apiEndpoint = "http://localhost:9000/coverage/";
const apiEndpoint = require("../env_config").default;

export const useVaccineDosesForCoverageByMonth = (
  endYear,
  startYear,
  dose,
  vaccine,
  district
) => {
  const vaccineDosesByPeriodURL = `${apiEndpoint}/coverage/api/vaccinedoses_by_period?district=${district}&dose=${dose}&endYear=${endYear}&startYear=${startYear}&vaccine=${vaccine}`;
  const vaccineDosesForMapURL = `${apiEndpoint}/coverage/api/vaccinedoses_by_period?dataType=map&endYear=${startYear}`;

  const [isLoadingCoverageByMonth, setIsLoadingCoverageByMonth] = useState(
    false
  );
  const [
    vaccineDosesForCoverageByMonth,
    setVaccineDosesForCoverageByMonth
  ] = useState(null);
  const [
    vaccineDosesForCoverageByMonthMap,
    setVaccineDosesForCoverageByMonthMap
  ] = useState(null);

  useEffect(() => {
    setIsLoadingCoverageByMonth(true);

    const vaccineDosesForCoverageByMonthReq = async () => {
      const response = await fetch(vaccineDosesByPeriodURL);
      return await response.json();
    };

    const vaccineDosesForCoverageByMonthMapReq = async () => {
      const response = await fetch(vaccineDosesForMapURL);
      return await response.json();
    };

    const getAllData = () => {
      return Promise.all([
        vaccineDosesForCoverageByMonthReq(),
        vaccineDosesForCoverageByMonthMapReq()
      ]);
    };
    getAllData().then(
      ([vaccineDosesForCoverageByMonth, vaccineDosesForCoverageByMonthMap]) => {
        setVaccineDosesForCoverageByMonth(vaccineDosesForCoverageByMonth);
        setVaccineDosesForCoverageByMonthMap(vaccineDosesForCoverageByMonthMap);
        setIsLoadingCoverageByMonth(false);
      }
    );
  }, [endYear, startYear, dose, vaccine, district]);
  return [
    {
      vaccineDosesForCoverageByMonth,
      vaccineDosesForCoverageByMonthMap,
      isLoadingCoverageByMonth
    }
  ];
};

export const useVaccineDosesForCoverageByYear = (
  endYear,
  startYear,
  dose,
  vaccine,
  district
) => {
  const vaccineDosesByPeriodURL = `${apiEndpoint}/coverage/api/vaccinedoses_by_period?district=${district}&dose=${dose}&endYear=${endYear}&startYear=${startYear}&vaccine=${vaccine}`;

  const [isLoadingCoverageByYear, setIsLoadingCoverageByYear] = useState(false);
  const [
    vaccineDosesForCoverageByYear,
    setVaccineDosesForCoverageByYear
  ] = useState(null);

  useEffect(() => {
    setIsLoadingCoverageByYear(true);

    const vaccineDosesForCoverageByYearReq = async () => {
      const response = await fetch(vaccineDosesByPeriodURL);
      return await response.json();
    };

    const getAllData = () => {
      return Promise.all([vaccineDosesForCoverageByYearReq()]);
    };
    getAllData().then(
      ([vaccineDosesForCoverageByMonth, vaccineDosesForCoverageByMonthMap]) => {
        setVaccineDosesForCoverageByYear(vaccineDosesForCoverageByMonth);
        setIsLoadingCoverageByYear(false);
      }
    );
  }, [endYear, startYear, dose, vaccine, district]);
  return [
    {
      vaccineDosesForCoverageByYear,
      isLoadingCoverageByYear
    }
  ];
};

export const useVaccineDosesForDropoutRate = (
  endYear,
  startYear,
  dose,
  vaccine,
  district
) => {
  const vaccineDosesByPeriodURL = `${apiEndpoint}/coverage/api/vaccinedoses_by_period?district=${district}&dose=${dose}&endYear=${endYear}&startYear=${startYear}&vaccine=${vaccine}`;

  const vaccineDosesForMapURL = `${apiEndpoint}/coverage/api/vaccinedoses_by_period?dataType=map&endYear=${startYear}`;

  const [isLoadingDropoutRate, setIsLoadingDropoutRate] = useState(false);
  const [
    vaccineDosesForCoverageDropoutRate,
    setVaccineDosesForCoverageDropoutRate
  ] = useState(null);

  const [
    vaccineDosesForCoverageDropoutRateMap,
    setVaccineDosesForCoverageDropoutRateMap
  ] = useState(null);

  useEffect(() => {
    setIsLoadingDropoutRate(true);

    const vaccineDosesForDropoutRateReq = async () => {
      const response = await fetch(vaccineDosesByPeriodURL);
      return await response.json();
    };

    const vaccineDosesForDropoutRateMapReq = async () => {
      const response = await fetch(vaccineDosesForMapURL);
      return await response.json();
    };

    const getAllData = () => {
      return Promise.all([
        vaccineDosesForDropoutRateReq(),
        vaccineDosesForDropoutRateMapReq()
      ]);
    };
    getAllData().then(
      ([
        vaccineDosesForCoverageDropoutRate,
        vaccineDosesForCoverageDropoutRateMap
      ]) => {
        setVaccineDosesForCoverageDropoutRate(
          vaccineDosesForCoverageDropoutRate
        );
        setVaccineDosesForCoverageDropoutRateMap(
          vaccineDosesForCoverageDropoutRateMap
        );
        setIsLoadingDropoutRate(false);
      }
    );
  }, [endYear, startYear, dose, vaccine, district]);
  return [
    {
      vaccineDosesForCoverageDropoutRate,
      vaccineDosesForCoverageDropoutRateMap,
      isLoadingDropoutRate
    }
  ];
};

export const useVaccineDosesForRedCategory = (
  endYear,
  startYear,
  dose,
  vaccine,
  district
) => {
  const vaccineDosesByPeriodRedCategoryURL = `${apiEndpoint}/coverage/api/vaccinedoses_by_period?district=${district}&dose=${dose}&enableDistrictGrouping=1&endYear=${endYear}&startYear=${startYear}&vaccine=${vaccine}`;

  const vaccineDosesForMapURL = `${apiEndpoint}/coverage/api/vaccinedoses_by_period?dataType=map&endYear=${startYear}`;

  const [isLoadingRedCategory, setIsLoadingRedCategory] = useState(false);
  const [
    vaccineDosesForCoverageRedCategory,
    setVaccineDosesForCoverageRedCategory
  ] = useState(null);

  const [
    vaccineDosesForCoverageRedCategoryMap,
    setVaccineDosesForCoverageRedCategoryMap
  ] = useState(null);

  useEffect(() => {
    setIsLoadingRedCategory(true);

    const vaccineDosesForRedCategoryReq = async () => {
      const response = await fetch(vaccineDosesByPeriodRedCategoryURL);
      return await response.json();
    };

    const vaccineDosesForRedCategoryMapReq = async () => {
      const response = await fetch(vaccineDosesForMapURL);
      return await response.json();
    };

    const getAllData = () => {
      return Promise.all([
        vaccineDosesForRedCategoryReq(),
        vaccineDosesForRedCategoryMapReq()
      ]);
    };
    getAllData().then(
      ([
        vaccineDosesForCoverageRedCategory,
        vaccineDosesForCoverageRedCategoryMap
      ]) => {
        setVaccineDosesForCoverageRedCategory(
          vaccineDosesForCoverageRedCategory
        );
        setVaccineDosesForCoverageRedCategoryMap(
          vaccineDosesForCoverageRedCategoryMap
        );
        setIsLoadingRedCategory(false);
      }
    );
  }, [endYear, startYear, dose, vaccine, district]);

  // debugger;
  return [
    {
      vaccineDosesForCoverageRedCategory,
      vaccineDosesForCoverageRedCategoryMap,
      isLoadingRedCategory
    }
  ];
};

export const useGetDistricts = district => {
  const districtsURL = `${apiEndpoint}/api/districts`;
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
  const [districts, setDistricts] = useState(null);
  useEffect(() => {
    setIsLoadingDistricts(true);
    const districtsReq = async () => {
      const response = await fetch(districtsURL);
      return await response.json();
    };

    const getAllData = () => {
      return Promise.all([districtsReq()]);
    };

    getAllData().then(([, districts]) => {
      setDistricts(districts);

      setIsLoadingDistricts(false);
    });
  }, [district]);

  return [
    {
      districts,
      isLoadingDistricts
    }
  ];
};

// export const useApiDataFetch = (
//   endYear,
//   startYear,
//   dose,
//   vaccine,
//   district,
//   redcatVaccine
// ) => {
//   const vaccineDosesByPeriodURL =
//     apiEndpoint +
//     `api/vaccinedoses_by_period?district=${district}&dose=${dose}&endYear=${endYear}&startYear=${startYear}&vaccine=${vaccine}`;
//   const districtsURL = "http://localhost:9000/api/districts";
//   const vaccinesURL = "http://localhost:9000/api/vaccines";
//   const quartersURL = "http://localhost:9000/coldchain/api/quarters";
//   const periodsRangesURL = "http://localhost:9000/coverage/api/period_ranges";

//   const vaccineDosesForMapURL =
//     apiEndpoint + `api/vaccinedoses_by_period?dataType=map&endYear=${endYear}`;

//   const vaccineDosesByPeriodRedCategoryURL =
//     apiEndpoint +
//     `api/vaccinedoses_by_period?district=${district}&dose=${dose}&enableDistrictGrouping=1&endYear=${endYear}&startYear=${startYear}&vaccine=${redcatVaccine}`;

//   const [isLoading, setIsLoading] = useState(false);
//   const [vaccineDoses, setVaccineDoses] = useState(null);
//   const [districts, setDistricts] = useState(null);
//   const [vaccines, setVaccines] = useState(null);
//   const [quarters, setQuarters] = useState(null);
//   const [periodRanges, setPeriodRanges] = useState(null);
//   const [vaccineDosesForMap, setVaccineDosesForMap] = useState(null);
//   const [vaccineDosesForRedCat, setVaccineDosesForRedCat] = useState(null);

//   useEffect(() => {
//     setIsLoading(true);

//     const vaccineDosesReq = async () => {
//       const response = await fetch(vaccineDosesByPeriodURL);
//       return await response.json();
//     };

//     const districtsReq = async () => {
//       const response = await fetch(districtsURL);
//       return await response.json();
//     };

//     const vaccinesReq = async () => {
//       const response = await fetch(vaccinesURL);
//       return await response.json();
//     };

//     const quartersReq = async () => {
//       const response = await fetch(quartersURL);
//       return await response.json();
//     };

//     const periodRangesReq = async () => {
//       const response = await fetch(periodsRangesURL);
//       return await response.json();
//     };

//     const vaccineDosesForMapReq = async () => {
//       const response = await fetch(vaccineDosesForMapURL);
//       return await response.json();
//     };

//     const vaccineDosesForRedCatReq = async () => {
//       const response = await fetch(vaccineDosesByPeriodRedCategoryURL);
//       return await response.json();
//     };

//     const getAllData = () => {
//       // Request all data in parallel and return a Promise when all requests resolve
//       // Promise.all returns a new promise that resolves when all of its arguments resolve
//       return Promise.all([
//         vaccineDosesReq(),
//         districtsReq(),
//         vaccinesReq(),
//         quartersReq(),
//         periodRangesReq(),
//         vaccineDosesForMapReq(),
//         vaccineDosesForRedCatReq()
//       ]);
//     };

//     // When Promise reolves, all data is available are available and we can set state appropriately
//     getAllData().then(
//       ([
//         vaccineDoses,
//         districts,
//         vaccines,
//         quarters,
//         periodRanges,
//         vaccineDosesForMap,
//         vaccineDosesForRedCatReq
//       ]) => {
//         // everything has loaded successfully
//         setVaccineDoses(vaccineDoses);
//         setDistricts(districts);
//         setVaccines(vaccines);
//         setQuarters(quarters);
//         setPeriodRanges(periodRanges);
//         setVaccineDosesForMap(vaccineDosesForMap);
//         setVaccineDosesForRedCat(vaccineDosesForRedCatReq);
//         setIsLoading(false);
//       }
//     );
//   }, [endYear, startYear, dose, vaccine, district]);

//   return [
//     {
//       vaccineDoses,
//       districts,
//       vaccines,
//       quarters,
//       periodRanges,
//       vaccineDosesForMap,
//       vaccineDosesForRedCat,
//       isLoading
//     }
//   ];
// };

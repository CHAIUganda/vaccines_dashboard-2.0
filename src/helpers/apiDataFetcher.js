import { useState, useEffect } from "react";

const apiEndpoint = require("../env_config").default;

// Because the backend on the production runs on port 80 (default port)
const port =
  apiEndpoint === "localhost" || apiEndpoint === "35.226.24.173" ? ":9000" : "";

export const useVaccineDosesForCoverageByMonth = (
  endYear,
  startYear,
  dose,
  vaccine,
  district
) => {
  const quotedAndCommaSeparatedDistricts = "'" + district.join("','") + "'";

  const vaccineDosesByPeriodURL =
    district.length === 1
      ? `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?district=${district}&dose=${dose}&endYear=${endYear}&startYear=${startYear}&vaccine=${vaccine}`
      : `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?districts=[${quotedAndCommaSeparatedDistricts}]&dose=${dose}&endYear=${endYear}&startYear=${startYear}&vaccine=${vaccine}`;
  const vaccineDosesForMapURL = `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?dataType=map&endYear=${startYear}`;

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
  const quotedAndCommaSeparatedDistricts = "'" + district.join("','") + "'";

  const vaccineDosesByPeriodURL =
    district.length === 1
      ? `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?district=${district}&dose=${dose}&endYear=${endYear}&startYear=${startYear}&vaccine=${vaccine}`
      : `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?districts=[${quotedAndCommaSeparatedDistricts}]&dose=${dose}&endYear=${endYear}&startYear=${startYear}&vaccine=${vaccine}`;

  // const vaccineDosesByPeriodURL = `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?district=${district}&dose=${dose}&endYear=${endYear}&startYear=${startYear}&vaccine=${vaccine}`;

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
  const quotedAndCommaSeparatedDistricts = "'" + district.join("','") + "'";

  const vaccineDosesByPeriodURL =
    district.length === 1
      ? `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?district=${district}&dose=${dose}&endYear=${endYear}&startYear=${startYear}&vaccine=${vaccine}`
      : `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?districts=[${quotedAndCommaSeparatedDistricts}]&dose=${dose}&endYear=${endYear}&startYear=${startYear}&vaccine=${vaccine}`;
  // const vaccineDosesByPeriodURL = `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?district=${district}&dose=${dose}&endYear=${endYear}&startYear=${startYear}&vaccine=${vaccine}`;

  const vaccineDosesForMapURL = `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?dataType=map&endYear=${startYear}`;

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
  const vaccineDosesByPeriodRedCategoryURL = `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?district=${district}&dose=${dose}&enableDistrictGrouping=1&endYear=${endYear}&startYear=${startYear}&vaccine=${vaccine}`;

  const vaccineDosesForMapURL = `http://${apiEndpoint}${port}/coverage/api/vaccinedoses_by_period?dataType=map&endYear=${startYear}`;

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
  const districtsURL = `http://${apiEndpoint}${port}/api/districts`;
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

    getAllData().then(([districts]) => {
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

export const useGetMonths = () => {
  const monthsURL = `http://${apiEndpoint}${port}/api/months`;
  const [isLoadingMonthsData, setIsLoadingMonthsData] = useState(false);
  const [monthsData, setMonthsData] = useState(null);
  useEffect(() => {
    setIsLoadingMonthsData(true);
    const monthsDataReq = async () => {
      const response = await fetch(monthsURL);
      return await response.json();
    };

    const getAllData = () => {
      return Promise.all([monthsDataReq()]);
    };

    getAllData().then(([monthsData]) => {
      setMonthsData(monthsData);

      setIsLoadingMonthsData(false);
    });
  }, [monthsURL]);

  return [
    {
      monthsData,
      isLoadingMonthsData
    }
  ];
};

export const useGetDistrictStockLevels = (
  district,
  endMonth,
  startMonth,
  vaccine
) => {
  const atHandStockByDistrictURL = `http://${apiEndpoint}${port}/api/stock/athandbydistrict?district=${district}&endMonth=${endMonth}&startMonth=${startMonth}&vaccine=${vaccine}`;

  const [
    isLoadingDistrictStockLevels,
    setIsLoadingDistrictStockLevels
  ] = useState(false);

  const [
    atHandStockByDistrictStockLevels,
    setAtHandStockByDistrictStockLevels
  ] = useState(null);

  useEffect(() => {
    setIsLoadingDistrictStockLevels(true);

    const atHandStockByDistrictStockLevelsReq = async () => {
      const response = await fetch(atHandStockByDistrictURL);
      return await response.json();
    };

    const getAllData = () => {
      return Promise.all([atHandStockByDistrictStockLevelsReq()]);
    };
    getAllData().then(([atHandStockByDistrictStockLevels]) => {
      setAtHandStockByDistrictStockLevels(atHandStockByDistrictStockLevels);
      setIsLoadingDistrictStockLevels(false);
    });
  }, [endMonth, startMonth, vaccine, district]);

  return [
    {
      atHandStockByDistrictStockLevels,
      isLoadingDistrictStockLevels
    }
  ];
};

export const useGetRefillRateData = (
  district,
  endMonth,
  startMonth,
  vaccine
) => {
  const quotedAndCommaSeparatedDistricts = "'" + district.join("','") + "'";

  const stockByDistrictVaccineURL =
    district.length === 1
      ? `http://${apiEndpoint}${port}/api/stock/stockbydistrictvaccine?district=${district}&endMonth=${endMonth}&startMonth=${startMonth}&vaccine=${vaccine}`
      : `http://${apiEndpoint}${port}/api/stock/stockbydistrictvaccine?districts=[${quotedAndCommaSeparatedDistricts}]&endMonth=${endMonth}&startMonth=${startMonth}&vaccine=${vaccine}`;

  // const stockByDistrictVaccineURL = `http://${apiEndpoint}${port}/api/stock/stockbydistrictvaccine?districts=[${quotedAndCommaSeparatedDistricts}]&endMonth=${endMonth}&startMonth=${startMonth}&vaccine=${vaccine}`;
  const atHandStockByDistrictURL = `http://${apiEndpoint}${port}/api/stock/athandbydistrict?district=&endMonth=${endMonth}&startMonth=${startMonth}&vaccine=${vaccine}`;

  const [isLoadingRefillRateData, setIsLoadingRefillRateData] = useState(false);

  const [
    stockByDistrictVaccineRefillData,
    setStockByDistrictVaccineRefillData
  ] = useState(null);

  const [
    atHandStockByDistrictRefillData,
    setAtHandStockByDistrictRefillData
  ] = useState(null);

  useEffect(() => {
    setIsLoadingRefillRateData(true);

    const stockByDistrictVaccineRefillDataReq = async () => {
      const response = await fetch(stockByDistrictVaccineURL);
      return await response.json();
    };

    const atHandStockByDistrictRefillDataReq = async () => {
      const response = await fetch(atHandStockByDistrictURL);
      return await response.json();
    };

    const getAllData = () => {
      return Promise.all([
        stockByDistrictVaccineRefillDataReq(),
        atHandStockByDistrictRefillDataReq()
      ]);
    };
    getAllData().then(
      ([stockByDistrictVaccineRefillData, atHandStockByDistrictRefillData]) => {
        setStockByDistrictVaccineRefillData(stockByDistrictVaccineRefillData);
        setAtHandStockByDistrictRefillData(atHandStockByDistrictRefillData);
        setIsLoadingRefillRateData(false);
      }
    );
  }, [endMonth, startMonth, vaccine, district]);

  return [
    {
      stockByDistrictVaccineRefillData,
      atHandStockByDistrictRefillData,
      isLoadingRefillRateData
    }
  ];
};

export const useGetUptakeRateData = (
  district,
  endMonth,
  startMonth,
  vaccine
) => {
  const stockByDistrictVaccineURL = `http://${apiEndpoint}${port}/api/stock/stockbydistrictvaccine?district=${district}&endMonth=${endMonth}&startMonth=${startMonth}&vaccine=${vaccine}`;
  const atHandStockByDistrictURL = `http://${apiEndpoint}${port}/api/stock/athandbydistrict?district=&endMonth=${endMonth}&startMonth=${startMonth}&vaccine=${vaccine}`;

  const [isLoadingUptakeRateData, setIsLoadingUptakeRateData] = useState(false);

  const [
    stockByDistrictVaccineUptakeData,
    setStockByDistrictVaccineUptakeData
  ] = useState(null);

  const [
    atHandStockByDistrictUptakeData,
    setAtHandStockByDistrictUptakeData
  ] = useState(null);

  useEffect(() => {
    setIsLoadingUptakeRateData(true);

    const stockByDistrictVaccineUptakeDataReq = async () => {
      const response = await fetch(stockByDistrictVaccineURL);
      return await response.json();
    };

    const atHandStockByDistrictUptakeDataReq = async () => {
      const response = await fetch(atHandStockByDistrictURL);
      return await response.json();
    };

    const getAllData = () => {
      return Promise.all([
        stockByDistrictVaccineUptakeDataReq(),
        atHandStockByDistrictUptakeDataReq()
      ]);
    };
    getAllData().then(
      ([stockByDistrictVaccineUptakeData, atHandStockByDistrictUptakeData]) => {
        setStockByDistrictVaccineUptakeData(stockByDistrictVaccineUptakeData);
        setAtHandStockByDistrictUptakeData(atHandStockByDistrictUptakeData);
        setIsLoadingUptakeRateData(false);
      }
    );
  }, [endMonth, startMonth, vaccine, district]);

  return [
    {
      stockByDistrictVaccineUptakeData,
      atHandStockByDistrictUptakeData,
      isLoadingUptakeRateData
    }
  ];
};

export const useGetDistrictStockTrendData = (
  district,
  endMonth,
  startMonth,
  vaccine
) => {
  const quotedAndCommaSeparatedDistricts = "'" + district.join("','") + "'";

  const stockByDistrictVaccineURL =
    district.length === 1
      ? `http://${apiEndpoint}${port}/api/stock/stockbydistrictvaccine?district=${district}&endMonth=${endMonth}&startMonth=${startMonth}&vaccine=${vaccine}`
      : `http://${apiEndpoint}${port}/api/stock/stockbydistrictvaccine?districts=[${quotedAndCommaSeparatedDistricts}]&endMonth=${endMonth}&startMonth=${startMonth}&vaccine=${vaccine}`;
  const atHandStockByDistrictURL = `http://${apiEndpoint}${port}/api/stock/athandbydistrict?district=&endMonth=${endMonth}&startMonth=${startMonth}&vaccine=${vaccine}`;

  const [isLoadingStockTrendData, setIsLoadingStockTrendData] = useState(false);

  const [
    stockByDistrictVaccineStockTrendData,
    setStockByDistrictVaccineStockTrendData
  ] = useState(null);

  const [
    atHandStockByDistrictStockTrendData,
    setAtHandStockByDistrictStockTrendData
  ] = useState(null);

  useEffect(() => {
    setIsLoadingStockTrendData(true);

    const stockByDistrictVaccineStockTrendDataReq = async () => {
      const response = await fetch(stockByDistrictVaccineURL);
      return await response.json();
    };

    const atHandStockByDistrictStockTrendDataReq = async () => {
      const response = await fetch(atHandStockByDistrictURL);
      return await response.json();
    };

    const getAllData = () => {
      return Promise.all([
        stockByDistrictVaccineStockTrendDataReq(),
        atHandStockByDistrictStockTrendDataReq()
      ]);
    };
    getAllData().then(
      ([
        stockByDistrictVaccineStockTrendData,
        atHandStockByDistrictStockTrendData
      ]) => {
        setStockByDistrictVaccineStockTrendData(
          stockByDistrictVaccineStockTrendData
        );
        setAtHandStockByDistrictStockTrendData(
          atHandStockByDistrictStockTrendData
        );
        setIsLoadingStockTrendData(false);
      }
    );
  }, [endMonth, startMonth, vaccine, district]);

  return [
    {
      stockByDistrictVaccineStockTrendData,
      atHandStockByDistrictStockTrendData,
      isLoadingStockTrendData
    }
  ];
};

export const useGetFunctionalityData = (
  careLevel,
  district,
  startPeriod,
  endPeriod
) => {
  const functionalityMetricsChartDataURL = `http://${apiEndpoint}${port}/coldchain/api/functionalitymetricsgraph?carelevel=${careLevel}&district=${district}&start_period=${startPeriod}&end_period=${endPeriod}`;

  const functionalityDataTableURL = `http://${apiEndpoint}${port}/coldchain/api/functionalitymetrics?carelevel=${careLevel}&start_period=${startPeriod}&end_period=${endPeriod}`;

  // district.length === 1
  //     ? `http://${apiEndpoint}${port}/coldchain/api/functionalitymetrics?carelevel=${careLevel}&district=${district}&${yearHalf}`
  //     : `http://${apiEndpoint}${port}/coldchain/api/functionalitymetrics?carelevel=${careLevel}&districts=[${quotedAndCommaSeparatedDistricts}]&${yearHalf}`;

  const [isLoadingFunctionalityData, setIsLoadingFunctionalityData] = useState(
    false
  );

  const [functionalityDataTableData, setFunctionalityDataTableData] = useState(
    null
  );

  const [
    functionalityMetricsChartData,
    setFunctionalityMetricsChartData
  ] = useState(null);

  useEffect(() => {
    setIsLoadingFunctionalityData(true);

    const functionalityDataTableReq = async () => {
      const response = await fetch(functionalityDataTableURL);
      return await response.json();
    };

    const functionalityMetricsChartDataReq = async () => {
      const response = await fetch(functionalityMetricsChartDataURL);
      return await response.json();
    };

    const getAllData = () => {
      return Promise.all([
        functionalityDataTableReq(),
        functionalityMetricsChartDataReq()
      ]);
    };

    getAllData().then(
      ([functionalityDataTableData, functionalityMetricsChartData]) => {
        setFunctionalityDataTableData(functionalityDataTableData);
        setFunctionalityMetricsChartData(functionalityMetricsChartData);
        setIsLoadingFunctionalityData(false);
      }
    );
  }, [careLevel, district, startPeriod, endPeriod]);

  return [
    {
      functionalityDataTableData,
      functionalityMetricsChartData,
      isLoadingFunctionalityData
    }
  ];
};

export const useGetCapacityData = (
  careLevel,
  district,
  startPeriod,
  endPeriod
) => {
  // const capacityMetricsChartDataURL = `http://${apiEndpoint}${port}/coldchain/api/functionalitymetricsgraph?carelevel=${careLevel}&district=${district}&start_period=${startPeriod}&end_period=${endPeriod}`;

  const capacityDataTableURL = `http://${apiEndpoint}${port}/coldchain/api/capacitymetrics?carelevel=${careLevel}&start_period=${startPeriod}&end_period=${endPeriod}`;

  // district.length === 1
  //     ? `http://${apiEndpoint}${port}/coldchain/api/functionalitymetrics?carelevel=${careLevel}&district=${district}&${yearHalf}`
  //     : `http://${apiEndpoint}${port}/coldchain/api/functionalitymetrics?carelevel=${careLevel}&districts=[${quotedAndCommaSeparatedDistricts}]&${yearHalf}`;

  const [isLoadingCapacityData, setIsLoadingCapacityData] = useState(false);

  const [capacityDataTableData, setCapacityDataTableData] = useState(null);

  // const [
  //   functionalityMetricsChartData,
  //   setFunctionalityMetricsChartData
  // ] = useState(null);

  useEffect(() => {
    setIsLoadingCapacityData(true);

    const capacityDataTableReq = async () => {
      const response = await fetch(capacityDataTableURL);
      return await response.json();
    };

    // const functionalityMetricsChartDataReq = async () => {
    //   const response = await fetch(functionalityMetricsChartDataURL);
    //   return await response.json();
    // };

    const getAllData = () => {
      return Promise.all([
        capacityDataTableReq()
        // functionalityMetricsChartDataReq()
      ]);
    };

    getAllData().then(
      ([capacityDataTableData, functionalityMetricsChartData]) => {
        setCapacityDataTableData(capacityDataTableData);
        // setFunctionalityMetricsChartData(functionalityMetricsChartData);
        setIsLoadingCapacityData(false);
      }
    );
  }, [careLevel, district, startPeriod, endPeriod]);

  return [
    {
      capacityDataTableData,
      // functionalityMetricsChartData,
      isLoadingCapacityData
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

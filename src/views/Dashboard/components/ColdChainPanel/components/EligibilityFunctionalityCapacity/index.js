import React, { useState, useMemo } from "react";

// Material components
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

// Shared componenrs
import { Card } from "../../../../../../components/";

// Custom components
import EligibilityTable from "./EligibilityTable/index";
import EligibilityStatusPieChart from "./EligibilityStatusPieChart/index";
import FunctionalityStatusBarChart from "./FunctionalityStatusBarChart/index";
import FunctionalityTable from "./FunctionalityTable/index";
import CapacityStatusBarChart from "./CapacityStatusBarChart/index";
import CapacityTable from "./CapacityTable/index";

// Import common styles
import { useStyles } from "../../../styles";

export default function EligibilityFunctionalityCapacity(props) {
  const classes = useStyles();
  const { data, parentTab } = props;

  const [functionality, setFunctionality] = useState();
  const [capacityData, setCapacityData] = useState();
  const [eligibilityData, setEligibilityData] = useState();

  useMemo(() => {
    if (data && data && parentTab === "functionality") {
      setFunctionality(data && data.functionalityMetricsChartData);
    } else if (data && data && parentTab === "capacity") {
      setCapacityData(data && data.capacityMetricsChartData);
    } else if (data && data && parentTab === "eligibility") {
      setEligibilityData(data && data.eligibilityMetricsChartData);
    }
  }, [data]);

  const eligibibleFacilities =
    eligibilityData && eligibilityData.total_eligible_facilities;

  const functionality_percentage = Math.round(
    functionality &&
      functionality
        .filter(a => a.functionality_percentage)
        .map(d => d.functionality_percentage)
  );

  const capacity_shortage_negative =
    capacityData && capacityData.gap_metrics.negative_gap_percentage;

  const capacity_shortage_positive =
    capacityData && capacityData.gap_metrics.positive_gap_percentage;

  const totalAvailableLiters = new Intl.NumberFormat("lg-UG").format(
    capacityData && capacityData.overall_total_available
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper} elevation={0}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            {parentTab === "functionality" || parentTab === "eligibility" ? (
              <>
                <Grid container spacing={3} className={classes.DST_section}>
                  <Grid
                    item
                    lg={3}
                    md={3}
                    xl={3}
                    xs={12}
                    style={{ maxHeight: 630 }}
                  >
                    <Grid
                      container
                      direction="column"
                      justify="space-evenly"
                      alignItems="flex-start"
                      style={{ maxHeight: 630 }}
                    >
                      <Grid item xs={12} style={{ maxHeight: 100, width: 650 }}>
                        {parentTab === "eligibility" ? (
                          <>
                            <Card
                              title={"Eligible Facilities"}
                              showPercentage={false}
                              metric={eligibibleFacilities}
                              isLoading={data.isLoading && data.isLoading}
                            />
                          </>
                        ) : (
                          <>
                            <Card
                              title={"Functionality"}
                              showPercentage={true}
                              metric={functionality_percentage}
                              isLoading={data.isLoading && data.isLoading}
                            />
                          </>
                        )}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={{ marginTop: 120, height: 385, width: 650 }}
                      >
                        {parentTab === "eligibility" ? (
                          <>
                            <EligibilityStatusPieChart
                              data={data.eligibilityMetricsChartData}
                              isLoading={data.isLoading}
                              district={data.district}
                              careLevel={data.careLevel}
                              startQuarter={data.endQuarter}
                              endQuarter={data.endQuarter}
                            />
                          </>
                        ) : (
                          <>
                            <FunctionalityStatusBarChart
                              data={data.functionalityMetricsChartData}
                              isLoading={data.isLoading}
                              district={data.district}
                              careLevel={data.careLevel}
                              startYearHalf={data.startYearHalf}
                              endYearHalf={data.endYearHalf}
                            />{" "}
                          </>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    lg={9}
                    md={9}
                    xl={9}
                    xs={12}
                    style={{ maxHeight: 630 }}
                  >
                    {parentTab === "functionality" ? (
                      <>
                        <FunctionalityTable
                          data={data.functionalityDataTableData}
                          isLoading={data.isLoading}
                          district={data.district}
                          careLevel={data.careLevel}
                          startYearHalf={data.startYearHalf}
                          endYearHalf={data.endYearHalf}
                        />
                      </>
                    ) : (
                      <>
                        <EligibilityTable
                          data={data.eligibilityDataTableData}
                          isLoading={data.isLoading}
                          district={data.district}
                          careLevel={data.careLevel}
                          startQuarter={data.startQuarter}
                          endQuarter={data.endQuarter}
                        />
                      </>
                    )}
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Grid container spacing={3}>
                  <Grid item lg={4} md={4} xl={4} xs={12}>
                    <Card
                      title={`Total number of liters ${
                        data.district === "national"
                          ? "at National Level"
                          : "in " + data.district
                      }`}
                      showPercentage={false}
                      metric={totalAvailableLiters}
                      isLoading={data.isLoading && data.isLoading}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} xl={4} xs={12}>
                    <Card
                      title={"Shortage (-ve Gap)"}
                      showPercentage={true}
                      metric={capacity_shortage_negative}
                      isLoading={data.isLoading && data.isLoading}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} xl={4} xs={12}>
                    <Card
                      title={"Shortage (+ve Gap)"}
                      showPercentage={true}
                      metric={capacity_shortage_positive}
                      isLoading={data.isLoading && data.isLoading}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item lg={4} md={4} xl={4} xs={12}>
                    <CapacityStatusBarChart
                      data={data.capacityMetricsChartData}
                      isLoading={data.isLoading}
                      district={data.district}
                      careLevel={data.careLevel}
                      startYearHalf={data.startYearHalf}
                      endYearHalf={data.endYearHalf}
                    />
                  </Grid>
                  <Grid item lg={8} md={8} xl={8} xs={12}>
                    <CapacityTable
                      data={data.capacityDataTableData}
                      isLoading={data.isLoading}
                      district={data.district}
                      careLevel={data.careLevel}
                      startYearHalf={data.startYearHalf}
                      endYearHalf={data.endYearHalf}
                    />
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

import React, { useState, useMemo } from "react";

// Material components
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

// Shared componenrs
import { Card } from "../../../../../../components/";

// Custom components
import FunctionalityStatusBarChart from "./FunctionalityStatusBarChart/index";
import FunctionalityTable from "./FunctionalityTable/index";

// Import common styles
import { useStyles } from "../../../styles";

export default function EligibilityFunctionalityCapacity(props) {
  const classes = useStyles();
  const { data, parentTab } = props;

  const [functionality, setFunctionality] = useState();

  useMemo(() => {
    if (data && data) {
      setFunctionality(data && data.functionalityMetricsChartData);
    }
  }, [data]);

  const functionality_percentage =
    //   statistics &&
    //   statistics
    //     .filter(d => d.statistics)
    //     .map(d => d.statistics)[0]
    //     .filter(d => d.functionality_percentage)
    //     .map(d => d.functionality_percentage);

    functionality &&
    functionality
      .filter(a => a.functionality_percentage)
      .map(d => d.functionality_percentage);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper} elevation={0}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
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
                    {parentTab === "functionality" ? (
                      <>
                        <Card
                          title={"Functionality"}
                          showPercentage={true}
                          metric={functionality_percentage}
                          isLoading={data.isLoading && data.isLoading}
                        />
                      </>
                    ) : (
                      <>
                        <Card
                          title={"Eligible Facilities"}
                          showPercentage={false}
                          metric={"480"}
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
                    <FunctionalityStatusBarChart
                      data={data.functionalityMetricsChartData}
                      isLoading={data.isLoading}
                      district={data.district}
                      careLevel={data.careLevel}
                      startYearHalf={data.startYearHalf}
                      endYearHalf={data.endYearHalf}
                    />
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
                  <></>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

const commonChartOptions = {
  credits: {
    enabled: false
  },
  chart: {
    height: 500
  },
  exporting: {
    width: 1200,
    chartOptions: {
      // specific options for the exported image
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true
          }
        }
      }
    },
    fallbackToExportServer: false
  }
};

const commonChartPlotOptions = {
  plotOptions: {
    // area: {
    //   lineWidth: 1,
    //   marker: {
    //     enabled: false
    //   }
    // },
    // series: {
    //   fillOpacity: 0.8,
    //   pointWidth: 4,
    //   pointPadding: 0.5,
    //   turboThreshold: 10000
    // },
    line: {
      lineWidth: 2,
      marker: {
        enabled: false
      }
    },
    // spline: {
    //   lineWidth: 0.8,
    //   marker: {
    //     enabled: false
    //   }
    // },
    // areaspline: {
    //   lineWidth: 0.4,
    //   marker: {
    //     enabled: false
    //   }
    // },
    column: {
      pointPadding: 0.2,
      pointWidth: 10,
      borderWidth: 0,
      shadow: false
    }
    // bar: {
    //   dataLabels: {
    //     enabled: true
    //   }
    // }
  },

  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: "bottom"
    }
  },
  tooltipVolumes: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.0f} m3</b></td></tr>',
    footerFormat: "</table>",
    shared: true,
    useHTML: true
  },
  tooltipTrips: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.0f} trips </b></td></tr>',
    footerFormat: "</table>",
    shared: true,
    useHTML: true
  }
};

export { commonChartOptions, commonChartPlotOptions };

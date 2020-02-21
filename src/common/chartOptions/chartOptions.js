// Highcharts
import Highcharts from "highcharts";

const commonChartOptions = {
  credits: {
    enabled: false
  },
  chart: {
    height: 500
  },
  exporting: {
    scale: 2,
    width: 720,
    chartOptions: {
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true
          }
        }
      }
    },
    buttons: {
      contextButton: {
        menuItems: ["downloadPDF"]
      }
    },
    fallbackToExportServer: false
  },

  // Axis labels
  labels: {
    style: {
      fontSize: "12px"
    }
  },

  // Line tool tips
  lineTooltip: {
    style: {
      fontSize: "20px"
    },

    formatter: function() {
      return (
        "<br/>" +
        this.point.series.name +
        ": " +
        Highcharts.numberFormat(this.point.y, 0)
      );
    }
  },

  mapTooltip: {
    style: {
      fontSize: "20px"
    },
    formatter: function() {
      return (
        "<b>" +
        this.point.properties.DName2018 +
        "</b><br/><br/>" +
        +Highcharts.numberFormat(this.point.value, 0) +
        " %"
      );
    }
  },

  pieToolTip: {
    style: {
      fontSize: "20px"
    },
    pointFormat: "{series.name}: <b>{point.percentage:.0f}%</b>"
  }
};

const mapLegend = {
  title: {
    text: ""
  },
  align: "left",
  verticalAlign: "top",
  floating: true,
  layout: "vertical",
  valueDecimals: 0,
  backgroundColor: "rgba(255,255,255,0.9)",
  symbolRadius: 0,
  symbolHeight: 14,
  borderWidth: 1,
  shadow: true,
  width: 160,
  y: 30,
  labelFormatter: function() {
    return this.legendName + " : (" + this.count + ") <br/>";
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
      lineWidth: 3,
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
      pointWidth: 35,
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

export { commonChartOptions, commonChartPlotOptions, mapLegend };

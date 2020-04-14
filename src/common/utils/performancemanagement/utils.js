export const getBudgetAllocationPerQuarterChartData = (data = []) => {
  return [
    {
      name: "Allocated funds",
      data: [data?.q1, data?.q2, data?.q3, data?.q4, data?.q5, data?.q6],
      color: {
        linearGradient: {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 1,
        },
        stops: [
          [0, "#4E596A"],
          [1, "#9CA2AB"],
        ],
      },
    },
  ];
};

export const getPlannedActivitiesChartData = (data = []) => {
  const chartData = [];
  const activity_count = data.map((quarter) => quarter.activity_count);

  chartData.push({
    type: "column",
    name: "Number of planned activities",
    data: activity_count,
    color: {
      linearGradient: {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 1,
      },
      stops: [
        [0, "#FFFF71"],
        [1, "#FFFFB2"],
      ],
    },
  });

  return chartData;
};

export const getFundingSourcesChartData = (data = []) => {
  const chartData = [];

  const activity_cost_usd = data.map((org) => org.activity_cost_usd);

  chartData.push({
    name: "Budget Allocation per Funding Partner / Organization",
    data: activity_cost_usd.sort((a, b) => b - a) /* Sort highest to lowest*/,
    color: {
      linearGradient: {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 1,
      },
      stops: [
        [0, "#FC6F6F"],
        [1, "#FF9D9D"],
      ],
    },
  });

  return chartData;
};

export const getBudgetAllocationPieChartData = (data = {}) => {
  return [
    {
      name: "Budget Allocation",
      data: [
        {
          name: "National",
          y: data?.national_percentage,
          color: "#F8E658",
        },
        {
          name: "District",
          y: data?.district_percentage,
          color: "#4E596A",
        },
      ],
      size: "95%",
      innerSize: "80%",
      showInLegend: false,
      dataLabels: {
        enabled: false,
      },
    },
  ];
};

export const getBudgetAllocationPerComponentChartData = (data = []) => {
  const activity_cost_usd_data = data.map(
    (activity) => activity.activity_cost_usd
  );

  return [
    {
      name: "Immunisation System Components",
      data: activity_cost_usd_data,
      color: {
        linearGradient: {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 1,
        },
        stops: [
          [0, "#4E596A"],
          [1, "#9CA2AB"],
        ],
      },
    },
  ];
};

export const getActivityCompletionStatusChartData = (data = []) => {
  return [
    {
      name: "Activity Completion Status",
      data: [
        {
          name: "Ongoing Activities",
          y: data.ongoing_percentage,
          color: "#FC6F6F",
        },
        {
          name: "Not Completed Activities",
          y: data.not_done_percentage,
          color: "#F8E658",
        },
        {
          name: "Completed Activities",
          y: data?.completed_percentage,
          color: "#4E596A",
        },
      ],
      size: "80%",
      innerSize: "80%",
      showInLegend: false,
      dataLabels: {
        enabled: false,
      },
    },
  ];
};

export const getActivityByResponsibleOrganisationChartData = (data = []) => {
  const chartData = [];

  // //  Get unique quarters
  const quarters = Array.from(
    new Set(data.map((q) => q.activity__activity_status__quarter))
  ).sort((a, b) => a - b);

  const years = Array.from(
    new Set(data.map((y) => y.activity__activity_status__year))
  );

  const colors = [
    "#FC6F6F",
    "#4E596A",
    "#F8E658",
    "#A4E908",
    "#C7E658",
    "#B8E958",
  ];

  quarters.forEach((quarter) => {
    chartData.push({
      name: `Q${quarter}-2020`,
      data: data
        .filter((q) => q.activity__activity_status__quarter === quarter)
        .map((a) => a.activity_status_count),
      color: colors[quarter - 1],
    });
  });

  return chartData;

  // return [
  //   {
  //     name: "Q1",
  //     data: q_one_data,
  //     color: "#FC6F6F",
  //   },
  //   {
  //     name: "Q2",
  //     data: q_two_data,
  //     color: "#4E596A",
  //   },
  //   {
  //     name: "Q3",
  //     data: q_three_data,
  //     color: "#F8E658",
  //   },
  //   {
  //     name: "Q4",
  //     data: q_four_data,
  //     color: "#A4E908",
  //   },
  //   {
  //     name: "Q5",
  //     data: [10, 3, 6, 2, 20, 5, 4, 8, 7, 9, 2],
  //     color: "#C7E658",
  //   },
  //   {
  //     name: "Q6",
  //     data: [10, 3, 6, 2, 20, 5, 4, 8, 7, 9, 2],
  //     color: "#B8E958",
  //   },
  // ];
};

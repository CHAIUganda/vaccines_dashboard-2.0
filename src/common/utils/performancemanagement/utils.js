const gradients = {
  total: {
    linearGradient: {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 1,
    },
    stops: [
      [0, "#1e3c72"],
      [1, "#526fa3"],
    ],
  },

  completed: {
    linearGradient: {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 1,
    },
    stops: [
      [0, "#0a3210"],
      [1, "#156523"],
    ],
  },
  not_done: {
    linearGradient: {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 1,
    },
    stops: [
      [0, "#f83245"],
      [1, "#fa5666"],
    ],
  },
  ongoing: {
    linearGradient: {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 1,
    },
    stops: [
      [0, "#ed7d31"],
      [1, "#f28c47"],
    ],
  },

  partially_done: {
    linearGradient: {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 1,
    },
    stops: [
      [0, "#24c53f"],
      [1, "#11b22d"],
    ],
  },
};
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
          [0, "#1e3c72"],
          [1, "#526fa3"],
        ],
      },
    },
  ];
};

export const getPlannedActivitiesChartData = (data = []) => {
  const chartData = [];
  const totalData = [];
  const completeData = [];
  const ongoingData = [];
  const not_doneData = [];
  const partially_doneData = [];

  const allPeriods = data.map((p) => p.period);

  const uniquePeriods = [...new Set(allPeriods)];

  uniquePeriods.forEach((period) => {
    const total = data
      .filter((p) => p.period === period)
      .map((a) => a.activity_count)
      .reduce((a, b) => a + b, 0);

    const completed = data
      .filter((p) => p.period === period)
      .map((a) => a.completed)
      .reduce((a, b) => a + b, 0);

    const ongoing = data
      .filter((p) => p.period === period)
      .map((a) => a.ongoing)
      .reduce((a, b) => a + b, 0);

    const not_done = data
      .filter((p) => p.period === period)
      .map((a) => a.not_done)
      .reduce((a, b) => a + b, 0);

    const partially_done = data
      .filter((p) => p.partially_done === period)
      .map((a) => a.ongoing)
      .reduce((a, b) => a + b, 0);

    totalData.push(total);
    completeData.push(completed);
    ongoingData.push(ongoing);
    not_doneData.push(not_done);
    partially_doneData.push(partially_done);
  });

  chartData.push({
    name: "Planned",
    type: "column",
    data: totalData,
    color: gradients.total,
  });

  chartData.push({
    name: "Completed",
    type: "column",
    data: completeData,
    color: gradients.completed,
  });

  chartData.push({
    name: "Ongoing",
    type: "column",
    data: ongoingData,
    color: gradients.ongoing,
  });

  chartData.push({
    name: "Not Done",
    type: "column",
    data: not_doneData,
    color: gradients.not_done,
  });

  chartData.push({
    name: "Partially done",
    type: "column",
    data: partially_doneData,
    color: gradients.partially_done,
  });

  return chartData;
};

export const getBudgetAllocationByImplementingAgencyChartData = (data = []) => {
  const chartData = [];

  const activity_cost_usd = data.map((org) => org.activity_cost_usd);

  chartData.push({
    name: "Budget allocation by Implementing Agency",
    data: activity_cost_usd.sort((a, b) => b - a) /* Sort highest to lowest*/,
    color: {
      linearGradient: {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 1,
      },
      stops: [
        [0, "#f83245"],
        [1, "#fa5666"],
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
          y:
            data?.national_percentage === undefined
              ? 0
              : data?.national_percentage,
          color: "#f83245",
        },
        {
          name: "District",
          y:
            data?.district_percentage === undefined
              ? 0
              : data?.district_percentage,
          color: "#24c53f",
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

export const getBudgetAllocationPerFundingSourceChartData = (data = []) => {
  const total_budget = data.map((source) => source.total_budget);

  return [
    {
      name: "Funding Source",
      data: total_budget,
      color: {
        linearGradient: {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 1,
        },
        stops: [
          [0, "#ed7d31"],
          [1, "#f28c47"],
        ],
      },
    },
  ];
};

// export const getBudgetAllocationPerComponentChartData = (data = []) => {
//   const activity_cost_usd_data = data.map(
//     (activity) => activity.activity_cost_usd
//   );

//   return [
//     {
//       name: "Immunization System Components",
//       data: activity_cost_usd_data,
//       color: {
//         linearGradient: {
//           x1: 0,
//           x2: 0,
//           y1: 0,
//           y2: 1,
//         },
//         stops: [
//           [0, "#4E596A"],
//           [1, "#9CA2AB"],
//         ],
//       },
//     },
//   ];
// };

export const getActivityCompletionStatusChartData = (data = []) => {
  return [
    {
      name: "Activity Completion Status",
      data: [
        {
          name: "Ongoing",
          y: data?.percentages?.ongoing_percentage,
          color: gradients.ongoing,
        },
        {
          name: "Not Completed",
          y: data?.percentages?.not_done_percentage,
          color: gradients.not_done,
        },
        {
          name: "Completed",
          y: data?.percentages?.completed_percentage,
          color: gradients.completed,
        },
        {
          name: "Partially Done",
          y: data?.percentages?.partially_done_percentage,
          color: gradients.partially_done,
        },
      ],
      size: "80%",
    },
  ];
};

export const getActivityByResponsibleOrganisationOrganisationName = (
  data = []
) => {
  return data?.map((org) => org.organization);
};
export const getActivityByResponsibleOrganisationChartData = (data = []) => {
  const chartData = [
    {
      name: "Planned",
      data: data?.map((a) => a.activity_count).sort((a, b) => a - b),
      color: gradients.total,
    },
    {
      name: "Completed",
      data: data?.map((a) => a.completed).sort((a, b) => a - b),
      color: gradients.completed,
    },
    {
      name: "Not Completed",
      data: data?.map((a) => a.not_done).sort((a, b) => a - b),
      color: gradients.not_done,
    },
    {
      name: "Ongoing",
      data: data?.map((a) => a.ongoing).sort((a, b) => a - b),
      color: gradients.ongoing,
    },
    {
      name: "Partially Done",
      data: data?.map((a) => a.partially_done).sort((a, b) => a - b),
      color: gradients.partially_done,
    },
  ];

  // Expensive sort to organize data from largest to smallest activity for each partner
  return chartData?.sort(
    (a, b) =>
      b?.data?.reduce((x, y) => x + y, 0) - a?.data?.reduce((x, y) => x + y, 0)
  );
};

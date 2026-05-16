export function getChartType(xKey, tableData) {

  let chartType = "bar";

  if (
    xKey.toLowerCase().includes("date") ||
    xKey.toLowerCase().includes("month") ||
    xKey.toLowerCase().includes("year")
  ) {

    chartType = "line";

  } else if (tableData.length <= 5) {

    chartType = "pie";
  }

  return chartType;
}

export function getNumericValues(tableData, yKey) {

  return tableData.length > 0
    ? tableData.map((item) => Number(item[yKey]))
    : [];
}

export function getTotalValue(values) {

  return values.reduce(
    (acc, curr) => acc + curr,
    0
  );
}

export function getAverageValue(values) {

  return values.length > 0
    ? (
        values.reduce((a, b) => a + b, 0) /
        values.length
      ).toFixed(2)
    : 0;
}

export function getMaxValue(values) {

  return values.length > 0
    ? Math.max(...values)
    : 0;
}

export function generateInsights(
  tableData,
  xKey,
  yKey,
  totalValue,
  averageValue,
  maxValue
) {

  let insights = [];

  if (tableData.length > 0) {

    insights.push(
      `Total ${yKey}: ${totalValue}`
    );

    insights.push(
      `Average ${yKey}: ${averageValue}`
    );

    insights.push(
      `Highest ${yKey}: ${maxValue}`
    );

    const highestItem = tableData.reduce(
      (prev, current) =>
        Number(prev[yKey]) >
        Number(current[yKey])
          ? prev
          : current
    );

    insights.push(
      `${highestItem[xKey]} has the highest ${yKey}`
    );
  }

  return insights;
}
export function getChartType(xKey, tableData) {
  if (!xKey || !Array.isArray(tableData) || tableData.length === 0) {
    return "bar";
  }

  const normalizedKey = String(xKey).toLowerCase();
  if (
    normalizedKey.includes("date") ||
    normalizedKey.includes("month") ||
    normalizedKey.includes("year")
  ) {
    return "line";
  }

  return Array.isArray(tableData) && tableData.length <= 5 ? "pie" : "bar";
}

export function getColumnsInfo(tableData) {
  const allColumns = Array.isArray(tableData) && tableData.length > 0
    ? Object.keys(tableData[0] || {})
    : [];

  const numericColumns = [];
  const categoricalColumns = [];

  allColumns.forEach((column) => {
    const values = tableData.map((row) => row?.[column]);
    const validValues = values.filter(
      (value) => value !== null && value !== undefined && value !== ""
    );

    const numericCount = validValues.filter((value) => {
      const parsed = Number(value);
      return value !== true && value !== false && value !== "" && Number.isFinite(parsed);
    }).length;

    if (validValues.length > 0 && numericCount / validValues.length >= 0.8) {
      numericColumns.push(column);
    } else {
      categoricalColumns.push(column);
    }
  });

  return {
    allColumns,
    numericColumns,
    categoricalColumns,
  };
}

export function getNumericValues(tableData, yKey) {
  if (!Array.isArray(tableData) || tableData.length === 0 || !yKey) {
    return [];
  }

  return tableData.map((item) => {
    const value = Number(item?.[yKey]);
    return Number.isFinite(value) ? value : 0;
  });
}

export function getTotalValue(values) {
  if (!Array.isArray(values) || values.length === 0) {
    return 0;
  }

  return values.reduce(
    (acc, curr) => acc + curr,
    0
  );
}

export function getAverageValue(values) {
  if (!Array.isArray(values) || values.length === 0) {
    return 0;
  }

  return (
    values.reduce((a, b) => a + b, 0) /
    values.length
  ).toFixed(2);
}

export function getMaxValue(values) {
  if (!Array.isArray(values) || values.length === 0) {
    return 0;
  }

  return Math.max(...values);
}

export function getPivotSummary(tableData, groupBy, numericKeys) {
  if (
    !Array.isArray(tableData) ||
    tableData.length === 0 ||
    !groupBy ||
    !Array.isArray(numericKeys) ||
    numericKeys.length === 0
  ) {
    return [];
  }

  const groupMap = {};

  tableData.forEach((row) => {
    const groupValue = row?.[groupBy] ?? "Unknown";

    if (!groupMap[groupValue]) {
      groupMap[groupValue] = {
        count: 0,
        totals: {},
      };
    }

    groupMap[groupValue].count += 1;

    numericKeys.forEach((numericKey) => {
      const rawValue = row?.[numericKey];
      const parsed = Number(rawValue);
      const value = Number.isFinite(parsed) ? parsed : 0;
      groupMap[groupValue].totals[numericKey] =
        (groupMap[groupValue].totals[numericKey] || 0) + value;
    });
  });

  return Object.entries(groupMap)
    .map(([group, data]) => ({
      group,
      count: data.count,
      totals: numericKeys.reduce(
        (acc, key) => ({
          ...acc,
          [key]: data.totals[key] ?? 0,
        }),
        {}
      ),
      averages: numericKeys.reduce(
        (acc, key) => ({
          ...acc,
          [key]: data.count > 0
            ? Number((data.totals[key] ?? 0) / data.count).toFixed(2)
            : 0,
        }),
        {}
      ),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}

export const generateInsights = (
  data,
  xKey,
  yKey,
  total,
  average,
  max
) => {

  if (
    !Array.isArray(data) ||
    data.length === 0
  ) {
    return [];
  }

  const insights = [];

  const sorted = [...data].sort(
    (a, b) =>
      Number(b[yKey] || 0) -
      Number(a[yKey] || 0)
  );

  const top = sorted[0];

  const bottom =
    sorted[sorted.length - 1];

  // OVERVIEW
  insights.push(
    `The dataset demonstrates a cumulative ${yKey.toLowerCase()} performance of ${Number(total).toLocaleString()}, with an average contribution of ${Number(average).toFixed(2)} per record.`
  );

  // TOP PERFORMER
  if (top) {

    insights.push(
      `${top[xKey]} emerged as the strongest-performing category, achieving the highest ${yKey.toLowerCase()} value of ${Number(top[yKey]).toLocaleString()}.`
    );

  }

  // LOWEST
  if (bottom) {

    insights.push(
      `${bottom[xKey]} recorded the lowest ${yKey.toLowerCase()} contribution, indicating potential optimization opportunities within this segment.`
    );

  }

  // PERFORMANCE DISTRIBUTION
  if (max > average * 1.5) {

    insights.push(
      `The analysis indicates a concentrated performance distribution, where high-performing categories significantly outperform the overall dataset average.`
    );

  } else {

    insights.push(
      `Performance distribution across the dataset appears relatively balanced, suggesting operational consistency among categories.`
    );

  }

  // DATA QUALITY
  insights.push(
    `The uploaded dataset was successfully processed and visualized through the DashifyAI analytics engine, enabling automated KPI evaluation and trend interpretation.`
  );

  // RECOMMENDATION
  insights.push(
    `Strategic focus should be directed toward scaling high-performing segments while investigating underperforming areas for potential efficiency improvements.`
  );

  return insights;

};


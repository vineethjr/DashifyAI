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
    data.length === 0 ||
    !xKey ||
    !yKey
  ) {
    return [];
  }

  const insights = [];

  insights.push(
    `The dataset contains ${data.length} total records.`
  );

  insights.push(
    `The total ${yKey} is ${Number(total).toLocaleString()}.`
  );

  insights.push(
    `The average ${yKey} is ${Number(average).toFixed(2)}.`
  );

  insights.push(
    `The highest ${yKey} recorded is ${Number(max).toLocaleString()}.`
  );

  const topItem = [...data].sort(
    (a, b) =>
      Number(b[yKey] || 0) -
      Number(a[yKey] || 0)
  )[0];

  if (topItem) {

    insights.push(
      `${topItem[xKey]} has the highest ${yKey} value at ${topItem[yKey]}.`
    );

  }

  return insights;
};

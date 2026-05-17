import React from "react";

function PivotSection({ darkMode, pivotData, groupBy, numericKeys }) {
  if (!Array.isArray(pivotData) || pivotData.length === 0) {
    return (
      <div
        className={`
          ${darkMode ? "bg-[#1e293b]" : "bg-white"}
          p-6 rounded-2xl shadow-lg mb-10 text-slate-300
        `}
      >
        Pivot-style analytics are not available for this dataset.
      </div>
    );
  }

  return (
    <div
      className={`
        ${darkMode ? "bg-[#1e293b]" : "bg-white"}
        p-6 rounded-2xl shadow-lg mb-10
      `}
    >
      <h2 className="text-2xl font-semibold mb-6">
        Pivot Summary by {groupBy}
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-3 bg-[#334155] text-left text-sm font-semibold">{groupBy}</th>
              <th className="border p-3 bg-[#334155] text-left text-sm font-semibold">Rows</th>
              {numericKeys.map((numericKey) => (
                <React.Fragment key={numericKey}>
                  <th className="border p-3 bg-[#334155] text-left text-sm font-semibold">
                    {numericKey} Total
                  </th>
                  <th className="border p-3 bg-[#334155] text-left text-sm font-semibold">
                    {numericKey} Avg
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>

          <tbody>
            {pivotData.map((row, index) => (
              <tr key={row.group ?? index}>
                <td className="border p-3">{row.group}</td>
                <td className="border p-3">{row.count}</td>
                {numericKeys.map((numericKey) => (
                  <React.Fragment key={`${row.group}-${numericKey}`}>
                    <td className="border p-3">
                      {row.totals?.[numericKey] ?? 0}
                    </td>
                    <td className="border p-3">
                      {row.averages?.[numericKey] ?? 0}
                    </td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PivotSection;

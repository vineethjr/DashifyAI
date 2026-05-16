import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

function ChartSection({
  darkMode,
  tableData,
  chartType,
  xKey,
  yKey,
}) {
  return (
    <>
      {tableData.length > 0 && (

        <div
          className={`
            ${darkMode ? "bg-[#1e293b]" : "bg-white"}
            p-6 rounded-2xl shadow-lg mb-10
          `}
        >

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-semibold">
              Smart Dashboard Chart
            </h2>

            <span className="bg-blue-600 px-4 py-1 rounded-lg">
              {chartType.toUpperCase()} CHART
            </span>

          </div>

          <div
            style={{
              width: "100%",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >

            {/* BAR CHART */}
            {chartType === "bar" && (
              <BarChart
                width={900}
                height={350}
                data={tableData}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey={xKey} />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey={yKey}
                  fill="#3b82f6"
                />

              </BarChart>
            )}

            {/* LINE CHART */}
            {chartType === "line" && (
              <LineChart
                width={900}
                height={350}
                data={tableData}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey={xKey} />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey={yKey}
                  stroke="#22c55e"
                  strokeWidth={3}
                />

              </LineChart>
            )}

            {/* PIE CHART */}
            {chartType === "pie" && (
              <PieChart
                width={900}
                height={350}
              >

                <Pie
                  data={tableData}
                  dataKey={yKey}
                  nameKey={xKey}
                  outerRadius={120}
                  fill="#8884d8"
                  label
                >

                  {tableData.map((entry, index) => (

                    <Cell
                      key={`cell-${index}`}
                      fill={[
                        "#3b82f6",
                        "#22c55e",
                        "#f59e0b",
                        "#ef4444",
                        "#8b5cf6",
                      ][index % 5]}
                    />

                  ))}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>
            )}

          </div>

        </div>

      )}
    </>
  );
}

export default ChartSection;
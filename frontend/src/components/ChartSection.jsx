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
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import { motion } from "framer-motion";

function ChartSection({
  darkMode,
  tableData,
  chartType,
  xKey,
  yKey,
  handleChartTypeChange,
}) {

  const hasData =
    Array.isArray(tableData) &&
    tableData.length > 0;

  if (!hasData) {

    return (
      <div
        className="
          mt-10
          rounded-[28px]
          border border-white/10
          bg-white/[0.03]
          backdrop-blur-xl
          p-6
          text-slate-400
        "
      >
        No chart data available.
      </div>
    );

  }

  const chartData = tableData.map(
    (item) => ({
      ...item,
      [yKey]: Number(item[yKey]) || 0,
    })
  );

  const COLORS = [
    "#3B82F6",
    "#06B6D4",
    "#8B5CF6",
    "#14B8A6",
    "#F59E0B",
    "#EF4444",
  ];

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.5,
      }}

      className="
        relative overflow-hidden
        rounded-[32px]
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-2xl
        p-8
        shadow-[0_10px_50px_rgba(0,0,0,0.25)]
        mt-10
      "
    >

      {/* HEADER */}
      <div
        className="
          flex flex-wrap
          items-center
          justify-between
          gap-4
          mb-8
        "
      >

        <div>

          <h2
            className="
              text-2xl
              font-semibold
            "
          >
            Smart Dashboard Chart
          </h2>

          <p
            className="
              mt-2
              text-slate-400
            "
          >
            Dynamic visualization for {yKey}
          </p>

        </div>

        {/* CHART SWITCHER */}
        <select

          value={chartType}

          onChange={(e) =>
            handleChartTypeChange(
              yKey,
              e.target.value
            )
          }

          className="
            rounded-2xl
            border border-white/10
            bg-[#0f172a]
            px-5 py-3
            text-sm
            outline-none
            transition
            hover:border-cyan-400/30
          "
        >

          <option value="bar">
            Bar Chart
          </option>

          <option value="line">
            Line Chart
          </option>

          <option value="pie">
            Pie Chart
          </option>

          <option value="area">
            Area Chart
          </option>

        </select>

      </div>

      {/* CHART */}
      <div
        className="
          rounded-[24px]
          border border-white/5
          bg-black/10
          p-6
          h-[500px]
        "
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          {chartType === "bar" ? (

            <BarChart data={chartData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis
                dataKey={xKey}
                stroke="#94A3B8"
              />

              <YAxis stroke="#94A3B8" />

              <Tooltip />

              <Legend />

              <Bar
                dataKey={yKey}
                fill="#3B82F6"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          ) : chartType === "line" ? (

            <LineChart data={chartData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis
                dataKey={xKey}
                stroke="#94A3B8"
              />

              <YAxis stroke="#94A3B8" />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey={yKey}
                stroke="#06B6D4"
                strokeWidth={3}
              />

            </LineChart>

          ) : chartType === "area" ? (

            <AreaChart data={chartData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis
                dataKey={xKey}
                stroke="#94A3B8"
              />

              <YAxis stroke="#94A3B8" />

              <Tooltip />

              <Legend />

              <Area
                type="monotone"
                dataKey={yKey}
                stroke="#8B5CF6"
                fill="#8B5CF6"
                fillOpacity={0.3}
              />

            </AreaChart>

          ) : (

            <PieChart>

              <Pie
                data={chartData}
                dataKey={yKey}
                nameKey={xKey}
                cx="50%"
                cy="50%"
                outerRadius={170}
                innerRadius={80}
                paddingAngle={3}
              >

                {chartData.map(
                  (_, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />

                  )
                )}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          )}

        </ResponsiveContainer>

      </div>

    </motion.div>

  );

}

export default ChartSection;
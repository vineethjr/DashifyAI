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
} from "recharts";

import { motion } from "framer-motion";

function ChartSection({
  darkMode,
  tableData,
  chartType,
  xKey,
  yKey,
}) {

  const hasData =
    Array.isArray(tableData) &&
    tableData.length > 0;

  const validKeys = xKey && yKey;
  const COLORS = [
  "#3B82F6",
  "#06B6D4",
  "#8B5CF6",
  "#14B8A6",
  "#F59E0B",
  "#EF4444",
];

  if (!hasData) {
    return (
      <div
        className={`
          ${
            darkMode
              ? "bg-[#1e293b]"
              : "bg-white"
          }
          p-6 rounded-2xl
          shadow-lg mb-10
          text-slate-300
        `}
      >
        No chart data available.
      </div>
    );
  }

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
        border border-white/10 hover:border-cyan-400/20
        bg-white/[0.03]
        backdrop-blur-2xl
        p-8
        shadow-[0_10px_50px_rgba(0,0,0,0.25)]
        hover:shadow-[0_20px_70px_rgba(0,0,0,0.35)]
        transition-all duration-300
        mt-10
      "
    >

      {/* HEADER */}
      <div className="mb-8">

        <h2
          className="
            text-2xl font-semibold
            tracking-tight
          "
        >
          Analytics Visualization
        </h2>

        <p
          className="
            mt-2 text-slate-400
          "
        >
          AI-generated visual insights
          from your uploaded dataset.
        </p>

      </div>

      {/* TOP BAR */}
      <div
        className="
          flex justify-between
          items-center mb-6
        "
      >

        <h2 className="text-2xl font-semibold">
          Smart Dashboard Chart: {yKey}
        </h2>

        <span
          className="
            bg-blue-600
            px-4 py-2
            rounded-xl
            text-sm font-medium
          "
        >
          {chartType?.toUpperCase?.() || "BAR"} CHART
        </span>

      </div>

      {!validKeys ? (

        <div className="text-slate-300">
          Chart unavailable:
          missing or invalid data keys.
        </div>

      ) : (

        <div
  className="
    rounded-[24px]
    border border-white/5
    bg-black/10
    p-8
    grid grid-cols-1
    lg:grid-cols-3
    gap-8
    items-center
  "
>
<div className="lg:col-span-2">
          <ResponsiveContainer
  width="70%"
  height={420}
>

            {chartType === "bar" ? (

              <BarChart data={tableData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.08)"
                />

                <XAxis
                  dataKey={xKey}
                  stroke="#94a3b8"
tickLine={false}
axisLine={false}
                />

                <YAxis
                   stroke="#94a3b8"
  tickLine={false}
  axisLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border:
                      "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "16px",
                    color: "white",
                  }}
                />

                <Legend />

                <Bar
  dataKey={yKey}
  radius={[12, 12, 0, 0]}
  fill="#3B82F6"
/>

              </BarChart>

            ) : chartType === "line" ? (

              <LineChart data={tableData}>

                <CartesianGrid
  strokeDasharray="3 3"
  stroke="rgba(255,255,255,0.06)"
/>

                <XAxis
                  dataKey={xKey}
                   stroke="#94a3b8"
tickLine={false}
axisLine={false}
                />

                <YAxis
                  stroke="#94a3b8"
  tickLine={false}
  axisLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border:
                      "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "16px",
                    color: "white",
                  }}
                />

                <Legend />

                <Line
  type="monotone"
  dataKey={yKey}
  stroke="#06B6D4"
  strokeWidth={4}
  dot={{
    r: 4,
    fill: "#06B6D4",
  }}
  activeDot={{
    r: 7,
  }}
/>

              </LineChart>

            ) : (

              <PieChart>

                <Pie
                  data={tableData}
                  dataKey={yKey}
                  nameKey={xKey}
                  cx="50%"
                  cy="50%"
                  outerRadius={130}
                  innerRadius={95}
                  paddingAngle={4}
                >

                  {tableData.map(
                    (entry, index) => (

                      <Cell
                        fill={COLORS[index % COLORS.length]}
                      />

                    )
                  )}

                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border:
                      "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "16px",
                    color: "white",
                  }}
                />

                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                />

              </PieChart>

            )}

          </ResponsiveContainer>
</div>
<div
  className="
    space-y-5
  "
>

  {/* CARD */}
  <div
    className="
      relative overflow-hidden
rounded-3xl
border border-white/10
bg-gradient-to-br
from-white/[0.06]
to-white/[0.02]
p-6
backdrop-blur-xl
transition-all duration-300
hover:-translate-y-1
hover:border-cyan-400/20
hover:shadow-[0_10px_40px_rgba(6,182,212,0.15)]
    "
  >
    <div
  className="
    absolute top-0 right-0
    w-24 h-24
    bg-cyan-500/10
    blur-3xl rounded-full
  "
/>
    <p className="text-slate-500
uppercase tracking-[0.2em]
text-xs font-medium">
      Total Records
    </p>

    <h2
      className="
        mt-2 text-4xl tracking-tight
        font-semibold
      "
    >
      {tableData.length}
    </h2>
  </div>

  {/* CARD */}
  <div
    className="
      relative overflow-hidden
rounded-3xl
border border-white/10
bg-gradient-to-br
from-white/[0.06]
to-white/[0.02]
p-6
backdrop-blur-xl
transition-all duration-300
hover:-translate-y-1
hover:border-cyan-400/20
hover:shadow-[0_10px_40px_rgba(6,182,212,0.15)]
    "
  >
    <div
  className="
    absolute top-0 right-0
    w-24 h-24
    bg-cyan-500/10
    blur-3xl rounded-full
  "
/>
    <p className="text-slate-500
uppercase tracking-[0.2em]
text-xs font-medium">
      Chart Type
    </p>

    <h2
      className="
        mt-2 text-2xl
        font-semibold capitalize
      "
    >
      {chartType}
    </h2>
  </div>

  {/* CARD */}
  <div
    className="
      relative overflow-hidden
rounded-3xl
border border-white/10
bg-gradient-to-br
from-white/[0.06]
to-white/[0.02]
p-6
backdrop-blur-xl
transition-all duration-300
hover:-translate-y-1
hover:border-cyan-400/20
hover:shadow-[0_10px_40px_rgba(6,182,212,0.15)]
    "
  >
    <div
  className="
    absolute top-0 right-0
    w-24 h-24
    bg-cyan-500/10
    blur-3xl rounded-full
  "
/>
    <p className="text-slate-500
uppercase tracking-[0.2em]
text-xs font-medium">
      Primary Metric
    </p>

    <h2
      className="
        mt-2 text-2xl
        font-semibold
      "
    >
      {yKey}
    </h2>
  </div>

</div>
        </div>

      )}

    </motion.div>
  );
}

export default ChartSection;
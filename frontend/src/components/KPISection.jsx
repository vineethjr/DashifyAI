import { motion } from "framer-motion";

function KPISection({
  darkMode,
  tableData,
  yKey,
  totalValue,
  averageValue,
  maxValue,
}) {
  return (
    <>
      {tableData.length > 0 && (

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="
            grid grid-cols-1 md:grid-cols-4
            gap-6 mb-10
          "
        >

          {/* TOTAL ROWS */}
          <div
            className={`
              ${darkMode ? "bg-[#1e293b]" : "bg-white"}
              p-6 rounded-2xl shadow-lg
              hover:scale-105 transition duration-300
            `}
          >
            <h3 className="text-slate-400">
              Total Rows
            </h3>

            <p className="text-3xl font-bold mt-2">
              {tableData.length}
            </p>
          </div>

          {/* TOTAL VALUE */}
          <div
            className={`
              ${darkMode ? "bg-[#1e293b]" : "bg-white"}
              p-6 rounded-2xl shadow-lg
              hover:scale-105 transition duration-300
            `}
          >
            <h3 className="text-slate-400">
              Total {yKey}
            </h3>

            <p className="text-3xl font-bold mt-2 text-blue-400">
              {totalValue}
            </p>
          </div>

          {/* AVERAGE */}
          <div
            className={`
              ${darkMode ? "bg-[#1e293b]" : "bg-white"}
              p-6 rounded-2xl shadow-lg
              hover:scale-105 transition duration-300
            `}
          >
            <h3 className="text-slate-400">
              Average {yKey}
            </h3>

            <p className="text-3xl font-bold mt-2 text-green-400">
              {averageValue}
            </p>
          </div>

          {/* MAX VALUE */}
          <div
            className={`
              ${darkMode ? "bg-[#1e293b]" : "bg-white"}
              p-6 rounded-2xl shadow-lg
              hover:scale-105 transition duration-300
            `}
          >
            <h3 className="text-slate-400">
              Highest {yKey}
            </h3>

            <p className="text-3xl font-bold mt-2 text-yellow-400">
              {maxValue}
            </p>
          </div>

        </motion.div>

      )}
    </>
  );
}

export default KPISection;
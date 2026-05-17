import { motion } from "framer-motion";

function TableSection({
  darkMode,
  tableData,
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
        No table data available.
      </div>
    );
  }

  const columns =
    Object.keys(tableData[0]);

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
        mt-10
        rounded-[32px]
        border border-white/10 hover:border-cyan-400/20
        bg-white/[0.03]
        backdrop-blur-2xl
        overflow-hidden
        shadow-[0_10px_50px_rgba(0,0,0,0.25)]
        hover:shadow-[0_20px_70px_rgba(0,0,0,0.35)]
        transition-all duration-300
      "
    >

      {/* HEADER */}
      <div
        className="
          px-8 py-6
          border-b border-white/5
        "
      >

        <h2
          className="
            text-2xl font-semibold
          "
        >
          Dataset Preview
        </h2>

        <p
          className="
            mt-2 text-slate-400
          "
        >
          Interactive preview of your
          uploaded dataset.
        </p>

      </div>

      {/* TABLE */}
      <div
        className="
          overflow-x-auto
          max-h-[600px]
        "
      >

        <table className="w-full">

          {/* HEAD */}
          <thead
            className="
              sticky top-0
              bg-[#0f172a]/95
              backdrop-blur-xl
              z-20
            "
          >

            <tr>

              {columns.map((col) => (

                <th
                  key={col}
                  className="
                    text-left
                    px-6 py-4
                    text-sm font-semibold
                    text-slate-300
                    border-b border-white/5
                    whitespace-nowrap
                  "
                >
                  {col}
                </th>

              ))}

            </tr>

          </thead>

          {/* BODY */}
          <tbody>

            {tableData.map(
              (row, rowIndex) => (

                <tr

                  key={rowIndex}

                  className={`
                    border-b border-white/[0.03]
                    transition

                    ${
                      rowIndex % 2 === 0
                        ? "bg-white/[0.01]"
                        : "bg-transparent"
                    }

                    hover:bg-cyan-500/[0.05]
                  `}
                >

                  {columns.map((col) => (

                    <td
                      key={col}
                      className="
                        px-6 py-4
                        text-sm text-slate-300
                        whitespace-nowrap
                      "
                    >
                      {String(
                        row[col] ?? "-"
                      )}
                    </td>

                  ))}

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </motion.div>
  );
}

export default TableSection;
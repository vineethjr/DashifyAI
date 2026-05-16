function TableSection({
  darkMode,
  tableData,
}) {
  return (
    <>
      {tableData.length > 0 && (

        <div
          className={`
            ${darkMode ? "bg-[#1e293b]" : "bg-white"}
            p-6 rounded-2xl shadow-lg overflow-auto
          `}
        >

          <h2 className="text-2xl font-semibold mb-6">
            Data Preview
          </h2>

          <table className="w-full border-collapse">

            <thead>

              <tr>

                {Object.keys(tableData[0]).map((key) => (

                  <th
                    key={key}
                    className={`
                      border
                      ${
                        darkMode
                          ? "border-slate-700"
                          : "border-slate-300"
                      }
                      p-3 bg-[#334155]
                    `}
                  >
                    {key}
                  </th>

                ))}

              </tr>

            </thead>

            <tbody>

              {tableData.map((row, index) => (

                <tr key={index}>

                  {Object.values(row).map((value, i) => (

                    <td
                      key={i}
                      className={`
                        border
                        ${
                          darkMode
                            ? "border-slate-700"
                            : "border-slate-300"
                        }
                        p-3
                      `}
                    >
                      {value}
                    </td>

                  ))}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}
    </>
  );
}

export default TableSection;
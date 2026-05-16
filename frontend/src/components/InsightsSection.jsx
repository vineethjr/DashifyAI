function InsightsSection({
  darkMode,
  tableData,
  insights,
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

          <h2 className="text-2xl font-semibold mb-6">
            AI Generated Insights
          </h2>

          <div className="space-y-4">

            {insights.map((insight, index) => (

              <div
                key={index}
                className="
                  bg-blue-600/20
                  border border-blue-500
                  p-4 rounded-xl
                "
              >
                🤖 {insight}
              </div>

            ))}

          </div>

        </div>

      )}
    </>
  );
}

export default InsightsSection;
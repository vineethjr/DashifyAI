import { FiMoon, FiSun } from "react-icons/fi";

function Header({ darkMode, setDarkMode, downloadPDF }) {
  return (
    <div className="flex justify-between items-center mb-10 flex-wrap gap-4">

      <div>
        <h1 className="text-5xl font-bold">
          DashifyAI
        </h1>

        <p
          className={
            darkMode
              ? "text-slate-400 mt-2"
              : "text-slate-600 mt-2"
          }
        >
          Upload Excel → Generate Instant Dashboards
        </p>
      </div>

      <div className="flex items-center gap-4">

        {/* THEME BUTTON */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`
            p-3 rounded-xl transition
            ${
              darkMode
                ? "bg-[#1e293b] hover:bg-[#334155]"
                : "bg-white hover:bg-slate-200"
            }
          `}
        >
          {darkMode ? (
            <FiSun size={24} />
          ) : (
            <FiMoon size={24} />
          )}
        </button>

        {/* PDF BUTTON */}
        <button
          onClick={downloadPDF}
          className="
            bg-green-600 hover:bg-green-700
            px-5 py-3 rounded-xl
            transition font-semibold
          "
        >
          Export PDF
        </button>

      </div>

    </div>
  );
}

export default Header;
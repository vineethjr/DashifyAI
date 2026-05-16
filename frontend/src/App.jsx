import Header from "./components/Header";
import UploadSection from "./components/UploadSection";
import KPISection from "./components/KPISection";
import ChartSection from "./components/ChartSection";
import InsightsSection from "./components/InsightsSection";
import TableSection from "./components/TableSection";
import {
  getChartType,
  getNumericValues,
  getTotalValue,
  getAverageValue,
  getMaxValue,
  generateInsights,
} from "./utils/analytics";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import axios from "axios";


function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [tableData, setTableData] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const dashboardRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [sheets, setSheets] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState("");

  const handleUpload = async () => {
    setLoading(true);
    if (!file) {
      setMessage("Please select a file");
      return;
    }
    setLoading(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://dashify-backend-eean.onrender.com/upload",
        formData
      );

      setMessage(response.data.message);
      setTableData(response.data.data);
      setSheets(response.data.sheets);
      setSelectedSheet(response.data.sheets[0]);

    } catch (error) {
      console.error(error);
      setMessage("Upload failed");
    }
  };

  const xKey =
  tableData.length > 0
    ? Object.keys(tableData[0])[0]
    : "";

const yKey =
  tableData.length > 0
    ? Object.keys(tableData[0])[1]
    : "";

const chartType = getChartType(
  xKey,
  tableData
);

const numericValues = getNumericValues(
  tableData,
  yKey
);

const totalValue = getTotalValue(
  numericValues
);

const averageValue = getAverageValue(
  numericValues
);

const maxValue = getMaxValue(
  numericValues
);

const insights = generateInsights(
  tableData,
  xKey,
  yKey,
  totalValue,
  averageValue,
  maxValue
);

const filteredData = tableData.filter((row) =>
  Object.values(row)
    .join(" ")
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);

const downloadPDF = async () => {
  if (!dashboardRef.current) return;

  try {

    const dataUrl = await toPng(dashboardRef.current, {
      cacheBust: true,
      backgroundColor: darkMode ? "#0f172a" : "#ffffff",
    });

    const pdf = new jsPDF("p", "mm", "a4");

    const imgProps = pdf.getImageProperties(dataUrl);

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight =
      (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(
      dataUrl,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save("DashifyAI_Report.pdf");

  } catch (error) {

    console.error("PDF Error:", error);

  }
};
  return (
  <motion.div
  ref={dashboardRef}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
  className={`
    min-h-screen p-8 transition duration-300
    ${
      darkMode
        ? "bg-[#0f172a] text-white"
        : "bg-slate-100 text-slate-900"
    }
  `}
>

      {/* HEADER */}
<Header
  darkMode={darkMode}
  setDarkMode={setDarkMode}
  downloadPDF={downloadPDF}
/>

      {/* UPLOAD SECTION */}
<UploadSection
  darkMode={darkMode}
  dragActive={dragActive}
  setDragActive={setDragActive}
  file={file}
  setFile={setFile}
  handleUpload={handleUpload}
  loading={loading}
  message={message}
/>

<div
  className={`
    ${darkMode ? "bg-[#1e293b]" : "bg-white"}
    p-4 rounded-2xl shadow-lg mb-10
  `}
>

  <input
    type="text"
    placeholder="Search data..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="
      w-full p-3 rounded-xl
      bg-[#334155]
      text-white
      outline-none
    "
  />

</div>

{sheets.length > 1 && (

  <div
    className={`
      ${darkMode ? "bg-[#1e293b]" : "bg-white"}
      p-4 rounded-2xl shadow-lg mb-10
    `}
  >

    <h2 className="text-xl font-semibold mb-4">
      Select Sheet
    </h2>

    <select
      value={selectedSheet}
      onChange={(e) =>
        setSelectedSheet(e.target.value)
      }
      className="
        p-3 rounded-xl
        bg-[#334155]
        text-white
        outline-none
      "
    >

      {sheets.map((sheet, index) => (

        <option key={index} value={sheet}>
          {sheet}
        </option>

      ))}

    </select>

  </div>

)}

    {/* KPI CARDS SECTION */}
  <KPISection
  darkMode={darkMode}
  tableData={filteredData}
  yKey={yKey}
  totalValue={totalValue}
  averageValue={averageValue}
  maxValue={maxValue}
/>

      {/* CHART SECTION */}
<ChartSection
  darkMode={darkMode}
  tableData={filteredData}
  chartType={chartType}
  xKey={xKey}
  yKey={yKey}
/>

{/* AI INSIGHTS */}
<InsightsSection
  darkMode={darkMode}
  tableData={filteredData}
  insights={insights}
/>

      {/* TABLE SECTION */}
     <TableSection
  darkMode={darkMode}
  tableData={filteredData}
/>

    </motion.div>
  );
}

export default App;
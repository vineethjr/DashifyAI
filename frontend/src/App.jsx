import Header from "./components/Header";
import UploadSection from "./components/UploadSection";
import KPISection from "./components/KPISection";
import ChartSection from "./components/ChartSection";
import InsightsSection from "./components/InsightsSection";
import TableSection from "./components/TableSection";
import PivotSection from "./components/PivotSection";
import Toast from "./components/Toast";
import LoadingSkeleton from "./components/LoadingSkeleton";
import AnimatedBackground from "./components/AnimatedBackground";
import AIIntro from "./components/AIIntro";

import {
  getChartType,
  getColumnsInfo,
  getNumericValues,
  getTotalValue,
  getAverageValue,
  getMaxValue,
  getPivotSummary,
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

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "info",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sheets, setSheets] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState("");

  const dashboardRef = useRef();

  const showToast = (message, type = "info") => {
    setToast({
      visible: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        visible: false,
      }));
    }, 3000);
  };

  const handleUpload = async () => {
    if (!file) {
      showToast("Please select a file", "error");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://dashify-backend-eean.onrender.com/upload",
        formData
      );

      const responseData = response.data || {};

      const normalizedData = Array.isArray(responseData.data)
        ? responseData.data
        : [];

      setTableData(normalizedData);

      const sheetsList = Array.isArray(responseData.sheets)
        ? responseData.sheets
        : [];

      setSheets(sheetsList);

      if (sheetsList.length > 0) {
        setSelectedSheet(sheetsList[0]);
      }

      showToast("Dashboard generated successfully", "success");
    } catch (error) {
      console.error(error);

      showToast("Upload failed", "error");

      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = Array.isArray(tableData)
    ? tableData.filter((row) =>
        Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : [];

  const hasTableData =
    Array.isArray(filteredData) &&
    filteredData.length > 0;

  const {
    allColumns,
    numericColumns,
    categoricalColumns,
  } = getColumnsInfo(filteredData);

  const xKey =
    categoricalColumns?.[0] ||
    allColumns?.[0] ||
    "";

  const numericKeys = Array.isArray(numericColumns)
    ? numericColumns
    : [];

  const chartTypes = numericKeys.reduce(
    (acc, yKey) => ({
      ...acc,
      [yKey]: getChartType(xKey, filteredData),
    }),
    {}
  );

  const numericMetrics = numericKeys.map((yKey) => {
    const numericValues = getNumericValues(
      filteredData,
      yKey
    );

    return {
      yKey,
      total: getTotalValue(numericValues),
      average: getAverageValue(numericValues),
      max: getMaxValue(numericValues),
    };
  });

  const pivotData = getPivotSummary(
    filteredData,
    xKey,
    numericKeys
  );

  const insights =
  Array.isArray(filteredData) &&
  filteredData.length > 0 &&
  xKey &&
  numericKeys.length > 0
    ? generateInsights(
        filteredData,
        xKey,
        numericKeys[0],
        numericMetrics?.[0]?.total || 0,
        numericMetrics?.[0]?.average || 0,
        numericMetrics?.[0]?.max || 0
      )
    : [];

  const downloadPDF = async () => {
    if (!dashboardRef.current) return;

    const dataUrl = await toPng(dashboardRef.current, {
      cacheBust: true,
      pixelRatio: 2,
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

    pdf.save("dashify-dashboard.pdf");

    showToast("PDF Exported", "success");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`
        min-h-screen
        relative
        overflow-hidden
        px-6
        py-8
        ${
          darkMode
            ? "bg-[#020617] text-white"
            : "bg-slate-100 text-black"
        }
      `}
    >
     <AnimatedBackground />
      {/* GRID */}
      <div
        className="
          fixed
          inset-0
          opacity-[0.03]
          pointer-events-none
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div
        ref={dashboardRef}
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
        "
      >
        <div className="space-y-6">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          downloadPDF={downloadPDF}
        />
        <AIIntro />
</div>
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

        {/* SEARCH */}
        <div
          className="
            mt-8
            mb-8
            rounded-3xl
            border border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
            p-4
          "
        >
          <input
            type="text"
            placeholder="Search data..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="
              w-full
              bg-transparent
              outline-none
              text-white
              placeholder:text-slate-500
            "
          />
        </div>

        {/* SHEETS */}
        {sheets.length > 1 && (
          <div
            className="
              mb-8
              rounded-3xl
              border border-white/10
              bg-white/[0.03]
              backdrop-blur-xl
              p-5
            "
          >
            <select
              value={selectedSheet}
              onChange={(e) =>
                setSelectedSheet(e.target.value)
              }
              className="
                bg-[#0f172a]
                border border-white/10
                px-4 py-3
                rounded-xl
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

        {/* DASHBOARD */}
        {loading ? (
          <LoadingSkeleton darkMode={darkMode} />
        ) : (
          <>
            {hasTableData && (
              <>
                <KPISection
                  darkMode={darkMode}
                  tableData={filteredData}
                  numericMetrics={numericMetrics}
                />

                {numericKeys.map((yKey) => (
                  <ChartSection
                    key={yKey}
                    darkMode={darkMode}
                    tableData={filteredData}
                    chartType={
                      chartTypes[yKey] || "bar"
                    }
                    xKey={xKey}
                    yKey={yKey}
                  />
                ))}

                <PivotSection
                  darkMode={darkMode}
                  pivotData={pivotData}
                  groupBy={xKey}
                  numericKeys={numericKeys}
                />

                <InsightsSection
                  darkMode={darkMode}
                  tableData={filteredData}
                  insights={insights}
                />

                <TableSection
                  darkMode={darkMode}
                  tableData={filteredData}
                />
              </>
            )}
          </>
        )}

        <Toast toast={toast} />
      </div>
    </motion.div>
  );
}

export default App;
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
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import axios from "axios";

function App() {

  const [file, setFile] = useState(null);

  const [message, setMessage] =
    useState("");

  const [tableData, setTableData] =
    useState([]);

  const [dragActive, setDragActive] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [sheets, setSheets] =
    useState([]);

  const [selectedSheet, setSelectedSheet] =
    useState("");

  const [chartConfigs, setChartConfigs] =
    useState({});

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "info",
  });

  const dashboardRef = useRef();

  // TOAST
  const showToast = (
    message,
    type = "info"
  ) => {

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

  // CHART SWITCHER
  const handleChartTypeChange = (
    key,
    type
  ) => {

    setChartConfigs((prev) => ({
      ...prev,
      [key]: type,
    }));

  };

  // LIVE CELL EDITING
  const handleCellChange = (
    rowIndex,
    column,
    value
  ) => {

    const updatedData = [...tableData];

    updatedData[rowIndex][column] =
      value;

    setTableData(updatedData);

  };

  // FILE UPLOAD
  const handleUpload = async () => {

    if (!file) {

      showToast(
        "Please select a file",
        "error"
      );

      return;

    }

    setLoading(true);

    const formData = new FormData();

    formData.append("file", file);

    try {

      const response =
        await axios.post(
          "https://dashify-backend-eean.onrender.com/upload",
          formData
        );

      const responseData =
        response.data || {};

      const normalizedData =
        Array.isArray(
          responseData.data
        )
          ? responseData.data
          : [];

      setTableData(normalizedData);

      const sheetsList =
        Array.isArray(
          responseData.sheets
        )
          ? responseData.sheets
          : [];

      setSheets(sheetsList);

      if (sheetsList.length > 0) {

        setSelectedSheet(
          sheetsList[0]
        );

      }

      showToast(
        "Dashboard generated successfully",
        "success"
      );

    } catch (error) {

      console.error(error);

      showToast(
        "Upload failed",
        "error"
      );

      setTableData([]);

    } finally {

      setLoading(false);

    }

  };

  // FILTERED DATA
  const filteredData =
    Array.isArray(tableData)
      ? tableData.filter((row) =>
          Object.values(row)
            .join(" ")
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            )
        )
      : [];

  const hasTableData =
    Array.isArray(filteredData) &&
    filteredData.length > 0;

  // COLUMN INFO
  const {
    allColumns,
    numericColumns,
    categoricalColumns,
  } = getColumnsInfo(filteredData);

  const xKey =
    categoricalColumns?.[0] ||
    allColumns?.[0] ||
    "";

  const numericKeys =
    Array.isArray(numericColumns)
      ? numericColumns
      : [];

  // DEFAULT CHART TYPES
  const chartTypes =
    numericKeys.reduce(
      (acc, yKey) => ({
        ...acc,
        [yKey]: getChartType(
          xKey,
          filteredData
        ),
      }),
      {}
    );

  // KPI METRICS
  const numericMetrics =
    numericKeys.map((yKey) => {

      const numericValues =
        getNumericValues(
          filteredData,
          yKey
        );

      return {

        yKey,

        total:
          getTotalValue(
            numericValues
          ),

        average:
          getAverageValue(
            numericValues
          ),

        max:
          getMaxValue(
            numericValues
          ),

      };

    });

  // PIVOT
  const pivotData =
    getPivotSummary(
      filteredData,
      xKey,
      numericKeys
    );

  // AI INSIGHTS
  const insights =
    Array.isArray(filteredData) &&
    filteredData.length > 0 &&
    xKey &&
    numericKeys.length > 0
      ? generateInsights(
          filteredData,
          xKey,
          numericKeys[0],
          numericMetrics?.[0]
            ?.total || 0,
          numericMetrics?.[0]
            ?.average || 0,
          numericMetrics?.[0]
            ?.max || 0
        )
      : [];

  // PDF EXPORT
  const downloadPDF = () => {

    const pdf =
      new jsPDF("p", "mm", "a4");

    const primary = [
      15,
      23,
      42,
    ];

    const accent = [
      6,
      182,
      212,
    ];

    const gray = [
      100,
      116,
      139,
    ];

    const generatedDate =
      new Date().toLocaleString();

    const uploadedFile =
      file?.name || "Dataset";

    // HEADER
    pdf.setFillColor(...primary);

    pdf.rect(
      0,
      0,
      210,
      35,
      "F"
    );

    pdf.setFontSize(26);

    pdf.setTextColor(
      255,
      255,
      255
    );

    pdf.text(
      "DashifyAI Report",
      14,
      20
    );

    pdf.setFontSize(10);

    pdf.setTextColor(220);

    pdf.text(
      "AI-Powered Business Intelligence Summary",
      14,
      27
    );

    // INFO
    pdf.setTextColor(...gray);

    pdf.setFontSize(10);

    pdf.text(
      `Generated: ${generatedDate}`,
      14,
      45
    );

    pdf.text(
      `Source File: ${uploadedFile}`,
      14,
      51
    );

    // EXECUTIVE SUMMARY
    pdf.setFontSize(18);

    pdf.setTextColor(...primary);

    pdf.text(
      "Executive Summary",
      14,
      68
    );

    pdf.setDrawColor(...accent);

    pdf.line(
      14,
      71,
      75,
      71
    );

    pdf.setFontSize(11);

    pdf.setTextColor(60);

    const summaryText =
      `This report was automatically generated using the DashifyAI analytics engine. The uploaded dataset was processed to identify key performance metrics, operational trends, and category-level insights through intelligent analytics and visualization.`;

    const summaryLines =
      pdf.splitTextToSize(
        summaryText,
        180
      );

    pdf.text(
      summaryLines,
      14,
      82
    );

    // KPI SECTION
    let y = 115;

    pdf.setFontSize(18);

    pdf.setTextColor(...primary);

    pdf.text(
      "Key Performance Indicators",
      14,
      y
    );

    pdf.line(
      14,
      y + 3,
      95,
      y + 3
    );

    y += 15;

    numericMetrics.forEach(
      (metric) => {

        pdf.setFillColor(
          248,
          250,
          252
        );

        pdf.roundedRect(
          14,
          y,
          180,
          24,
          4,
          4,
          "F"
        );

        pdf.setFontSize(11);

        pdf.setTextColor(...gray);

        pdf.text(
          metric.yKey.toUpperCase(),
          20,
          y + 8
        );

        pdf.setFontSize(16);

        pdf.setTextColor(
          ...primary
        );

        pdf.text(
          `Total: ${Number(
            metric.total
          ).toLocaleString()}`,
          20,
          y + 18
        );

        pdf.text(
          `Average: ${Number(
            metric.average
          ).toFixed(2)}`,
          90,
          y + 18
        );

        y += 32;

      }
    );

    // AI INSIGHTS
    y += 5;

    pdf.setFontSize(18);

    pdf.setTextColor(...primary);

    pdf.text(
      "AI Insights & Observations",
      14,
      y
    );

    pdf.line(
      14,
      y + 3,
      92,
      y + 3
    );

    y += 15;

    insights.forEach((insight) => {

      pdf.setFontSize(11);

      pdf.setTextColor(70);

      const lines =
        pdf.splitTextToSize(
          `• ${insight}`,
          175
        );

      pdf.text(
        lines,
        18,
        y
      );

      y +=
        lines.length * 7 + 5;

    });

    // FOOTER
    pdf.setFillColor(...primary);

    pdf.rect(
      0,
      285,
      210,
      12,
      "F"
    );

    pdf.setFontSize(9);

    pdf.setTextColor(255);

    pdf.text(
      "© All rights reserved at VJR Associates",
      14,
      292
    );

    pdf.text(
      "Generated by DashifyAI",
      145,
      292
    );

    pdf.save(
      "DashifyAI_Report.pdf"
    );

    showToast(
      "Professional report exported",
      "success"
    );

  };
  const handleAddRow = () => {

  if (!tableData.length) return;

  const emptyRow = {};

  Object.keys(tableData[0]).forEach(
    (key) => {
      emptyRow[key] = "";
    }
  );

  setTableData([
    ...tableData,
    emptyRow,
  ]);

  showToast(
    "New row added",
    "success"
  );

};
const handleAddColumn = () => {

  const columnName = prompt(
    "Enter new column name"
  );

  if (!columnName) return;

  const updatedData =
    tableData.map((row) => ({
      ...row,
      [columnName]: "",
    }));

  setTableData(updatedData);

  showToast(
    "New column added",
    "success"
  );

};
const exportEditedExcel = () => {

  const worksheet =
    XLSX.utils.json_to_sheet(
      tableData
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Edited_Data"
  );

  const excelBuffer =
    XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

  const blob = new Blob(
    [excelBuffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    }
  );

  saveAs(
    blob,
    "DashifyAI_Edited.xlsx"
  );

  showToast(
    "Edited Excel exported",
    "success"
  );

};

  return (

    <motion.div

      initial={{
        opacity: 0,
      }}

      animate={{
        opacity: 1,
      }}

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
          fixed inset-0
          opacity-[0.03]
          pointer-events-none
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize:
            "40px 40px",
        }}
      />

      <div
        ref={dashboardRef}
        className="
          relative z-10
          max-w-7xl mx-auto
        "
      >

        <div className="space-y-8">

          <Header
  darkMode={darkMode}
  setDarkMode={setDarkMode}
  downloadPDF={downloadPDF}
  handleAddRow={handleAddRow}
  handleAddColumn={handleAddColumn}
  exportEditedExcel={exportEditedExcel}
/>

          <AIIntro />

        </div>

        <UploadSection
          darkMode={darkMode}
          dragActive={dragActive}
          setDragActive={
            setDragActive
          }
          file={file}
          setFile={setFile}
          handleUpload={
            handleUpload
          }
          loading={loading}
          message={message}
        />

        {/* SEARCH */}
        <div
          className="
            mt-8 mb-8
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
              setSearchTerm(
                e.target.value
              )
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
                setSelectedSheet(
                  e.target.value
                )
              }
              className="
                bg-[#0f172a]
                border border-white/10
                px-4 py-3
                rounded-xl
                outline-none
              "
            >

              {sheets.map(
                (sheet, index) => (

                  <option
                    key={index}
                    value={sheet}
                  >
                    {sheet}
                  </option>

                )
              )}

            </select>

          </div>

        )}

        {/* DASHBOARD */}
        {loading ? (

          <LoadingSkeleton
            darkMode={darkMode}
          />

        ) : (

          <>
            {hasTableData && (

              <>

                <KPISection
                  darkMode={darkMode}
                  tableData={
                    filteredData
                  }
                  numericMetrics={
                    numericMetrics
                  }
                />

                {numericKeys.map(
                  (yKey) => (

                    <ChartSection
                      key={yKey}
                      darkMode={darkMode}
                      tableData={
                        filteredData
                      }
                      chartType={
                        chartConfigs[
                          yKey
                        ] ||
                        chartTypes[
                          yKey
                        ] ||
                        "bar"
                      }
                      xKey={xKey}
                      yKey={yKey}
                      handleChartTypeChange={
                        handleChartTypeChange
                      }
                    />

                  )
                )}

                <PivotSection
                  darkMode={darkMode}
                  pivotData={
                    pivotData
                  }
                  groupBy={xKey}
                  numericKeys={
                    numericKeys
                  }
                />

                <InsightsSection
                  darkMode={darkMode}
                  tableData={
                    filteredData
                  }
                  insights={insights}
                />

                <TableSection
                  darkMode={darkMode}
                  tableData={
                    filteredData
                  }
                  handleCellChange={
                    handleCellChange
                  }
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
import { FiUploadCloud } from "react-icons/fi";

function UploadSection({
  darkMode,
  dragActive,
  setDragActive,
  file,
  setFile,
  handleUpload,
  loading,
  message,
}) {
  return (
    <div
      className={`
        ${darkMode ? "bg-[#1e293b]" : "bg-white"}
        p-8 rounded-2xl shadow-lg mb-10
      `}
    >

      <h2 className="text-2xl font-semibold mb-6">
        Upload Excel File
      </h2>

      <div
        className={`
          border-2 border-dashed rounded-2xl p-12
          flex flex-col items-center justify-center
          transition duration-300 cursor-pointer

          ${
            dragActive
              ? "border-blue-500 bg-[#334155]"
              : "border-slate-600 hover:border-blue-500"
          }
        `}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();

          setDragActive(false);

          const droppedFile = e.dataTransfer.files[0];

          if (droppedFile) {
            setFile(droppedFile);
          }
        }}
      >

        <FiUploadCloud
          size={60}
          className="mb-4 text-blue-400"
        />

        <p className="text-xl font-semibold mb-2">
          Drag & Drop Excel File
        </p>

        <p className="text-slate-400 mb-4">
          or click below to browse
        </p>

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        {file && (
          <p className="text-green-400 mb-4">
            Selected: {file.name}
          </p>
        )}

        <button
          onClick={handleUpload}
          className={`
            bg-blue-600 hover:bg-blue-700
            px-6 py-3 rounded-xl
            transition font-semibold
            ${loading ? "animate-pulse" : ""}
          `}
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>

      </div>

      <p className="mt-4 text-green-400">
        {message}
      </p>

    </div>
  );
}

export default UploadSection;
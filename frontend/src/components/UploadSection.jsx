import { motion } from "framer-motion";
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
        p-8 md:p-10
        shadow-[0_10px_50px_rgba(0,0,0,0.25)]
        hover:shadow-[0_20px_70px_rgba(0,0,0,0.35)]
        transition-all duration-300
        mb-10
      "
    >

      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute top-0 right-0
          w-72 h-72
          bg-cyan-500/10
          blur-3xl rounded-full
          pointer-events-none
        "
      />

      {/* CONTENT */}
      <div className="relative z-10">

        {/* TITLE */}
        <div className="mb-8">

          <h2
            className="
              text-2xl font-semibold
              tracking-tight
            "
          >
            Upload Dataset
          </h2>

          <p
            className="
              mt-2 text-slate-400
            "
          >
            Import Excel or CSV files to
            generate intelligent dashboards.
          </p>

        </div>

        {/* DROPZONE */}
        <motion.div

          whileHover={{
            scale: 1.01,
          }}

          className={`
            relative
            border border-dashed
            rounded-[28px]
            p-14
            text-center
            transition-all duration-300

            ${
              dragActive
                ? "border-cyan-400 bg-cyan-500/10"
                : "border-white/10 bg-white/[0.02]"
            }
          `}
        >

          {/* ICON */}
          <motion.div

            animate={{
              y: [0, -8, 0],
            }}

            transition={{
              repeat: Infinity,
              duration: 3,
            }}

            className="
              w-20 h-20
              rounded-full
              bg-cyan-500/10
              border border-cyan-400/20
              flex items-center
              justify-center
              mx-auto mb-6
            "
          >
            <FiUploadCloud
              size={38}
              className="text-cyan-300"
            />
          </motion.div>

          {/* TEXT */}
          <h3
            className="
              text-xl font-medium
            "
          >
            Drag & Drop your files
          </h3>

          <p
            className="
              mt-3 text-slate-400
            "
          >
            Supports CSV, XLS, XLSX
          </p>

          {/* FILE INPUT */}
          {/* HIDDEN INPUT */}
<input
  id="fileUpload"
  type="file"
  accept=".csv,.xlsx,.xls,.xlsm"
  onChange={(e) =>
    setFile(e.target.files[0])
  }
  className="hidden"
/>

{/* CUSTOM BUTTON */}
<label
  htmlFor="fileUpload"
  className="
    inline-flex items-center
    gap-3 mt-8
    px-6 h-12
    rounded-2xl
    border border-white/10
    bg-white/[0.05]
    backdrop-blur-xl
    hover:bg-white/[0.08]
    transition cursor-pointer
    text-sm font-medium
  "
>

  <FiUploadCloud size={18} />

  Choose Dataset

</label>

          {/* FILE NAME */}
         {file && (

  <div
    className="
      mt-5 inline-flex
      items-center gap-2
      px-4 py-2
      rounded-xl
      bg-cyan-500/10
      border border-cyan-400/20
      text-cyan-300
      text-sm
    "
  >
    {file.name}
  </div>

)}

        </motion.div>

        {/* BUTTON */}
        <motion.button

          whileHover={{
            scale: 1.02,
          }}

          whileTap={{
            scale: 0.98,
          }}

          onClick={handleUpload}

          disabled={loading}

          className="
            mt-8
            h-14 px-8
            rounded-2xl
            bg-white text-black
            font-medium
            transition
            hover:opacity-90
            disabled:opacity-50
          "
        >
          {loading
            ? "Analyzing..."
            : "Generate Dashboard"}
        </motion.button>

        {/* MESSAGE */}
        {message && (

          <p
            className="
              mt-5 text-sm
              text-slate-400
            "
          >
            {message}
          </p>

        )}

      </div>

    </motion.div>
  );
}

export default UploadSection;
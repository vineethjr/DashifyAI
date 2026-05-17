import {
  FiMoon,
  FiSun,
  FiDownload,
  FiActivity,
} from "react-icons/fi";

import { motion } from "framer-motion";

function Header({
  darkMode,
  setDarkMode,
  downloadPDF,
}) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: -20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      className="
        relative overflow-hidden
        rounded-[34px]
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-2xl
        px-8 py-6
        shadow-[0_10px_50px_rgba(0,0,0,0.25)]
      "
    >

      {/* GLOW */}
      <div
        className="
          absolute top-0 right-0
          w-72 h-72
          bg-cyan-500/10
          blur-3xl rounded-full
        "
      />

      <div
        className="
          relative z-10
          flex flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-8
        "
      >

        {/* LEFT */}
        <div>

          {/* LOGO */}
          <div
            className="
              flex items-center gap-4
            "
          >

            {/* ICON */}
            <div
              className="
                relative
                w-16 h-16
                rounded-[22px]
                bg-gradient-to-br
                from-cyan-400
                via-blue-500
                to-violet-500
                flex items-center
                justify-center
                shadow-[0_10px_30px_rgba(59,130,246,0.35)]
              "
            >

              <div
                className="
                  absolute inset-[2px]
                  rounded-[20px]
                  bg-[#0f172a]
                "
              />

              <span
                className="
                  relative z-10
                  text-2xl font-black
                  tracking-tight
                "
              >
                D
              </span>

            </div>

            {/* TEXT */}
            <div>

              <h1
                className="
                  text-5xl
                  font-black
                  tracking-tight
                  bg-gradient-to-r
                  from-cyan-300
                  via-blue-400
                  to-violet-400
                  bg-clip-text
                  text-transparent
                "
              >
                DashifyAI
              </h1>

              <div
                className="
                  flex items-center
                  gap-2 mt-2
                "
              >

                <FiActivity
                  className="
                    text-cyan-400
                  "
                />

                <p
                  className="
                    text-slate-400
                    text-sm
                    tracking-wide
                  "
                >
                  AI-Powered Analytics Platform
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div
          className="
            flex items-center
            gap-4
          "
        >

          {/* STATUS */}
          <div
            className="
              hidden md:flex
              items-center gap-3
              rounded-2xl
              border border-emerald-400/20
              bg-emerald-500/10
              px-5 py-3
            "
          >

            <div
              className="
                w-3 h-3
                rounded-full
                bg-emerald-400
                animate-pulse
              "
            />

            <span
              className="
                text-sm
                text-emerald-300
                font-medium
              "
            >
              System Active
            </span>

          </div>

          {/* THEME */}
          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="
              w-14 h-14
              rounded-2xl
              border border-white/10
              bg-white/[0.04]
              backdrop-blur-xl
              flex items-center
              justify-center
              text-xl
              hover:border-cyan-400/20
              hover:bg-cyan-500/10
              transition-all duration-300
            "
          >

            {darkMode
              ? <FiSun />
              : <FiMoon />
            }

          </button>

          {/* EXPORT */}
          <button
            onClick={downloadPDF}
            className="
              group
              relative overflow-hidden
              rounded-2xl
              px-8 py-4
              bg-gradient-to-r
              from-cyan-500
              via-blue-500
              to-violet-500
              text-white
              font-semibold
              shadow-[0_10px_40px_rgba(59,130,246,0.35)]
              transition-all duration-300
              hover:scale-[1.03]
            "
          >

            <div
              className="
                absolute inset-0
                opacity-0
                group-hover:opacity-100
                transition
                bg-white/10
              "
            />

            <div
              className="
                relative z-10
                flex items-center
                gap-3
              "
            >

              <FiDownload />

              <span>
                Export Report
              </span>

            </div>

          </button>

        </div>

      </div>

    </motion.div>
  );
}

export default Header;
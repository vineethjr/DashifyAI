import { motion } from "framer-motion";

import {
  FiTrendingUp,
  FiAlertCircle,
  FiActivity,
  FiBarChart2,
} from "react-icons/fi";

function InsightsSection({
  darkMode,
  insights,
}) {

  const hasInsights =
    Array.isArray(insights) &&
    insights.length > 0;

  if (!hasInsights) {
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
        No AI insights available.
      </div>
    );
  }

  const icons = [
    <FiTrendingUp />,
    <FiActivity />,
    <FiBarChart2 />,
    <FiAlertCircle />,
  ];

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
        p-8
        shadow-[0_10px_50px_rgba(0,0,0,0.25)]
        hover:shadow-[0_20px_70px_rgba(0,0,0,0.35)]
        transition-all duration-300
      "
    >

      {/* HEADER */}
      <div className="mb-8">

        <h2
          className="
            text-2xl font-semibold
            tracking-tight
          "
        >
          AI Insights
        </h2>

        <p
          className="
            mt-2 text-slate-400
          "
        >
          Intelligent observations generated
          from your uploaded dataset.
        </p>

      </div>

      {/* GRID */}
      <div
        className="
          grid grid-cols-1
          md:grid-cols-2
          gap-6
        "
      >

        {insights.map(
          (insight, index) => (

            <motion.div

              key={index}

              initial={{
                opacity: 0,
                y: 20,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                delay: index * 0.08,
              }}

              whileHover={{
                y: -5,
              }}

              className="
                relative overflow-hidden
                rounded-[24px]
                border border-white/10
                bg-black/10
                p-6
              "
            >

              {/* GLOW */}
              <div
                className="
                  absolute top-0 right-0
                  w-32 h-32
                  bg-cyan-500/10
                  blur-3xl rounded-full
                "
              />

              {/* CONTENT */}
              <div className="relative z-10">

                {/* TOP */}
                <div
                  className="
                    flex items-center gap-4
                    mb-5
                  "
                >

                  <div
                    className="
                      w-12 h-12
                      rounded-2xl
                      bg-cyan-500/10
                      border border-cyan-400/20
                      flex items-center
                      justify-center
                      text-cyan-300
                      text-xl
                    "
                  >
                    {
                      icons[
                        index % icons.length
                      ]
                    }
                  </div>

                  <h3
                    className="
                      text-lg font-medium
                    "
                  >
                    Insight {index + 1}
                  </h3>

                </div>

                {/* TEXT */}
                <p
                  className="
                    text-slate-300
                    leading-relaxed
                  "
                >
                  {String(insight)}
                </p>

              </div>

            </motion.div>

          )
        )}

      </div>

    </motion.div>
  );
}

export default InsightsSection;
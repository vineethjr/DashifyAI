import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  FiTrendingUp,
  FiBarChart2,
  FiActivity,
} from "react-icons/fi";

function KPISection({
  numericMetrics,
}) {

  if (
    !Array.isArray(numericMetrics) ||
    numericMetrics.length === 0
  ) {
    return null;
  }

  const icons = [
    <FiTrendingUp />,
    <FiBarChart2 />,
    <FiActivity />,
  ];

  return (

    <div
      className="
        grid grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
        mt-10
      "
    >

      {numericMetrics.map(
        (metric, index) => (

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
              y: -6,
            }}

            className="
              relative overflow-hidden
              rounded-[32px]
              border border-white/10
              bg-white/[0.03]
              backdrop-blur-2xl
              p-7
              shadow-[0_10px_50px_rgba(0,0,0,0.25)]
              hover:border-cyan-400/20
              hover:shadow-[0_20px_70px_rgba(6,182,212,0.12)]
              transition-all duration-300
            "
          >

            {/* GLOW */}
            <div
              className="
                absolute top-0 right-0
                w-40 h-40
                bg-cyan-500/10
                blur-3xl rounded-full
              "
            />

            {/* TOP */}
            <div
              className="
                relative z-10
                flex items-center
                justify-between
              "
            >

              <div>

                <p
                  className="
                    text-xs uppercase
                    tracking-[0.25em]
                    text-slate-500
                    font-medium
                  "
                >
                  {metric.yKey}
                </p>

                <h2
                  className="
                    mt-5
                    text-5xl
                    font-bold
                    tracking-tight
                  "
                >
                  <CountUp
  end={Number(metric.total || 0)}
  duration={2}
  separator=","
/>
                </h2>

              </div>

              <div
                className="
                  w-16 h-16
                  rounded-3xl
                  bg-cyan-500/10
                  border border-cyan-400/20
                  flex items-center
                  justify-center
                  text-cyan-300
                  text-2xl
                "
              >
                {
                  icons[
                    index % icons.length
                  ]
                }
              </div>

            </div>

            {/* BOTTOM */}
            <div
              className="
                relative z-10
                mt-8
                flex items-center
                justify-between
              "
            >

              <div>

                <p
                  className="
                    text-slate-500 text-sm
                  "
                >
                  Average
                </p>

                <h3
                  className="
                    mt-1 text-xl
                    font-semibold
                  "
                >
                  <CountUp
  end={Number(metric.average || 0)}
  duration={2}
  decimals={2}
/>
                </h3>

              </div>

              <div>

                <p
                  className="
                    text-slate-500 text-sm
                  "
                >
                  Peak
                </p>

                <h3
                  className="
                    mt-1 text-xl
                    font-semibold
                  "
                >
                  <CountUp
  end={Number(metric.max || 0)}
  duration={2}
  separator=","
/>
                </h3>

              </div>

            </div>

          </motion.div>

        )
      )}

    </div>
  );
}

export default KPISection;
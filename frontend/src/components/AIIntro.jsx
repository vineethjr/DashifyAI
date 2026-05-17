import { TypeAnimation } from "react-type-animation";

import { motion } from "framer-motion";

function AIIntro() {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: -10,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      className="
        mb-5
        rounded-[30px]
        border border-cyan-400/10
        bg-black/20
        backdrop-blur-2xl
        px-8 py-4
        shadow-[0_10px_50px_rgba(0,0,0,0.25)]
      "
    >

      {/* STATUS */}
      <div
        className="
          flex items-center
          gap-3 mb-5
        "
      >

        <div
          className="
            w-3 h-3
            rounded-full
            bg-cyan-400
            animate-pulse
          "
        />

        <span
          className="
            text-cyan-300
            text-sm
            tracking-[0.2em]
            uppercase
          "
        >
          AI Core Online
        </span>

      </div>

      {/* TYPEWRITER */}
      <TypeAnimation

        sequence={[

          "AI Analytics Engine Initialized...",
          1500,

          "Waiting for dataset upload...",
          1500,

          "Generating intelligent business insights...",
          1500,

          "Visualizing data patterns in real time...",
          1500,

        ]}

        wrapper="div"

        speed={50}

        repeat={Infinity}

        className="
          text-xl md:text-2xl
          font-semibold
          tracking-tight
          text-white
        "
      />

    </motion.div>

  );
}

export default AIIntro;
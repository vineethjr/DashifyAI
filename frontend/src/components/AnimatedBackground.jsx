function AnimatedBackground() {

  return (

    <div
      className="
        absolute inset-0
        overflow-hidden
        pointer-events-none
        z-0
      "
    >

      {/* ORB 1 */}
      <div
        className="
          absolute
          top-[10%]
          left-[5%]
          w-[400px]
          h-[400px]
          rounded-full
          bg-cyan-500/10
          blur-[120px]
          animate-pulse
        "
      />

      {/* ORB 2 */}
      <div
        className="
          absolute
          bottom-[5%]
          right-[10%]
          w-[350px]
          h-[350px]
          rounded-full
          bg-violet-500/10
          blur-[120px]
          animate-pulse
        "
        style={{
          animationDelay: "1s",
        }}
      />

      {/* ORB 3 */}
      <div
        className="
          absolute
          top-[45%]
          left-[45%]
          w-[250px]
          h-[250px]
          rounded-full
          bg-blue-500/10
          blur-[100px]
          animate-pulse
        "
        style={{
          animationDelay: "2s",
        }}
      />

      {/* GRID */}
      <div
        className="
          absolute inset-0
          opacity-[0.03]
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

    </div>

  );
}

export default AnimatedBackground;
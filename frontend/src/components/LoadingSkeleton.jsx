function LoadingSkeleton({ darkMode }) {
  return (
    <div className="space-y-6 mb-10">
      <div
        className={`
          ${darkMode ? "bg-[#1e293b]" : "bg-white"}
          p-6 rounded-2xl shadow-lg
          animate-pulse
        `}
      >
        <div className="h-6 w-48 rounded-full bg-slate-600 mb-6"></div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-32 rounded-2xl bg-slate-700"></div>
          <div className="h-32 rounded-2xl bg-slate-700"></div>
          <div className="h-32 rounded-2xl bg-slate-700"></div>
        </div>
      </div>

      <div className={`
          ${darkMode ? "bg-[#1e293b]" : "bg-white"}
          p-6 rounded-2xl shadow-lg
          animate-pulse
        `}
      >
        <div className="h-6 w-40 rounded-full bg-slate-600 mb-6"></div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-64 rounded-2xl bg-slate-700"></div>
          <div className="h-64 rounded-2xl bg-slate-700"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;

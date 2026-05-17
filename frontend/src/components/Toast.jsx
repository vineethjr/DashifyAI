import { AnimatePresence, motion } from "framer-motion";

function Toast({ toast }) {
  if (!toast?.visible) {
    return null;
  }

  const colors = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex justify-end">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className={`max-w-sm rounded-2xl px-5 py-4 shadow-2xl text-white ${colors[toast.type] || colors.info}`}
        >
          <p className="font-semibold">{toast.message}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Toast;

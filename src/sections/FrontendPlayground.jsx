import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiCheck,
  FiCode,
  FiMapPin,
  FiRotateCcw,
  FiSliders,
  FiZap,
} from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";

const accents = [
  { name: "Indigo", value: "#4f46e5" },
  { name: "Teal", value: "#0f766e" },
  { name: "Rose", value: "#be123c" },
  { name: "Amber", value: "#b45309" },
];

const initialProfile = {
  name: "Archit Yadav",
  role: "Java Full Stack Developer",
  location: "Hyderabad, India",
};

export default function FrontendPlayground() {
  const { isDark } = useTheme();
  const [profile, setProfile] = useState(initialProfile);
  const [accent, setAccent] = useState(accents[0]);
  const [available, setAvailable] = useState(true);

  const isLight = !isDark;
  const surfaceClass = isLight
    ? "border-slate-200 bg-white/90 shadow-xl shadow-slate-900/5"
    : "border-white/10 bg-dark-800/70";
  const fieldClass = isLight
    ? "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-indigo-400"
    : "border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-primary-400";
  const secondaryTextClass = isLight ? "text-slate-600" : "text-slate-400";

  const updateProfile = (event) => {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  };

  const reset = () => {
    setProfile(initialProfile);
    setAccent(accents[0]);
    setAvailable(true);
  };

  return (
    <section id="frontend-playground" className="relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-primary-400 text-sm tracking-widest">04</span>
            <span className="h-px w-8 bg-primary-500/40" />
            <span className="font-mono text-xs text-slate-500 tracking-widest uppercase">
              Frontend Playground
            </span>
          </div>
          <h2 className="section-title mb-3">A little UI, made interactive</h2>
          <p className="section-subtitle mb-0">
            Try changing the profile details, color, and availability. This live preview shows how I build
            responsive React interfaces with reusable controls and immediate feedback.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className={`rounded-2xl border p-6 sm:p-7 ${surfaceClass}`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${accent.value}18`, color: accent.value }}
                >
                  <FiSliders size={19} />
                </div>
                <div>
                  <h3 className={`font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>Profile controls</h3>
                  <p className={`text-xs mt-0.5 ${secondaryTextClass}`}>Changes update the preview live</p>
                </div>
              </div>
              <button
                type="button"
                onClick={reset}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors ${
                  isLight ? "text-slate-600 hover:bg-slate-100" : "text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
                aria-label="Reset profile preview"
              >
                <FiRotateCcw size={13} />
                Reset
              </button>
            </div>

            <div className="space-y-4">
              {[
                { label: "Name", name: "name", maxLength: 40 },
                { label: "Role", name: "role", maxLength: 60 },
                { label: "Location", name: "location", maxLength: 40 },
              ].map(({ label, name, maxLength }) => (
                <label key={name} className="block">
                  <span className={`block text-xs font-medium mb-1.5 ${secondaryTextClass}`}>{label}</span>
                  <input
                    name={name}
                    value={profile[name]}
                    onChange={updateProfile}
                    maxLength={maxLength}
                    className={`w-full rounded-xl border px-3.5 py-3 text-sm outline-none transition-colors ${fieldClass}`}
                  />
                </label>
              ))}
            </div>

            <div className="mt-6">
              <span className={`block text-xs font-medium mb-3 ${secondaryTextClass}`}>Accent color</span>
              <div className="flex flex-wrap gap-2.5">
                {accents.map((option) => (
                  <button
                    type="button"
                    key={option.name}
                    onClick={() => setAccent(option)}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{
                      backgroundColor: option.value,
                      outlineColor: option.value,
                      boxShadow: accent.name === option.name ? `0 0 0 3px ${isLight ? "#fff" : "#111118"}, 0 0 0 5px ${option.value}70` : "none",
                    }}
                    aria-label={`Use ${option.name} accent`}
                    aria-pressed={accent.name === option.name}
                  >
                    {accent.name === option.name && <FiCheck className="text-white" size={16} />}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={available}
              onClick={() => setAvailable((value) => !value)}
              className={`mt-6 flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition-colors ${
                isLight ? "border-slate-200 hover:bg-slate-50" : "border-white/10 hover:bg-white/5"
              }`}
            >
              <span>
                <span className={`block text-sm font-medium ${isLight ? "text-slate-800" : "text-slate-200"}`}>
                  Open to opportunities
                </span>
                <span className={`block text-xs mt-0.5 ${secondaryTextClass}`}>
                  Toggle the profile status
                </span>
              </span>
              <span
                className={`relative w-11 h-6 rounded-full transition-colors ${available ? "" : isLight ? "bg-slate-300" : "bg-slate-600"}`}
                style={available ? { backgroundColor: accent.value } : undefined}
                aria-hidden="true"
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    available ? "translate-x-[22px]" : "translate-x-0.5"
                  }`}
                />
              </span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className={`relative overflow-hidden rounded-2xl border p-4 pb-14 sm:p-8 sm:pb-14 flex items-center justify-center min-h-[360px] ${surfaceClass}`}
          >
            <div
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
              style={{ backgroundColor: `${accent.value}12` }}
            />
            <div
              className={`relative w-full max-w-md rounded-2xl border p-5 sm:p-7 transition-all duration-300 ${
                isLight ? "bg-white border-slate-200 shadow-xl shadow-slate-900/10" : "bg-dark-900/90 border-white/10 shadow-2xl shadow-black/30"
              }`}
              style={{ borderTop: `3px solid ${accent.value}` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white shrink-0"
                  style={{ background: `linear-gradient(135deg, ${accent.value}, ${accent.value}bb)` }}
                  aria-hidden="true"
                >
                  {(profile.name.trim().charAt(0) || "A").toUpperCase()}
                </div>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold"
                  style={{
                    color: available ? "#047857" : isLight ? "#64748b" : "#94a3b8",
                    backgroundColor: available ? "rgba(16,185,129,0.12)" : isLight ? "#f1f5f9" : "rgba(148,163,184,0.12)",
                  }}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${available ? "bg-emerald-500" : "bg-slate-400"}`} />
                  {available ? "Available" : "Not available"}
                </span>
              </div>

              <p
                className="mt-6 mb-1 text-xs font-semibold uppercase tracking-[0.16em]"
                style={{ color: accent.value }}
              >
                Profile preview
              </p>
              <h3 className={`text-2xl sm:text-3xl font-bold font-display break-words ${isLight ? "text-slate-900" : "text-white"}`}>
                {profile.name || "Your name"}
              </h3>
              <p className={`mt-2 text-sm sm:text-base ${isLight ? "text-slate-600" : "text-slate-300"}`}>
                {profile.role || "Your role"}
              </p>
              <p className={`mt-3 flex items-center gap-2 text-xs ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                <FiMapPin size={14} style={{ color: accent.value }} />
                {profile.location || "Your location"}
              </p>

              <div className={`mt-6 pt-5 border-t ${isLight ? "border-slate-100" : "border-white/10"}`}>
                <p className={`text-xs leading-relaxed ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                  A responsive component with controlled inputs, clear states, and a theme-aware visual system.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["React", "Responsive UI", "Accessible controls"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full px-2.5 py-1 text-[10px] font-medium"
                      style={{ backgroundColor: `${accent.value}12`, color: accent.value }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={`absolute bottom-5 left-6 flex items-center gap-2 text-[11px] font-mono ${secondaryTextClass}`}>
              <FiCode size={13} style={{ color: accent.value }} />
              <span>LIVE COMPONENT PREVIEW</span>
              <FiZap size={13} style={{ color: accent.value }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

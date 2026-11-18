import { useState, useRef } from "react";
import { FaLock, FaRedoAlt, FaBrain } from "react-icons/fa";
import { projectBanners } from "../data/projectBanners";

export default function MediaFrame({ project }) {
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);

  const banner = projectBanners[project.id] || {
    gradient: "linear-gradient(135deg, #071322 0%, #0d2238 100%)",
    accent: "#22d3ee",
    label: "Engineering",
    icon: <FaBrain />,
  };

  const hasVideo = !hasError && (project.detailVideo || project.video);
  const hasImage = !hasError && (project.detailImage || project.image);
  const mediaType = project.mediaType || "browser";

  // Slug for mock address bar
  const slug = project.title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 18);

  // If no media (or error), render large gradient technical cover
  if (!hasVideo && !hasImage) {
    return (
      <div
        className="w-full h-72 sm:h-80 md:h-[380px] rounded-2xl relative overflow-hidden flex flex-col justify-between p-6 sm:p-8 select-none border border-white/10 shadow-2xl"
        style={{ background: banner.gradient }}
      >
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#22d3ee 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Large faint category icon watermark */}
        <div className="absolute right-6 -bottom-6 text-9xl sm:text-[160px] text-white opacity-[0.06] pointer-events-none select-none">
          {banner.icon}
        </div>

        {/* Top bar */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full border"
              style={{
                borderColor: `${banner.accent}55`,
                backgroundColor: `${banner.accent}15`,
                color: banner.accent,
              }}
            >
              {banner.label}
            </span>
            {project.featured && (
              <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300">
                ★ Featured
              </span>
            )}
          </div>
          {project.year && (
            <span className="text-xs font-mono text-gray-400">
              {project.year}
            </span>
          )}
        </div>

        {/* Center content */}
        <div className="z-10 max-w-xl my-auto">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mb-2">
            {project.title}
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed max-w-[60ch]">
            {project.tagline}
          </p>
        </div>

        {/* Bottom tech stack tags */}
        <div className="flex flex-wrap gap-2 z-10 pt-4 border-t border-white/5">
          {project.stack?.map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 font-mono"
            >
              <span>{tech.icon}</span>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 1. Phone Frame (for portrait media such as Athaana mobile flow)
  if (mediaType === "phone") {
    return (
      <div className="w-full py-4 flex justify-center">
        <div className="w-[300px] sm:w-[320px] rounded-[42px] p-3 bg-neutral-900 border-2 border-white/15 shadow-2xl relative select-none">
          {/* Dynamic Island / camera notch */}
          <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 flex items-center justify-end px-3">
            <div className="w-2 h-2 rounded-full bg-cyan-500/60" />
          </div>

          {/* Screen viewport */}
          <div className="rounded-[30px] overflow-hidden bg-black max-h-[460px] flex items-center justify-center">
            {hasVideo ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto max-h-[460px] object-contain"
                onError={() => setHasError(true)}
              >
                {project.detailWebm && (
                  <source src={project.detailWebm} type="video/webm" />
                )}
                {project.detailVideo && (
                  <source src={project.detailVideo} type="video/mp4" />
                )}
                {project.detailImage && (
                  <img
                    src={project.detailImage}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-auto object-contain"
                  />
                )}
              </video>
            ) : (
              <img
                src={project.detailImage || project.image}
                alt={project.title}
                loading="lazy"
                onError={() => setHasError(true)}
                className="w-full h-auto max-h-[460px] object-contain"
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. Square Frame (for VR Meta Quest assessment)
  if (mediaType === "square") {
    return (
      <div className="w-full py-4 flex justify-center">
        <div className="w-full max-w-[520px] rounded-3xl p-3 sm:p-4 bg-neutral-950 border border-white/15 shadow-2xl relative select-none">
          {/* Header bar */}
          <div className="flex items-center justify-between pb-2.5 px-2 border-b border-white/10 mb-3 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
              <span className="text-gray-300">META QUEST 2 · VR SIMULATION</span>
            </div>
            <span className="text-[10px] text-gray-500">6DoF Interaction</span>
          </div>

          {/* Viewport */}
          <div className="rounded-2xl overflow-hidden bg-black max-h-[440px] flex items-center justify-center">
            {hasVideo ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto max-h-[430px] object-contain"
                onError={() => setHasError(true)}
              >
                {project.detailWebm && (
                  <source src={project.detailWebm} type="video/webm" />
                )}
                {project.detailVideo && (
                  <source src={project.detailVideo} type="video/mp4" />
                )}
                {project.detailImage && (
                  <img
                    src={project.detailImage}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-auto object-contain"
                  />
                )}
              </video>
            ) : (
              <img
                src={project.detailImage || project.image}
                alt={project.title}
                loading="lazy"
                onError={() => setHasError(true)}
                className="w-full h-auto max-h-[430px] object-contain"
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. Browser-Window Frame (Wide media: desktop checkout, DP-CTGAN, etc.)
  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl bg-neutral-950 border border-white/15 shadow-2xl overflow-hidden select-none">
      {/* Browser Titlebar */}
      <div className="px-4 py-2.5 bg-neutral-900 border-b border-white/10 flex items-center justify-between gap-4">
        {/* 3 Window Control Dots */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] border border-[#ef4444]/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#eab308] border border-[#eab308]/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] border border-[#22c55e]/60" />
        </div>

        {/* Address Bar */}
        <div className="w-3/5 sm:w-1/2 bg-black/60 border border-white/10 rounded-md py-1 px-3 text-[11px] font-mono text-gray-400 flex items-center justify-center gap-2 truncate">
          <FaLock className="text-[9px] text-cyan-400 shrink-0" />
          <span className="truncate">https://{slug}.system.internal</span>
        </div>

        {/* Right action */}
        <div className="shrink-0 text-gray-500 text-xs hidden sm:block">
          <FaRedoAlt className="hover:text-gray-300 transition-colors cursor-pointer" />
        </div>
      </div>

      {/* Viewport: Fixed max-height, object-contain, never stretched */}
      <div className="max-h-[480px] bg-[#03060c] flex items-center justify-center p-2 sm:p-4 overflow-hidden">
        {hasVideo ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-auto h-auto max-h-[440px] max-w-full object-contain rounded-lg shadow-lg"
            onError={() => setHasError(true)}
          >
            {project.detailWebm && (
              <source src={project.detailWebm} type="video/webm" />
            )}
            {project.detailVideo && (
              <source src={project.detailVideo} type="video/mp4" />
            )}
            {project.detailImage && (
              <img
                src={project.detailImage}
                alt={project.title}
                loading="lazy"
                className="w-auto h-auto max-h-[440px] max-w-full object-contain rounded-lg"
              />
            )}
          </video>
        ) : (
          <img
            src={project.detailImage || project.image}
            alt={project.title}
            loading="lazy"
            onError={() => setHasError(true)}
            className="w-auto h-auto max-h-[440px] max-w-full object-contain rounded-lg shadow-lg"
          />
        )}
      </div>
    </div>
  );
}

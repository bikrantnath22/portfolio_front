import { awards } from "../data/resumeData";
import { TrophyOutlined } from "@ant-design/icons";

const AchievementsSection = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 font-body text-white mt-16">
      {/* Eyebrow + Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
          RECOGNITION &amp; HONORS
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white tracking-tight mt-1">
          Awards &amp; Competitions
        </h2>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {awards.map((award) => (
          <div
            key={award.id}
            className="card-unified p-6 md:p-8 rounded-2xl group relative overflow-hidden transition-all duration-300"
          >
            {/* Top accent highlight on hover */}
            <div
              className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.7), transparent)",
              }}
            />

            <div className="flex items-start gap-4 md:gap-5">
              {/* Trophy icon */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-cyan-950/40 border border-cyan-400/30 text-cyan-400 text-lg shadow-[0_0_12px_rgba(34,211,238,0.15)]">
                <TrophyOutlined />
              </div>

              <div className="flex-1">
                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {award.badge && (
                    <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-400/30 px-2.5 py-0.5 rounded-md">
                      {award.badge}
                    </span>
                  )}
                  {award.category && (
                    <span className="text-[11px] font-mono text-gray-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md">
                      {award.category}
                    </span>
                  )}
                  <span className="text-[11px] font-mono text-gray-500 ml-auto">
                    {award.year}
                  </span>
                </div>

                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 mb-2">
                  <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-heading">
                    {award.title}
                  </h3>
                </div>

                <p className="text-cyan-400 text-xs font-mono mb-3">
                  {award.organization}
                </p>

                <p className="text-gray-300 text-sm leading-relaxed max-w-[65ch]">
                  {award.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;

import { GithubOutlined, LinkedinOutlined, MailOutlined, ArrowUpOutlined } from "@ant-design/icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full py-16 px-4 sm:px-6 border-t border-white/10 font-body text-white bg-[#020409]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Name + Short Line */}
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2.5 justify-center md:justify-start">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-400/30 font-heading">
              BN
            </div>
            <h3 className="text-base font-bold font-heading text-white">
              Bikrant Nath
            </h3>
          </div>
          <p className="text-xs text-gray-400 mt-1 max-w-[50ch]">
            AI/ML &amp; Full-Stack Engineer · M.Tech CSE, Tezpur University
          </p>
        </div>

        {/* Center: Clean Icon/Text Links */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <a
            href="mailto:bikrantnath22@gmail.com"
            className="flex items-center gap-1.5 text-gray-400 hover:text-cyan-300 transition-colors px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
          >
            <MailOutlined className="text-cyan-400" />
            <span>Email</span>
          </a>
          <a
            href="https://github.com/bikrantnath22"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gray-400 hover:text-cyan-300 transition-colors px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
          >
            <GithubOutlined className="text-cyan-400" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/bikrant-nath-7747781a7/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gray-400 hover:text-cyan-300 transition-colors px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
          >
            <LinkedinOutlined className="text-cyan-400" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Right: Back to top */}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer"
          title="Scroll to top"
        >
          <span>Back to top</span>
          <ArrowUpOutlined className="text-[10px]" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 text-center text-[11px] font-mono text-gray-500">
        © {new Date().getFullYear()} Bikrant Nath. Dark technical portfolio.
      </div>
    </footer>
  );
}

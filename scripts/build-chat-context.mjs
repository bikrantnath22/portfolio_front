import * as esbuild from "esbuild";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project paths
const clientDir = path.resolve(__dirname, "..");
const projectsFile = path.resolve(clientDir, "src/data/projects.jsx");
const resumeFile = path.resolve(clientDir, "src/data/resumeData.js");
const outputFile = path.resolve(clientDir, "src/data/chatContext.json");

async function buildChatContext() {
  console.log("Generating chatContext.json from projects.jsx and resumeData.js...");

  // Read projectsFile to extract all imported icon names
  const rawCode = fs.readFileSync(projectsFile, "utf8");
  const iconImportsMatch = rawCode.match(/import\s*\{([\s\S]*?)\}\s*from\s*["']react-icons\/[^"']+["']/g) || [];
  const iconNames = new Set();
  for (const imp of iconImportsMatch) {
    const inside = imp.replace(/import\s*\{/, "").replace(/\}\s*from[\s\S]*/, "");
    inside.split(",").forEach((name) => {
      const clean = name.trim();
      if (clean) iconNames.add(clean);
    });
  }

  const exportStubStatements = Array.from(iconNames)
    .map((name) => `export const ${name} = () => null;`)
    .join("\n") + "\nexport default new Proxy({}, { get: () => () => null });";

  // 1. Bundle projects.jsx using esbuild with react-icons stubbed
  const stubIconsPlugin = {
    name: "stub-icons",
    setup(build) {
      build.onResolve({ filter: /^react-icons/ }, (args) => {
        return { path: args.path, namespace: "stub-icons" };
      });
      build.onLoad({ filter: /.*/, namespace: "stub-icons" }, () => {
        return {
          contents: exportStubStatements,
          loader: "js",
        };
      });
    },
  };

  const bundled = await esbuild.build({
    entryPoints: [projectsFile],
    bundle: true,
    write: false,
    format: "esm",
    jsx: "automatic",
    plugins: [stubIconsPlugin],
    platform: "node",
  });

  const bundledJs = bundled.outputFiles[0].text;
  const base64Js = Buffer.from(bundledJs).toString("base64");
  const dataUri = `data:text/javascript;base64,${base64Js}`;
  const projectsModule = await import(dataUri);
  const rawProjects = projectsModule.projects || [];

  // 2. Import resumeData.js
  const resumeModule = await import(`file://${resumeFile}`);
  const { experience = [], education = [], awards = [], professionalSummary = "" } = resumeModule;

  // 3. Clean project data
  const projects = rawProjects.map((p) => ({
    id: p.id,
    rank: p.rank || null,
    status: p.status || "Finished",
    featured: Boolean(p.featured),
    title: p.title,
    tagline: p.tagline || "",
    role: p.role || "",
    year: p.year || "",
    metric: p.metric || null,
    description: p.description || "",
    highlights: Array.isArray(p.highlights) ? p.highlights : [],
    stack: (p.stack || []).map((s) => (typeof s === "string" ? s : s.name)).filter(Boolean),
    github: p.github || "",
    live: p.live || "",
    mediaType: p.mediaType || "browser",
  }));

  // 4. Contact and author info
  const contact = {
    name: "Bikrant Nath",
    title: "AI/ML Engineer & Full-Stack Developer",
    degree: "M.Tech in Computer Science & Engineering, Tezpur University (2024–2026)",
    email: "bikrantnath4@gmail.com",
    phone: "+91 9101121475",
    location: "Guwahati, Assam, India (open to remote & relocation)",
    github: "https://github.com/bikrantnath22",
    linkedin: "https://www.linkedin.com/in/bikrant-nath-7747781a7/",
  };

  // 5. Assemble context object
  const chatContext = {
    generatedAt: new Date().toISOString(),
    author: contact,
    professionalSummary,
    experience: experience.map((e) => ({
      id: e.id,
      role: e.role,
      company: e.company,
      duration: e.duration,
      location: e.location || "",
      highlights: e.highlights || [],
      tech: e.tech || [],
    })),
    education: education.map((ed) => ({
      id: ed.id,
      degree: ed.degree,
      institution: ed.institution,
      duration: ed.duration,
      location: ed.location,
      cgpa: ed.cgpa,
    })),
    awards: awards.map((a) => ({
      id: a.id,
      title: a.title,
      organization: a.organization,
      year: a.year,
      badge: a.badge || "",
      category: a.category || "",
      description: a.description || "",
    })),
    projects,
  };

  fs.writeFileSync(outputFile, JSON.stringify(chatContext, null, 2), "utf8");
  console.log(`Successfully wrote ${projects.length} projects and resume context to ${outputFile}`);
}

buildChatContext().catch((err) => {
  console.error("Failed to build chatContext.json:", err);
  process.exit(1);
});

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiPhp,
  SiMysql,
  SiFirebase,
  SiJavascript,
} from "react-icons/si";

const projects = [
  {
    id: 1,
    title: " Athaana – A Grocery Delivery App",
    description:
      "Built a full-stack eCommerce grocery platform with product listings, cart, authentication, checkout, and order tracking for a seamless customer experience. Designed a responsive React UI and developed scalable backend APIs with Node.js/Express and MongoDB",
    image: "/AthaanaPC.gif",
    stack: [
      { name: "React", icon: <SiReact className="text-blue-400" /> },
      { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss className="text-sky-400" />,
      },
    ],
  },
  {
    id: 2,
    title: "Learning-based Cognitive Assessment for Computer Literacy using Virtual Reality",
    description:
      "Designed a VR-based learning and assessment system for school students on Meta Quest, with a companion mobile/desktop app for progress tracking. Developed modules for quizzes and performance tracking, conducted comparative experiments showing higher engagement in VR, and proposed a hybrid model combining text-based theory with VR practical simulations for improved learning outcomes.",
    image:
      "/Vr.gif",
    stack: [
      { name: "React", icon: <SiReact className="text-blue-400" /> },
      { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss className="text-sky-400" />,
      },
    ],
  },
  {
    id: 3,
    title: "Animal Rescue Platform ",
    description:
      "Built a full-stack Animal Rescue Platform using React.js, Node.js (WebSockets), MongoDB, and Cloudinary, featuring real-time NGO matching with geolocation alerts and an admin dashboard for case tracking and analytics.",
    image: "/Animal.png",
      stack: [
      { name: "React", icon: <SiReact className="text-blue-400" /> },
      { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss className="text-sky-400" />,
      },
    ],
  },
  {
    id: 4,
    title: "Task Management System",
    description: "Built a full-stack platform using React.js, Node.js, and MongoDB that enables companies to create projects with deadlines, assign managers, implement role-based access, and provide an employee-to-manager messaging system with file attachments for seamless task management and communication.",
    image:
      "/Task.jpeg",
      stack: [
      { name: "React", icon: <SiReact className="text-blue-400" /> },
      { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
      
    ],
  },
 
];

const ProjectPage = () => {
  const [page, setPage] = useState(0);
  const projectsPerPage = 4;
  const topRef = useRef(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if ((page + 1) * projectsPerPage < projects.length) {
      setPage((prev) => prev + 1);
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openProject = (id) => {
    navigate(`/project/${id}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-16 px-6">
      <h1
        ref={topRef}
        className="text-5xl font-extrabold text-center bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-16 tracking-wide"
      >
        My Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects
          .slice(page * projectsPerPage, (page + 1) * projectsPerPage)
          .map((project, index) => (
            <motion.div
              key={`project-${page}-${index}`}
              className="group rounded-2xl bg-gradient-to-br from-transparent to-gray-950 
                         shadow-lg hover:shadow-green-500/50 transition-all duration-500 
                         flex flex-col overflow-hidden cursor-pointer border border-gray-800/50 hover:border-green-500/40"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              onClick={() => openProject(project.id)}
              whileHover={{ y: -8 }}
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full p-2 h-64 object-contain bg-black/20 rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 flex items-end p-4 
             opacity-0 group-hover:opacity-100 transition-all duration-500"
                >
                  <div
                    className="w-full bg-black/50 backdrop-blur-md rounded-md 
               p-3 transform translate-y-4 group-hover:translate-y-0 
               transition-all duration-500"
                  >
                    <p className="text-sm text-gray-200 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                  {project.title}
                </h2>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {project.stack.map((tech, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1 text-xs text-gray-300"
                    >
                      {tech.icon}
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
      </div>

      <div className="flex justify-center items-center gap-6 mt-14">
        {page > 0 && (
          <button
            onClick={handlePrev}
            className="flex items-center gap-2 px-6 py-2 rounded-full border border-green-500/60
                       hover:bg-green-500 hover:text-black text-green-400 font-medium transition-all duration-300 
                       shadow-md hover:shadow-green-500/40"
          >
            <ArrowLeftOutlined /> Previous
          </button>
        )}
        {(page + 1) * projectsPerPage < projects.length && (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2 rounded-full border border-green-500/60
                       hover:bg-green-500 hover:text-black text-green-400 font-medium transition-all duration-300 
                       shadow-md hover:shadow-green-500/40"
          >
            Next <ArrowRightOutlined />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;

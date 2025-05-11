import React, { useState, useRef } from "react";

import { motion } from "framer-motion";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import {
  FaJs,
  FaCuttlefish,
  FaPython,
  FaDatabase,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiMysql,
  SiMongodb,
  SiPostgresql,
  SiNextdotjs,
  SiTailwindcss,
} from "react-icons/si";

const projects = [
  {
    id: 1,
    title: "Project 1",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    techStack: ["React", "Node.js", "MongoDB", "Firebase"],
  },
  {
    id: 2,
    title: "Project 2",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    techStack: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 3,
    title: "Project 3",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    techStack: ["React", "Node.js", "MongoDB", "Firebase"],
  },
  {
    id: 4,
    title: "Project 4",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description: "Description for Project 4",
  },
  {
    id: 5,
    title: "Project 5",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description: "Description for Project 5",
  },
  {
    id: 6,
    title: "Project 6",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description: "Description for Project 6",
  },
  {
    id: 7,
    title: "Project 7",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description: "Description for Project 7",
  },
  {
    id: 8,
    title: "Project 8",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description: "Description for Project 8",
  },
  {
    id: 9,
    title: "Project 9",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description: "Description for Project 9",
  },
  {
    id: 10,
    title: "Project 10",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description: "Description for Project 10",
  },
];

const getTechIcon = (tech) => {
  switch (tech) {
    case "React":
      return <FaReact className="text-cyan-400 hover:text-cyan-500" />;
    case "Node.js":
      return <FaNodeJs className="text-green-600 hover:text-green-500" />;
    case "MongoDB":
      return <SiMongodb className="text-green-500 hover:text-green-600" />;
    case "Firebase":
      return <FaDatabase className="text-yellow-400 hover:text-yellow-500" />;
    default:
      return <FaJs className="text-yellow-300 hover:text-yellow-400" />;
  }
};

const ProjectPage = ({ setIsPaginating }) => {
  const [page, setPage] = useState(0);
  const projectsPerPage = 3;
  const topRef = useRef(null);

  const handleNext = () => {
    if ((page + 1) * projectsPerPage < projects.length) {
      setIsPaginating?.(true);
      setPage((prev) => prev + 1);
      setTimeout(() => {
        setIsPaginating?.(false);
        topRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setIsPaginating?.(true);
      setPage((prev) => prev - 1);
      setTimeout(() => {
        setIsPaginating?.(false);
        topRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

  return (
    <div className="w-full max-w-6xl">
      <div ref={topRef}>
        <div className="flex flex-col items-center justify-center text-white p-4  mx-auto">
          <div className="flex justify-between items-center w-full ">
            <h1 className="text-md md:mt-4 text-gray-200 font-extralight italic mt-4 ml-4">
              My Projects
            </h1>
          </div>
          <div className=" w-full ">
            {projects
              .slice(page * projectsPerPage, (page + 1) * projectsPerPage)
              .map((project, index) => (
                <motion.div
                  key={`project-${page}-${project.id}`}
                  className="flex flex-col md:flex-row justify-between rounded-lg shadow-lg p-6"
                  style={{ position: "relative" }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {index % 2 === 0 ? (
                    <>
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="md:h-64 object-cover md:w-2/3 rounded-sm w-full "
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                      <div className="w-full md:ml-6 ">
                        <h2 className="text-2xl font-semibold">
                          {project.title}
                        </h2>
                        <p className="text-gray-400 line-clamp-5 hover:line-clamp-none overflow-hidden hover:overflow-y-auto max-h-32 transition-all duration-300 ease-in-out scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent pr-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-4 mt-4 text-blue-400 items-center cursor-pointer">
                          {project?.techStack?.map((tech) => (
                            <div
                              key={tech}
                              className="flex items-center space-x-2 text-sm "
                            >
                              <span>{getTechIcon(tech)}</span>
                              <span className="text-gray-500">{tech}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex  mt-2">
                          <a
                            href={project.link}
                            className="text-blue-400 hover:text-blue-300 text-sm flex gap-2"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="hidden md:block">←</span> View
                            Project
                          </a>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full  mr-6 order-2 md:order-1">
                        <h2 className="text-2xl font-semibold md:text-right">
                          {project.title}
                        </h2>
                        <p className="text-gray-400 md:text-right line-clamp-5 hover:line-clamp-none overflow-hidden hover:overflow-y-auto max-h-32 transition-all duration-300 ease-in-out scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent pr-2">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-4 mt-4 text-blue-400 items-center md:justify-end cursor-pointer">
                          {project?.techStack?.map((tech) => (
                            <div
                              key={tech}
                              className="flex items-center space-x-2 text-sm"
                            >
                              <span>{getTechIcon(tech)}</span>
                              <span className="text-gray-500">{tech}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex md:justify-end mt-2">
                          <a
                            href={project.link}
                            className="text-blue-400 hover:text-blue-300 text-sm flex gap-2"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Project{" "}
                            <span className="hidden md:block">→</span>
                          </a>
                        </div>
                      </div>
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="md:h-64 object-cover md:w-2/3 rounded-sm w-full order-1 md:order-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </>
                  )}
                </motion.div>
              ))}
          </div>
          <div className="flex space-x-6 mt-4 text-sm text-gray-300 mb-6">
            {page > 0 && (
              <button
                onClick={handlePrev}
                className="hover:text-green-500 rounded-full"
              >
                <ArrowLeftOutlined /> <span>Previous</span>
              </button>
            )}
            {(page + 1) * projectsPerPage < projects.length && (
              <button
                onClick={handleNext}
                className="hover:text-green-500 rounded-full"
              >
                <span>Next</span> <ArrowRightOutlined />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;

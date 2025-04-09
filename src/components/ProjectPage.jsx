import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const projects = [
  {
    id: 1,
    title: "Project 1",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description: "Description for Project 1",
  },
  {
    id: 2,
    title: "Project 2",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description: "Description for Project 2",
  },
  {
    id: 3,
    title: "Project 3",
    image:
      "https://th.bing.com/th/id/OIP.5lgvHjtEF7VAX6sQVVszeQHaFe?rs=1&pid=ImgDetMain",
    link: "#",
    description: "Description for Project 3",
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
                  className="flex  justify-between rounded-lg shadow-lg p-6"
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
                        className="md:h-64 object-cover md:w-2/3 rounded-md w-1/2 "
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                      <div className="w-3/4 ml-6">
                        <h2 className="text-2xl font-semibold">
                          {project.title}
                        </h2>
                        <p className="text-gray-400">{project.description}</p>
                        <a
                          href={project.link}
                          className="mt-2 inline-block text-blue-400 hover:text-blue-300"
                        >
                          View Project
                        </a>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-3/4 mr-6">
                        <h2 className="text-2xl font-semibold text-right">
                          {project.title}
                        </h2>
                        <p className="text-gray-400 text-right">
                          {project.description}
                        </p>
                        <div className="flex justify-end">
                          <a
                            href={project.link}
                            className="text-blue-400 hover:text-blue-300 text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Project →
                          </a>
                        </div>
                      </div>
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="md:h-60 object-cover md:w-2/3 rounded-lg w-1/2"
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
          <div className="flex space-x-6 mt-4 text-sm text-gray-300">
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

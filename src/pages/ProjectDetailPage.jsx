import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiPhp,
  SiMysql,
  SiFirebase,
  SiJavascript,
  SiUnity, 
  
} from "react-icons/si";
import { FaCode } from "react-icons/fa";
const projects = [
  {
    id: 1,
    title: "Athaana – A Grocery Delivery App",
    description:
      "Developed a full-stack eCommerce grocery platform featuring product listings, cart, and order management, with secure user authentication, a seamless checkout system, and order tracking for smooth customer experience. Designed a fully responsive UI using React, and implemented backend APIs with Node.js/Express and MongoDB to ensure efficient performance and scalability.",
    image: "/athaana.gif",
    stack: [
          { name: "React", icon: <SiReact className="text-blue-400" /> },
          { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
          { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
          {
            name: "Tailwind CSS",
            icon: <SiTailwindcss className="text-sky-400" />,
          },
        ],
    github : "https://github.com/bikrantnath22/AthaanaProdMain" 
  },
  {
    id: 2,
    title: "Learning-based Cognitive Assessment for Computer Literacy using Virtual Reality",
    description:
      "Designed a VR-based learning and assessment system for school students on Meta Quest, with a companion mobile/desktop app for progress tracking. Developed modules for quizzes and performance tracking, conducted comparative experiments showing higher engagement in VR, and proposed a hybrid model combining text-based theory with VR practical simulations for improved learning outcomes",
    image: "/Vr.gif",
    stack: [
          { name: "React Native", icon: <SiReact className="text-blue-400" /> },
          { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
          { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
          {
            name: "Tailwind CSS",
            icon: <SiTailwindcss className="text-sky-400" />,
          },
          { name: "Unity", icon: <SiUnity className="text-gray-400" /> }, // Unity icon
  { name: "C#", icon: <FaCode className="text-purple-500" /> },  // C# icon
        ],
    github:"",
  },
  {
    id: 3,
    title: "Animal Rescue Platform ",
    description:
      "Developed a comprehensive full-stack Animal Rescue Platform leveraging React.js for the frontend, Node.js with WebSockets for real-time communication, MongoDB for data management, and Cloudinary for image storage. The platform enables users to report animals in need, while nearby NGOs receive real-time alerts using geolocation to ensure faster response times. Additionally, an admin dashboard was designed to provide detailed case tracking, analytics, and management tools, allowing for efficient coordination of rescue efforts, monitoring of NGO activities, and improved overall operational effectiveness. This system enhances collaboration, streamlines rescue operations, and ensures timely intervention for animal welfare.",
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
    github : "https://github.com/bikrantnath22/AnimalMain" 
  },
  
  {
    id: 4,
    title: "Task Management System",
    description: "Developed a comprehensive full-stack project management platform using React.js for the frontend and Node.js with MongoDB for the backend, enabling companies to efficiently create and manage projects with defined deadlines. The system incorporates role-based access control, allowing managers to delegate tasks, monitor progress, and ensure accountability across teams. Additionally, an integrated employee-to-manager messaging system with file attachment support was implemented, facilitating smooth and transparent communication within the organization. The platform emphasizes scalability, real-time task tracking, and intuitive UI design, ensuring teams can collaborate effectively while maintaining high productivity and streamlined project workflows.",
    image: "/Task.jpeg",
    stack: [
          { name: "React", icon: <SiReact className="text-blue-400" /> },
          { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
          { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
          
        ],
    github : "https://github.com/bikrantnath22/TAsk_manegment" 
  },
  
];

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return <div className="text-white text-center mt-20 text-xl">Project not found</div>;
  }

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto py-12 px-4 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.button
        onClick={() => navigate(-1)}
        className="mb-8 px-6 py-3 bg-green-500 rounded-full hover:bg-green-600 shadow-lg hover:shadow-green-400/40 transition-all font-semibold flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back
      </motion.button>

      <motion.h2
        className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent tracking-wide"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {project.title}
      </motion.h2>
      <div className="flex justify-between items-center mt-2 flex-wrap">
  {/* Left side: Tech stack */}
  <div className="flex gap-2 flex-wrap">
    {project.stack.map((tech, idx) => (
      <div
        key={idx}
        className="flex items-center gap-1 text-md text-gray-300"
      >
        {tech.icon}
        <span>{tech.name}</span>
      </div>
    ))}
  </div>

  {/* Right side: GitHub icon */}
  {project.github && (
    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-300 hover:text-green-400 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.304 3.492.997.107-.776.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.288-1.552 3.294-1.23 3.294-1.23.654 1.653.243 2.873.12 3.176.77.84 1.232 1.91 1.232 3.22 0 4.61-2.807 5.625-5.479 5.921.43.37.823 1.103.823 2.222v3.293c0 .319.218.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z"/>
      </svg>
    </a>
  )}
</div>


      <motion.div
        className="overflow-hidden rounded-xl mb-8"
        whileHover={{ scale: 1.03 }}
      >
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-[400px] object-contain rounded-xl mt-4"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>

      <motion.p
        className="text-gray-300 text-lg leading-relaxed whitespace-pre-line"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {project.description}
      </motion.p>
      
    </motion.div>
  );
};

export default ProjectDetailPage;

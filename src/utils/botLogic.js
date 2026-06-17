export const getBotResponse = (userInput) => {
  const input = userInput.toLowerCase();

  // Keyword maps
  const keywords = {
    greeting: ["hi", "hello", "hey", "who are you", "what can you do"],
    education: ["education", "college", "university", "degree", "mtech", "mca", "btech", "study", "studied", "tezpur", "tripura"],
    experience: ["experience", "internship", "work", "job", "intern", "fineworks"],
    projects: ["project", "projects", "portfolio", "built", "made", "dp-ctgan", "vr", "ai chat", "athaana", "rescue"],
    skills: ["skills", "technologies", "tech stack", "languages", "frameworks", "python", "react", "machine learning", "ai"],
    contact: ["contact", "email", "phone", "github", "linkedin", "reach", "hire"],
    resume: ["download", "resume", "cv"],
    rag: ["rag", "llm", "chat bot", "chatbot"],
    help: ["help", "how to ask", "what can i ask", "questions", "examples", "suggest", "guide"],
  };

  // Helper to count matches using word boundaries to prevent substring matching
  const countMatches = (category) => {
    return keywords[category].filter((kw) => {
      // Escape special characters in keyword
      const escapedKw = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Create a regex with word boundaries
      const regex = new RegExp(`\\b${escapedKw}\\b`, 'i');
      return regex.test(input);
    }).length;
  };

  const scores = {
    greeting: countMatches("greeting"),
    education: countMatches("education"),
    experience: countMatches("experience"),
    projects: countMatches("projects"),
    skills: countMatches("skills"),
    contact: countMatches("contact"),
    resume: countMatches("resume"),
    rag: countMatches("rag"),
    help: countMatches("help"),
  };

  // Find the category with the highest score
  let maxCategory = null;
  let maxScore = 0;

  // Prioritize checking in a specific order: specific topics first, then generic
  const priorityOrder = ["help", "projects", "skills", "experience", "education", "contact", "resume", "rag", "greeting"];

  for (const category of priorityOrder) {
    const score = scores[category];
    // If scores are equal, the higher priority category wins (since we check > not >=)
    // Wait, since we check priority order first, we should just keep the first one we find with maxScore
    // So if projects and greeting both have 1, projects will be checked first, maxScore becomes 1, and greeting (1 > 1) is false.
    if (score > maxScore) {
      maxScore = score;
      maxCategory = category;
    }
  }

  // Fallback if no keywords match
  if (maxScore === 0) {
    if (input.includes("name")) {
      return "My creator's name is Bikrant Nath. He is an AI/ML Engineer and Full-Stack Developer.";
    }
    if (input.includes("where") || input.includes("location")) {
      return "Bikrant is based in Guwahati, Assam, and is open to remote work or relocation.";
    }
    return "I'm Bikrant's AI Assistant! I know all about his resume, projects, education, and skills. Feel free to ask me questions like 'What is your education?', 'Tell me about your projects', or 'What is your email?'";
  }

  // Return responses based on category
  switch (maxCategory) {
    case "help":
      return "Here are some things you can ask me:\n• 'Tell me about your projects'\n• 'What are your AI skills?'\n• 'Where did you go to college?'\n• 'Tell me about Athaana'\n• 'What did you do at Fineworks?'\n• 'How can I contact you?'";

    case "greeting":
      return "Hello! I am Bikrant's Resume Chatbot. I can tell you all about his AI/ML experience, Full-Stack projects, education, and contact details. Type 'help' to see example questions!";
    
    case "education":
      return "Bikrant is currently pursuing his M.Tech in Computer Science & Engineering at Tezpur University (2024–2026) with a CGPA of 7.28/10 (till 3rd semester). Previously, he completed his MCA from Tripura University (2022–2024) with a 7.71 CGPA.";
    
    case "experience":
      return "Bikrant worked as a Software Development Intern at Fineworks Media & Solution Technologies (Jan-Jul 2022). He built a full-stack hotel booking platform using React, Node.js, and MongoDB, and designed RESTful APIs for inventory tracking.";
    
    case "projects":
      if (input.includes("vr") || input.includes("virtual")) {
        return "He designed a VR-based cognitive assessment system for school students using Meta Quest (Unity, C#) with a companion React Native app for teachers.";
      }
      if (input.includes("dp") || input.includes("ctgan") || input.includes("data")) {
        return "He built DP-CTGAN, a differentially private synthetic data generation pipeline using PyTorch and Opacus, evaluating it across real-world datasets with formal DP guarantees.";
      }
      if (input.includes("ai") || input.includes("ml") || input.includes("chat")) {
        return "He built an AI Chat Agent that replicates human messaging styles using LLMs and memory. He also worked on DP-CTGAN using PyTorch for privacy-preserving AI!";
      }
      if (input.includes("athaana") || input.includes("grocery")) {
        return "Athaana is a production full-stack grocery eCommerce platform Bikrant developed for a local startup in Nalbari. It features product listings, user authentication, checkout flow, and live order tracking built with React, Node.js, Express, and MongoDB.";
      }
      if (input.includes("animal") || input.includes("rescue")) {
        return "He built a full-stack NGO-facing Animal Rescue Platform with React and Node.js. It features real-time geolocation matching, WebSockets for alert dispatch, and an admin dashboard, significantly reducing manual coordination overhead.";
      }
      if (input.includes("vastramaniaa") || input.includes("shopify") || input.includes("clothing")) {
        return "Vastramaniaa is a Shopify storefront he customized for an online clothing brand, implementing Liquid templates for product pages, collections, and custom UI enhancements.";
      }
      return "Bikrant has built several awesome projects!\n• DP-CTGAN for Privacy-Preserving Data Generation\n• VR Cognitive Assessment Apps\n• An AI Chat Agent with memory\n• Full-Stack apps like an Animal Rescue Platform and Athaana (Grocery eCommerce).\nAsk about any specific one!";
    
    case "skills":
      return "Bikrant's technical skills include:\n• AI/ML: PyTorch, Opacus, GANs, LLMs, RAG, Prompt Engineering.\n• Languages: Python, JavaScript, Java, C#, C++.\n• Web: React, Next.js, Node.js, Express, MongoDB, Tailwind.\n• Cybersecurity basics: Penetration testing, Nmap, Wireshark.";
    
    case "contact":
      return "You can reach Bikrant at bikrantnath4@gmail.com, or call him at +91 9101121475. You can also find him on GitHub (@bikrantnath22) or LinkedIn.";
    
    case "resume":
      return "You can download his full CV by clicking the 'Download CV' button in the Profile section of this website!";
    
    case "rag":
      return "I was built to simulate a RAG (Retrieval-Augmented Generation) bot! I use a smart intent-matching algorithm to instantly parse your questions and retrieve the perfect information from Bikrant's resume.";
    
    default:
      return "I have lots of info about Bikrant's resume. Try asking about his experience, education, or projects!";
  }
};

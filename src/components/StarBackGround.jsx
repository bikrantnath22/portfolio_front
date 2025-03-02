import { useEffect } from "react";
import "tailwindcss/tailwind.css";

const StarsBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById("starsCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const stars = [];

    let count = window.innerWidth <= 800 ? 80 : 100;
    for (let i = 0; i < count; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const velocityX = (Math.random() - 0.5) * 0.5;
      const velocityY = (Math.random() - 0.5) * 0.6;
      const size = Math.random() * 2 + 1;
      const opacity = Math.random() * 0.15 + 0.3; // Opacity between 0.1 - 0.3
      stars.push({ x, y, velocityX, velocityY, size, opacity });
    }

    const animate = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgb(10, 10, 10)");
      gradient.addColorStop(1, "rgb(10, 10, 25)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.x += star.velocityX;
        star.y += star.velocityY;

        if (star.x < 0) star.x = canvas.width;
        else if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        else if (star.y > canvas.height) star.y = 0;

        ctx.globalAlpha = star.opacity; // Lower opacity (0.1 - 0.3)
        ctx.beginPath();
        const isGreen = Math.random() < 0.2; 
        ctx.fillStyle = isGreen ? "rgba(57, 255, 20, 0.7)" : "rgba(255, 255, 255, 0.7)"; // Softer colors
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1; // Reset opacity after drawing each star
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return <canvas id="starsCanvas" className="fixed top-0 left-0 w-full h-full -z-10"></canvas>;
}

export default StarsBackground;

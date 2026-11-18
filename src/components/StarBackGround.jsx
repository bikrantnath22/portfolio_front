import { useEffect, useRef, useState } from "react";

const StarsBackground = () => {
  const canvasRef = useRef(null);
  const [opacity, setOpacity] = useState(0);

  // Fade in stars only as user scrolls down past the 3D hero
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      const progress = Math.min(1, Math.max(0, (window.scrollY - 80) / (heroHeight - 80)));
      setOpacity(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Pre-render star glows (Single Cyan Accent + White)
    const colors = ["34, 211, 238", "255, 255, 255"];
    const glowCache = {};

    colors.forEach((color) => {
      const gCanvas = document.createElement("canvas");
      const gSize = 20;
      gCanvas.width = gSize;
      gCanvas.height = gSize;
      const gCtx = gCanvas.getContext("2d");

      const grad = gCtx.createRadialGradient(
        gSize / 2,
        gSize / 2,
        0,
        gSize / 2,
        gSize / 2,
        gSize / 2
      );
      grad.addColorStop(0, `rgba(${color}, 1)`);
      grad.addColorStop(1, `rgba(${color}, 0)`);
      gCtx.fillStyle = grad;
      gCtx.fillRect(0, 0, gSize, gSize);
      glowCache[color] = gCanvas;
    });

    // Create lightweight stars
    const count = window.innerWidth <= 800 ? 50 : 90;
    const stars = [];
    for (let i = 0; i < count; i++) {
      const isCyan = Math.random() < 0.2;
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.5 + 0.5,
        baseOpacity: Math.random() * 0.4 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        color: isCyan ? "34, 211, 238" : "255, 255, 255",
        glowSize: Math.random() * 3 + 1,
      });
    }

    let frame = 0;
    let animId;

    const animate = () => {
      frame++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        const currentOpacity =
          star.baseOpacity +
          Math.sin(frame * star.twinkleSpeed + star.twinklePhase) * 0.2;

        if (star.size > 1.2 && glowCache[star.color]) {
          const gSize = star.glowSize * 4;
          ctx.globalAlpha = Math.max(0, currentOpacity * 0.6);
          ctx.drawImage(
            glowCache[star.color],
            star.x - gSize / 2,
            star.y - gSize / 2,
            gSize,
            gSize
          );
        }

        ctx.globalAlpha = Math.max(0, currentOpacity);
        ctx.fillStyle = `rgb(${star.color})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 transition-opacity duration-700 ease-out"
      style={{ opacity }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
};

export default StarsBackground;

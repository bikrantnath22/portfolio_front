import { useEffect, useRef } from "react";

const StarsBackground = () => {
  const canvasRef = useRef(null);

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

    // Create stars with FIXED colors (no per-frame randomization)
    const count = window.innerWidth <= 800 ? 70 : 120;
    const stars = [];
    for (let i = 0; i < count; i++) {
      const isGreen = Math.random() < 0.15;
      const isCyan = Math.random() < 0.1;
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.8 + 0.5,
        baseOpacity: Math.random() * 0.4 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        color: isGreen
          ? "57, 255, 20"
          : isCyan
          ? "6, 182, 212"
          : "255, 255, 255",
        glowSize: Math.random() * 3 + 1,
      });
    }

    // Shooting stars
    const shootingStars = [];
    const createShootingStar = () => {
      if (shootingStars.length < 2 && Math.random() < 0.003) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height * 0.4;
        shootingStars.push({
          x: startX,
          y: startY,
          length: Math.random() * 80 + 50,
          speed: Math.random() * 8 + 6,
          angle: (Math.random() * 30 + 20) * (Math.PI / 180),
          opacity: 1,
          life: 1,
          decay: Math.random() * 0.015 + 0.01,
        });
      }
    };

    let frame = 0;
    const animate = () => {
      frame++;

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgb(5, 5, 15)");
      gradient.addColorStop(0.5, "rgb(8, 8, 20)");
      gradient.addColorStop(1, "rgb(5, 5, 18)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars with twinkle + glow
      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = canvas.width;
        else if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        else if (star.y > canvas.height) star.y = 0;

        // Twinkle effect
        const twinkle =
          Math.sin(frame * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
        const opacity = star.baseOpacity * twinkle;

        // Outer glow
        const glowGradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.glowSize * 3
        );
        glowGradient.addColorStop(
          0,
          `rgba(${star.color}, ${opacity * 0.4})`
        );
        glowGradient.addColorStop(1, `rgba(${star.color}, 0)`);
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.glowSize * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core star
        ctx.globalAlpha = opacity;
        ctx.fillStyle = `rgba(${star.color}, 1)`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Shooting stars
      createShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life -= s.decay;
        s.opacity = s.life;

        if (s.life <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }

        // Draw shooting star trail
        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const trailGradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        trailGradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        trailGradient.addColorStop(0.7, `rgba(180, 230, 255, ${s.opacity * 0.4})`);
        trailGradient.addColorStop(1, `rgba(255, 255, 255, ${s.opacity * 0.9})`);

        ctx.strokeStyle = trailGradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        const headGlow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 4);
        headGlow.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
        headGlow.addColorStop(1, `rgba(180, 230, 255, 0)`);
        ctx.fillStyle = headGlow;
        ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-screen -z-10"
      />
      {/* Nebula overlay */}
      <div
        className="fixed inset-0 -z-[9] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 30%, rgba(88, 28, 135, 0.08) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 80% 70%, rgba(6, 95, 124, 0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(34, 197, 94, 0.03) 0%, transparent 60%)
          `,
        }}
      />
    </>
  );
};

export default StarsBackground;

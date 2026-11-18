import { lazy, Suspense, useEffect, useState } from "react";

const HeroSceneLazy = lazy(() => import("./three/HeroScene"));

function checkWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function StaticRadialFallback() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        background:
          "radial-gradient(circle at 65% 35%, rgba(34, 211, 238, 0.14) 0%, rgba(244, 63, 94, 0.06) 35%, transparent 70%)",
      }}
    />
  );
}

export default function HeroCanvas({ containerRef }) {
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    const evaluateCapabilities = () => {
      // 1. No WebGL
      if (!checkWebGL()) return false;

      // 2. Prefers reduced motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return false;
      }

      // 3. Low hardware concurrency (<= 4 cores)
      if (
        typeof navigator !== "undefined" &&
        navigator.hardwareConcurrency != null &&
        navigator.hardwareConcurrency <= 4
      ) {
        return false;
      }

      // 4. Viewport under 640px (mobile)
      if (window.innerWidth < 640) {
        return false;
      }

      return true;
    };

    setCanRender3D(evaluateCapabilities());

    const handleResize = () => {
      setCanRender3D(evaluateCapabilities());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!canRender3D) {
    return <StaticRadialFallback />;
  }

  return (
    <Suspense fallback={<StaticRadialFallback />}>
      <HeroSceneLazy containerRef={containerRef} />
    </Suspense>
  );
}

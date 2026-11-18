import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Pulse particle vertex shader: travels along synapses from left to right
const pulseVertexShader = `
  attribute vec3 aStart;
  attribute vec3 aEnd;
  attribute float aSpeed;
  attribute float aPhase;
  attribute float aSize;

  uniform float uTime;
  uniform float uPixelRatio;

  varying float vProgress;

  void main() {
    // Travel progression along synapse [0.0 to 1.0]
    float t = fract(uTime * aSpeed + aPhase);
    vProgress = t;

    // Linear interpolation between connection endpoints
    vec3 pos = mix(aStart, aEnd, t);

    // Subtle natural arc in Y for organic energy flow
    pos.y += sin(t * 3.14159265) * 0.06;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Pulse size expands and fades out near ends
    float pulseEnvelope = sin(t * 3.14159265);
    gl_PointSize = aSize * (0.8 + pulseEnvelope * 1.2) * (260.0 / -mvPosition.z) * uPixelRatio;
  }
`;

const pulseFragmentShader = `
  uniform vec3 uColor;
  varying float vProgress;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    // Soft glowing light packet
    float alpha = smoothstep(0.5, 0.02, dist);
    float pulseEnvelope = sin(vProgress * 3.14159265);
    gl_FragColor = vec4(uColor, alpha * pulseEnvelope * 0.95);
  }
`;

// Node glow vertex & fragment shader
const nodeVertexShader = `
  attribute float aSize;
  uniform float uTime;
  uniform float uPixelRatio;

  void main() {
    vec3 pos = position;
    // Micro breathing idle
    pos.y += sin(uTime * 1.2 + position.x * 2.0) * 0.02;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    gl_PointSize = aSize * (300.0 / -mvPosition.z) * uPixelRatio;
  }
`;

const nodeFragmentShader = `
  uniform vec3 uColor;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    // Core + outer bloom glow
    float core = smoothstep(0.12, 0.0, dist);
    float halo = smoothstep(0.5, 0.05, dist) * 0.65;
    gl_FragColor = vec4(uColor, (core + halo) * 0.9);
  }
`;

function createLabelSprite(text) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "rgba(34, 211, 238, 0.45)";
  ctx.font = "bold 20px 'Space Grotesk', system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 128, 32);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const sprite = new THREE.Sprite(material);
  sprite.scale.set(1.6, 0.4, 1);
  return sprite;
}

function NeuralNetworkScene({ scrollProgress }) {
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
  const nodeMaterialRef = useRef();
  const pulseMaterialRef = useRef();

  // Color definition: Accent Cyan (#22d3ee)
  const accentColor = useMemo(() => new THREE.Color("#22d3ee"), []);

  // Neural network architecture: 3 layers (Data, Model, Product)
  const networkData = useMemo(() => {
    // Desktop: 8 -> 12 -> 6. Mobile: 5 -> 7 -> 4
    const layer1Count = isDesktop ? 8 : 5;
    const layer2Count = isDesktop ? 12 : 7;
    const layer3Count = isDesktop ? 6 : 4;

    const layer1X = isDesktop ? -4.4 : -2.8;
    const layer2X = 0.0;
    const layer3X = isDesktop ? 4.4 : 2.8;

    const nodes = [];
    const layer1Nodes = [];
    const layer2Nodes = [];
    const layer3Nodes = [];

    // Layer 1 (Data)
    for (let i = 0; i < layer1Count; i++) {
      const y = ((i / (layer1Count - 1)) - 0.5) * (isDesktop ? 5.2 : 4.0);
      const z = (Math.sin(i * 1.5) - 0.5) * 0.8;
      const pos = [layer1X, y, z];
      nodes.push(pos);
      layer1Nodes.push(pos);
    }

    // Layer 2 (Model)
    for (let i = 0; i < layer2Count; i++) {
      const y = ((i / (layer2Count - 1)) - 0.5) * (isDesktop ? 6.4 : 4.8);
      const z = (Math.cos(i * 1.3) - 0.5) * 1.2;
      const pos = [layer2X, y, z];
      nodes.push(pos);
      layer2Nodes.push(pos);
    }

    // Layer 3 (Product)
    for (let i = 0; i < layer3Count; i++) {
      const y = ((i / (layer3Count - 1)) - 0.5) * (isDesktop ? 4.6 : 3.6);
      const z = (Math.sin(i * 1.7) - 0.5) * 0.8;
      const pos = [layer3X, y, z];
      nodes.push(pos);
      layer3Nodes.push(pos);
    }

    // Connections (Synapses)
    const linePositions = [];
    const connections = [];

    // Connect Layer 1 -> Layer 2
    layer1Nodes.forEach((start) => {
      layer2Nodes.forEach((end, idx2) => {
        // Form a dense but clean connectivity mesh
        if (Math.abs(start[1] - end[1]) < 3.2 || idx2 % 2 === 0) {
          linePositions.push(...start, ...end);
          connections.push({ start, end });
        }
      });
    });

    // Connect Layer 2 -> Layer 3
    layer2Nodes.forEach((start, idx2) => {
      layer3Nodes.forEach((end) => {
        if (Math.abs(start[1] - end[1]) < 3.2 || idx2 % 2 === 0) {
          linePositions.push(...start, ...end);
          connections.push({ start, end });
        }
      });
    });

    // Node attribute buffers
    const nodePositions = new Float32Array(nodes.length * 3);
    const nodeSizes = new Float32Array(nodes.length);
    nodes.forEach((pos, idx) => {
      nodePositions[idx * 3] = pos[0];
      nodePositions[idx * 3 + 1] = pos[1];
      nodePositions[idx * 3 + 2] = pos[2];
      nodeSizes[idx] = isDesktop ? 2.8 : 2.2;
    });

    // Continuous pulses along connections
    // Allocate ~80 pulses traveling smoothly
    const pulseCount = isDesktop ? 90 : 45;
    const pStart = new Float32Array(pulseCount * 3);
    const pEnd = new Float32Array(pulseCount * 3);
    const pSpeed = new Float32Array(pulseCount);
    const pPhase = new Float32Array(pulseCount);
    const pSize = new Float32Array(pulseCount);

    for (let i = 0; i < pulseCount; i++) {
      const conn = connections[i % connections.length];
      pStart[i * 3] = conn.start[0];
      pStart[i * 3 + 1] = conn.start[1];
      pStart[i * 3 + 2] = conn.start[2];

      pEnd[i * 3] = conn.end[0];
      pEnd[i * 3 + 1] = conn.end[1];
      pEnd[i * 3 + 2] = conn.end[2];

      pSpeed[i] = 0.25 + (i % 5) * 0.08; // Diverse speeds
      pPhase[i] = (i / pulseCount);
      pSize[i] = isDesktop ? 2.6 : 2.0;
    }

    return {
      nodePositions,
      nodeSizes,
      linePositions: new Float32Array(linePositions),
      pStart,
      pEnd,
      pSpeed,
      pPhase,
      pSize,
      layer1X,
      layer2X,
      layer3X,
    };
  }, [isDesktop]);

  // Labels: Data, Model, Product
  const labelSprites = useMemo(() => {
    const s1 = createLabelSprite("DATA");
    s1.position.set(networkData.layer1X, -3.8, 0);

    const s2 = createLabelSprite("MODEL");
    s2.position.set(networkData.layer2X, -4.2, 0);

    const s3 = createLabelSprite("PRODUCT");
    s3.position.set(networkData.layer3X, -3.8, 0);

    return [s1, s2, s3];
  }, [networkData]);

  // Uniforms
  const nodeUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: accentColor },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 1.5) },
    }),
    [accentColor]
  );

  const pulseUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: accentColor },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 1.5) },
    }),
    [accentColor]
  );

  useFrame((state, delta) => {
    if (nodeMaterialRef.current) {
      nodeMaterialRef.current.uniforms.uTime.value += delta;
    }
    if (pulseMaterialRef.current) {
      pulseMaterialRef.current.uniforms.uTime.value += delta;
    }

    // Subtle idle camera drift
    const driftX = Math.sin(state.clock.elapsedTime * 0.35) * 0.15;
    const driftY = Math.cos(state.clock.elapsedTime * 0.25) * 0.1;

    // Mouse parallax
    const targetX = state.pointer.x * 0.6 + driftX;
    const targetY = state.pointer.y * 0.35 + driftY;

    // On scroll: camera gently moves forward through the neural network layers
    const baseZ = isDesktop ? 7.2 : 8.0;
    const targetZ = baseZ - scrollProgress * 3.2;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.04);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.04);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      {/* Neural Network Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[networkData.nodePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-aSize"
            args={[networkData.nodeSizes, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={nodeMaterialRef}
          vertexShader={nodeVertexShader}
          fragmentShader={nodeFragmentShader}
          uniforms={nodeUniforms}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connecting Synapses (Thin translucent lines) */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[networkData.linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#22d3ee"
          transparent={true}
          opacity={0.16}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Travelling Energy Pulses along Synapses */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[networkData.pStart, 3]}
          />
          <bufferAttribute
            attach="attributes-aStart"
            args={[networkData.pStart, 3]}
          />
          <bufferAttribute
            attach="attributes-aEnd"
            args={[networkData.pEnd, 3]}
          />
          <bufferAttribute
            attach="attributes-aSpeed"
            args={[networkData.pSpeed, 1]}
          />
          <bufferAttribute
            attach="attributes-aPhase"
            args={[networkData.pPhase, 1]}
          />
          <bufferAttribute
            attach="attributes-aSize"
            args={[networkData.pSize, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={pulseMaterialRef}
          vertexShader={pulseVertexShader}
          fragmentShader={pulseFragmentShader}
          uniforms={pulseUniforms}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Layer Labels (Data -> Model -> Product) */}
      {labelSprites.map((sprite, idx) => (
        <primitive key={idx} object={sprite} />
      ))}
    </group>
  );
}

export default function HeroScene({ containerRef }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isRendering, setIsRendering] = useState(true);

  // Monitor visibility (IntersectionObserver + Document Visibility)
  useEffect(() => {
    const target = containerRef?.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsRendering(entry.isIntersecting && !document.hidden);
      },
      { threshold: 0.05 }
    );

    observer.observe(target);

    const handleVisibility = () => {
      if (document.hidden) {
        setIsRendering(false);
      } else if (target) {
        const rect = target.getBoundingClientRect();
        setIsRendering(rect.bottom > 0 && rect.top < window.innerHeight);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [containerRef]);

  // Track hero scroll progress (0 to 1)
  useEffect(() => {
    const handleScroll = () => {
      const target = containerRef?.current;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const heroHeight = rect.height || window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / heroHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: true,
        }}
        frameloop={isRendering ? "always" : "never"}
        className="w-full h-full"
      >
        <NeuralNetworkScene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

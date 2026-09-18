import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";
import { useMediaQuery } from "../../hooks/useMediaQuery.js";
import { isWebGLAvailable } from "../../lib/webgl.js";
import { FoodSceneFallback } from "./FoodSceneFallback.jsx";

/** A single procedural piece of "food" — no external models, just primitives + color. */
function FoodItem({ position, color, geometry, scale = 1, speed = 1, reduced }) {
  return (
    <Float
      speed={reduced ? 0 : speed}
      rotationIntensity={reduced ? 0 : 0.6}
      floatIntensity={reduced ? 0 : 1.4}
    >
      <mesh position={position} scale={scale} castShadow>
        {geometry}
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.02} />
      </mesh>
    </Float>
  );
}

function Composition({ pointerRef, scrollRef, reduced, simplified }) {
  const group = useRef();

  useFrame(() => {
    if (!group.current || reduced) return;
    const { x, y } = pointerRef.current;
    group.current.rotation.y += (x * 0.3 - group.current.rotation.y) * 0.035;
    group.current.rotation.x += (-y * 0.15 - group.current.rotation.x) * 0.035;
    group.current.position.y += (scrollRef.current * -0.6 - group.current.position.y) * 0.06;
  });

  const items = [
    // Orange
    { position: [-1.6, 0.7, 0.3], color: "#FF7A33", geometry: <sphereGeometry args={[0.5, 32, 32]} />, speed: 1.1 },
    // Tomato
    { position: [1.3, 1.1, -0.3], color: "#E5432B", geometry: <sphereGeometry args={[0.42, 32, 32]} />, speed: 1.3 },
    // Lemon
    { position: [0.2, 1.6, 0.5], color: "#F6C453", geometry: <sphereGeometry args={[0.34, 24, 24]} />, scale: [1, 0.8, 0.8], speed: 0.9 },
    // Avocado body
    { position: [-0.9, -0.3, 0.6], color: "#6FA36B", geometry: <sphereGeometry args={[0.46, 24, 24]} />, scale: [0.85, 1.15, 0.85], speed: 1.0 },
    // Broccoli
    { position: [1.6, -0.2, 0.1], color: "#3F7D46", geometry: <icosahedronGeometry args={[0.4, 0]} />, speed: 1.4 },
    // Carrot
    { position: [0.6, -0.9, 0.4], color: "#FF5A1F", geometry: <coneGeometry args={[0.22, 0.9, 12]} />, speed: 0.8 },
    // Pepper
    { position: [-1.7, -1.0, -0.2], color: "#D8440F", geometry: <sphereGeometry args={[0.36, 20, 20]} />, scale: [0.9, 1.25, 0.9], speed: 1.2 },
  ];

  const detailItems = [
    // Herb sprig
    { position: [0.9, 0.3, 0.8], color: "#3F7D46", geometry: <coneGeometry args={[0.08, 0.35, 8]} />, speed: 1.6 },
    // Plate / grounding disc
    { position: [-0.2, -1.7, -0.4], color: "#F1E6D3", geometry: <cylinderGeometry args={[1.1, 1.1, 0.12, 40]} />, speed: 0.5 },
  ];

  const allItems = simplified ? items.slice(0, 5) : [...items, ...detailItems];

  return (
    <group ref={group}>
      {allItems.map((item, index) => (
        <FoodItem key={index} {...item} reduced={reduced} />
      ))}
    </group>
  );
}

/**
 * The hero's 3D food composition. Renders a lighter version on small
 * viewports and falls back to a static SVG when WebGL is unavailable.
 */
export function FoodScene() {
  const reduced = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [webglOk] = useState(() => isWebGLAvailable());
  const pointerRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    if (!webglOk || reduced) return undefined;
    function handleScroll() {
      scrollRef.current = Math.min(window.scrollY / window.innerHeight, 1.5);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [webglOk, reduced]);

  if (!webglOk) return <FoodSceneFallback />;

  function handlePointerMove(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      y: ((event.clientY - bounds.top) / bounds.height) * 2 - 1,
    };
  }

  return (
    <div className="h-full w-full" onMouseMove={handlePointerMove}>
      <Canvas
        dpr={[1, isMobile ? 1.3 : 1.75]}
        camera={{ position: [0, 0.4, 6], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[3, 5, 3]} intensity={1.2} color="#FFF3E4" />
        <pointLight position={[-4, -2, -2]} intensity={0.35} color="#FF5A1F" />
        <Suspense fallback={null}>
          <Composition
            pointerRef={pointerRef}
            scrollRef={scrollRef}
            reduced={reduced}
            simplified={isMobile}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

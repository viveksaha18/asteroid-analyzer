import { useEffect, useRef } from "react";
import * as THREE from "three";

const Asteroid3DViewer = ({ asteroid, size = 340 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, size / size, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 3.5;

    // Create asteroid with better geometry
    const geometry = new THREE.IcosahedronGeometry(1.2, 5);

    // Generate varied asteroid colors based on asteroid data
    const hue = Math.random();
    const saturation = 0.6 + Math.random() * 0.4;
    const lightness = 0.4 + Math.random() * 0.3;

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(hue, saturation, lightness),
      metalness: 0.6,
      roughness: 0.4,
      wireframe: false,
    });

    const asteroidMesh = new THREE.Mesh(geometry, material);
    scene.add(asteroidMesh);

    // Add a subtle ring/glow around the asteroid
    const ringGeometry = new THREE.TorusGeometry(1.4, 0.1, 16, 32);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(hue, saturation * 0.8, lightness * 1.2),
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.6,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.random() * Math.PI;
    ring.rotation.z = Math.random() * Math.PI;
    scene.add(ring);

    // Enhanced Lighting
    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(10, 8, 10);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x00ff88, 0.6);
    light2.position.set(-10, -5, 5);
    scene.add(light2);

    const light3 = new THREE.PointLight(0x3b82f6, 0.5);
    light3.position.set(0, 0, 5);
    scene.add(light3);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Animation
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      asteroidMesh.rotation.x += 0.003;
      asteroidMesh.rotation.y += 0.005;

      ring.rotation.y += 0.002;
      ring.rotation.z += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      if (
        containerRef.current &&
        renderer.domElement.parentNode === containerRef.current
      ) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      ringGeometry.dispose();
      material.dispose();
      ringMaterial.dispose();
      renderer.dispose();
    };
  }, [size]);

  return (
    <div
      ref={containerRef}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        margin: "0 auto",
        borderRadius: "12px",
        overflow: "hidden",
        background:
          "radial-gradient(circle, rgba(59,130,246,0.1), rgba(0,0,0,0.3))",
      }}
    />
  );
};

export default Asteroid3DViewer;

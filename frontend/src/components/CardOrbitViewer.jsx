import { useEffect, useRef } from "react";
import * as THREE from "three";

const CardOrbitViewer = ({ asteroid, size = 220 }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // Clear container
      containerRef.current.innerHTML = "";

      // Scene setup with better defaults
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      scene.background = new THREE.Color(0x0a1428);
      scene.fog = new THREE.FogExp2(0x0a1428, 0.02);

      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      camera.position.set(0, 20, 30);
      camera.lookAt(0, 0, 0);

      // Renderer with better settings
      const canvas = document.createElement("canvas");
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        precision: "mediump",
        powerPreference: "low-power",
      });
      rendererRef.current = renderer;

      renderer.setSize(size, size);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x0a1428, 1);
      // Ensure canvas fills the container and is visible
      renderer.domElement.style.display = "block";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.top = "0";
      renderer.domElement.style.left = "0";
      containerRef.current.appendChild(renderer.domElement);

      // Enhanced lighting setup
      const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
      sunLight.position.set(50, 30, 50);
      scene.add(sunLight);

      const fillLight = new THREE.DirectionalLight(0x00aaff, 0.4);
      fillLight.position.set(-50, -30, -50);
      scene.add(fillLight);

      const ambientLight = new THREE.AmbientLight(0x1a1a3e, 0.6);
      scene.add(ambientLight);

      // Add starfield background
      const starsGeometry = new THREE.BufferGeometry();
      const starCount = 150;
      const starPositions = new Float32Array(starCount * 3);
      const starColors = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount * 3; i += 3) {
        starPositions[i] = (Math.random() - 0.5) * 300;
        starPositions[i + 1] = (Math.random() - 0.5) * 300;
        starPositions[i + 2] = (Math.random() - 0.5) * 300;

        // Random star colors (white, blue, yellow)
        const color = Math.random();
        if (color < 0.5) {
          starColors[i] = 1;
          starColors[i + 1] = 1;
          starColors[i + 2] = 1;
        } else if (color < 0.75) {
          starColors[i] = 0.6;
          starColors[i + 1] = 0.8;
          starColors[i + 2] = 1;
        } else {
          starColors[i] = 1;
          starColors[i + 1] = 0.9;
          starColors[i + 2] = 0.6;
        }
      }

      starsGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(starPositions, 3),
      );
      starsGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(starColors, 3),
      );

      const starsMaterial = new THREE.PointsMaterial({
        size: 1.5,
        sizeAttenuation: true,
        vertexColors: true,
        opacity: 0.8,
        transparent: true,
      });

      const stars = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(stars);

      // Earth with enhanced visuals
      const earthGeometry = new THREE.SphereGeometry(10, 48, 48);
      const earthMaterial = new THREE.MeshPhongMaterial({
        color: 0x1e5299,
        shininess: 25,
        emissive: 0x0a3d6e,
      });
      const earth = new THREE.Mesh(earthGeometry, earthMaterial);
      scene.add(earth);

      // Add glow ring to Earth
      const glowGeometry = new THREE.SphereGeometry(10.5, 48, 48);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff99,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      });
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      scene.add(glowMesh);

      // Orbital path with gradient effect
      const orbitRadius = 45;
      const orbitGeometry = new THREE.BufferGeometry();
      const orbitPoints = [];
      const orbitColors = [];

      for (let i = 0; i <= 128; i++) {
        const angle = (i / 128) * Math.PI * 2;
        orbitPoints.push(
          Math.cos(angle) * orbitRadius,
          0,
          Math.sin(angle) * orbitRadius,
        );

        // Gradient colors for orbit
        const hue = i / 128;
        const color = new THREE.Color().setHSL(hue * 0.3 + 0.1, 1, 0.6);
        orbitColors.push(color.r, color.g, color.b);
      }

      orbitGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(orbitPoints), 3),
      );
      orbitGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(new Float32Array(orbitColors), 3),
      );

      const orbitMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        linewidth: 2,
      });

      const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
      scene.add(orbit);

      // Asteroid with enhanced look
      const asteroidGeometry = new THREE.IcosahedronGeometry(2.5, 4);
      const asteroidColor = new THREE.Color().setHSL(
        Math.random() * 0.2 + 0.05,
        0.8,
        0.5,
      );
      const asteroidMaterial = new THREE.MeshPhongMaterial({
        color: asteroidColor,
        metalness: 0.7,
        shininess: 60,
        emissive: asteroidColor,
        emissiveIntensity: 0.3,
      });
      const asteroidMesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
      asteroidMesh.position.set(orbitRadius, 5, 0);
      scene.add(asteroidMesh);

      // Glow ring around asteroid
      const asteroidGlowGeometry = new THREE.TorusGeometry(3.5, 0.4, 16, 32);
      const asteroidGlowMaterial = new THREE.MeshBasicMaterial({
        color: asteroidColor,
        transparent: true,
        opacity: 0.4,
      });
      const asteroidGlow = new THREE.Mesh(
        asteroidGlowGeometry,
        asteroidGlowMaterial,
      );
      asteroidGlow.position.copy(asteroidMesh.position);
      asteroidGlow.rotation.set(Math.random(), Math.random(), Math.random());
      scene.add(asteroidGlow);

      // Animation loop
      let angle = 0;

      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);

        // Rotate earth
        earth.rotation.y += 0.0002;
        glowMesh.rotation.x += 0.0001;
        glowMesh.rotation.y -= 0.0003;

        // Rotate starfield slowly
        stars.rotation.y += 0.00002;

        // Orbit asteroid
        angle += 0.002;
        const newX = Math.cos(angle) * orbitRadius;
        const newZ = Math.sin(angle) * orbitRadius;
        asteroidMesh.position.x = newX;
        asteroidMesh.position.z = newZ;
        asteroidMesh.rotation.x += 0.003;
        asteroidMesh.rotation.y += 0.005;

        // Update glow position and rotation
        asteroidGlow.position.copy(asteroidMesh.position);
        asteroidGlow.rotation.y += 0.01;

        renderer.render(scene, camera);
      };

      animate();

      // Handle window resize
      const handleResize = () => {
        if (containerRef.current && renderer) {
          const newSize = containerRef.current.clientWidth;
          renderer.setSize(newSize, newSize);
          camera.aspect = 1;
          camera.updateProjectionMatrix();
        }
      };

      window.addEventListener("resize", handleResize);

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize);
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        try {
          if (
            containerRef.current &&
            renderer.domElement.parentNode === containerRef.current
          ) {
            containerRef.current.removeChild(renderer.domElement);
          }
        } catch (e) {
          console.log("Cleanup error:", e);
        }

        starsGeometry.dispose();
        starsMaterial.dispose();
        earthGeometry.dispose();
        glowGeometry.dispose();
        earthMaterial.dispose();
        glowMaterial.dispose();
        orbitGeometry.dispose();
        orbitMaterial.dispose();
        asteroidGeometry.dispose();
        asteroidGlowGeometry.dispose();
        asteroidMaterial.dispose();
        asteroidGlowMaterial.dispose();
        renderer.dispose();
      };
    } catch (error) {
      console.error("CardOrbitViewer initialization error:", error);
      if (containerRef.current) {
        containerRef.current.innerHTML = `
          <div style="
            display: flex; 
            align-items: center; 
            justify-content: center; 
            height: 100%; 
            background: linear-gradient(135deg, #0a1428 0%, #1a3a52 100%);
            color: #888;
            font-size: 11px;
            text-align: center;
            padding: 10px;
            border-radius: 8px;
          ">
            <span>🌌 Vue 3D</span>
          </div>
        `;
      }
    }
  }, [size]);

  return (
    <div
      ref={containerRef}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
        background: "linear-gradient(135deg, #0a1428 0%, #1a2f52 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ color: "#666", fontSize: "11px", textAlign: "center" }}>
        ⏳ Rendering...
      </div>
    </div>
  );
};

export default CardOrbitViewer;

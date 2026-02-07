import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const OrbitViewer3D = ({ asteroid, size = 500 }) => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);
  const controlsRef = useRef({ isRotating: false, isDragging: false });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x000011);

    const camera = new THREE.PerspectiveCamera(75, size / size, 0.1, 100000);
    cameraRef.current = camera;
    camera.position.set(0, 50, 50);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(size, size);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(50, 30, 50);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x444444, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffff88, 0.5);
    pointLight.position.set(100, 0, 0);
    scene.add(pointLight);

    // Stars background
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 10000;
      starPositions[i + 1] = (Math.random() - 0.5) * 10000;
      starPositions[i + 2] = (Math.random() - 0.5) * 10000;
    }
    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 20,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Earth
    const earthGeometry = new THREE.SphereGeometry(10, 64, 64);
    const earthMaterial = new THREE.MeshStandardMaterial({
      color: 0x2e5090,
      metalness: 0.3,
      roughness: 0.6,
      emissive: 0x1a3050,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.castShadow = true;
    earth.receiveShadow = true;

    // Add Earth texture details
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#1a4d8f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#2d7a3f";
    ctx.beginPath();
    ctx.ellipse(400, 300, 200, 150, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(1200, 350, 180, 120, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(1600, 600, 150, 100, 0, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    earthMaterial.map = texture;

    scene.add(earth);

    // Moon
    const moonGeometry = new THREE.SphereGeometry(2.7, 32, 32);
    const moonMaterial = new THREE.MeshStandardMaterial({
      color: 0xd3d3d3,
      metalness: 0.1,
      roughness: 0.8,
    });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.castShadow = true;
    moon.receiveShadow = true;
    moon.position.set(30, 0, 0);
    scene.add(moon);

    // Moon orbit
    const moonOrbitGeometry = new THREE.BufferGeometry();
    const moonOrbitPoints = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      moonOrbitPoints.push(Math.cos(angle) * 30, 0, Math.sin(angle) * 30);
    }
    moonOrbitGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(moonOrbitPoints), 3),
    );
    const moonOrbitMaterial = new THREE.LineBasicMaterial({
      color: 0x888888,
      transparent: true,
      opacity: 0.3,
    });
    const moonOrbit = new THREE.Line(moonOrbitGeometry, moonOrbitMaterial);
    scene.add(moonOrbit);

    // Asteroid orbit (ellipse based on distance and velocity)
    const orbitRadius = Math.min(asteroid.missDistance / 100000 || 80, 150);
    const orbitGeometry = new THREE.BufferGeometry();
    const orbitPoints = [];
    const eccentricity = 0.3 + Math.random() * 0.3;

    for (let i = 0; i <= 256; i++) {
      const angle = (i / 256) * Math.PI * 2;
      const r = orbitRadius / (1 + eccentricity * Math.cos(angle));
      orbitPoints.push(
        Math.cos(angle) * r,
        (Math.random() - 0.5) * 5,
        Math.sin(angle) * r,
      );
    }

    orbitGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(orbitPoints), 3),
    );
    const orbitMaterial = new THREE.LineBasicMaterial({
      color: 0xff6600,
      transparent: true,
      opacity: 0.6,
      linewidth: 2,
    });
    const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
    scene.add(orbit);

    // Asteroid on orbit
    const asteroidGeometry = new THREE.IcosahedronGeometry(2, 4);
    const hue = Math.random();
    const saturation = 0.6 + Math.random() * 0.4;
    const asteroidMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(hue, saturation, 0.5),
      metalness: 0.7,
      roughness: 0.3,
      emissive: new THREE.Color().setHSL(hue, saturation, 0.3),
    });
    const asteroidMesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
    asteroidMesh.castShadow = true;
    asteroidMesh.receiveShadow = true;

    // Position asteroid on orbit
    const asteroidAngle = Math.random() * Math.PI * 2;
    const asteroidOrbitRadius =
      orbitRadius / (1 + eccentricity * Math.cos(asteroidAngle));
    asteroidMesh.position.set(
      Math.cos(asteroidAngle) * asteroidOrbitRadius,
      (Math.random() - 0.5) * 5,
      Math.sin(asteroidAngle) * asteroidOrbitRadius,
    );
    scene.add(asteroidMesh);

    // Glow ring around asteroid
    const glowGeometry = new THREE.TorusGeometry(3, 0.3, 16, 32);
    const glowMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6600,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.4,
      emissive: 0xff6600,
    });
    const glowRing = new THREE.Mesh(glowGeometry, glowMaterial);
    glowRing.position.copy(asteroidMesh.position);
    glowRing.rotation.set(Math.random(), Math.random(), Math.random());
    scene.add(glowRing);

    // Distance indicator line
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([0, 0, 0, ...asteroidMesh.position.toArray()]),
        3,
      ),
    );
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.4,
      dashed: true,
    });
    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);

    // Mouse controls
    const onMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / size) * 2 - 1;
      mouseRef.current.y = -(e.clientY / size) * 2 + 1;

      if (controlsRef.current.isRotating) {
        rotationRef.current.y += (e.movementX || 0) * 0.005;
        rotationRef.current.x += (e.movementY || 0) * 0.005;
      }
    };

    const onMouseDown = (e) => {
      if (e.button === 0) {
        controlsRef.current.isRotating = true;
        containerRef.current.style.cursor = "grabbing";
      }
    };

    const onMouseUp = () => {
      controlsRef.current.isRotating = false;
      containerRef.current.style.cursor = "grab";
    };

    const onMouseWheel = (e) => {
      e.preventDefault();
      const zoomSpeed = 0.1;
      const direction = e.deltaY > 0 ? 1 : -1;
      camera.position.z += direction * zoomSpeed * camera.position.z;
      camera.position.z = Math.max(30, Math.min(300, camera.position.z));
    };

    containerRef.current.addEventListener("mousemove", onMouseMove);
    containerRef.current.addEventListener("mousedown", onMouseDown);
    containerRef.current.addEventListener("mouseup", onMouseUp);
    containerRef.current.addEventListener("wheel", onMouseWheel, {
      passive: false,
    });
    containerRef.current.style.cursor = "grab";

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate scene
      scene.rotation.x = rotationRef.current.x;
      scene.rotation.y = rotationRef.current.y;

      // Rotate earth
      earth.rotation.y += 0.001;

      // Rotate moon
      moon.position.x = 30 * Math.cos(Date.now() * 0.00001);
      moon.position.z = 30 * Math.sin(Date.now() * 0.00001);

      // Orbit asteroid
      asteroidMesh.rotation.x += 0.01;
      asteroidMesh.rotation.y += 0.015;

      glowRing.rotation.y += 0.02;
      glowRing.position.copy(asteroidMesh.position);

      // Update line
      lineGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
          new Float32Array([0, 0, 0, ...asteroidMesh.position.toArray()]),
          3,
        ),
      );

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      containerRef.current?.removeEventListener("mousemove", onMouseMove);
      containerRef.current?.removeEventListener("mousedown", onMouseDown);
      containerRef.current?.removeEventListener("mouseup", onMouseUp);
      containerRef.current?.removeEventListener("wheel", onMouseWheel);
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      starsGeometry.dispose();
      starsMaterial.dispose();
      earthGeometry.dispose();
      earthMaterial.dispose();
      texture.dispose();
      moonGeometry.dispose();
      moonMaterial.dispose();
      moonOrbitGeometry.dispose();
      moonOrbitMaterial.dispose();
      orbitGeometry.dispose();
      orbitMaterial.dispose();
      asteroidGeometry.dispose();
      asteroidMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [asteroid, size]);

  return (
    <div
      ref={containerRef}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
      }}
    />
  );
};

export default OrbitViewer3D;

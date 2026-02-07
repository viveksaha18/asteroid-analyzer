import { useEffect, useRef } from "react";
import * as THREE from "three";

const AsteroidBackground3D = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0b3d91, 0.1);
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 50;

    // Create asteroids
    const asteroids = [];
    const asteroidGeometry = new THREE.IcosahedronGeometry(1, 4);

    for (let i = 0; i < 30; i++) {
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6),
        emissive: new THREE.Color().setHSL(Math.random(), 0.8, 0.4),
        wireframe: Math.random() > 0.5,
      });

      const asteroid = new THREE.Mesh(asteroidGeometry, material);
      asteroid.position.set(
        Math.random() * 100 - 50,
        Math.random() * 100 - 50,
        Math.random() * 100 - 50,
      );
      asteroid.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );
      asteroid.scale.set(
        Math.random() * 2 + 0.5,
        Math.random() * 2 + 0.5,
        Math.random() * 2 + 0.5,
      );

      asteroid.vx = Math.random() * 0.02 - 0.01;
      asteroid.vy = Math.random() * 0.02 - 0.01;
      asteroid.vz = Math.random() * 0.02 - 0.01;
      asteroid.rx = Math.random() * 0.005 - 0.0025;
      asteroid.ry = Math.random() * 0.005 - 0.0025;
      asteroid.rz = Math.random() * 0.005 - 0.0025;

      scene.add(asteroid);
      asteroids.push(asteroid);
    }

    // Lighting
    const light1 = new THREE.PointLight(0x0b3d91, 1, 100);
    light1.position.set(10, 10, 10);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x1e40af, 0.8, 100);
    light2.position.set(-10, -10, 10);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      asteroids.forEach((asteroid) => {
        asteroid.position.x += asteroid.vx;
        asteroid.position.y += asteroid.vy;
        asteroid.position.z += asteroid.vz;

        asteroid.rotation.x += asteroid.rx;
        asteroid.rotation.y += asteroid.ry;
        asteroid.rotation.z += asteroid.rz;

        // Bounce off boundaries
        if (Math.abs(asteroid.position.x) > 60) asteroid.vx *= -1;
        if (Math.abs(asteroid.position.y) > 60) asteroid.vy *= -1;
        if (Math.abs(asteroid.position.z) > 60) asteroid.vz *= -1;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      asteroidGeometry.dispose();
      asteroids.forEach((a) => a.material.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        background: "linear-gradient(135deg, #0b3d91 0%, #1e40af 100%)",
      }}
    />
  );
};

export default AsteroidBackground3D;

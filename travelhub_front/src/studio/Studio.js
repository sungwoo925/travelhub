import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Studio = () => {
  const containerRef = useRef();
  const cameraRef = useRef();

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create two cubes at random positions
    for (let i = 0; i < 2; i++) {
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);

      // Set random positions
      cube.position.x = (Math.random() - 0.5) * 10;
      cube.position.y = (Math.random() - 0.5) * 10;
      cube.position.z = (Math.random() - 0.5) * 10;

      scene.add(cube);
    }

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      // Update camera aspect ratio
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      // Update renderer size
      renderer.setSize(newWidth, newHeight);
    };

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Handle wheel event for zooming
    const handleWheel = (event) => {
      const delta = event.deltaY * 0.005; // Adjust the sensitivity of zoom

      // Adjust the camera position based on the scroll direction
      camera.position.z += delta;

      // Limit the minimum and maximum zoom levels if needed
      // Example: if (camera.position.z < 2) camera.position.z = 2;
      // Example: if (camera.position.z > 10) camera.position.z = 10;

      renderer.render(scene, camera);
    };

    // Listen for wheel events for zooming
    containerRef.current.addEventListener('wheel', handleWheel);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate all cubes
      scene.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.rotation.x += 0.01;
          child.rotation.y += 0.01;
        }
      });

      renderer.render(scene, cameraRef.current);
    };

    animate();

    const cleanup = () => {
      window.removeEventListener('resize', handleResize);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeEventListener('wheel', handleWheel);
        containerRef.current.removeChild(renderer.domElement);
        containerRef.current.removeEventListener('wheel', handleWheel);
      }
    };

    return () => cleanup();
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh', overflow: 'hidden' }} />;
};

export default Studio;

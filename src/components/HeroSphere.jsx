import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroSphere = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 3;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 4. Geometry (Icosahedron for a faceted, digital/forged look)
    const geometry = new THREE.IcosahedronGeometry(1.2, 1);

    // Material A: Solid Core (Dark Steel with Crimson glow)
    const materialCore = new THREE.MeshPhongMaterial({
      color: 0x1a1a1a,
      emissive: 0x8a1c1c, // Crimson glow
      emissiveIntensity: 0.4,
      shininess: 100,
      flatShading: true,
    });
    const core = new THREE.Mesh(geometry, materialCore);

    // Material B: Gold Wireframe
    const materialWire = new THREE.MeshBasicMaterial({
      color: 0xd4af37, // Gold
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const wireframe = new THREE.Mesh(geometry, materialWire);
    wireframe.scale.set(1.05, 1.05, 1.05); // Slightly larger to sit on top

    // Group them together
    const sphereGroup = new THREE.Group();
    sphereGroup.add(core);
    sphereGroup.add(wireframe);
    scene.add(sphereGroup);

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xd4af37, 2, 10);
    goldLight.position.set(2, 2, 2);
    scene.add(goldLight);

    const crimsonLight = new THREE.PointLight(0x8a1c1c, 2, 10);
    crimsonLight.position.set(-2, -2, 2);
    scene.add(crimsonLight);

    // 6. Animation Loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      sphereGroup.rotation.y += 0.005;
      sphereGroup.rotation.x += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    // 7. Handle Resize
    const handleResize = () => {
      if (!mount) return;
      const newWidth = mount.clientWidth;
      const newHeight = mount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // 8. Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      materialCore.dispose();
      materialWire.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full rounded-full overflow-hidden" />;
};

export default HeroSphere;
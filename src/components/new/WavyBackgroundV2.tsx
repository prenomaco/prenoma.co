"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";

export default function WavyBackgroundV2(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x161415, 3, 9);

    const camera = new THREE.PerspectiveCamera(
      55,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    const BASE_CAM = { x: -0.5, y: 1.72, z: 9 };
    camera.position.set(BASE_CAM.x, BASE_CAM.y, BASE_CAM.z);
    camera.lookAt(new THREE.Vector3(0, 1.1, 0));

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

    const geometry = new THREE.PlaneGeometry(20, 12, 240, 160);
    const material = new THREE.PointsMaterial({
      size: 0.06,
      color: 0xe84118,
      transparent: true,
      opacity: 0.18,
    });

    const waves = new THREE.Points(geometry, material);
    waves.rotation.x = -Math.PI / 2;
    waves.position.set(2.5, 1.65, 0); // shifted right to clear left-side content
    scene.add(waves);

    const pos = geometry.getAttribute("position") as THREE.BufferAttribute;
    const noise3D = createNoise3D();

    // raycaster + horizontal plane at wave surface height for cursor deformation
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2();
    // plane normal up, at y = waves.position.y
    const wavePlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -waves.position.y);
    const hitPoint = new THREE.Vector3();
    // smoothed hit position in wave local-space
    const cursorLocal = { x: 0, y: 0 };
    const cursorTarget = { x: 0, y: 0 };

    const target = { x: 0, y: 0 };
    const mouse  = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth)  * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    window.addEventListener("resize", onResize, { passive: true });

    let rafId: number;

    const frame = (timestamp: number) => {
      rafId = requestAnimationFrame(frame);

      // smooth camera parallax
      mouse.x += (target.x - mouse.x) * 0.04;
      mouse.y += (target.y - mouse.y) * 0.04;
      camera.position.x = BASE_CAM.x + mouse.x * 0.4;
      camera.position.y = BASE_CAM.y - mouse.y * 0.15;
      camera.lookAt(new THREE.Vector3(0, 1.1, 0));

      // project smoothed cursor onto wave plane (same coords as camera — no drift)
      mouseNDC.set(mouse.x, -mouse.y);
      raycaster.setFromCamera(mouseNDC, camera);
      if (raycaster.ray.intersectPlane(wavePlane, hitPoint)) {
        cursorTarget.x = hitPoint.x - waves.position.x;
        cursorTarget.y = -(hitPoint.z - waves.position.z);
      }
      cursorLocal.x += (cursorTarget.x - cursorLocal.x) * 0.08;
      cursorLocal.y += (cursorTarget.y - cursorLocal.y) * 0.08;

      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);

        // base noise wave
        let z = 0.65 * noise3D(x / 4, y / 4, timestamp / 5000);

        // cursor ripple — gentle wide gaussian, low amplitude
        const dx = x - cursorLocal.x;
        const dy = y - cursorLocal.y;
        const dist2 = dx * dx + dy * dy;
        z += 0.12 * Math.exp(-dist2 / 5.0); // wider radius, much softer push

        pos.setZ(i, z);
      }
      pos.needsUpdate = true;

      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(frame);

    // entry fade-in after first frame fires
    const fadeTimer = setTimeout(() => setVisible(true), 200);

    return () => {
      clearTimeout(fadeTimer);
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          display: "block",
          width: "100%",
          height: "100%",
          filter: "blur(12px)",
          opacity: visible ? 1 : 0,
          transition: "opacity 2.2s ease",
        }}
        aria-hidden="true"
      />
      {/* underwater glow — warm orange bloom beneath the wave fading to bg */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 50% at 65% 55%, rgba(200,50,10,0.13) 0%, rgba(160,35,8,0.06) 45%, transparent 75%)",
          opacity: visible ? 1 : 0,
          transition: "opacity 2.2s ease",
        }}
      />
    </>
  );
}

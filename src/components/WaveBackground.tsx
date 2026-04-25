"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";

export default function WaveBackground(): React.JSX.Element {
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
    const BASE_CAM = { x: -0.5, y: 2.05, z: 9 };
    camera.position.set(BASE_CAM.x, BASE_CAM.y, BASE_CAM.z);
    camera.lookAt(new THREE.Vector3(0, 1.45, 0));

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

    const geometry = new THREE.PlaneGeometry(20, 12, 240, 160);
    const material = new THREE.PointsMaterial({
      size: 0.06,
      color: 0xe84118,
      transparent: true,
      opacity: 0.12,
    });

    const waves = new THREE.Points(geometry, material);
    waves.rotation.x = -Math.PI / 2;
    waves.position.set(2.5, 2.0, 0);
    scene.add(waves);

    const pos = geometry.getAttribute("position") as THREE.BufferAttribute;
    const noise3D = createNoise3D();

    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2();
    const wavePlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -waves.position.y);
    const hitPoint = new THREE.Vector3();
    const cursorLocal = { x: 0, y: 0 };
    const cursorTarget = { x: 0, y: 0 };
    const cursorPrev = { x: 0, y: 0 };

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

      mouse.x += (target.x - mouse.x) * 0.04;
      mouse.y += (target.y - mouse.y) * 0.04;
      camera.position.x = BASE_CAM.x + mouse.x * 0.4;
      camera.position.y = BASE_CAM.y - mouse.y * 0.15;
      camera.lookAt(new THREE.Vector3(0, 1.45, 0));

      mouseNDC.set(mouse.x, -mouse.y);
      raycaster.setFromCamera(mouseNDC, camera);
      if (raycaster.ray.intersectPlane(wavePlane, hitPoint)) {
        cursorTarget.x = hitPoint.x - waves.position.x;
        cursorTarget.y = -(hitPoint.z - waves.position.z);
      }
      cursorPrev.x = cursorLocal.x;
      cursorPrev.y = cursorLocal.y;
      cursorLocal.x += (cursorTarget.x - cursorLocal.x) * 0.06;
      cursorLocal.y += (cursorTarget.y - cursorLocal.y) * 0.06;

      const velX = cursorLocal.x - cursorPrev.x;
      const velY = cursorLocal.y - cursorPrev.y;
      const velMag = Math.sqrt(velX * velX + velY * velY);
      const rippleScale = Math.max(0.15, 1 - velMag * 12);

      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);

        let z = 0.65 * noise3D(x / 4, y / 4, timestamp / 5000);

        const dx = x - cursorLocal.x;
        const dy = y - cursorLocal.y;
        const dist2 = dx * dx + dy * dy;
        z += 0.06 * rippleScale * Math.exp(-dist2 / 14.0);

        pos.setZ(i, z);
      }
      pos.needsUpdate = true;

      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(frame);

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
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 50% at 65% 55%, rgba(200,50,10,0.09) 0%, rgba(160,35,8,0.04) 45%, transparent 75%)",
          opacity: visible ? 1 : 0,
          transition: "opacity 2.2s ease",
        }}
      />
    </>
  );
}

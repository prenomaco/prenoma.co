"use client";

import { useRef, useEffect } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

// ── Vertex shader ──────────────────────────────────────────────────────────────
const VERT = /* glsl */ `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// ── Fragment shader ─────────────────────────────────────────────────────────────
// Ports the full blob system from WavyBackground.tsx to GLSL.
const FRAG = /* glsl */ `
precision highp float;

varying vec2 vUv;

uniform float uTime;
uniform vec2  uResolution;
uniform vec2  uMouse; // lerped mouse in 0..1
uniform vec2  uMouseVelocity; // smoothed mouse velocity, pixels/frame at display-res

// ── Simplex 3D noise (glsl-noise / ashima) ────────────────────────────────────
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g  = step(x0.yzx, x0.xyz);
  vec3 l  = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

// ── Hash for grain ────────────────────────────────────────────────────────────
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

// ── Rotated ellipse SDF / falloff ─────────────────────────────────────────────
// Returns a smooth Gaussian-like falloff value in 0..1 for a rotated ellipse.
float ellipseFalloff(vec2 pixel, vec2 centre, float rx, float ry, float rot) {
  vec2 d = pixel - centre;
  float cosR = cos(-rot);
  float sinR = sin(-rot);
  vec2 dr = vec2(cosR * d.x - sinR * d.y,
                 sinR * d.x + cosR * d.y);
  // Normalised distance inside ellipse
  float nx2 = dr.x / rx;
  float ny2 = dr.y / ry;
  float dist2 = nx2 * nx2 + ny2 * ny2;
  // Radial gradient stops: 1.0 @ centre, feather matching canvas gradient
  // stop 0→0.35 full, 0.35→0.65 mid, 0.65→1.0 fade out
  float d1 = sqrt(dist2);
  float alpha;
  if (d1 <= 0.35) {
    alpha = mix(1.0, 0.65, d1 / 0.35);
  } else if (d1 <= 0.65) {
    alpha = mix(0.65, 0.2, (d1 - 0.35) / 0.30);
  } else if (d1 <= 1.0) {
    alpha = mix(0.2, 0.0, (d1 - 0.65) / 0.35);
  } else {
    alpha = 0.0;
  }
  return alpha;
}

// ── HSV utilities ─────────────────────────────────────────────────────────────
vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// ── Curl noise (2D, approximated via finite-difference gradient) ─────────────
vec2 curlNoise(float x, float y, float tc, float eps) {
  float n1 = snoise(vec3(x,       y + eps, tc));
  float n2 = snoise(vec3(x,       y - eps, tc));
  float n3 = snoise(vec3(x + eps, y,       tc));
  float n4 = snoise(vec3(x - eps, y,       tc));
  return vec2(n1 - n2, -(n3 - n4)) / (2.0 * eps);
}

void main() {
  // Convert vUv to pixel space (canvas is half-res so uResolution is the actual canvas size)
  vec2 pixel = vUv * uResolution;

  float W = uResolution.x;
  float H = uResolution.y;

  // ── Mouse parallax offsets (max ±15px x, ±10px y at display res)
  // Canvas is half-res so divide by 2 to match screen-pixel feel
  float mx = (uMouse.x - 0.5) * 15.0 * 0.5;
  float my = (uMouse.y - 0.5) * 10.0 * 0.5;

  float t = uTime;

  // Slow curl flow — period ~30s, amplitude ~20px at display-res
  float tc = t * 0.015; // very slow
  float curlAmp = 20.0 * 0.5; // half-res correction

  // ── Background fill ───────────────────────────────────────────────────────
  vec3 col = vec3(22.0/255.0, 20.0/255.0, 21.0/255.0); // #161415

  // ═══════════════════════════════════════════════════════════════════════════
  // BLOB DATA  (ported verbatim from WavyBackground.tsx)
  // Layout: [bx, by, rx, ry, rot, r, g, b, opBase, nx, ny]
  // ═══════════════════════════════════════════════════════════════════════════

  // ── UNDERLAY PASS (4 blobs) ───────────────────────────────────────────────

  // 0: Centre bridge
  {
    float bx = 0.48; float by = 0.78; float rx = 580.0; float ry = 150.0; float rot = 0.08;
    vec3  bCol = vec3(90.0, 16.0, 6.0) / 255.0; float opBase = 0.60;
    float nx = 0.5;  float ny = 0.5;
    float ox = snoise(vec3(nx,      ny,      t))        * W * 0.04;
    float oy = snoise(vec3(nx+10.0, ny+10.0, t))        * H * 0.035;
    vec2 curl = curlNoise(nx * 3.0, ny * 3.0, tc, 0.1) * curlAmp;
    ox += curl.x;
    oy += curl.y;
    float op = clamp(opBase + snoise(vec3(nx+5.0, ny+5.0, t*0.7)) * 0.12, 0.0, 1.0);
    vec2 centre = vec2(bx * W + ox + mx, by * H + oy + my);
    float falloff = ellipseFalloff(pixel, centre, rx * 0.5, ry * 0.5, rot);
    col = mix(col, bCol, falloff * op);
  }

  // 1: Left underlay
  {
    float bx = 0.22; float by = 0.80; float rx = 520.0; float ry = 165.0; float rot = -0.06;
    vec3  bCol = vec3(107.0, 21.0, 8.0) / 255.0; float opBase = 0.55;
    float nx = 0.15; float ny = 0.75;
    float ox = snoise(vec3(nx,      ny,      t))        * W * 0.04;
    float oy = snoise(vec3(nx+10.0, ny+10.0, t))        * H * 0.035;
    vec2 curl = curlNoise(nx * 3.0, ny * 3.0, tc, 0.1) * curlAmp;
    ox += curl.x;
    oy += curl.y;
    float op = clamp(opBase + snoise(vec3(nx+5.0, ny+5.0, t*0.7)) * 0.12, 0.0, 1.0);
    vec2 centre = vec2(bx * W + ox + mx, by * H + oy + my);
    float falloff = ellipseFalloff(pixel, centre, rx * 0.5, ry * 0.5, rot);
    col = mix(col, bCol, falloff * op);
  }

  // 2: Right underlay
  {
    float bx = 0.70; float by = 0.82; float rx = 420.0; float ry = 125.0; float rot = 0.10;
    vec3  bCol = vec3(85.0, 14.0, 5.0) / 255.0; float opBase = 0.47;
    float nx = 0.85; float ny = 0.25;
    float ox = snoise(vec3(nx,      ny,      t))        * W * 0.04;
    float oy = snoise(vec3(nx+10.0, ny+10.0, t))        * H * 0.035;
    vec2 curl = curlNoise(nx * 3.0, ny * 3.0, tc, 0.1) * curlAmp;
    ox += curl.x;
    oy += curl.y;
    float op = clamp(opBase + snoise(vec3(nx+5.0, ny+5.0, t*0.7)) * 0.12, 0.0, 1.0);
    vec2 centre = vec2(bx * W + ox + mx, by * H + oy + my);
    float falloff = ellipseFalloff(pixel, centre, rx * 0.5, ry * 0.5, rot);
    col = mix(col, bCol, falloff * op);
  }

  // 3: Far-left edge extension
  {
    float bx = 0.06; float by = 0.78; float rx = 320.0; float ry = 108.0; float rot = -0.12;
    vec3  bCol = vec3(100.0, 18.0, 7.0) / 255.0; float opBase = 0.35;
    float nx = 0.05; float ny = 0.80;
    float ox = snoise(vec3(nx,      ny,      t))        * W * 0.04;
    float oy = snoise(vec3(nx+10.0, ny+10.0, t))        * H * 0.035;
    vec2 curl = curlNoise(nx * 3.0, ny * 3.0, tc, 0.1) * curlAmp;
    ox += curl.x;
    oy += curl.y;
    float op = clamp(opBase + snoise(vec3(nx+5.0, ny+5.0, t*0.7)) * 0.12, 0.0, 1.0);
    vec2 centre = vec2(bx * W + ox + mx, by * H + oy + my);
    float falloff = ellipseFalloff(pixel, centre, rx * 0.5, ry * 0.5, rot);
    col = mix(col, bCol, falloff * op);
  }

  // ── CORE PASS (4 blobs) ───────────────────────────────────────────────────

  // 4: Left core — brightest
  {
    float bx = 0.27; float by = 0.78; float rx = 300.0; float ry = 100.0; float rot = -0.05;
    vec3  bCol = vec3(224.0, 75.0, 35.0) / 255.0; float opBase = 0.82;
    float nx = 0.28; float ny = 0.68;
    float ox = snoise(vec3(nx,      ny,      t))        * W * 0.04;
    float oy = snoise(vec3(nx+10.0, ny+10.0, t))        * H * 0.035;
    vec2 curl = curlNoise(nx * 3.0, ny * 3.0, tc, 0.1) * curlAmp;
    ox += curl.x;
    oy += curl.y;
    float op = clamp(opBase + snoise(vec3(nx+5.0, ny+5.0, t*0.7)) * 0.12, 0.0, 1.0);
    vec2 centre = vec2(bx * W + ox + mx, by * H + oy + my);
    float falloff = ellipseFalloff(pixel, centre, rx * 0.5, ry * 0.5, rot);
    col = mix(col, bCol, falloff * op);
  }

  // 5: Left secondary
  {
    float bx = 0.38; float by = 0.42; float rx = 240.0; float ry = 100.0; float rot = 0.07;
    vec3  bCol = vec3(194.0, 59.0, 24.0) / 255.0; float opBase = 0.65;
    float nx = 0.40; float ny = 0.55;
    float ox = snoise(vec3(nx,      ny,      t))        * W * 0.04;
    float oy = snoise(vec3(nx+10.0, ny+10.0, t))        * H * 0.035;
    vec2 curl = curlNoise(nx * 3.0, ny * 3.0, tc, 0.1) * curlAmp;
    ox += curl.x;
    oy += curl.y;
    float op = clamp(opBase + snoise(vec3(nx+5.0, ny+5.0, t*0.7)) * 0.12, 0.0, 1.0);
    vec2 centre = vec2(bx * W + ox + mx, by * H + oy + my);
    float falloff = ellipseFalloff(pixel, centre, rx * 0.5, ry * 0.5, rot);
    col = mix(col, bCol, falloff * op);
  }

  // 6: Right core — dimmer
  {
    float bx = 0.67; float by = 0.30; float rx = 260.0; float ry = 105.0; float rot = 0.09;
    vec3  bCol = vec3(168.0, 44.0, 16.0) / 255.0; float opBase = 0.60;
    float nx = 0.70; float ny = 0.22;
    float ox = snoise(vec3(nx,      ny,      t))        * W * 0.04;
    float oy = snoise(vec3(nx+10.0, ny+10.0, t))        * H * 0.035;
    vec2 curl = curlNoise(nx * 3.0, ny * 3.0, tc, 0.1) * curlAmp;
    ox += curl.x;
    oy += curl.y;
    float op = clamp(opBase + snoise(vec3(nx+5.0, ny+5.0, t*0.7)) * 0.12, 0.0, 1.0);
    vec2 centre = vec2(bx * W + ox + mx, by * H + oy + my);
    float falloff = ellipseFalloff(pixel, centre, rx * 0.5, ry * 0.5, rot);
    col = mix(col, bCol, falloff * op);
  }

  // 7: Accent flare — deep ember
  {
    float bx = 0.33; float by = 0.46; float rx = 180.0; float ry = 78.0; float rot = -0.10;
    vec3  bCol = vec3(139.0, 18.0, 0.0) / 255.0; float opBase = 0.50;
    float nx = 0.35; float ny = 0.62;
    float ox = snoise(vec3(nx,      ny,      t))        * W * 0.04;
    float oy = snoise(vec3(nx+10.0, ny+10.0, t))        * H * 0.035;
    vec2 curl = curlNoise(nx * 3.0, ny * 3.0, tc, 0.1) * curlAmp;
    ox += curl.x;
    oy += curl.y;
    float op = clamp(opBase + snoise(vec3(nx+5.0, ny+5.0, t*0.7)) * 0.12, 0.0, 1.0);
    vec2 centre = vec2(bx * W + ox + mx, by * H + oy + my);
    float falloff = ellipseFalloff(pixel, centre, rx * 0.5, ry * 0.5, rot);
    col = mix(col, bCol, falloff * op);
  }

  // ── BLOOM BLEED — recompute cores at 2× and 4× radius, additive ──────────
  // Bloom pass 1 (4px-equiv spread, weight 0.30)
  {
    float bx = 0.27; float by = 0.47; float rot = -0.05;
    float nx = 0.28; float ny = 0.68;
    float ox = snoise(vec3(nx, ny, t)) * W * 0.04;
    float oy = snoise(vec3(nx+10.0, ny+10.0, t)) * H * 0.035;
    vec2 centre = vec2(bx * W + ox + mx, by * H + oy + my);
    float f1 = ellipseFalloff(pixel, centre, 300.0, 155.0, rot); // normal radius
    float bloom1 = smoothstep(0.62, 1.0, f1);  // only hottest center
    col += vec3(224.0, 75.0, 35.0) / 255.0 * bloom1 * 0.12;
  }
  // Bloom pass 2 (16px-equiv spread, weight 0.06)
  {
    float bx = 0.27; float by = 0.47; float rot = -0.05;
    float nx = 0.28; float ny = 0.68;
    float ox = snoise(vec3(nx, ny, t)) * W * 0.04;
    float oy = snoise(vec3(nx+10.0, ny+10.0, t)) * H * 0.035;
    vec2 centre = vec2(bx * W + ox + mx, by * H + oy + my);
    float f2 = ellipseFalloff(pixel, centre, 600.0, 310.0, rot); // 2× radius
    col += vec3(224.0, 75.0, 35.0) / 255.0 * f2 * 0.06;
  }
  // Left secondary bloom
  {
    float bx = 0.38; float by = 0.49; float rot = 0.07;
    float nx = 0.40; float ny = 0.55;
    float ox = snoise(vec3(nx, ny, t)) * W * 0.04;
    float oy = snoise(vec3(nx+10.0, ny+10.0, t)) * H * 0.035;
    vec2 centre = vec2(bx * W + ox + mx, by * H + oy + my);
    float f3 = ellipseFalloff(pixel, centre, 480.0, 250.0, rot);
    col += vec3(194.0, 59.0, 24.0) / 255.0 * f3 * 0.04;
  }

  // Upper warmth veil — wide, low-opacity, high in viewport
  {
    float bx = 0.50; float by = 0.26; float rx = 1400.0; float ry = 260.0; float rot = 0.0;
    vec3  bCol = vec3(200.0, 64.0, 16.0) / 255.0; float opBase = 0.15;
    float nx = 0.50; float ny = 0.35;
    float ox = snoise(vec3(nx,      ny,      t))        * W * 0.02;
    float oy = snoise(vec3(nx+10.0, ny+10.0, t))        * H * 0.02;
    vec2 curl = curlNoise(nx * 3.0, ny * 3.0, tc, 0.1) * curlAmp;
    ox += curl.x;
    oy += curl.y;
    float op = clamp(opBase + snoise(vec3(nx+5.0, ny+5.0, t*0.5)) * 0.05, 0.0, 1.0);
    vec2 centre = vec2(bx * W + ox + mx, by * H + oy + my);
    float falloff = ellipseFalloff(pixel, centre, rx * 0.5, ry * 0.5, rot);
    col = mix(col, bCol, falloff * op);
  }

  // ── FILM GRAIN (anisotropic blue-noise approx) + SCANLINES ───────────────
  // Better hash combining two frequencies to approximate blue-noise distribution
  float h1 = hash(pixel + fract(t * 0.017));
  float h2 = hash(pixel * 1.7 + fract(t * 0.041));
  float grainAlpha = (h1 * h2) * 0.08; // 4% effective (product distribution)
  vec3 grainColor = vec3(200.0/255.0, 160.0/255.0, 128.0/255.0);
  col = mix(col, grainColor, grainAlpha);

  // Horizontal scanlines — 1% sine modulation, very subtle
  float scanline = sin(pixel.y * 3.14159 * 2.0) * 0.005;
  col -= scanline;

  // ── CHROMATIC ABERRATION (velocity-scaled) ────────────────────────────────
  float velMag = length(uMouseVelocity) * 0.5; // half-res scale
  if (velMag > 0.001) {
    // Recompute left core contribution at ±offset positions for R and B channels
    float bx4 = 0.27; float by4 = 0.47; float rot4 = -0.05;
    float nx4 = 0.28; float ny4 = 0.68;
    float ox4 = snoise(vec3(nx4, ny4, t)) * W * 0.04;
    float oy4 = snoise(vec3(nx4+10.0, ny4+10.0, t)) * H * 0.035;
    vec2 coreCenter = vec2(bx4 * W + ox4 + mx, by4 * H + oy4 + my);
    float aberrOffset = clamp(velMag * 2.0, 0.0, 4.0);
    float fR = ellipseFalloff(pixel - vec2(aberrOffset, 0.0), coreCenter, 150.0, 77.5, rot4);
    float fB = ellipseFalloff(pixel + vec2(aberrOffset, 0.0), coreCenter, 150.0, 77.5, rot4);
    col.r += fR * 0.12;
    col.b += fB * 0.08;
  }

  // ── CURSOR VIGNETTE ───────────────────────────────────────────────────────
  // Edge darkening — smooth vignette using UV distance from edges
  float edgeDist = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
  float vignette = 0.85 + 0.15 * smoothstep(0.0, 0.18, edgeDist);
  col *= vignette;

  // Cursor lift — brighten within 300px of cursor (half-res: 150px)
  vec2 cursorPx = uMouse * uResolution;
  float cursorDist = length(pixel - cursorPx);
  float cursorLift = smoothstep(150.0, 0.0, cursorDist) * 0.02;
  col += cursorLift;

  // ── HUE DRIFT (±4° over ~90s) ─────────────────────────────────────────────
  // t increments 0.004/frame; 90s at 60fps ≈ t=21.6; sin period = 2π/0.291
  float hueDeg = sin(t * 0.291) * 4.0;
  float hueRad = hueDeg / 360.0; // fractional hue shift
  vec3 hsv = rgb2hsv(clamp(col, 0.0, 1.0));
  hsv.x = fract(hsv.x + hueRad);
  col = hsv2rgb(hsv);

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

export default function WavyBackgroundV2(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const lerpedRef = useRef({ x: 0.5, y: 0.5 });
  const prevMouseRef = useRef({ x: 0.5, y: 0.5 });
  const velocityRef = useRef({ x: 0.0, y: 0.0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── OGL renderer (half-resolution, opaque) ─────────────────────────────
    const renderer = new Renderer({
      canvas,
      dpr: 0.5,
      alpha: false,
      antialias: false,
      depth: false,
    });
    const gl = renderer.gl;

    // ── Fullscreen triangle geometry ───────────────────────────────────────
    const geometry = new Triangle(gl);

    // ── Uniforms ───────────────────────────────────────────────────────────
    const uniforms: {
      uTime: { value: number };
      uResolution: { value: [number, number] };
      uMouse: { value: [number, number] };
      uMouseVelocity: { value: [number, number] };
    } = {
      uTime:          { value: 0 },
      uResolution:    { value: [canvas.width, canvas.height] },
      uMouse:         { value: [0.5, 0.5] },
      uMouseVelocity: { value: [0.0, 0.0] as [number, number] },
    };

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms,
    });

    const mesh = new Mesh(gl, { geometry, program });

    // ── Resize ─────────────────────────────────────────────────────────────
    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uResolution.value = [canvas.width, canvas.height];
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    // ── Mouse ──────────────────────────────────────────────────────────────
    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // ── Render loop ────────────────────────────────────────────────────────
    let raf: number;
    let t = 0;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      t += 0.004;

      // Smooth mouse lerp — slow lag for dreamy parallax
      lerpedRef.current.x += (mouseRef.current.x - lerpedRef.current.x) * 0.03;
      lerpedRef.current.y += (mouseRef.current.y - lerpedRef.current.y) * 0.03;

      // Compute smoothed velocity (display pixels/frame)
      const rawVelX = (lerpedRef.current.x - prevMouseRef.current.x) * window.innerWidth;
      const rawVelY = (lerpedRef.current.y - prevMouseRef.current.y) * window.innerHeight;
      velocityRef.current.x += (rawVelX - velocityRef.current.x) * 0.15;
      velocityRef.current.y += (rawVelY - velocityRef.current.y) * 0.15;
      prevMouseRef.current.x = lerpedRef.current.x;
      prevMouseRef.current.y = lerpedRef.current.y;
      uniforms.uMouseVelocity.value = [velocityRef.current.x, velocityRef.current.y];

      uniforms.uTime.value = t;
      uniforms.uMouse.value = [lerpedRef.current.x, lerpedRef.current.y];

      renderer.render({ scene: mesh });
    };

    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
      // Clean up WebGL context
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
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
      }}
      aria-hidden="true"
    />
  );
}

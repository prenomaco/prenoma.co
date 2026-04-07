"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ContactForm(): React.JSX.Element {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Entrance animation
  useGSAP(
    () => {
      if (!formRef.current) return;
      gsap.from(formRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: formRef }
  );

  // Parallax tilt effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!formRef.current) return;
      const rect = formRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) * 0.01;
      const rotateY = (x - centerX) * -0.01;

      gsap.to(formRef.current, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1200,
        duration: 0.5,
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", company: "", message: "" });
        setTimeout(() => setSuccess(false), 4000);
      } else {
        setError(true);
        setTimeout(() => setError(false), 3000);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(true);
      setTimeout(() => setError(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="
        relative
        w-full
        max-w-md
        p-6
        backdrop-blur-xl
        bg-white/10
        border
        border-white/20
        shadow-2xl
        transition-all
        duration-300
        hover:bg-white/15
        hover:border-white/30
      "
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Success overlay */}
      {success && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-ink/90 z-50">
          <div className="text-center">
            <div className="text-3xl mb-2 text-ember">✓</div>
            <p className="text-cream text-base font-bold mb-1 lowercase">sent!</p>
            <p className="text-parchment text-xs lowercase">we'll get back to you soon.</p>
          </div>
        </div>
      )}

      {/* Error overlay */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-ink/90 z-50">
          <div className="text-center">
            <div className="text-3xl mb-2 text-ember">✕</div>
            <p className="text-ember text-base font-bold mb-1 lowercase">error!</p>
            <p className="text-parchment text-xs lowercase">please try again.</p>
          </div>
        </div>
      )}

      {/* Form fields */}
      <div className="space-y-3">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="your name"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="off"
          className="
            w-full
            px-3
            py-2
            text-sm
            bg-white/5
            border
            border-white/20
            text-cream
            placeholder-parchment/50
            focus:outline-none
            focus:border-ember
            focus:bg-white/10
            transition-all
            duration-200
          "
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="off"
          className="
            w-full
            px-3
            py-2
            text-sm
            bg-white/5
            border
            border-white/20
            text-cream
            placeholder-parchment/50
            focus:outline-none
            focus:border-ember
            focus:bg-white/10
            transition-all
            duration-200
          "
        />

        {/* Company */}
        <input
          type="text"
          name="company"
          placeholder="company (optional)"
          value={formData.company}
          onChange={handleChange}
          autoComplete="off"
          className="
            w-full
            px-3
            py-2
            text-sm
            bg-white/5
            border
            border-white/20
            text-cream
            placeholder-parchment/50
            focus:outline-none
            focus:border-ember
            focus:bg-white/10
            transition-all
            duration-200
          "
        />

        {/* Message */}
        <textarea
          name="message"
          placeholder="tell us about your project..."
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="
            w-full
            px-3
            py-2
            text-sm
            bg-white/5
            border
            border-white/20
            text-cream
            placeholder-parchment/50
            focus:outline-none
            focus:border-ember
            focus:bg-white/10
            transition-all
            duration-200
            resize-none
          "
        />

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            py-2.5
            px-4
            bg-ember
            text-cream
            text-sm
            font-bold
            tracking-wide
            hover:bg-ember/90
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition-all
            duration-200
            active:scale-95
          "
        >
          {loading ? "sending..." : "send message"}
        </button>

        {/* Legal Disclaimer */}
        <p className="text-[10px] text-parchment/40 text-center leading-relaxed mt-2">
          by sending you agree to our{" "}
          <a href="/terms" className="underline hover:text-ember transition-colors">terms and conditions</a>
          {" "}and{" "}
          <a href="/privacy" className="underline hover:text-ember transition-colors">privacy policy</a>
        </p>
      </div>
    </form>
  );
}

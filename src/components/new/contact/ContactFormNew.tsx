"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export default function ContactFormNew(): React.JSX.Element {
  const [formData, setFormData] = useState<FormState>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const magnetRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        setFormData(INITIAL_STATE);
        setTimeout(() => setSuccess(false), 4000);
      } else {
        setError(true);
        setTimeout(() => setError(false), 3000);
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setError(true);
      setTimeout(() => setError(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleMagnetMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!magnetRef.current || !buttonRef.current) return;
    const rect = magnetRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < 60) {
      gsap.to(buttonRef.current, {
        x: distX * 0.4,
        y: distY * 0.4,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMagnetLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  };

  const fieldClass =
    "bg-transparent border-b border-white/20 px-0 py-3 text-[#f3e2c8] text-[15px] w-full outline-none " +
    "placeholder:text-[#dbcba9]/40 lowercase " +
    "focus:border-[#f35226]/70 " +
    "transition-colors duration-200";

  return (
    <div className="flex flex-col h-full w-full">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        {/* Spacer pushes fields to bottom */}
        <div className="flex-1" />
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="your name"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="off"
          className={fieldClass}
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
          className={fieldClass}
        />

        {/* Company */}
        <input
          type="text"
          name="company"
          placeholder="company (optional)"
          value={formData.company}
          onChange={handleChange}
          autoComplete="off"
          className={fieldClass}
        />

        {/* Message */}
        <textarea
          name="message"
          placeholder="tell us about your project..."
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className={`${fieldClass} resize-none`}
        />

        {/* Submit — magnetic pull wrapper */}
        <div
          ref={magnetRef}
          onMouseMove={handleMagnetMove}
          onMouseLeave={handleMagnetLeave}
          className="self-start mt-6"
        >
          <button
            ref={buttonRef}
            type="submit"
            disabled={loading}
            className="bg-[#f35226] rounded-full px-6 py-3 text-[#f3e2c8] text-[15px] font-bold lowercase disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ boxShadow: "0px 3px 14px rgba(243,82,38,0.55)" }}
          >
            {loading ? "sending..." : "send message"}
          </button>
        </div>

        {/* Feedback messages */}
        {success && (
          <p className="text-[18px] text-ember lowercase">
            sent! we will get back to you soon.
          </p>
        )}
        {error && (
          <p className="text-[18px] text-ember lowercase">
            something went wrong. please try again.
          </p>
        )}
      </form>
    </div>
  );
}

export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  category: "design" | "development" | "motion";
  tags: string[];
  year: number;
  image: string;
  stack?: string[];
  isPlaceholder?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "computer-port",
    title: "Computer Port",
    description: "Enterprise infrastructure solutions with seamless scalability and robust performance monitoring.",
    url: "https://computerport.in",
    category: "development",
    tags: ["B2B", "Infrastructure", "Enterprise"],
    year: 2025,
    image: "/projects/computer-port.jpg",
    stack: ["Next.js", "GSAP", "Tailwind CSS", "Lenis"],
  },
  {
    id: "veloce",
    title: "Veloce",
    description: "Premium pre-owned car marketplace featuring curated luxury vehicles with comprehensive inspection reports.",
    url: "https://veloce-dealer.vercel.app",
    category: "development",
    tags: ["Automotive", "Marketplace", "Premium"],
    year: 2026,
    image: "/projects/veloce.jpg",
    stack: ["Next.js", "GSAP", "Tailwind CSS", "Lenis"],
  },
  {
    id: "arr-dental-lab",
    title: "ARR Dental Lab",
    description: "Professional dental laboratory services with precision craftsmanship and rapid turnaround times.",
    url: "https://arrdentallab.com",
    category: "development",
    tags: ["Healthcare", "B2B", "Services"],
    year: 2025,
    image: "",
  },
  {
    id: "neutronfest",
    title: "NeutronFest",
    description: "Brand identity and digital experience for a cutting-edge tech festival celebrating innovation and culture.",
    url: "",
    category: "design",
    tags: ["Branding", "Festival", "Digital"],
    year: 2025,
    image: "",
  },
  {
    id: "damrufest",
    title: "DamruFest",
    description: "Visual identity and motion-forward website for a heritage music festival bridging tradition and modernity.",
    url: "",
    category: "design",
    tags: ["Branding", "Music", "Heritage"],
    year: 2025,
    image: "",
  },
  {
    id: "in-culcate",
    title: "in.culcate",
    description: "Learning platform brand and product design focused on experiential education and deep skill development.",
    url: "",
    category: "design",
    tags: ["EdTech", "Product", "Branding"],
    year: 2026,
    image: "",
  },
  {
    id: "motion-placeholder",
    title: "you could be here",
    description: "have a motion project in mind? let's make something unforgettable.",
    url: "/contact",
    category: "motion",
    tags: [],
    year: 2026,
    image: "",
    isPlaceholder: true,
  },
];

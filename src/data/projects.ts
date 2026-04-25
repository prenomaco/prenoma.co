export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  category: "design" | "development" | "motion";
  tags: string[];
  year: number;
  image: string;
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
    image: "/projects/computer-port.svg",
  },
  {
    id: "veloce",
    title: "Veloce",
    description: "Premium pre-owned car marketplace featuring curated luxury vehicles with comprehensive inspection reports.",
    url: "https://veloce-dealer.vercel.app",
    category: "design",
    tags: ["Automotive", "Marketplace", "Premium"],
    year: 2026,
    image: "/projects/veloce.svg",
  },
  {
    id: "arr-dental-lab",
    title: "ARR Dental Lab",
    description: "Professional dental laboratory services with precision craftsmanship and rapid turnaround times.",
    url: "https://arrdentallab.com",
    category: "development",
    tags: ["Healthcare", "B2B", "Services"],
    year: 2025,
    image: "/projects/arr-dental-lab.svg",
  },
  {
    id: "luminary",
    title: "Luminary",
    description: "AI-powered content studio for creators — scriptwriting, scheduling, and analytics in one workspace.",
    url: "https://luminary.app",
    category: "design",
    tags: ["AI", "Content", "Creators"],
    year: 2026,
    image: "",
  },
  {
    id: "grove",
    title: "Grove",
    description: "Sustainable retail brand combining eco-conscious products with a carbon-neutral supply chain platform.",
    url: "https://grove.co",
    category: "design",
    tags: ["Sustainability", "Retail", "DTC"],
    year: 2026,
    image: "",
  },
  {
    id: "meridian",
    title: "Meridian",
    description: "Financial intelligence dashboard giving independent advisors real-time portfolio risk and opportunity signals.",
    url: "https://meridian.finance",
    category: "development",
    tags: ["Finance", "Dashboard", "B2B"],
    year: 2025,
    image: "",
  },
  {
    id: "atlas-health",
    title: "Atlas Health",
    description: "Patient-first telehealth platform connecting rural communities to specialist care through async consultations.",
    url: "https://atlashealth.io",
    category: "development",
    tags: ["Telehealth", "Rural", "B2C"],
    year: 2025,
    image: "",
  },
];

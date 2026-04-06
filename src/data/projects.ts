// Why: Centralized project data for the Works page
// Contract: frontend-contract-002

export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  year: number;
  image: string; // Project preview image
}

export const PROJECTS: Project[] = [
  {
    id: "computer-port",
    title: "Computer Port",
    description: "Enterprise infrastructure solutions with seamless scalability and robust performance monitoring.",
    url: "https://computerport.in",
    category: "Enterprise Infrastructure",
    tags: ["B2B", "Infrastructure", "Enterprise"],
    year: 2025,
    image: "/projects/computer-port.svg",
  },
  {
    id: "veloce",
    title: "Veloce",
    description: "Premium pre-owned car marketplace featuring curated luxury vehicles with comprehensive inspection reports.",
    url: "https://veloce-dealer.vercel.app",
    category: "E-Commerce",
    tags: ["Automotive", "Marketplace", "Premium"],
    year: 2026,
    image: "/projects/veloce.svg",
  },
  {
    id: "arr-dental-lab",
    title: "ARR Dental Lab",
    description: "Professional dental laboratory services with precision craftsmanship and rapid turnaround times.",
    url: "https://arrdentallab.com",
    category: "Healthcare",
    tags: ["Healthcare", "B2B", "Services"],
    year: 2025,
    image: "/projects/arr-dental-lab.svg",
  },
];

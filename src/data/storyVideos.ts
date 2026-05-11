export const USE_MOCK_MEDIA = false;

// Three.js stays isolated. Keep false for the lighter Awwwards-style edition.
export const ENABLE_THREE_BACKGROUND = false;

export type StoryVideoType = "intro" | "chapter";

export type StoryVideo = {
  id: string;
  type: StoryVideoType;
  chapter?: string;
  sceneNo: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  description: string;
  duration: string;
  src?: string;
  poster?: string;
  palette: {
    bg: string;
    ink: string;
    accent: string;
    glow: string;
  };
  mockCode: string[];
};

export const introVideo: StoryVideo = {
  id: "intro",
  type: "intro",
  sceneNo: "00",
  title: "Opening Sequence",
  eyebrow: "Boot",
  subtitle: "",
  description: "",
  duration: "00:08",
  src: "/videos/intro-browser.mp4",
  poster: "/posters/intro.webp",
  palette: {
    bg: "#050505",
    ink: "#f4efe5",
    accent: "#d7ff3f",
    glow: "rgba(215,255,63,0.24)"
  },
  mockCode: ["boot.story", "mount.scene", "open.signal"]
};

export const chapterVideos: StoryVideo[] = [
  {
    id: "chapter-1",
    type: "chapter",
    chapter: "Scene One",
    sceneNo: "01",
    title: "Origin Layer",
    eyebrow: "Root",
    subtitle: "Vision becomes architecture.",
    description: "The problem, the product reason, and the foundation behind the system.",
    duration: "02:30",
    src: "/videos/video-1.mp4",
    poster: "/posters/video-1.webp",
    palette: {
      bg: "#08110f",
      ink: "#f4efe5",
      accent: "#d7ff3f",
      glow: "rgba(215,255,63,0.26)"
    },
    mockCode: ["define.problem", "map.root", "commit.base"]
  },
  {
    id: "chapter-2",
    type: "chapter",
    chapter: "Scene Two",
    sceneNo: "02",
    title: "Interface Pulse",
    eyebrow: "UX",
    subtitle: "The human-facing layer.",
    description: "Interaction, clarity, and the screen language that makes software feel natural.",
    duration: "03:10",
    src: "/videos/video-2.mp4",
    poster: "/posters/video-2.webp",
    palette: {
      bg: "#120b1f",
      ink: "#f4efe5",
      accent: "#ff6a3d",
      glow: "rgba(255,106,61,0.26)"
    },
    mockCode: ["motion.ui", "sync.intent", "focus.screen"]
  },
  {
    id: "chapter-3",
    type: "chapter",
    chapter: "Scene Three",
    sceneNo: "03",
    title: "Logic Engine",
    eyebrow: "Core",
    subtitle: "The system underneath.",
    description: "Rules, APIs, automation, validation, and the silent structure doing the work.",
    duration: "02:45",
    src: "/videos/video-3.mp4",
    poster: "/posters/video-3.webp",
    palette: {
      bg: "#07101f",
      ink: "#f4efe5",
      accent: "#7dd3fc",
      glow: "rgba(125,211,252,0.24)"
    },
    mockCode: ["route.flow", "validate.state", "dispatch.next"]
  },
  {
    id: "chapter-4",
    type: "chapter",
    chapter: "Scene Four",
    sceneNo: "04",
    title: "Data Stream",
    eyebrow: "Signal",
    subtitle: "Information becomes action.",
    description: "Events, dashboards, intelligence, and the rhythm of useful data moving through the product.",
    duration: "04:00",
    src: "/videos/video-4.mp4",
    poster: "/posters/video-4.webp",
    palette: {
      bg: "#101006",
      ink: "#f4efe5",
      accent: "#f4d35e",
      glow: "rgba(244,211,94,0.24)"
    },
    mockCode: ["collect.events", "project.signal", "render.insight"]
  },
  {
    id: "chapter-5",
    type: "chapter",
    chapter: "Scene Five",
    sceneNo: "05",
    title: "Future Frame",
    eyebrow: "Scale",
    subtitle: "The roadmap ahead.",
    description: "Scale, transformation, roadmap, and where the software story goes next.",
    duration: "02:55",
    src: "/videos/video-5.mp4",
    poster: "/posters/video-5.webp",
    palette: {
      bg: "#140710",
      ink: "#f4efe5",
      accent: "#e879f9",
      glow: "rgba(232,121,249,0.25)"
    },
    mockCode: ["expand.roadmap", "scale.system", "compose.future"]
  }
];

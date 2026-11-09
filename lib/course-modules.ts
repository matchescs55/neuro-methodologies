/**
 * Single source of truth for the five course modules.
 * Used by the module cards and the progress preview.
 */
export type CourseModule = {
  id: number;
  title: string;
  summary: string;
  topics: string[];
  /** Tailwind gradient classes (kept as full strings so Tailwind detects them). */
  gradient: string;
  /** SAMPLE progress value used only by the preview section. */
  sampleProgress: number;
};

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 1,
    title: "Neuroscience and Psychology of Learning",
    summary:
      "Discover how memory, attention, emotion and sleep shape what and how we learn.",
    topics: ["Memory and attention", "Emotion and motivation", "Neuroplasticity"],
    gradient: "from-neon-cyan to-neon-violet",
    sampleProgress: 80,
  },
  {
    id: 2,
    title: "Active Learning Methodologies",
    summary:
      "Move beyond lectures with strategies that put students at the center of the experience.",
    topics: ["Project-based learning", "Flipped classroom", "Collaboration"],
    gradient: "from-neon-violet to-soft-purple",
    sampleProgress: 55,
  },
  {
    id: 3,
    title: "Gamification and Playful Environments",
    summary:
      "Use game mechanics, challenges and play to build motivation and meaningful engagement.",
    topics: ["Game mechanics", "Rewards and feedback", "Playful design"],
    gradient: "from-neon-cyan to-soft-purple",
    sampleProgress: 35,
  },
  {
    id: 4,
    title: "Adaptive Technology and AI",
    summary:
      "Explore how intelligent tools can personalize learning paths and support every learner.",
    topics: ["AI tutors", "Personalization", "Ethical use of AI"],
    gradient: "from-soft-purple to-neon-cyan",
    sampleProgress: 15,
  },
  {
    id: 5,
    title: "Evaluation and Instructional Design",
    summary:
      "Plan clear objectives, design learning experiences and measure what really matters.",
    topics: ["Learning objectives", "Formative assessment", "Course design"],
    gradient: "from-neon-violet to-neon-cyan",
    sampleProgress: 0,
  },
];

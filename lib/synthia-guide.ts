/**
 * SYNTHIA's guided tips and challenges.
 * Everything here is pre-written text: no AI and no API are involved.
 * To add or change content, just edit this file.
 */
export type Challenge = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type GuideTopic = {
  id: string;
  label: string;
  tips: string[];
  challenge: Challenge;
};

export const GREETING =
  "Hi, I am SYNTHIA, your learning companion! Pick a topic below and I will share a few tips, then a quick challenge.";

export const GUIDE_TOPICS: GuideTopic[] = [
  {
    id: "brain",
    label: "The learning brain",
    tips: [
      "Your brain strengthens the connections you use. Practicing an idea again a little later helps it stick far better than rereading it once.",
      "Pulling information out of memory, like answering a question without looking at your notes, is one of the most reliable ways to learn. It is called retrieval practice.",
      "Sleep helps your brain consolidate what you studied, so a good night of rest after learning is part of studying.",
    ],
    challenge: {
      question: "Which study habit is generally better for long-term memory?",
      options: [
        "Rereading your notes five times in one evening",
        "Quizzing yourself on the material over several days",
        "Highlighting every important sentence",
      ],
      correctIndex: 1,
      explanation:
        "Spacing your practice and testing yourself usually beats rereading and highlighting.",
    },
  },
  {
    id: "active",
    label: "Active learning",
    tips: [
      "Active learning means students do something with the content: discuss, solve, create or teach, instead of only listening.",
      "A flipped classroom moves the first contact with new content, like a video or a reading, to home. Class time is then for practice, questions and collaboration.",
      "Try think-pair-share: ask a question, let everyone think alone, discuss with a partner, then share with the group. It takes about five minutes.",
    ],
    challenge: {
      question: "In a flipped classroom, what usually happens during class time?",
      options: [
        "Students listen quietly to a long lecture",
        "Students practice, discuss and get help applying ideas",
        "Students take the final exam",
      ],
      correctIndex: 1,
      explanation:
        "The content comes first at home, so class time can be used for active practice and support.",
    },
  },
  {
    id: "play",
    label: "Play and games",
    tips: [
      "Gamification adds game elements, like points, badges, levels and quests, to non-game settings such as learning.",
      "Good games give clear goals, quick feedback and a challenge that is not too easy and not too hard.",
      "Points alone can lose their charm quickly. Meaningful choices, a story and a sense of progress keep learners engaged longer.",
    ],
    challenge: {
      question: "Which element best keeps a game-based activity motivating?",
      options: [
        "A challenge matched to the learner's level, with quick feedback",
        "Only extremely hard puzzles",
        "Random rewards unrelated to the task",
      ],
      correctIndex: 0,
      explanation:
        "When the challenge fits the learner and feedback is fast, people stay motivated and keep improving.",
    },
  },
  {
    id: "ai",
    label: "Adaptive tech and AI",
    tips: [
      "Adaptive learning tools adjust difficulty, pacing or practice based on how a learner is doing.",
      "AI can support teachers by suggesting practice or spotting where students struggle, but teachers still make the important decisions.",
      "Using AI responsibly means checking its answers, protecting student privacy and being open about when it is used.",
    ],
    challenge: {
      question: "What is a responsible way to use AI in a classroom?",
      options: [
        "Trust every answer without checking",
        "Check its output, protect privacy and keep teacher judgment central",
        "Share students' personal data freely",
      ],
      correctIndex: 1,
      explanation:
        "AI is a helpful tool, but people stay responsible for accuracy, privacy and decisions.",
    },
  },
  {
    id: "design",
    label: "Evaluation and design",
    tips: [
      "Start with the end: write clear learning objectives first, then design activities and assessments that match them. This is called backward design.",
      "Formative assessment, like quick quizzes or exit tickets, checks understanding during learning so you can adjust while there is still time.",
      "Good feedback is specific and actionable: say what went well and give one concrete next step.",
    ],
    challenge: {
      question: "What is the main purpose of formative assessment?",
      options: [
        "To give a final grade at the end of a course",
        "To check understanding during learning and adjust teaching",
        "To rank students against each other",
      ],
      correctIndex: 1,
      explanation:
        "Formative assessment guides learning while it is happening, rather than only measuring it afterwards.",
    },
  },
];

import {
  BookOpen,
  Compass,
  Heart,
  MessageCircle,
  Phone,
  Shield,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: "crisis" | "counseling" | "peer" | "education" | "self-care";
  type: "hotline" | "chat" | "website" | "app" | "local";
  availability: string;
  cost: string;
  tags: string[];
  url?: string;
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: Heart,
    title: "Private check-ins",
    description:
      "Reflect on how you're feeling in a calm, judgment-free space. No account required to get started.",
  },
  {
    icon: MessageCircle,
    title: "Supportive guidance",
    description:
      "Receive thoughtful, non-diagnostic suggestions to help you understand what you might need next.",
  },
  {
    icon: Users,
    title: "Reach-out preparation",
    description:
      "Practice what to say and build confidence before talking to someone you trust.",
  },
  {
    icon: Compass,
    title: "Resource navigation",
    description:
      "Discover mental-health resources that fit your situation, preferences, and comfort level.",
  },
];

export const howItWorksSteps: HowItWorksStep[] = [
  {
    step: 1,
    title: "Check in with yourself",
    description:
      "Take a quiet moment to notice how you're feeling. Choose words that fit — there's no right answer.",
  },
  {
    step: 2,
    title: "Explore what might help",
    description:
      "Receive gentle, supportive guidance based on what you share. This isn't a diagnosis — just a starting point.",
  },
  {
    step: 3,
    title: "Prepare your next step",
    description:
      "Whether that's journaling, reaching out to someone, or finding a resource — we'll help you figure out what feels manageable.",
  },
];

export const resources: Resource[] = [
  {
    id: "988",
    title: "988 Suicide & Crisis Lifeline",
    description:
      "Free, confidential support for people in distress, prevention and crisis resources.",
    category: "crisis",
    type: "hotline",
    availability: "24/7",
    cost: "Free",
    tags: ["crisis", "immediate", "phone"],
    url: "tel:988",
  },
  {
    id: "crisis-text",
    title: "Crisis Text Line",
    description:
      "Text with a trained crisis counselor. Available anytime you need someone to talk to.",
    category: "crisis",
    type: "chat",
    availability: "24/7",
    cost: "Free",
    tags: ["crisis", "text", "immediate"],
    url: "https://www.crisistextline.org",
  },
  {
    id: "teen-line",
    title: "Teen Line",
    description:
      "Peer support for teens, by teens. Talk to someone who understands what you're going through.",
    category: "peer",
    type: "hotline",
    availability: "Evenings",
    cost: "Free",
    tags: ["teens", "peer support", "phone"],
    url: "https://teenlineonline.org",
  },
  {
    id: "nami",
    title: "NAMI HelpLine",
    description:
      "Information, resource referrals, and support for individuals and families affected by mental health conditions.",
    category: "education",
    type: "website",
    availability: "Mon–Fri, 10am–10pm ET",
    cost: "Free",
    tags: ["information", "families", "resources"],
    url: "https://www.nami.org",
  },
  {
    id: "betterhelp",
    title: "BetterHelp",
    description:
      "Online counseling platform connecting you with licensed therapists via messaging, phone, or video.",
    category: "counseling",
    type: "app",
    availability: "Flexible scheduling",
    cost: "Paid (may accept insurance)",
    tags: ["therapy", "online", "licensed"],
    url: "https://www.betterhelp.com",
  },
  {
    id: "headspace",
    title: "Headspace",
    description:
      "Guided meditation and mindfulness exercises designed to help manage stress and improve sleep.",
    category: "self-care",
    type: "app",
    availability: "On demand",
    cost: "Free tier available",
    tags: ["meditation", "mindfulness", "sleep"],
    url: "https://www.headspace.com",
  },
  {
    id: "7cups",
    title: "7 Cups",
    description:
      "Free emotional support through trained listeners. Connect anonymously anytime.",
    category: "peer",
    type: "chat",
    availability: "24/7",
    cost: "Free",
    tags: ["peer support", "chat", "anonymous"],
    url: "https://www.7cups.com",
  },
  {
    id: "school-counselor",
    title: "School Counselor",
    description:
      "Your school's counseling office can provide support, referrals, and a safe space to talk.",
    category: "counseling",
    type: "local",
    availability: "School hours",
    cost: "Free",
    tags: ["local", "school", "in-person"],
  },
];

export const moodOptions = [
  { value: "overwhelmed", label: "Overwhelmed", color: "bg-warm-200 text-warm-900" },
  { value: "anxious", label: "Anxious", color: "bg-sage-100 text-sage-800" },
  { value: "sad", label: "Sad or down", color: "bg-warm-100 text-warm-600" },
  { value: "numb", label: "Numb or empty", color: "bg-warm-100 text-warm-600" },
  { value: "confused", label: "Confused", color: "bg-sage-100 text-sage-600" },
  { value: "okay", label: "Just okay", color: "bg-sage-100 text-sage-600" },
  { value: "hopeful", label: "Hopeful", color: "bg-sage-200 text-sage-800" },
  { value: "unsure", label: "Not sure", color: "bg-warm-100 text-warm-600" },
];

export const checkInGuidance: Record<string, string[]> = {
  overwhelmed: [
    "It sounds like a lot is weighing on you right now. That feeling is valid, and you don't have to carry it all at once.",
    "Sometimes breaking things into the smallest possible step — even just taking a few deep breaths — can help create a little space.",
    "Consider whether there's one small thing you could set aside for today, just to give yourself room to breathe.",
  ],
  anxious: [
    "Anxiety can make everything feel urgent and overwhelming. Your body is trying to protect you, even when it doesn't feel helpful.",
    "Grounding techniques — like naming five things you can see — can sometimes help your nervous system settle.",
    "If the worry has been persistent, talking to someone you trust might help you feel less alone with it.",
  ],
  sad: [
    "Feeling sad or down is a human experience, not a weakness. It takes courage to acknowledge it.",
    "Be gentle with yourself today. Small acts of self-care — rest, water, a walk — can matter more than they seem.",
    "If this feeling has lasted a while or feels heavy, reaching out to a counselor or trusted adult could be a supportive next step.",
  ],
  numb: [
    "Feeling numb or disconnected can be your mind's way of coping when things feel like too much.",
    "You don't need to force yourself to feel something right now. Just noticing this state is a meaningful step.",
    "If emptiness has been ongoing, a conversation with someone supportive — even starting with 'I haven't been feeling like myself' — can help.",
  ],
  confused: [
    "Not having clear answers about how you feel is completely okay. Emotions aren't always neat or easy to name.",
    "You might try writing down whatever comes to mind without editing — sometimes clarity emerges slowly.",
    "A trusted person or counselor can help you sort through mixed feelings without pressure to have it all figured out.",
  ],
  okay: [
    "Checking in when things feel 'just okay' is a healthy habit. Not every day has to be great or terrible.",
    "This might be a good time to notice what's going well, however small, and build on it.",
    "Regular check-ins can help you catch shifts in how you're feeling before they become harder to manage.",
  ],
  hopeful: [
    "It's wonderful that you're noticing some hope. That awareness is worth holding onto.",
    "Consider what contributed to this feeling — understanding your supports can help you access them again.",
    "Sharing good moments with someone you trust can strengthen connections and reinforce what's working.",
  ],
  unsure: [
    "Not knowing exactly how you feel is more common than you might think. You're still doing something meaningful by checking in.",
    "Try not to pressure yourself to label it perfectly. 'Something feels off' or 'I'm not myself' are valid starting points.",
    "If you'd like help exploring this further, our resources page or a conversation with someone you trust could be helpful.",
  ],
};

export const privacyPoints = [
  {
    icon: Shield,
    title: "Use without an account",
    description:
      "Start a check-in as a guest. We don't require sign-up to explore the platform or reflect on how you're feeling.",
  },
  {
    icon: BookOpen,
    title: "You're in control",
    description:
      "Choose what to share, what to save, and what to delete. Your check-in data stays on your device for now.",
  },
  {
    icon: Phone,
    title: "Clear boundaries",
    description:
      "Unspoken is a support tool, not a replacement for professional care. We always show you where to find qualified help.",
  },
];

export const resourceCategories = [
  { value: "all", label: "All resources" },
  { value: "crisis", label: "Crisis support" },
  { value: "counseling", label: "Counseling" },
  { value: "peer", label: "Peer support" },
  { value: "education", label: "Information" },
  { value: "self-care", label: "Self-care" },
];

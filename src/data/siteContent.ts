import { BookOpen, Compass, Heart, MessageCircle, MessageSquare, Phone, Shield, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
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

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

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

export interface JourneyStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
}

export const journeySteps: JourneyStep[] = [
  {
    step: 1,
    title: "Check in",
    description: "Share how you're feeling, its intensity, and how long it's been going on.",
    icon: Heart,
    href: "/check-in",
  },
  {
    step: 2,
    title: "Reflect",
    description: "Note what areas of life it's touching and add your own words, if you want to.",
    icon: BookOpen,
    href: "/check-in",
  },
  {
    step: 3,
    title: "Choose a next step",
    description: "Get a calm, non-diagnostic response with one coping idea and one next step.",
    icon: Compass,
    href: "/support",
  },
  {
    step: 4,
    title: "Prepare what to say",
    description: "Draft a message to a parent, counselor, teacher, doctor, therapist, or friend.",
    icon: MessageSquare,
    href: "/help-me-say-it",
  },
  {
    step: 5,
    title: "Connect with support",
    description: "Browse resources by location and format, and save the ones worth following up on.",
    icon: Users,
    href: "/resources",
  },
];

export const privacyPoints: { icon: LucideIcon; title: string; description: string }[] = [
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

import {
  Brain,
  GraduationCap,
  HelpCircle,
  Home,
  MessageCircle,
  MessageSquare,
  Sparkles,
  Stethoscope,
  Users,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type {
  DesiredOutcome,
  Duration,
  Feeling,
  Intensity,
  MessageTone,
  RecipientType,
  SupportResponse,
  SupportType,
} from "@/types/checkIn";

export const feelingOptions: { value: Feeling; label: string }[] = [
  { value: "stressed", label: "Stressed" },
  { value: "anxious", label: "Anxious" },
  { value: "sad", label: "Sad" },
  { value: "lonely", label: "Lonely" },
  { value: "overwhelmed", label: "Overwhelmed" },
  { value: "frustrated", label: "Frustrated" },
  { value: "confused", label: "Confused" },
  { value: "other", label: "Other" },
];

export const intensityOptions: { value: Intensity; label: string; description: string }[] = [
  { value: "mild", label: "A little", description: "It's there, but manageable." },
  { value: "moderate", label: "Somewhat", description: "Noticeable through the day." },
  { value: "strong", label: "Quite a bit", description: "Hard to set aside or ignore." },
  { value: "intense", label: "A lot", description: "Feels like it's taking over." },
];

export const durationOptions: { value: Duration; label: string }[] = [
  { value: "today", label: "Just today" },
  { value: "few-days", label: "A few days" },
  { value: "week", label: "About a week" },
  { value: "few-weeks", label: "A few weeks" },
  { value: "month-plus", label: "A month or more" },
];

export const lifeAreaOptions: { value: string; label: string }[] = [
  { value: "school-work", label: "School or work" },
  { value: "friendships", label: "Friendships" },
  { value: "family", label: "Family" },
  { value: "relationship", label: "A relationship" },
  { value: "sleep", label: "Sleep" },
  { value: "health", label: "Physical health" },
  { value: "motivation", label: "Motivation or focus" },
  { value: "other", label: "Something else" },
];

export const supportOptions: {
  value: SupportType;
  label: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    value: "reflect",
    label: "Just wanted to reflect",
    description: "No action needed right now — checking in was enough.",
    icon: Sparkles,
  },
  {
    value: "coping",
    label: "Coping strategies",
    description: "Ideas for managing how you're feeling day to day.",
    icon: Wind,
  },
  {
    value: "talk",
    label: "Prepare to talk to someone",
    description: "Help finding the words to reach out to someone you trust.",
    icon: MessageSquare,
  },
  {
    value: "resources",
    label: "Find a resource",
    description: "Explore support options that fit your situation.",
    icon: Users,
  },
  {
    value: "unsure",
    label: "Not sure yet",
    description: "That's okay — we'll show you a few gentle options.",
    icon: HelpCircle,
  },
];

/**
 * Mock, non-diagnostic response content keyed by feeling. Stands in for a
 * real generated response — no AI involved yet. Wording deliberately avoids
 * labeling ("you have anxiety"), guarantees ("this will fix it"), or false
 * equivalence ("I know exactly how you feel").
 */
export const supportResponses: Record<Feeling, SupportResponse> = {
  stressed: {
    empathy:
      "It sounds like you've been carrying a lot recently. You don't have to solve everything immediately.",
    immediateAction:
      "Try taking five slow breaths — in through your nose, out through your mouth — before doing anything else.",
    nextStep:
      "Writing down what's been affecting you most, or speaking with someone you trust, may be a useful next step.",
  },
  anxious: {
    empathy:
      "It makes sense that your mind has felt like it's racing. That's a common response when things feel uncertain.",
    immediateAction:
      "Try grounding yourself by naming five things you can see around you right now.",
    nextStep:
      "Talking to someone you trust about what's on your mind, even briefly, may help it feel less overwhelming.",
  },
  sad: {
    empathy:
      "It sounds like things have felt heavy lately. That's a real experience, and not something you have to sit with alone.",
    immediateAction:
      "Try doing one small, gentle thing for yourself right now — a glass of water, a short walk, or a few quiet minutes.",
    nextStep:
      "Sharing how you've been feeling with someone you trust may help lighten the weight of it.",
  },
  lonely: {
    empathy:
      "It sounds like you've been feeling disconnected from others, even if people are around. That's a hard place to sit with.",
    immediateAction:
      "Consider sending a low-pressure message to someone — even just checking in can open a door.",
    nextStep:
      "Reaching out to one person you trust, even briefly, may help the feeling of isolation ease a little.",
  },
  overwhelmed: {
    empathy:
      "It sounds like a lot has been piling up at once. You don't have to handle all of it right this moment.",
    immediateAction:
      "Try picking just one small task and setting the rest aside for now, even if only for the next hour.",
    nextStep:
      "Writing down what's been affecting you most, or talking it through with someone you trust, may help you sort out what needs attention first.",
  },
  frustrated: {
    empathy:
      "It sounds like something has been building up and feels hard to shake off. That reaction makes sense.",
    immediateAction:
      "Try stepping away for a few minutes — a short walk or a change of scenery can take some of the edge off.",
    nextStep:
      "Talking through what's frustrating you with someone you trust may help you see it from a different angle.",
  },
  confused: {
    empathy:
      "It sounds like things feel unclear right now, and that's okay — not every feeling needs an immediate explanation.",
    immediateAction:
      "Try writing down whatever comes to mind without editing it — sometimes that helps things feel a little clearer.",
    nextStep:
      "Talking it through with someone you trust may help you sort through what you're feeling without pressure to have it all figured out.",
  },
  other: {
    empathy:
      "It sounds like you're experiencing something that doesn't fit neatly into a single word, and that's completely okay.",
    immediateAction:
      "Try taking a few slow breaths and giving yourself a moment before doing anything else.",
    nextStep:
      "Describing what's going on to someone you trust, even imperfectly, may be a useful next step.",
  },
};

export const intensityQualifiers: Record<Intensity, string> = {
  mild: "even in a smaller way",
  moderate: "in a way that's been noticeable",
  strong: "in a way that's been hard to set aside",
  intense: "in a way that's felt like a lot to carry",
};

export const recipientOptions: {
  value: RecipientType;
  label: string;
  icon: LucideIcon;
}[] = [
  { value: "parent", label: "A parent or guardian", icon: Home },
  { value: "counselor", label: "A school counselor", icon: Users },
  { value: "teacher", label: "A teacher", icon: GraduationCap },
  { value: "doctor", label: "A doctor", icon: Stethoscope },
  { value: "therapist", label: "A therapist", icon: Brain },
  { value: "friend", label: "A trusted friend", icon: MessageCircle },
];

export const toneOptions: {
  value: MessageTone;
  label: string;
  description: string;
}[] = [
  { value: "casual", label: "Casual", description: "Relaxed, like texting a friend." },
  { value: "direct", label: "Direct", description: "Clear and to the point." },
  { value: "formal", label: "Formal", description: "Polite and a little more structured." },
];

export const desiredOutcomeOptions: {
  value: DesiredOutcome;
  label: string;
  description: string;
}[] = [
  {
    value: "inform",
    label: "Just wanted them to know",
    description: "No specific ask — just being open about it.",
  },
  {
    value: "talk-together",
    label: "Talk it through together",
    description: "Have a conversation and figure things out together.",
  },
  {
    value: "ask-for-support",
    label: "Ask for their help or support",
    description: "Get some concrete help, not just a listening ear.",
  },
  {
    value: "check-in-more",
    label: "Have them check in on me more",
    description: "Feel less alone in this going forward.",
  },
  {
    value: "not-sure",
    label: "Not sure yet",
    description: "That's okay — the message can stay open-ended.",
  },
];

const toneGreetings: Record<MessageTone, string> = {
  casual: "Hey,",
  direct: "Hi,",
  formal: "Hello,",
};

const toneAsks: Record<MessageTone, string> = {
  casual: "Would you have some time to talk soon?",
  direct: "Can we talk about this soon?",
  formal: "Would it be possible to find some time to talk about this?",
};

const feelingContext: Record<Feeling, string> = {
  stressed: "I've been feeling pretty stressed lately and it's been hard to shake off.",
  anxious: "I've been feeling really anxious lately, more than usual.",
  sad: "I've been feeling pretty sad lately.",
  lonely: "I've been feeling pretty lonely lately, even when I'm around other people.",
  overwhelmed: "I've been feeling overwhelmed lately, like there's too much going on at once.",
  frustrated: "I've been feeling frustrated lately and I can't quite shake it.",
  confused: "I've been feeling confused about how I've been doing lately.",
  other: "I've been going through something lately that's been a little hard to put into words.",
};

/** Short natural-language situation summary for a feeling — used as the `situation` field sent to the AI message generator. */
export function describeSituation(feeling: Feeling): string {
  return feelingContext[feeling];
}

const recipientContext: Record<RecipientType, string> = {
  parent: "I wanted to talk to you about it because I trust you and thought you should know.",
  counselor:
    "I thought it might help to talk to you about it, since I know that's part of what you're there for.",
  teacher: "I wanted to let you know in case it's been affecting how I've been showing up in class.",
  doctor: "I think it might be worth mentioning at my next appointment, or sooner if that's possible.",
  therapist: "I wanted to bring this up so we can talk through it together.",
  friend: "I'm not looking for advice — just someone to listen.",
};

export function buildSayItMessage({
  recipient,
  feeling,
  tone,
  detail,
}: {
  recipient: RecipientType;
  feeling: Feeling;
  tone: MessageTone;
  detail?: string;
}): string {
  const parts = [
    toneGreetings[tone],
    feelingContext[feeling],
    detail?.trim() ? detail.trim() : null,
    recipientContext[recipient],
    toneAsks[tone],
  ].filter((part): part is string => Boolean(part));

  return parts.join(" ");
}

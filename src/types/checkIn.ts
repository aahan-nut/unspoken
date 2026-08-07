export type Feeling =
  | "stressed"
  | "anxious"
  | "sad"
  | "lonely"
  | "overwhelmed"
  | "frustrated"
  | "confused"
  | "other";

export type Intensity = "mild" | "moderate" | "strong" | "intense";

export type Duration = "today" | "few-days" | "week" | "few-weeks" | "month-plus";

export type SupportType = "reflect" | "coping" | "talk" | "resources" | "unsure";

export interface SupportResponse {
  empathy: string;
  immediateAction: string;
  nextStep: string;
}

export type RecipientType =
  | "parent"
  | "counselor"
  | "teacher"
  | "doctor"
  | "therapist"
  | "friend";

export type MessageTone = "casual" | "direct" | "formal";

export type DesiredOutcome =
  | "inform"
  | "talk-together"
  | "ask-for-support"
  | "check-in-more"
  | "not-sure";

export interface CheckInResponses {
  feeling: Feeling | null;
  intensity: Intensity | null;
  duration: Duration | null;
  lifeAreas: string[];
  reflection: string;
  support: SupportType | null;
  completedAt: string;
}

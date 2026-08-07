import type {
  AgeGroup,
  Resource,
  ResourceModality,
  ResourceSort,
  SavedStatus,
  SupportCategory,
} from "@/types/resource";

/**
 * Sample resource directory for this frontend prototype. Standing in for a
 * real provider database — see AGENTS.md / privacy page for the mock-data
 * disclaimer shown to users.
 */
export const resources: Resource[] = [
  {
    id: "0f7b13c0-e102-479a-9977-463fe6ffb163", // was "988"
    title: "988 Suicide & Crisis Lifeline",
    description:
      "Free, confidential support for people in distress, prevention and crisis resources.",
    category: "crisis",
    type: "hotline",
    availability: "24/7",
    modality: "virtual",
    city: "National (US)",
    zip: null,
    distanceMiles: null,
    ageGroups: ["all-ages"],
    languages: ["English", "Spanish"],
    costCategory: "free",
    cost: "Free",
    insuranceAccepted: false,
    phone: "988",
    lastVerified: "2026-06-01",
    tags: ["crisis", "immediate", "phone"],
    url: "tel:988",
  },
  {
    id: "74ee6718-b16d-45f7-b871-4a918a5b6d90", // was "crisis-text"
    title: "Crisis Text Line",
    description:
      "Text with a trained crisis counselor. Available anytime you need someone to talk to.",
    category: "crisis",
    type: "chat",
    availability: "24/7",
    modality: "virtual",
    city: "National (US)",
    zip: null,
    distanceMiles: null,
    ageGroups: ["all-ages"],
    languages: ["English", "Spanish"],
    costCategory: "free",
    cost: "Free",
    insuranceAccepted: false,
    phone: "741741",
    lastVerified: "2026-06-01",
    tags: ["crisis", "text", "immediate"],
    url: "https://www.crisistextline.org",
  },
  {
    id: "26028540-1bee-4fc2-883a-e061997eca3a", // was "teen-line"
    title: "Teen Line",
    description:
      "Peer support for teens, by teens. Talk to someone who understands what you're going through.",
    category: "peer",
    type: "hotline",
    availability: "Evenings",
    modality: "virtual",
    city: "Los Angeles, CA",
    zip: null,
    distanceMiles: null,
    ageGroups: ["teens"],
    languages: ["English", "Spanish"],
    costCategory: "free",
    cost: "Free",
    insuranceAccepted: false,
    phone: "310-855-4673",
    lastVerified: "2026-05-12",
    tags: ["teens", "peer support", "phone"],
    url: "https://teenlineonline.org",
  },
  {
    id: "b236de3c-ab1a-407f-9742-0251a87b7544", // was "nami"
    title: "NAMI HelpLine",
    description:
      "Information, resource referrals, and support for individuals and families affected by mental health conditions.",
    category: "education",
    type: "website",
    availability: "Mon–Fri, 10am–10pm ET",
    modality: "virtual",
    city: "National (US)",
    zip: null,
    distanceMiles: null,
    ageGroups: ["all-ages"],
    languages: ["English", "Spanish"],
    costCategory: "free",
    cost: "Free",
    insuranceAccepted: false,
    phone: "800-950-6264",
    lastVerified: "2026-04-20",
    tags: ["information", "families", "resources"],
    url: "https://www.nami.org",
  },
  {
    id: "14545f97-3c20-4c1b-bb36-a5b275dd0723", // was "betterhelp"
    title: "BetterHelp",
    description:
      "Online counseling platform connecting you with licensed therapists via messaging, phone, or video.",
    category: "counseling",
    type: "app",
    availability: "Flexible scheduling",
    modality: "virtual",
    city: "National (US)",
    zip: null,
    distanceMiles: null,
    ageGroups: ["young-adults", "adults"],
    languages: ["English", "Spanish", "French"],
    costCategory: "paid",
    cost: "Paid (may accept insurance)",
    insuranceAccepted: true,
    lastVerified: "2026-05-30",
    tags: ["therapy", "online", "licensed"],
    url: "https://www.betterhelp.com",
  },
  {
    id: "b1632736-4422-42d4-bdb8-bb99aace40de", // was "headspace"
    title: "Headspace",
    description:
      "Guided meditation and mindfulness exercises designed to help manage stress and improve sleep.",
    category: "self-care",
    type: "app",
    availability: "On demand",
    modality: "virtual",
    city: "National (US)",
    zip: null,
    distanceMiles: null,
    ageGroups: ["all-ages"],
    languages: ["English", "Spanish"],
    costCategory: "low-cost",
    cost: "Free tier / paid upgrade",
    insuranceAccepted: false,
    lastVerified: "2026-03-15",
    tags: ["meditation", "mindfulness", "sleep"],
    url: "https://www.headspace.com",
  },
  {
    id: "b5db274e-57c3-4163-bb4c-24505e75ad08", // was "7cups"
    title: "7 Cups",
    description:
      "Free emotional support through trained listeners. Connect anonymously anytime.",
    category: "peer",
    type: "chat",
    availability: "24/7",
    modality: "virtual",
    city: "National (US)",
    zip: null,
    distanceMiles: null,
    ageGroups: ["all-ages"],
    languages: ["English", "Spanish", "Portuguese"],
    costCategory: "free",
    cost: "Free",
    insuranceAccepted: false,
    lastVerified: "2026-06-10",
    tags: ["peer support", "chat", "anonymous"],
    url: "https://www.7cups.com",
  },
  {
    id: "696dd5c0-7914-40c5-81d3-b1c48bca6074", // was "school-counselor"
    title: "School Counselor",
    description:
      "Your school's counseling office can provide support, referrals, and a safe space to talk.",
    category: "counseling",
    type: "local",
    availability: "School hours",
    modality: "in-person",
    city: "Austin, TX",
    zip: "78701",
    distanceMiles: 0.5,
    ageGroups: ["teens"],
    languages: ["English"],
    costCategory: "free",
    cost: "Free",
    insuranceAccepted: false,
    address: "Your school's counseling office",
    lastVerified: "2026-02-01",
    tags: ["local", "school", "in-person"],
  },
  {
    id: "62b4200b-19d9-49a5-a1e5-eabd8551b000", // was "bright-path-counseling"
    title: "Bright Path Counseling Center",
    description:
      "Community counseling center offering individual and family therapy on a sliding-scale fee, with evening appointments for students.",
    category: "counseling",
    type: "local",
    availability: "Mon–Sat, 9am–7pm",
    modality: "both",
    city: "Austin, TX",
    zip: "78701",
    distanceMiles: 2.4,
    ageGroups: ["teens", "young-adults", "adults"],
    languages: ["English", "Spanish"],
    costCategory: "sliding-scale",
    cost: "Sliding scale ($20–60/session)",
    insuranceAccepted: true,
    phone: "512-555-0142",
    address: "1200 Congress Ave, Austin, TX 78701",
    lastVerified: "2026-06-18",
    tags: ["therapy", "sliding-scale", "family"],
    url: "https://example.org/bright-path-counseling",
  },
  {
    id: "f3042a83-62c2-4897-821c-95a6aed20885", // was "riverside-clinic"
    title: "Riverside Community Health Clinic",
    description:
      "Community health clinic with on-site behavioral health providers and same-week appointments for new patients.",
    category: "counseling",
    type: "local",
    availability: "Mon–Fri, 8am–5pm",
    modality: "in-person",
    city: "Austin, TX",
    zip: "78704",
    distanceMiles: 5.1,
    ageGroups: ["all-ages"],
    languages: ["English", "Vietnamese", "Spanish"],
    costCategory: "sliding-scale",
    cost: "Sliding scale, insurance accepted",
    insuranceAccepted: true,
    phone: "512-555-0198",
    address: "4200 Riverside Dr, Austin, TX 78704",
    lastVerified: "2026-05-22",
    tags: ["clinic", "same-week", "behavioral health"],
    url: "https://example.org/riverside-clinic",
  },
  {
    id: "c1dd05c1-e4bf-4cc3-9744-20a862fe747e", // was "teen-wellness-circle"
    title: "Teen Wellness Circle",
    description:
      "Drop-in peer support group for teens, facilitated by a youth counselor. No appointment or diagnosis needed to attend.",
    category: "peer",
    type: "local",
    availability: "Thursdays, 5–6:30pm",
    modality: "in-person",
    city: "Austin, TX",
    zip: "78702",
    distanceMiles: 3.0,
    ageGroups: ["teens"],
    languages: ["English"],
    costCategory: "free",
    cost: "Free",
    insuranceAccepted: false,
    address: "900 E 5th St, Austin, TX 78702",
    lastVerified: "2026-06-05",
    tags: ["peer support", "drop-in", "teens"],
    url: "https://example.org/teen-wellness-circle",
  },
];

export const resourceCategories: { value: "all" | SupportCategory; label: string }[] = [
  { value: "all", label: "All resources" },
  { value: "crisis", label: "Crisis support" },
  { value: "counseling", label: "Counseling" },
  { value: "peer", label: "Peer support" },
  { value: "education", label: "Information" },
  { value: "self-care", label: "Self-care" },
];

export const modalityOptions: {
  value: "all" | ResourceModality;
  label: string;
}[] = [
  { value: "all", label: "In-person or virtual" },
  { value: "in-person", label: "In-person" },
  { value: "virtual", label: "Virtual" },
];

export const ageGroupOptions: { value: "all" | AgeGroup; label: string }[] = [
  { value: "all", label: "Any age" },
  { value: "teens", label: "Teens (13–17)" },
  { value: "young-adults", label: "Young adults (18–25)" },
  { value: "adults", label: "Adults (26+)" },
];

export const languageOptions: { value: string; label: string }[] = [
  { value: "all", label: "Any language" },
  { value: "English", label: "English" },
  { value: "Spanish", label: "Spanish" },
  { value: "Vietnamese", label: "Vietnamese" },
  { value: "Portuguese", label: "Portuguese" },
  { value: "French", label: "French" },
];

export const resourceSortOptions: { value: ResourceSort; label: string }[] = [
  { value: "relevance", label: "Most relevant" },
  { value: "distance", label: "Distance (nearest)" },
  { value: "recent", label: "Recently verified" },
  { value: "name", label: "Name (A–Z)" },
];

export const savedStatusOptions: { value: SavedStatus; label: string }[] = [
  { value: "saved", label: "Saved" },
  { value: "planning", label: "Planning to contact" },
  { value: "contacted", label: "Contacted" },
  { value: "appointment", label: "Appointment scheduled" },
  { value: "not-a-fit", label: "Not a fit" },
];

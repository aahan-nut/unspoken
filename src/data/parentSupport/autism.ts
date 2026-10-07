import type { ConditionConfig } from "@/types/parentSupport";

/**
 * All Autism-page content and config lives here — the page component itself
 * (components/parents/ConditionPageContent.tsx) is shared with ADHD and
 * driven entirely by this data, so adding a future condition means adding a
 * new file like this one rather than a new page.
 */
export const autismConfig: ConditionConfig = {
  slug: "autism",
  name: "Autism",
  fullName: "Autism Spectrum Disorder",
  tagline: "Understand autism, find your next step, and connect with support built around your family.",
  overviewParagraphs: [
    "Autism spectrum disorder (autism) describes differences in how a person communicates, interacts with others, experiences their senses, and engages with the world around them. It's called a “spectrum” because autism looks different from person to person — there is no single way autism shows up.",
    "Autistic children have a wide range of needs and strengths, and no two children are the same. Some children may need significant day-to-day support, while others may need support in specific situations or settings. What's consistent is that early information, appropriate support, and understanding can make a meaningful difference.",
    "This section is here to help you understand general information, consider your next steps, and find resources — not to diagnose your child or replace guidance from a qualified professional. Only a licensed provider can evaluate and diagnose autism.",
  ],
  situations: [
    {
      id: "concerns",
      label: "I'm noticing developmental or behavioral differences and have concerns",
    },
    {
      id: "diagnosed",
      label: "My child was recently diagnosed",
    },
    {
      id: "school",
      label: "I need help navigating school support",
    },
    {
      id: "ongoing",
      label: "I'm looking for ongoing services or community support",
    },
  ],
  guidanceBySituation: {
    concerns: {
      understand:
        "Noticing differences in how your child communicates, plays, or responds to their environment can bring up a lot of questions. These differences are common and can have many explanations — only a qualified professional can determine what's going on for your child.",
      nextSteps: [
        "Talk with your child's pediatrician about what you've noticed",
        "Write down specific examples of what you're observing, including when and where they happen",
        "Ask about a developmental screening",
        "Learn about early intervention services in your area",
        "Connect with other parents who have navigated similar questions",
      ],
      questions: [
        "What developmental screening tools do you use, and what do they measure?",
        "What would the next steps look like if a referral is recommended?",
        "Are there early intervention programs you'd recommend I look into?",
        "What should I be tracking or documenting between now and our next visit?",
      ],
    },
    diagnosed: {
      understand:
        "A recent diagnosis can bring a mix of emotions — relief, uncertainty, grief, or all of them at once. It's normal to need time to process this, and there's no single “right” way to feel. A diagnosis is a starting point for understanding your child's needs, not a prediction of who they'll become.",
      nextSteps: [
        "Give yourself and your family time to process the news",
        "Ask your child's care team what services and evaluations are recommended next",
        "Learn about your child's specific evaluation results and what they mean",
        "Look into early intervention or school-based services",
        "Connect with a local or online autism family support group",
      ],
      questions: [
        "What were the specific findings from this evaluation?",
        "What services or therapies are typically recommended at this stage?",
        "How do we get connected with early intervention or school services?",
        "What resources do you recommend for our family right now?",
      ],
    },
    school: {
      understand:
        "Schools have specific processes for identifying and supporting students with developmental or learning needs. Navigating evaluations, meetings, and paperwork can feel overwhelming, especially if this is new to your family.",
      nextSteps: [
        "Request a meeting with your child's teacher or school counselor",
        "Ask about requesting a formal school evaluation in writing",
        "Learn the difference between an IEP and a 504 plan",
        "Keep copies of all school communications and evaluations",
        "Prepare specific examples of classroom challenges to share with the school",
      ],
      questions: [
        "How do we formally request an evaluation for services?",
        "What's the difference between an IEP and a 504 plan, and which might fit my child?",
        "Who will be part of the evaluation and planning team?",
        "How will progress be measured and communicated with us?",
      ],
    },
    ongoing: {
      understand:
        "Every family's needs look different over time. Whether you're looking for therapy services, community programs, or day-to-day support, it can take some trial and error to find what fits your family well.",
      nextSteps: [
        "Identify which type of support would help most right now (therapy, community, respite, etc.)",
        "Ask your child's care team or school for referrals",
        "Look into local autism support organizations and programs",
        "Explore options for connecting with other parents",
        "Check what services your insurance or state programs may cover",
      ],
      questions: [
        "What types of ongoing services would you recommend for my child's needs?",
        "Are there waitlists I should plan for, and how do we get on them?",
        "What community programs or family support groups do you know of?",
        "How do we know if a service or provider is a good fit?",
      ],
    },
  },
  resourceCategories: [
    { value: "understanding", label: "Understanding Autism" },
    { value: "screening", label: "Developmental Concerns & Screening" },
    { value: "school-support", label: "School & Educational Support" },
    { value: "family-support", label: "Family Support" },
    { value: "community-programs", label: "Community Programs" },
    { value: "professional-services", label: "Professional Services" },
    { value: "transition-support", label: "Transition & Long-Term Support" },
    { value: "trusted-external", label: "Trusted External Resources" },
  ],
  nearbyCategoryOptions: [
    { value: "autism-support", label: "Autism support organization" },
    { value: "developmental-pediatrics", label: "Developmental pediatric services" },
    { value: "occupational-therapy", label: "Occupational therapy" },
    { value: "speech-therapy", label: "Speech-language services" },
    { value: "behavioral-health-center", label: "Behavioral health center" },
    { value: "family-support", label: "Family support organization" },
  ],
  nearbyDefaultCategory: "autism-support",
};

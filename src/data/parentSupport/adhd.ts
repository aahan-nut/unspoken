import type { ConditionConfig } from "@/types/parentSupport";

export const adhdConfig: ConditionConfig = {
  slug: "adhd",
  name: "ADHD",
  fullName: "Attention-Deficit/Hyperactivity Disorder (ADHD)",
  tagline: "Understand ADHD, find your next step, and connect with support built around your family.",
  overviewParagraphs: [
    "ADHD (attention-deficit/hyperactivity disorder) describes ongoing differences in attention, activity level, organization, or impulse control that are frequent enough, and present across enough settings, to affect daily life. Every child's attention and energy naturally vary — what matters is the pattern and impact over time.",
    "Attention, activity level, and impulse-control challenges may have many different causes, including sleep, anxiety, learning differences, or a child's environment. A professional evaluation is required to understand what's contributing to what you're seeing and whether an ADHD diagnosis fits.",
    "This section is here to help you understand general information, consider next steps, and find resources — not to diagnose your child, suggest medication, or replace guidance from a qualified professional.",
  ],
  situations: [
    {
      id: "concerns",
      label: "I'm concerned about attention, impulsivity, or behavior",
    },
    {
      id: "diagnosed",
      label: "My child was recently diagnosed",
    },
    {
      id: "school",
      label: "Schoolwork or classroom behavior is becoming difficult",
    },
    {
      id: "ongoing",
      label: "I'm looking for ongoing support and strategies",
    },
  ],
  guidanceBySituation: {
    concerns: {
      understand:
        "Attention, activity level, organization, and impulse control naturally vary a lot between children and change with age. When these challenges are frequent, intense, or affecting daily life across settings, it may be worth exploring further — but many factors besides ADHD can contribute, and only a professional evaluation can determine the cause.",
      nextSteps: [
        "Talk with your child's pediatrician about what you're noticing",
        "Track specific behaviors, along with when and where they happen",
        "Ask whether a formal evaluation is appropriate",
        "Request input from your child's teacher about classroom behavior",
        "Learn about the evaluation process before your appointment",
      ],
      questions: [
        "What's involved in an ADHD evaluation for a child this age?",
        "What other conditions can look similar to ADHD?",
        "What information should I gather beforehand?",
        "Who typically conducts this kind of evaluation?",
      ],
    },
    diagnosed: {
      understand:
        "A recent ADHD diagnosis is a starting point for understanding how your child's brain works and what kind of support helps them thrive — not a judgment about their character, intelligence, or potential. Many effective supports and strategies exist, and what works best varies by child.",
      nextSteps: [
        "Take time to understand your child's specific evaluation results",
        "Ask your child's provider what support options are typically considered",
        "Talk with your child's school about classroom accommodations",
        "Learn about behavioral strategies that support routines and organization",
        "Connect with other parents navigating an ADHD diagnosis",
      ],
      questions: [
        "What did this evaluation tell us about my child's specific needs?",
        "What support options are typically considered at this stage?",
        "Should we talk with the school about accommodations?",
        "How will we track what's working over time?",
      ],
    },
    school: {
      understand:
        "ADHD can affect focus, organization, and impulse control in ways that show up most clearly in a classroom setting. Schools have processes and supports designed to help, but figuring out where to start can be confusing.",
      nextSteps: [
        "Request a meeting with your child's teacher to discuss specific concerns",
        "Ask the school about a 504 plan or IEP evaluation",
        "Discuss classroom accommodations that could help (seating, breaks, instructions)",
        "Set up a simple home-school communication routine",
        "Keep records of report cards, teacher notes, and evaluations",
      ],
      questions: [
        "What accommodations are available for students with attention-related needs?",
        "How do we request a formal evaluation through the school?",
        "What's the difference between a 504 plan and an IEP for my child's situation?",
        "How will we know if the plan in place is working?",
      ],
    },
    ongoing: {
      understand:
        "Supporting a child with ADHD often means building routines, strategies, and a support network that evolves as your child grows. What helps in early elementary school may look different by middle school.",
      nextSteps: [
        "Identify which areas need the most support right now (routines, school, social skills, etc.)",
        "Ask your child's provider about strategies proven to help with organization and routines",
        "Look into local family support groups or parent training programs",
        "Revisit your child's school plan periodically as needs change",
        "Explore community or extracurricular programs that build on your child's strengths",
      ],
      questions: [
        "What strategies do you recommend for building routines at home?",
        "Are there parent training or support programs you'd recommend?",
        "How often should we revisit or update our child's support plan?",
        "What community programs might be a good fit for my child?",
      ],
    },
  },
  resourceCategories: [
    { value: "understanding", label: "Understanding ADHD" },
    { value: "evaluation-support", label: "Evaluation & Professional Support" },
    { value: "school-support", label: "School Support" },
    { value: "organization-routines", label: "Organization & Routines" },
    { value: "family-support", label: "Family Support" },
    { value: "community-services", label: "Community Services" },
    { value: "ongoing-resources", label: "Ongoing Resources" },
    { value: "trusted-external", label: "Trusted External Resources" },
  ],
  nearbyCategoryOptions: [
    { value: "pediatric-behavioral-health", label: "Pediatric behavioral health" },
    { value: "child-psychologist", label: "Child psychologist" },
    { value: "counselor", label: "Counseling services" },
    { value: "developmental-pediatrics", label: "Developmental pediatric services" },
    { value: "family-support", label: "Family support center" },
  ],
  nearbyDefaultCategory: "pediatric-behavioral-health",
};

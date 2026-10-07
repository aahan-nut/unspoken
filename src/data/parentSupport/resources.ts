import type { ParentResource } from "@/types/parentSupport";

/**
 * Mock/placeholder curated resources for the Parent Support section.
 * Organization names and top-level URLs are real, well-known national or
 * government organizations (matching the pattern used in data/mockResources.ts
 * for crisis lines) — but nothing here has been independently verified by
 * Unspoken, no phone numbers are included, and `verifiedAt` is intentionally
 * left unset. sourceLabel makes the placeholder status visible in the UI.
 * Replace entries here (or add more) as real, verified resources are vetted —
 * the shape (ParentResource) is stable either way.
 */
const SOURCE_LABEL = "Sample curated listing for this prototype — verify current details directly with the organization.";

export const parentResources: ParentResource[] = [
  // --- Autism ---
  {
    id: "autism-cdc-milestones",
    condition: "autism",
    title: "Learn the Signs. Act Early.",
    organization: "Centers for Disease Control and Prevention (CDC)",
    description:
      "Free developmental milestone checklists and guidance for tracking your child's development and knowing when to talk with a doctor.",
    resourceType: "screening",
    situationTags: ["concerns"],
    audience: ["parents", "caregivers"],
    websiteUrl: "https://www.cdc.gov/ncbddd/actearly/",
    isCurated: true,
    sourceLabel: SOURCE_LABEL,
  },
  {
    id: "autism-speaks-overview",
    condition: "autism",
    title: "First 100 Days Kit & Family Resource Guides",
    organization: "Autism Speaks",
    description:
      "Educational guides for families at every stage, from noticing early differences to navigating a recent diagnosis.",
    resourceType: "understanding",
    situationTags: ["concerns", "diagnosed"],
    audience: ["parents", "caregivers"],
    websiteUrl: "https://www.autismspeaks.org/",
    isCurated: true,
    sourceLabel: SOURCE_LABEL,
  },
  {
    id: "autism-society-community",
    condition: "autism",
    title: "Autism Society Affiliate Network",
    organization: "Autism Society of America",
    description:
      "A national network of local affiliates offering community programs, support groups, and information for autistic individuals and their families.",
    resourceType: "community-programs",
    situationTags: ["ongoing", "diagnosed"],
    audience: ["parents", "caregivers", "families"],
    websiteUrl: "https://autismsociety.org/",
    isCurated: true,
    sourceLabel: SOURCE_LABEL,
  },
  {
    id: "autism-cpir-school",
    condition: "autism",
    title: "Understanding IEPs, 504 Plans & School Evaluations",
    organization: "Center for Parent Information and Resources (CPIR)",
    description:
      "Guidance on IEPs, 504 plans, special education rights, and how to work with your child's school team.",
    resourceType: "school-support",
    situationTags: ["school"],
    audience: ["parents", "caregivers"],
    websiteUrl: "https://www.parentcenterhub.org/",
    isCurated: true,
    sourceLabel: SOURCE_LABEL,
  },
  {
    id: "autism-oar-professional",
    condition: "autism",
    title: "Research-Based Guides on Therapies & Services",
    organization: "Organization for Autism Research (OAR)",
    description:
      "Research-informed guides on therapies, professional services, and approaches for autistic children and teens.",
    resourceType: "professional-services",
    situationTags: ["diagnosed", "ongoing"],
    audience: ["parents", "caregivers"],
    websiteUrl: "https://researchautism.org/",
    isCurated: true,
    sourceLabel: SOURCE_LABEL,
  },
  {
    id: "autism-childmind-family",
    condition: "autism",
    title: "Autism Resource Center",
    organization: "Child Mind Institute",
    description:
      "Family-friendly articles on supporting an autistic child at home, managing stress, and caring for the whole family.",
    resourceType: "family-support",
    situationTags: ["diagnosed", "ongoing"],
    audience: ["parents", "caregivers", "siblings"],
    websiteUrl: "https://childmind.org/topics/autism/",
    isCurated: true,
    sourceLabel: SOURCE_LABEL,
  },
  {
    id: "autism-familyvoices-support",
    condition: "autism",
    title: "Family-to-Family Health Information Centers",
    organization: "Family Voices",
    description:
      "Peer-led support connecting families of children with developmental needs to other parents with lived experience.",
    resourceType: "family-support",
    situationTags: ["ongoing", "diagnosed"],
    audience: ["parents", "caregivers"],
    websiteUrl: "https://familyvoices.org/",
    isCurated: true,
    sourceLabel: SOURCE_LABEL,
  },
  {
    id: "autism-understood-transition",
    condition: "autism",
    title: "Planning for the Future",
    organization: "Understood.org",
    description:
      "Guidance on transition planning for autistic teens, including education, independence, and adult-services planning.",
    resourceType: "transition-support",
    situationTags: ["ongoing"],
    audience: ["parents", "caregivers"],
    websiteUrl: "https://www.understood.org/",
    isCurated: true,
    sourceLabel: SOURCE_LABEL,
  },
  {
    id: "autism-nichd-trusted",
    condition: "autism",
    title: "Autism Spectrum Disorder: Overview",
    organization: "National Institute of Child Health and Human Development (NICHD)",
    description:
      "Government-published overview of autism spectrum disorder, including general information on signs, causes, and diagnosis.",
    resourceType: "trusted-external",
    situationTags: ["concerns", "diagnosed"],
    audience: ["parents", "caregivers"],
    websiteUrl: "https://www.nichd.nih.gov/health/topics/autism",
    isCurated: true,
    sourceLabel: SOURCE_LABEL,
  },
  {
    id: "autism-aap-screening",
    condition: "autism",
    title: "Developmental Screening: What to Expect",
    organization: "American Academy of Pediatrics (HealthyChildren.org)",
    description:
      "Parent-facing guidance on developmental screening, what pediatricians look for, and how to prepare for a screening visit.",
    resourceType: "screening",
    situationTags: ["concerns"],
    audience: ["parents", "caregivers"],
    websiteUrl: "https://www.healthychildren.org/",
    isCurated: true,
    sourceLabel: SOURCE_LABEL,
  },

  // --- ADHD ---
  {
    id: "adhd-chadd-understanding",
    condition: "adhd",
    title: "About ADHD",
    organization: "CHADD (Children and Adults with ADHD)",
    description:
      "Foundational, parent-friendly information about what ADHD is, how it's understood today, and common myths to be aware of.",
    resourceType: "understanding",
    situationTags: ["concerns", "diagnosed"],
    audience: ["parents", "caregivers"],
    websiteUrl: "https://chadd.org/",
    isCurated: true,
    sourceLabel: SOURCE_LABEL,
  },
  {
    id: "adhd-nrc-evaluation",
    condition: "adhd",
    title: "Understanding the ADHD Evaluation Process",
    organization: "National Resource Center on ADHD (a CHADD program)",
    description:
      "Guidance on the ADHD evaluation process, what to expect, and questions to ask your child's provider.",
    resourceType: "evaluation-support",
    situationTags: ["concerns"],
    audience: ["parents", "caregivers"],
    websiteUrl: "https://chadd.org/nrc/",
    isCurated: true,
    sourceLabel: SOURCE_LABEL,
  },
  {
    id: "adhd-understood-school",
    condition: "adhd",
    title: "ADHD at School",
    organization: "Understood.org",
    description:
      "Practical guidance on 504 plans, IEPs, and classroom accommodations for students with attention-related needs.",
    resourceType: "school-support",
    situationTags: ["school"],
    audience: ["parents", "caregivers"],
    websiteUrl: "https://www.understood.org/",
    isCurated: true,
    sourceLabel: SOURCE_LABEL,
  },
  {
    id: "adhd-additude-routines",
    condition: "adhd",
    title: "Organization & Routines for Kids with ADHD",
    organization: "ADDitude Magazine",
    description:
      "Practical, parent-tested strategies for building routines, managing homework time, and supporting organization at home.",
    resourceType: "organization-routines",
    situationTags: ["ongoing", "school"],
    audience: ["parents", "caregivers"],
    websiteUrl: "https://www.additudemag.com/",
    isCurated: true,
    sourceLabel: SOURCE_LABEL,
  },
  {
    id: "adhd-chadd-family",
    condition: "adhd",
    title: "Local Chapters & Parent-to-Parent Support",
    organization: "CHADD",
    description:
      "Local chapters and trained parent-to-parent volunteers offering peer support for families navigating an ADHD diagnosis.",
    resourceType: "family-support",
    situationTags: ["diagnosed", "ongoing"],
    audience: ["parents", "caregivers"],
    websiteUrl: "https://chadd.org/chapters/",
    isCurated: true,
    sourceLabel: SOURCE_LABEL,
  },
  {
    id: "adhd-childmind-community",
    condition: "adhd",
    title: "ADHD Resource Center",
    organization: "Child Mind Institute",
    description:
      "Articles, guides, and community-oriented resources covering ADHD across childhood and adolescence.",
    resourceType: "community-services",
    situationTags: ["ongoing"],
    audience: ["parents", "caregivers"],
    websiteUrl: "https://childmind.org/topics/adhd/",
    isCurated: true,
    sourceLabel: SOURCE_LABEL,
  },
  {
    id: "adhd-cdc-ongoing",
    condition: "adhd",
    title: "ADHD: Information for Parents",
    organization: "Centers for Disease Control and Prevention (CDC)",
    description:
      "Ongoing guidance for parents on support options, behavior strategies, and monitoring your child's progress over time.",
    resourceType: "ongoing-resources",
    situationTags: ["diagnosed", "ongoing"],
    audience: ["parents", "caregivers"],
    websiteUrl: "https://www.cdc.gov/ncbddd/adhd/",
    isCurated: true,
    sourceLabel: SOURCE_LABEL,
  },
  {
    id: "adhd-nimh-trusted",
    condition: "adhd",
    title: "Attention-Deficit/Hyperactivity Disorder: Overview",
    organization: "National Institute of Mental Health (NIMH)",
    description:
      "Government-published overview of ADHD, including general information on signs, evaluation, and support options.",
    resourceType: "trusted-external",
    situationTags: ["concerns", "diagnosed"],
    audience: ["parents", "caregivers"],
    websiteUrl:
      "https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd",
    isCurated: true,
    sourceLabel: SOURCE_LABEL,
  },
  {
    id: "adhd-aap-evaluation",
    condition: "adhd",
    title: "ADHD Evaluation Guidance for Families",
    organization: "American Academy of Pediatrics (HealthyChildren.org)",
    description:
      "What to expect from an ADHD evaluation, including the role of teacher input and behavior rating scales.",
    resourceType: "evaluation-support",
    situationTags: ["concerns", "diagnosed"],
    audience: ["parents", "caregivers"],
    websiteUrl: "https://www.healthychildren.org/",
    isCurated: true,
    sourceLabel: SOURCE_LABEL,
  },
  {
    id: "adhd-understood-basics",
    condition: "adhd",
    title: "ADHD Basics",
    organization: "Understood.org",
    description:
      "Clear, jargon-free explanations of ADHD, common co-occurring differences, and what strengths can look like.",
    resourceType: "understanding",
    situationTags: ["concerns"],
    audience: ["parents", "caregivers"],
    websiteUrl: "https://www.understood.org/",
    isCurated: true,
    sourceLabel: SOURCE_LABEL,
  },
];

export function getResourcesForCondition(condition: ParentResource["condition"]): ParentResource[] {
  return parentResources.filter((resource) => resource.condition === condition);
}

export function getResourcesForSituation(
  condition: ParentResource["condition"],
  situationId: string
): ParentResource[] {
  return parentResources.filter(
    (resource) => resource.condition === condition && resource.situationTags.includes(situationId)
  );
}

import type { PracticeArea } from './types';
import topics from './serviceTopics.json';

export type ServiceTopic = (typeof topics)[number];

export const getServiceTopic = (slug: string): ServiceTopic | undefined =>
  topics.find(topic => topic.members.includes(slug));

const workplaceRelated: Record<string, string[]> = {
  'labour-employment-hr-workplace-compliance': [
    'posh-compliance-internal-committee', 'legal-compliance-audit',
    'contract-drafting-vetting-transaction-documentation',
    'corporate-compliance-governance-legal-retainership',
    'professional-disciplinary-regulatory-proceedings'
  ],
  'posh-compliance-internal-committee': [
    'legal-compliance-audit', 'corporate-compliance-governance-legal-retainership',
    'white-collar-crime-corporate-fraud-investigations',
    'professional-disciplinary-regulatory-proceedings'
  ]
};

// The complete catalogue lives at /expertise/. Detail pages point visitors to
// the closest services: the topic's main practices and a couple of neighbours.
export const getRelatedServices = (area: PracticeArea, areas: PracticeArea[]): PracticeArea[] => {
  const topic = getServiceTopic(area.slug);
  if (!topic) return [];
  if (workplaceRelated[area.slug]) {
    return workplaceRelated[area.slug]
      .map(slug => areas.find(item => item.slug === slug))
      .filter((item): item is PracticeArea => Boolean(item));
  }

  const position = topic.members.indexOf(area.slug);
  const neighbours = Array.from({ length: topic.members.length - 1 }, (_, index) =>
    topic.members[(position + index + 1) % topic.members.length]);
  const slugs = [...new Set([...topic.featured, ...neighbours])]
    .filter(slug => slug !== area.slug && (area.slug === topic.hub || slug !== topic.hub))
    .slice(0, 6);
  return slugs.map(slug => areas.find(item => item.slug === slug)).filter((item): item is PracticeArea => Boolean(item));
};

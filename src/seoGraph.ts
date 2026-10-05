import type { Article, PracticeArea, TeamMember } from './types';
import { insightServiceLinks } from './serviceReading';
import pageUpdates from './pageUpdates.json';

const origin = 'https://paullegalassociates.com';
const firmId = `${origin}/#firm`;
const websiteId = `${origin}/#website`;
const brand = 'Paul Legal Associates';

type PageInput = {
  title: string;
  description: string;
  area?: PracticeArea;
  member?: TeamMember;
  article?: Omit<Article, 'content'>;
  heldForReview?: boolean;
};

type Node = Record<string, unknown>;

const personId = (slug: string) => `${origin}/partners/${slug}/#person`;
const serviceId = (route: string) => `${origin}${route}/#service`;
const ref = (id: string) => ({ '@id': id });

const authors: Record<string, string> = {
  'Adv. P. P. Polachan': 'pp-polachan',
  'Adv. Sojan Paul': 'sojan-paul',
  'Adv. Sonam Paul': 'sonam-paul'
};

const firm: Node = {
  '@type': 'LegalService',
  '@id': firmId,
  name: 'Paul Legal Associates (Advocates)',
  alternateName: brand,
  description: 'Legal practice in Panvel and Navi Mumbai covering property law, compliance, commercial litigation, banking and land matters.',
  slogan: 'Enduring Values. Delivering Results.',
  url: `${origin}/`,
  telephone: '+91-7977063567',
  email: 'info@paullegalassociates.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Office No. 301, 3rd Floor, Om Sai Building, Plot No.101/3, Swami Nityanand Road, Near Garden Hotel',
    addressLocality: 'Panvel, Navi Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '410206',
    addressCountry: 'IN'
  },
  geo: { '@type': 'GeoCoordinates', latitude: 18.9894, longitude: 73.1175 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '20:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '18:00' }
  ],
  employee: Object.values(authors).map(slug => ref(personId(slug)))
};

const website: Node = {
  '@type': 'WebSite',
  '@id': websiteId,
  url: `${origin}/`,
  name: brand,
  inLanguage: 'en-IN',
  publisher: ref(firmId)
};

function person(name: string, slug: string, jobTitle?: string, image?: string): Node {
  return {
    '@type': 'Person',
    '@id': personId(slug),
    name,
    url: `${origin}/partners/${slug}/`,
    ...(jobTitle ? { jobTitle } : {}),
    ...(image ? { image: `${origin}${image}` } : {}),
    worksFor: ref(firmId)
  };
}

function breadcrumbs(route: string, label: string, article?: Omit<Article, 'content'>): Node | undefined {
  const isService = route.startsWith('/expertise/');
  if (!isService && !article) return undefined;
  const parent = isService ? 'expertise' : 'insights';
  const list = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
    { '@type': 'ListItem', position: 2, name: isService ? 'Practice Areas' : 'Insights', item: `${origin}/${parent}/` }
  ];
  // Article pages visibly link Home and Insights; their current third crumb is
  // a category, so do not claim the title is a visible breadcrumb item.
  if (isService) list.push({ '@type': 'ListItem', position: 3, name: label, item: `${origin}${route}/` });
  return { '@type': 'BreadcrumbList', '@id': `${origin}${route}/#breadcrumb`, itemListElement: list };
}

export function createSeoGraph(route: string, input: PageInput): { '@context': string; '@graph': Node[] } {
  const url = `${origin}${route === '/' ? '/' : `${route}/`}`;
  const webPageId = `${url}#webpage`;
  const graph: Node[] = [firm, website];
  const modified = (pageUpdates as Record<string, string>)[route === '/' ? '/' : `${route}/`];
  const webPage: Node = {
    '@type': 'WebPage',
    '@id': webPageId,
    url,
    name: input.title,
    description: input.description.replace(/\s+/g, ' ').trim(),
    inLanguage: 'en-IN',
    isPartOf: ref(websiteId),
    ...(modified ? { dateModified: modified } : {})
  };

  if (input.area || route === '/finance-tax-regulatory-advisory') {
    const id = serviceId(route);
    const name = input.area?.title || 'Finance, Tax & Regulatory Advisory';
    graph.push({
      '@type': 'Service',
      '@id': id,
      name,
      description: input.area?.fullDesc || input.description,
      serviceType: name,
      provider: ref(firmId),
      url
    });
    webPage.mainEntity = ref(id);
    webPage.about = ref(id);
  } else if (input.member) {
    const id = personId(input.member.slug);
    graph.push(person(input.member.name, input.member.slug, input.member.title, input.member.photo));
    webPage.mainEntity = ref(id);
    webPage.about = ref(id);
  } else if (input.article && !input.heldForReview) {
    const authorSlug = authors[input.article.author];
    const author = authorSlug ? ref(personId(authorSlug)) : { '@type': 'Person', name: input.article.author };
    const linkedService = insightServiceLinks[input.article.slug];
    const articleId = `${url}#article`;
    graph.push({
      '@type': 'BlogPosting',
      '@id': articleId,
      headline: input.article.title,
      description: input.article.excerpt,
      author,
      publisher: ref(firmId),
      mainEntityOfPage: ref(webPageId),
      ...(modified ? { dateModified: modified } : {}),
      ...(linkedService ? { about: ref(serviceId(`/expertise/${linkedService}`)) } : {})
    });
    if (authorSlug) graph.push(person(input.article.author, authorSlug));
    webPage.mainEntity = ref(articleId);
  } else if (route === '/' || route === '/about' || route === '/contact') {
    webPage.about = ref(firmId);
  }

  const breadcrumb = breadcrumbs(route, input.area?.title || input.article?.title || '', input.article);
  if (breadcrumb) {
    graph.push(breadcrumb);
    webPage.breadcrumb = ref(breadcrumb['@id'] as string);
  }
  graph.push(webPage);
  return { '@context': 'https://schema.org', '@graph': graph };
}

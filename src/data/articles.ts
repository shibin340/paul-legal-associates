import summaries from './articleIndex.json';
import contentPaths from './articleContentPaths.json';
import type { Article } from '../types';
import awaitingReview from '../seo-awaiting-review.json';
import { insightServiceLinks } from '../serviceReading';
import topics from '../serviceTopics.json';

export type ArticleSummary = Omit<Article, 'content'>;
export const ARTICLES: ArticleSummary[] = summaries;
export const ARTICLE_CONTENT_PATHS: Record<string, string> = contentPaths;
export const getArticleBySlug = (slug: string): ArticleSummary | undefined => ARTICLES.find(a => a.slug === slug);
const held = new Set(awaitingReview);
const generic = new Set(['a', 'an', 'and', 'as', 'at', 'by', 'for', 'from', 'in', 'is', 'of', 'on', 'or', 'the', 'to', 'with', 'what', 'every', 'needs', 'know', 'law', 'laws', 'legal', 'lawyer', 'lawyers', 'advisory', 'services', 'service', 'guide', 'practical', 'india', 'indian', 'mumbai', 'navi', 'panvel', 'raigad', 'maharashtra', 'compliance', 'show', 'cause', 'notice', 'notices', 'dispute', 'disputes', 'litigation', 'proceedings', 'appeal', 'appeals', 'reply', 'replies', 'court', 'process', 'rights']);
const terms = (article: ArticleSummary) => new Set(
  `${article.title} ${article.tags.join(' ')}`.toLowerCase().match(/[a-z]+/g)?.filter(term => term.length > 2 && !generic.has(term)) || []
);
const topicOf = (article: ArticleSummary) => topics.find(topic => topic.members.includes(insightServiceLinks[article.slug]))?.id;

// A broad category such as Legal Compliance is not enough to recommend a
// property article to an employer. Prefer actual service/cluster relationships
// and meaningful shared terms; do not fill empty slots with unrelated content.
export const getRelatedArticles = (current: ArticleSummary, count = 3): ArticleSummary[] => {
  const currentTerms = terms(current);
  const service = insightServiceLinks[current.slug];
  const topic = topicOf(current);
  return ARTICLES.filter(article => article.id !== current.id && !held.has(article.slug))
    .map(article => {
      const shared = [...terms(article)].filter(term => currentTerms.has(term)).length;
      const sameService = Boolean(service && service === insightServiceLinks[article.slug]);
      const sameTopic = Boolean(topic && topic === topicOf(article));
      return { article, score: (sameService ? 100 : 0) + (sameTopic ? 20 : 0) + (shared >= 2 ? shared : 0) };
    })
    .filter(candidate => candidate.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, count).map(candidate => candidate.article);
};

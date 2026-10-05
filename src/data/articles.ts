import summaries from './articleIndex.json';
import contentPaths from './articleContentPaths.json';
import type { Article } from '../types';

export type ArticleSummary = Omit<Article, 'content'>;
export const ARTICLES: ArticleSummary[] = summaries;
export const ARTICLE_CONTENT_PATHS: Record<string, string> = contentPaths;
export const getArticleBySlug = (slug: string): ArticleSummary | undefined => ARTICLES.find(a => a.slug === slug);
export const getRelatedArticles = (current: ArticleSummary, count = 3): ArticleSummary[] =>
  ARTICLES.filter(a => a.id !== current.id && a.category === current.category).slice(0, count)
    .concat(ARTICLES.filter(a => a.id !== current.id && a.category !== current.category)).slice(0, count);

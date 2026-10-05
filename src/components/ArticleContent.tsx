import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Article } from '../types';
import { ARTICLE_CONTENT_PATHS } from '../data/articles';

const ContentContext = createContext<Map<string, Article>>(new Map());
function readInitialArticle(): Article | undefined {
  if (typeof document === 'undefined') return undefined;
  const script = document.getElementById('route-content');
  if (!script?.textContent) return undefined;
  try {
    const article = JSON.parse(script.textContent) as Article;
    return article.slug && Array.isArray(article.content) ? article : undefined;
  } catch { return undefined; }
}

export const ArticleContentProvider: React.FC<React.PropsWithChildren<{ initialArticle?: Article }>> = ({ initialArticle, children }) => {
  const [cache] = useState(() => {
    const seed = initialArticle || readInitialArticle();
    return new Map<string, Article>(seed ? [[seed.slug, seed]] : []);
  });
  return <ContentContext.Provider value={cache}>{children}</ContentContext.Provider>;
};

export function useArticleContent(slug?: string): { article?: Article; error: boolean } {
  const cache = useContext(ContentContext);
  const [loaded, setLoaded] = useState<{ slug?: string; article?: Article; error: boolean }>({ slug, article: slug ? cache.get(slug) : undefined, error: false });
  useEffect(() => {
    if (!slug) return;
    const cached = cache.get(slug);
    if (cached) { setLoaded({ slug, article: cached, error: false }); return; }
    const controller = new AbortController();
    setLoaded({ slug, error: false });
    fetch(ARTICLE_CONTENT_PATHS[slug], { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error('Article unavailable'); return response.json(); })
      .then((article: Article) => {
        if (article.slug !== slug || !Array.isArray(article.content)) throw new Error('Unexpected article');
        cache.set(slug, article);
        setLoaded({ slug, article, error: false });
      })
      .catch(error => { if (error.name !== 'AbortError') setLoaded({ slug, error: true }); });
    return () => controller.abort();
  }, [slug, cache]);
  return { article: slug ? cache.get(slug) || (loaded.slug === slug ? loaded.article : undefined) : undefined, error: loaded.slug === slug && loaded.error };
}

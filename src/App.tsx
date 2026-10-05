import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ScrollToTop from "hooks/ScrollToTop";
import RouteMetadata from "./components/layout/RouteMetadata";

import Home from "./pages/Home";
import About from "./pages/About";
import Expertise from "./pages/Expertise";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import NotFound from "pages/NotFound";
import Insights from "pages/Insights";
import ArticleDetail from "pages/ArticleDetail";
import ExpertiseDetail from "pages/ExpertiseDetail";
import PartnerDetail from "pages/PartnerDetail";
import FinanceTaxRegulatoryAdvisory from "pages/FinanceTaxRegulatoryAdvisory";
import { ArticleContentProvider } from './components/ArticleContent';
import type { Article } from './types';

// Shared by the browser router and the build-time static router.
export const AppRoutes: React.FC<{ initialArticle?: Article }> = ({ initialArticle }) => (
  <ArticleContentProvider initialArticle={initialArticle}>
    <ScrollToTop />
    <RouteMetadata />
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="expertise" element={<Expertise />} />
        <Route path="expertise/:slug" element={<ExpertiseDetail />} />
        <Route path="partners" element={<Team />} />
        <Route path="partners/:slug" element={<PartnerDetail />} />
        <Route path="insights" element={<Insights />} />
        <Route path="insights/:slug" element={<ArticleDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="finance-tax-regulatory-advisory" element={<FinanceTaxRegulatoryAdvisory />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </ArticleContentProvider>
);

const App: React.FC = () => <BrowserRouter><AppRoutes /></BrowserRouter>;

export default App;

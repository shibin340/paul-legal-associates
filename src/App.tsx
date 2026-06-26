import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import "./index.css";
import ScrollToTop from "hooks/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Expertise from "./pages/Expertise";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import NotFound from "pages/NotFound";
import Insights from "pages/Insights";
import ArticleDetail from "pages/ArticleDetail";

const App: React.FC = () => (
  <HashRouter>
    <ScrollToTop />
    {/* ✅ Removed <Suspense> wrapper completely to eliminate the hydration mismatch */}
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="expertise" element={<Expertise />} />
        <Route path="partners" element={<Team />} />
        <Route path="insights" element={<Insights />} />
        <Route path="insights/:slug" element={<ArticleDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </HashRouter>
);

export default App;
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Structural Core Layout Content
  const layoutContent = (
    <>
      <Navbar />
      <main id="main-content" key={pathname} className="animate-pageFadeIn">
        <Outlet />
      </main>
      <Footer />
    </>
  );

  // During pre-rendering (react-snap) and initial client hydration,
  // return the clean layout shell directly to avoid head element conflicts.
  if (!isMounted) {
    return layoutContent;
  }

  // Once safely mounted in the browser, wrap with HelmetProvider to handle dynamic meta transitions
  return (
    <HelmetProvider>
      {layoutContent}
    </HelmetProvider>
  );
};

export default Layout;
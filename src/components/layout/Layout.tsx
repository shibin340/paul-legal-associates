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

  // Hydration Safe Key: Default to a stable static string during initial match.
  // This guarantees the client HTML perfectly mirrors react-snap's layout structures.
  // Once mounted, it safely switches to pathname to handle dynamic page animations.
  const activeKey = isMounted ? pathname : "hydration-fallback";

  const layoutContent = (
    <>
      <Navbar />
      {/* Updated to use the stable activeKey variable */}
      <main id="main-content" key={activeKey} className="animate-pageFadeIn">
        <Outlet />
      </main>
      <Footer />
    </>
  );

  if (!isMounted) {
    return layoutContent;
  }

  return (
    <HelmetProvider>
      {layoutContent}
    </HelmetProvider>
  );
};

export default Layout;
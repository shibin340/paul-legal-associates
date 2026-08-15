import { useEffect } from "react";

const BRAND_NAME = "Paul Legal Associates";

export const useDocumentTitle = (title: string, overrideBrand = false) => {
  useEffect(() => {
    // Prevents duplicate appending if the title already includes the brand name
    if (overrideBrand || title.includes(BRAND_NAME)) {
      document.title = title;
    } else {
      document.title = `${title} | ${BRAND_NAME}`;
    }
  }, [title, overrideBrand]);
};
import React from "react";

// Intrinsic dimensions of the existing source images; CSS controls display size.
const sizes: Record<string, { width: number; height: number }> = {
  "/logo.webp": { width: 500, height: 500 },
  "/images/polachan.webp": { width: 1535, height: 1024 },
  "/images/sojan.webp": { width: 1536, height: 1024 },
  "/images/sonam.webp": { width: 1536, height: 1024 },
  "/images/ChatGPT.webp": { width: 1122, height: 1402 }
};

const SiteImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = props => (
  <img {...sizes[props.src || ""]} decoding="async" {...props} alt={props.alt} />
);

export default SiteImage;

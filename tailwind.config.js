/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#174171",
          mid:     "#1a4d85",
          light:   "#1e5a9a",
          deep:    "#0d2743",
          darker:  "#0a1f35",
        },
        gold: {
          DEFAULT: "#c8a951",
          light:   "#dfc278",
          pale:    "#f3e6c0",
          dark:    "#a8893a",
        },
        cream: "#f8f6f0",
        muted: "#6b7f99",
        "border-gold": "rgba(200,169,81,0.25)",
      },
      fontFamily: {
        serif:       ["'Playfair Display'", "Georgia", "serif"],
        "serif-alt": ["'Cormorant Garamond'", "Georgia", "serif"],
        sans:        ["'DM Sans'", "sans-serif"],
      },
      fontSize: {
        "2xs": "0.65rem",
      },
      maxWidth: { "8xl": "1280px" },
      keyframes: {
        heroFadeUp:  { "0%": { opacity: "0", transform: "translateY(30px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        gridDrift:   { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(120px)" } },
        glyphPulse:  { "0%,100%": { opacity: "0.3" }, "50%": { opacity: "0.8" } },
        scrollPulse: { "0%,100%": { transform: "scaleY(1)", opacity: "0.35" }, "50%": { transform: "scaleY(0.4)", opacity: "1" } },
        pageFadeIn:  { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        detailFade:  { "0%": { opacity: "0", transform: "translateY(10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        shimmer:     { "0%": { transform: "translateX(-100%)" }, "100%": { transform: "translateX(100%)" } },
        spin:        { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        heroFadeUp:  "heroFadeUp 1s ease both",
        gridDrift:   "gridDrift 24s linear infinite",
        glyphPulse:  "glyphPulse 9s ease-in-out infinite",
        scrollPulse: "scrollPulse 2.2s ease-in-out infinite",
        pageFadeIn:  "pageFadeIn 0.6s ease both",
        detailFade:  "detailFade 0.35s ease both",
        spin:        "spin 0.8s linear infinite",
      },
      backgroundImage: {
        "hero-radial":      "radial-gradient(ellipse at 30% 50%, rgba(200,169,81,0.1) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(200,169,81,0.05) 0%, transparent 50%), linear-gradient(160deg, #0a1f35 0%, #174171 55%, #0d2743 100%)",
        "page-hero-radial": "radial-gradient(ellipse at 20% 60%, rgba(200,169,81,0.08) 0%, transparent 55%), linear-gradient(160deg, #0a1f35 0%, #174171 65%, #0d2743 100%)",
        "cta-radial":       "radial-gradient(ellipse at center, rgba(200,169,81,0.1) 0%, transparent 70%)",
      },
      boxShadow: {
        gold:       "0 8px 30px rgba(200,169,81,0.4)",
        deep:       "0 20px 60px rgba(0,0,0,0.35)",
        "card-hover":"0 16px 48px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};

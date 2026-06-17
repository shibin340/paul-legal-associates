import React, { CSSProperties } from "react";
import { useInView } from "../../hooks/useInView";
interface Props { children: React.ReactNode; delay?: number; className?: string; style?: CSSProperties; direction?: "up"|"left"|"right"|"none"; }
const AnimateIn: React.FC<Props> = ({ children, delay = 0, className = "", style, direction = "up" }) => {
  const [ref, inView] = useInView();
  const tx = !inView ? (direction === "left" ? "translateX(-40px)" : direction === "right" ? "translateX(40px)" : direction === "up" ? "translateY(40px)" : "none") : "none";
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: tx, transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
};
export default AnimateIn;

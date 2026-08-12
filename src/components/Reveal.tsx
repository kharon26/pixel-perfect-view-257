import { useEffect, useRef, useState, type ReactNode } from "react";

/** Scroll-triggered fade/slide reveal. Restrained, cinematic easing.
 *  When `once` is true the element stays revealed after first intersection
 *  (avoids GPU compositing churn that degrades image quality). */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  once = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "figure";
  once?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If already revealed in `once` mode, skip re-observing
    if (once && shown) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (once) {
            if (entry.isIntersecting) {
              setShown(true);
              io.disconnect();
            }
          } else {
            setShown(entry.isIntersecting);
          }
        });
      },
      { rootMargin: "0px 0px 80px 0px", threshold: 0 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once, shown]);

  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${shown ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
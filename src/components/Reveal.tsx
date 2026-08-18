import { useEffect, useRef, useState, type ReactNode } from "react";

/** Scroll-triggered fade/slide reveal.
 *  Defaults to `once = true` so once an element or heading is revealed,
 *  it permanently remains in the DOM with static styles and never re-triggers
 *  or shifts when sibling state (e.g. dropdowns, inputs) updates. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  once = true,
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

    if (once && shown) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            if (once) {
              io.disconnect();
            }
          } else if (!once) {
            setShown(false);
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

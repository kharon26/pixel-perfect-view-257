import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const LINKS = [
  { label: "Work", to: "/#work" },
  { label: "About", to: "/#about" },
  { label: "Clients", to: "/#clients" },
  { label: "Contact", to: "/#contact" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "border-b border-border bg-background/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
        <Link to="/" className="label text-foreground">
          Kai&nbsp;Marlow
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.to} className="label link-underline text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="label md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-6 border-t border-border bg-background px-6 py-8 md:hidden">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.to} onClick={() => setOpen(false)} className="label text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
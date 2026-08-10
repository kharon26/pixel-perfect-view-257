export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-6 md:flex-row md:items-center md:justify-between md:px-10">
        <span className="label text-muted-foreground">© {new Date().getFullYear()} Kai Marlow</span>
        <a href="#top" className="label link-underline self-start text-muted-foreground hover:text-foreground">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
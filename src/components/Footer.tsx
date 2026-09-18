export default function Footer() {
  const links = [
    { label: "Shop", href: "#collection" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="mt-8 bg-[#2f2222] text-[#f7e9e6]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        {/* Top: brand + tagline */}
        <div className="flex flex-col items-center gap-5 text-center">
          <img src="/images/rj-logo.png" alt="Rosella Jewels" className="h-14 w-14 rounded-full ring-1 ring-[#c9a66b]/40" />
          <h3 className="font-display text-3xl font-semibold sm:text-4xl">Rosella Jewels</h3>
          <p className="max-w-xs text-[15px] text-white/70">
            Minimal jewellery, made for everyday.
          </p>

          {/* Links */}
          <nav className="mt-2 flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[14px] font-semibold uppercase tracking-[0.14em] text-white/80 transition hover:text-[#e6c983]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <a
            href="https://instagram.com/rosellajewels2026"
            target="_blank"
            rel="noreferrer"
            className="mt-2 rounded-full border border-[#c9a66b]/50 px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] transition hover:border-[#c9a66b] hover:text-[#e6c983]"
          >
            📷 @rosellajewels2026
          </a>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-white/10" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-3 text-[13px] text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Rosella Jewels</p>
          <p>Made in Pakistan 🇵🇰</p>
        </div>
      </div>
    </footer>
  );
}

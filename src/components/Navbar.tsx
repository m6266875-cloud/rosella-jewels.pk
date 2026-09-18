import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home", page: false },
  { label: "Shop", href: "#collection", page: true },
  { label: "About Us", href: "#about", page: false },
  { label: "Contact", href: "#contact", page: false },
];

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
      <path
        d="M12 21s-7.5-4.9-10-9.4C.6 8.8 2 5.5 5 5.1c1.9-.3 3.6.7 4.5 2.2C10.4 5.8 12.1 4.8 14 5.1c3 .4 4.4 3.7 3 6.5C19.5 16.1 12 21 12 21z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
      <path
        d="M2.5 3.5h2l1.7 11.2a1.5 1.5 0 0 0 1.5 1.3h8.9a1.5 1.5 0 0 0 1.5-1.2l1.3-6.8H6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="20" r="1.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function Navbar({ onShopCollection, onCart, onWish, cartCount, wishCount }: {
  onShopCollection: () => void;
  onCart: () => void;
  onWish: () => void;
  cartCount: number;
  wishCount: number;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "border-b border-[#e3d3c4]/60 bg-[#fcfbfa]/80 py-2 backdrop-blur-xl" : "py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        {/* Logo left */}
        <a href="#home" className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="h-10 w-10 overflow-hidden rounded-full ring-1 ring-[#c9a66b]/40"
          >
            <img src="/images/rj-logo.png" alt="Rosella Jewels RJ logo" className="h-full w-full object-cover" />
          </motion.div>
          <div className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-[17px] font-medium tracking-wide text-[#2f2222]">
              Rosella Jewels
            </span>
            <span className="text-[9px] uppercase tracking-[0.28em] text-[#a08765]">
              Stainless Steel
            </span>
          </div>
        </a>

        {/* Center nav */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.page) {
                  e.preventDefault();
                  onShopCollection();
                }
              }}
              className="group relative text-[13px] font-medium uppercase tracking-[0.12em] text-[#5a4a42] transition-colors hover:text-[#2f2222]"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[#b48a4a] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 md:gap-3">
          <motion.button
            onClick={onWish}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="relative flex items-center gap-2 rounded-full border border-[#e0cfbe] bg-white/50 px-3 py-2.5 text-[#5a4a42] md:px-4"
          >
            <IconHeart />
            <span className="hidden text-[12px] font-medium md:inline">Wishlist</span>
            {wishCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#b48a4a] text-[9px] font-semibold text-white">
                {wishCount}
              </span>
            )}
          </motion.button>

          <motion.button
            onClick={onCart}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="relative flex items-center gap-2 rounded-full bg-[#2f2222] px-3 py-2.5 text-[#f7e9e6] md:px-4"
          >
            <IconCart />
            <span className="hidden text-[12px] font-medium md:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#c9a66b] text-[9px] font-bold text-[#2f2222]">
                {cartCount}
              </span>
            )}
          </motion.button>

          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0cfbe] bg-white/50 text-[#5a4a42] lg:hidden"
            aria-label="Menu"
          >
            <div className="space-y-1.5">
              <span className={`block h-px w-5 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px w-5 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-5 mt-3 flex flex-col gap-1 rounded-2xl border border-[#e3d3c4] bg-[#fcfbfa]/95 p-3 shadow-lg backdrop-blur-xl lg:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.page) {
                    e.preventDefault();
                    onShopCollection();
                  }
                  setOpen(false);
                }}
                className="rounded-xl px-4 py-3 text-[13px] font-medium uppercase tracking-wide text-[#5a4a42] transition hover:bg-[#f2efec]"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { products, categories } from "../data";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

export default function Collection({ onBack, onOpen, onCart, onWish, cartCount, wishCount }: {
  onBack: () => void;
  onOpen: (id: number) => void;
  onCart: () => void;
  onWish: () => void;
  cartCount: number;
  wishCount: number;
}) {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [sort, setSort] = useState<"featured" | "low" | "high">("featured");

  const list = useMemo(() => {
    let out = active === "All" ? [...products] : products.filter((p) => p.category === active);
    if (sort === "low") out.sort((a, b) => a.price - b.price);
    if (sort === "high") out.sort((a, b) => b.price - a.price);
    return out;
  }, [active, sort]);

  return (
    <div className="min-h-screen bg-[#fcfbfa] text-[#3a2b2b]">
      {/* Slim top bar */}
      <header className="sticky top-0 z-50 border-b border-[#e3d3c4]/60 bg-[#fcfbfa]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <button onClick={onBack} className="flex items-center gap-2 text-[14px] font-medium text-[#5a4a42] transition hover:text-[#2f2222]">
            <span className="text-lg">←</span> Back home
          </button>
          <button onClick={onBack} className="flex items-center gap-2.5">
            <img src="/images/rj-logo.png" alt="Rosella Jewels" className="h-9 w-9 rounded-full ring-1 ring-[#c9a66b]/40" />
            <span className="hidden font-display text-[16px] text-[#2f2222] sm:inline">Rosella Jewels</span>
          </button>
          <div className="flex items-center gap-2">
            <button onClick={onWish} className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#e0cfbe] bg-white/50 text-lg text-[#5a4a42]">
              ♡
              {wishCount > 0 && <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#b48a4a] text-[9px] font-semibold text-white">{wishCount}</span>}
            </button>
            <button onClick={onCart} className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#2f2222] text-lg text-[#f7e9e6]">
              🛍
              {cartCount > 0 && <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#c9a66b] text-[9px] font-bold text-[#2f2222]">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Page hero */}
      <section className="relative overflow-hidden py-16 text-center sm:py-20">
        <div className="animate-aura absolute left-1/4 top-0 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(233,215,182,0.5),transparent_65%)]" />
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.3em] text-[#a08765]">
            The Full Collection
          </p>
          <h1 className="font-display text-5xl font-medium leading-tight text-[#2f2222] sm:text-7xl">
            Shop Everything
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-[#6b5a52]">
            Explore our complete range of {products.length} handcrafted stainless steel pieces —
            rings, necklaces, earrings, bracelets and sets.
          </p>
        </div>
      </section>

      {/* Filter + sort bar */}
      <div className="sticky top-[65px] z-40 border-y border-[#e3d3c4]/60 bg-[#fcfbfa]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-4 md:flex-row md:justify-between md:px-10">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full px-5 py-2.5 text-[14px] font-medium transition ${
                  active === c
                    ? "bg-[#2f2222] text-[#f7e9e6]"
                    : "border border-[#e0cfbe] bg-white/50 text-[#5a4a42] hover:border-[#c9a66b]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-[#9a857a]">{list.length} items</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-full border border-[#e0cfbe] bg-white/50 px-4 py-2.5 text-[14px] text-[#5a4a42] outline-none"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-14">
        <motion.div
          layout
          className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-6 sm:gap-7 md:px-10 lg:grid-cols-4"
        >
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onOpen={onOpen} />
          ))}
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

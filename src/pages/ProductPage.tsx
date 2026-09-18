import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getProduct, rupees, products } from "../data";
import { useStore } from "../store";
import Footer from "../components/Footer";

export default function ProductPage({
  id,
  onBack,
  onOpen,
  onCart,
  onWish,
  cartCount,
  wishCount,
}: {
  id: number;
  onBack: () => void;
  onOpen: (id: number) => void;
  onCart: () => void;
  onWish: () => void;
  cartCount: number;
  wishCount: number;
}) {
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const product = getProduct(id);

  useEffect(() => {
    setQty(1);
    setAdded(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [id]);

  if (!product) return null;

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#fcfbfa] text-[#3a2b2b]">
      {/* Slim header */}
      <header className="sticky top-0 z-50 border-b border-[#ece6df]/70 bg-[#fcfbfa]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <button onClick={onBack} className="flex items-center gap-2 text-[14px] font-medium text-[#5a4a42] transition hover:text-[#2f2222]">
            <span className="text-lg">←</span> Back
          </button>
          <div className="flex items-center gap-2.5">
            <img src="/images/rj-logo.png" alt="Rosella Jewels" className="h-9 w-9 rounded-full ring-1 ring-[#c9a66b]/40" />
            <span className="hidden font-display text-[16px] text-[#2f2222] sm:inline">Rosella Jewels</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onWish} className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#e6ddd2] bg-white text-lg text-[#5a4a42]">
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

      {/* Product */}
      <section className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-16">
        <p className="mb-6 text-[13px] text-[#9a857a]">
          Home / {product.category} / <span className="text-[#5a4a42]">{product.name}</span>
        </p>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-3xl bg-[#f2efec]"
          >
            <img src={product.src} alt={product.name} className="aspect-[4/5] w-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {product.bestSeller && (
              <span className="inline-block rounded-full bg-[#2f2222] px-3 py-1 text-[11px] font-medium tracking-wide text-[#f7e9e6]">
                Best Seller
              </span>
            )}
            <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.25em] text-[#a08765]">{product.category}</p>
            <h1 className="mt-2 font-display text-4xl leading-tight text-[#2f2222] sm:text-5xl">{product.name}</h1>
            <p className="mt-4 font-display text-3xl text-[#8a6d4a]">{rupees(product.price)}</p>

            <p className="mt-6 text-[16px] leading-relaxed text-[#6b5a52]">{product.desc}</p>

            <div className="mt-6 space-y-2 rounded-2xl bg-white p-5 text-[14px] text-[#5a4a42] shadow-sm ring-1 ring-[#ece6df]">
              <p>✦ {product.material}</p>
              <p>🚚 Cash on Delivery available in major cities</p>
              <p>↩ 7-day easy exchange</p>
            </div>

            <div className="mt-7 flex items-center gap-4">
              <span className="text-[14px] font-medium text-[#5a4a42]">Quantity</span>
              <div className="flex items-center gap-3 rounded-full border border-[#e6ddd2] bg-white px-2 py-1.5">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-[#5a4a42] transition hover:bg-[#f2efec]">−</button>
                <span className="w-7 text-center text-[16px] font-medium">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-[#5a4a42] transition hover:bg-[#f2efec]">+</button>
              </div>
            </div>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => {
                  addToCart(product.id, qty);
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1800);
                }}
                className="flex-1 rounded-full bg-[#2f2222] px-6 py-4 text-[14px] font-medium uppercase tracking-[0.12em] text-[#f7e9e6] transition hover:bg-[#432f2f]"
              >
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`flex h-[56px] w-[56px] items-center justify-center rounded-full border text-xl transition ${
                  inWishlist(product.id) ? "border-[#b48a4a] bg-[#b48a4a] text-white" : "border-[#e6ddd2] bg-white text-[#5a4a42] hover:border-[#c9a66b]"
                }`}
              >
                {inWishlist(product.id) ? "♥" : "♡"}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-8 font-display text-3xl text-[#2f2222]">You may also like</h2>
            <div className="grid grid-cols-2 gap-5 sm:gap-7 lg:grid-cols-4">
              {related.map((r) => (
                <button key={r.id} onClick={() => onOpen(r.id)} className="group text-left">
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-[#f2efec]">
                    <img src={r.src} alt={r.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-2">
                    <h3 className="font-display text-[16px] text-[#2f2222]">{r.name}</h3>
                    <span className="font-display text-[15px] text-[#8a6d4a]">{rupees(r.price)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

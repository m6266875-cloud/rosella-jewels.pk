import { motion } from "framer-motion";
import { bestSellers } from "../data";
import ProductCard from "./ProductCard";

export default function BestSellers({ onViewAll, onOpen }: { onViewAll: () => void; onOpen: (id: number) => void }) {
  return (
    <section id="shop" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Heading — big & simple */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.3em] text-[#a08765]">
            Loved by many
          </p>
          <h2 className="font-display text-5xl font-medium leading-tight text-[#2f2222] sm:text-6xl">
            Our Best Sellers
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[17px] leading-relaxed text-[#6b5a52]">
            The pieces everyone keeps coming back for — timeless, tarnish-free,
            and made to wear every single day.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-5 sm:gap-7 lg:grid-cols-4">
          {bestSellers.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onOpen={onOpen} />
          ))}
        </div>

        {/* View all */}
        <div className="mt-16 text-center">
          <motion.button
            onClick={onViewAll}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-3 rounded-full bg-[#2f2222] px-10 py-5 text-[15px] font-medium uppercase tracking-[0.14em] text-[#f7e9e6] transition-colors hover:bg-[#432f2f]"
          >
            View All 50+ Products
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}

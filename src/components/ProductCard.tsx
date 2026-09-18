import { motion } from "framer-motion";
import { rupees, type Product } from "../data";
import { useStore } from "../store";

export default function ProductCard({
  product,
  index = 0,
  onOpen,
}: {
  product: Product;
  index?: number;
  onOpen: (id: number) => void;
}) {
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const wished = inWishlist(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 4) * 0.06, duration: 0.5 }}
      className="group"
    >
      <div
        onClick={() => onOpen(product.id)}
        className="relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl bg-[#f2efec]"
      >
        <img
          src={product.src}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.bestSeller && (
          <span className="absolute left-3 top-3 rounded-full bg-[#2f2222] px-3 py-1 text-[11px] font-medium tracking-wide text-[#f7e9e6]">
            Best Seller
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Toggle wishlist"
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-lg backdrop-blur transition-all duration-300 ${
            wished
              ? "bg-[#b48a4a] text-white opacity-100"
              : "bg-white/85 text-[#5a4a42] opacity-0 group-hover:opacity-100"
          }`}
        >
          {wished ? "♥" : "♡"}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product.id);
          }}
          className="absolute inset-x-3 bottom-3 translate-y-3 rounded-xl bg-[#2f2222]/90 px-4 py-3 text-center text-[14px] font-medium text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Add to Cart →
        </button>
      </div>
      <div onClick={() => onOpen(product.id)} className="mt-4 flex cursor-pointer items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-[18px] leading-tight text-[#2f2222]">{product.name}</h3>
          <p className="mt-0.5 text-[13px] text-[#a08765]">{product.category}</p>
        </div>
        <span className="whitespace-nowrap font-display text-[17px] text-[#8a6d4a]">{rupees(product.price)}</span>
      </div>
    </motion.article>
  );
}

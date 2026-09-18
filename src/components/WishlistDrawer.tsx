import { motion, AnimatePresence } from "framer-motion";
import { getProduct, rupees } from "../data";
import { useStore } from "../store";

export default function WishlistDrawer({
  open,
  onClose,
  onOpen,
}: {
  open: boolean;
  onClose: () => void;
  onOpen: (id: number) => void;
}) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const items = wishlist.map(getProduct).filter(Boolean);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-[#2f2222]/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed right-0 top-0 z-[65] flex h-full w-full max-w-md flex-col bg-[#fcfbfa] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#e3d3c4] px-6 py-5">
              <h2 className="font-display text-2xl text-[#2f2222]">Wishlist ({items.length})</h2>
              <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-lg text-[#5a4a42]">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="mt-20 text-center text-[#9a857a]">
                  <p className="text-5xl">♡</p>
                  <p className="mt-4 text-[15px]">Your wishlist is empty.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((p) => p && (
                    <div key={p.id} className="flex gap-3">
                      <img onClick={() => onOpen(p.id)} src={p.src} alt={p.name} className="h-24 w-20 cursor-pointer rounded-xl object-cover" />
                      <div className="flex flex-1 flex-col justify-between">
                        <div onClick={() => onOpen(p.id)} className="cursor-pointer">
                          <h3 className="font-display text-[16px] text-[#2f2222]">{p.name}</h3>
                          <p className="text-[13px] text-[#8a6d4a]">{rupees(p.price)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => { addToCart(p.id); }} className="rounded-full bg-[#2f2222] px-4 py-2 text-[12px] font-medium text-[#f7e9e6]">Add to cart</button>
                          <button onClick={() => toggleWishlist(p.id)} className="text-[12px] text-[#a08765] underline">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

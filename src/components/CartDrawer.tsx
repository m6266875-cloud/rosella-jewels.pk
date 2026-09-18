import { motion, AnimatePresence } from "framer-motion";
import { rupees } from "../data";
import { useStore } from "../store";

export default function CartDrawer({
  open,
  onClose,
  onCheckout,
  onOpen,
}: {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
  onOpen: (id: number) => void;
}) {
  const { cartDetailed, subtotal, setQty, removeFromCart, cartCount } = useStore();

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
            <div className="flex items-center justify-between border-b border-[#ece6df] px-6 py-5">
              <h2 className="font-display text-2xl text-[#2f2222]">Your Cart ({cartCount})</h2>
              <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg text-[#5a4a42] ring-1 ring-[#ece6df]">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartDetailed.length === 0 ? (
                <div className="mt-20 text-center text-[#9a857a]">
                  <p className="text-5xl">🛍️</p>
                  <p className="mt-4 text-[15px]">Your cart is empty.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartDetailed.map(({ product, qty }) => (
                    <div key={product.id} className="flex gap-3">
                      <img onClick={() => onOpen(product.id)} src={product.src} alt={product.name} className="h-24 w-20 cursor-pointer rounded-xl object-cover" />
                      <div className="flex flex-1 flex-col justify-between">
                        <div onClick={() => onOpen(product.id)} className="cursor-pointer">
                          <h3 className="font-display text-[16px] text-[#2f2222]">{product.name}</h3>
                          <p className="text-[13px] text-[#8a6d4a]">{rupees(product.price)}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-[#e6ddd2] bg-white px-1.5 py-1">
                            <button onClick={() => setQty(product.id, qty - 1)} className="h-6 w-6 rounded-full text-[#5a4a42] hover:bg-[#f2efec]">−</button>
                            <span className="w-5 text-center text-[14px]">{qty}</span>
                            <button onClick={() => setQty(product.id, qty + 1)} className="h-6 w-6 rounded-full text-[#5a4a42] hover:bg-[#f2efec]">+</button>
                          </div>
                          <button onClick={() => removeFromCart(product.id)} className="text-[12px] text-[#a08765] underline">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartDetailed.length > 0 && (
              <div className="border-t border-[#ece6df] px-6 py-5">
                <div className="mb-4 flex justify-between font-display text-[18px] text-[#2f2222]">
                  <span>Subtotal</span><span>{rupees(subtotal)}</span>
                </div>
                <p className="mb-4 text-[12px] text-[#9a857a]">Shipping calculated at checkout based on your city.</p>
                <button
                  onClick={() => { onClose(); onCheckout(); }}
                  className="w-full rounded-full bg-[#2f2222] py-4 text-[14px] font-medium uppercase tracking-[0.12em] text-[#f7e9e6] transition hover:bg-[#432f2f]"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

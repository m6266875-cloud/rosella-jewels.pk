import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { rupees, cities, getCity } from "../data";
import { useStore, type Order } from "../store";

export default function Checkout({
  onBack,
  onDone,
}: {
  onBack: () => void;
  onDone: () => void;
}) {
  const { cartDetailed, subtotal, placeOrder } = useStore();
  const [method, setMethod] = useState<"cod" | "card">("cod");
  const [placed, setPlaced] = useState<Order | null>(null);
  const [form, setForm] = useState({
    name: "", phone: "", address: "", city: "", card: "", exp: "", cvc: "",
  });

  const city = useMemo(() => getCity(form.city), [form.city]);
  const shipping = city ? city.shipping : subtotal > 0 ? 250 : 0;
  const total = subtotal + shipping;
  const codAvailable = city ? city.cod : false;

  // if a non-COD city is picked while COD is selected, switch to card
  if (form.city && !codAvailable && method === "cod") {
    setMethod("card");
  }

  const canPlace =
    form.name && form.phone && form.address && form.city &&
    (method === "cod"
      ? codAvailable
      : form.card.replace(/\s/g, "").length >= 12 && form.exp && form.cvc);

  const submit = () => {
    const order = placeOrder({ method, name: form.name, shipping });
    setPlaced(order);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  const field =
    "w-full rounded-xl border border-[#e6ddd2] bg-white px-4 py-3.5 text-[15px] text-[#3a2b2b] outline-none transition focus:border-[#c9a66b]";
  const label = "mb-1.5 block text-[13px] font-medium text-[#5a4a42]";

  // ── Confirmation screen ──
  if (placed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fcfbfa] px-6 text-center">
        <div className="max-w-md">
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#2f2222] text-5xl text-[#f7e9e6]"
          >✓</motion.div>
          <h1 className="mt-8 font-display text-4xl text-[#2f2222]">Thank you, {placed.name.split(" ")[0]}!</h1>
          <p className="mt-4 text-[16px] text-[#6b5a52]">
            Your order <span className="font-medium text-[#8a6d4a]">#{placed.id}</span> has been placed.
          </p>
          <div className="mt-6 rounded-2xl bg-white p-5 text-left text-[14px] text-[#5a4a42] shadow-sm ring-1 ring-[#ece6df]">
            <div className="flex justify-between py-1"><span>Payment</span><span className="font-medium">{placed.method === "cod" ? "Cash on Delivery" : "Bank Card (Paid)"}</span></div>
            <div className="flex justify-between py-1"><span>Deliver to</span><span className="font-medium">{form.city}</span></div>
            <div className="flex justify-between py-1"><span>Est. delivery</span><span className="font-medium">{city?.days}</span></div>
            <div className="mt-2 flex justify-between border-t border-[#ece6df] pt-3 font-display text-[18px] text-[#2f2222]"><span>Total</span><span>{rupees(placed.total)}</span></div>
          </div>
          <p className="mt-6 text-[13px] text-[#9a857a]">We'll call to confirm and ship your order soon. 💗</p>
          <button onClick={onDone} className="mt-8 rounded-full bg-[#2f2222] px-10 py-4 text-[14px] font-medium uppercase tracking-[0.12em] text-[#f7e9e6] transition hover:bg-[#432f2f]">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // ── Empty cart ──
  if (cartDetailed.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#fcfbfa] px-6 text-center text-[#9a857a]">
        <p className="text-6xl">🛍️</p>
        <p className="mt-5 text-[17px]">Your cart is empty.</p>
        <button onClick={onBack} className="mt-8 rounded-full bg-[#2f2222] px-8 py-3.5 text-[14px] font-medium uppercase tracking-wide text-[#f7e9e6]">
          Back to shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfbfa] text-[#3a2b2b]">
      <header className="border-b border-[#ece6df]/70 bg-[#fcfbfa]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <button onClick={onBack} className="flex items-center gap-2 text-[14px] font-medium text-[#5a4a42] transition hover:text-[#2f2222]">
            <span className="text-lg">←</span> Back
          </button>
          <div className="flex items-center gap-2.5">
            <img src="/images/rj-logo.png" alt="Rosella Jewels" className="h-9 w-9 rounded-full ring-1 ring-[#c9a66b]/40" />
            <span className="font-display text-[16px] text-[#2f2222]">Checkout</span>
          </div>
          <div className="w-16" />
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-10 md:px-10 md:py-14 lg:grid-cols-[1.4fr_1fr]">
        {/* LEFT: form */}
        <div className="space-y-8">
          <div>
            <h2 className="mb-5 font-display text-2xl text-[#2f2222]">Delivery details</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2"><label className={label}>Full name</label><input className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Ayesha Khan" /></div>
              <div><label className={label}>Phone number</label><input className={field} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="03XX XXXXXXX" /></div>
              <div>
                <label className={label}>City</label>
                <select className={field} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
                  <option value="">Select your city</option>
                  {cities.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}{!c.cod ? " (COD not available)" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2"><label className={label}>Full address</label><input className={field} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="House #, street, area" /></div>
            </div>

            {city && (
              <div className="mt-4 rounded-xl bg-white p-4 text-[13px] text-[#5a4a42] ring-1 ring-[#ece6df]">
                🚚 Delivery to <b>{city.name}</b>: {city.days} · Shipping {rupees(city.shipping)} ·{" "}
                {city.cod ? <span className="text-green-700">Cash on Delivery available ✓</span> : <span className="text-[#b45a3a]">Cash on Delivery not available — please pay by card</span>}
              </div>
            )}
          </div>

          {/* Payment */}
          <div>
            <h2 className="mb-5 font-display text-2xl text-[#2f2222]">Payment method</h2>
            <div className="space-y-3">
              <button
                onClick={() => codAvailable && setMethod("cod")}
                disabled={!!form.city && !codAvailable}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-4 text-left transition ${
                  method === "cod" ? "border-[#b48a4a] bg-white" : "border-[#e6ddd2] bg-white"
                } ${form.city && !codAvailable ? "cursor-not-allowed opacity-45" : ""}`}
              >
                <span className="text-2xl">💵</span>
                <div>
                  <p className="text-[15px] font-medium text-[#2f2222]">Cash on Delivery</p>
                  <p className="text-[12px] text-[#9a857a]">{form.city && !codAvailable ? "Not available in your city" : "Pay in cash when your order arrives"}</p>
                </div>
                <span className={`ml-auto h-4 w-4 rounded-full border-2 ${method === "cod" ? "border-[#b48a4a] bg-[#b48a4a]" : "border-[#cbb89f]"}`} />
              </button>

              <button
                onClick={() => setMethod("card")}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-4 text-left transition ${method === "card" ? "border-[#b48a4a] bg-white" : "border-[#e6ddd2] bg-white"}`}
              >
                <span className="text-2xl">💳</span>
                <div>
                  <p className="text-[15px] font-medium text-[#2f2222]">Bank Card</p>
                  <p className="text-[12px] text-[#9a857a]">Visa / Mastercard — secure payment</p>
                </div>
                <span className={`ml-auto h-4 w-4 rounded-full border-2 ${method === "card" ? "border-[#b48a4a] bg-[#b48a4a]" : "border-[#cbb89f]"}`} />
              </button>

              {method === "card" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-3 overflow-hidden pt-1">
                  <input className={field} placeholder="Card number" maxLength={19} value={form.card}
                    onChange={(e) => setForm({ ...form, card: e.target.value.replace(/[^\d]/g, "").replace(/(.{4})/g, "$1 ").trim() })} />
                  <div className="flex gap-3">
                    <input className={field} placeholder="MM/YY" maxLength={5} value={form.exp} onChange={(e) => setForm({ ...form, exp: e.target.value })} />
                    <input className={field} placeholder="CVC" maxLength={4} value={form.cvc} onChange={(e) => setForm({ ...form, cvc: e.target.value.replace(/[^\d]/g, "") })} />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: summary */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#ece6df]">
            <h2 className="mb-5 font-display text-2xl text-[#2f2222]">Your order</h2>
            <div className="max-h-64 space-y-4 overflow-y-auto pr-1">
              {cartDetailed.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-3">
                  <img src={product.src} alt={product.name} className="h-20 w-16 rounded-xl object-cover" />
                  <div className="flex flex-1 flex-col justify-center">
                    <h3 className="font-display text-[15px] text-[#2f2222]">{product.name}</h3>
                    <p className="text-[13px] text-[#9a857a]">Qty {qty}</p>
                  </div>
                  <span className="self-center text-[14px] font-medium text-[#8a6d4a]">{rupees(product.price * qty)}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-2 border-t border-[#ece6df] pt-4 text-[14px] text-[#5a4a42]">
              <div className="flex justify-between"><span>Subtotal</span><span>{rupees(subtotal)}</span></div>
              <div className="flex justify-between"><span>Shipping{city ? ` · ${city.name}` : ""}</span><span>{rupees(shipping)}</span></div>
              <div className="flex justify-between border-t border-[#ece6df] pt-3 font-display text-[20px] text-[#2f2222]"><span>Total</span><span>{rupees(total)}</span></div>
            </div>
            <button
              disabled={!canPlace}
              onClick={submit}
              className={`mt-6 w-full rounded-full py-4 text-[14px] font-medium uppercase tracking-[0.12em] transition ${canPlace ? "bg-[#2f2222] text-[#f7e9e6] hover:bg-[#432f2f]" : "cursor-not-allowed bg-[#ded6cc] text-white"}`}
            >
              {method === "cod" ? "Place Order (COD)" : `Pay ${rupees(total)}`}
            </button>
            <p className="mt-3 text-center text-[12px] text-[#9a857a]">🔒 Secure checkout · Made in Pakistan 🇵🇰</p>
          </div>
        </div>
      </div>
    </div>
  );
}

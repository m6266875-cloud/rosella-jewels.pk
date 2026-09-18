import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./data";

export type CartItem = { id: number; qty: number };
export type Order = {
  id: string;
  items: { product: Product; qty: number }[];
  total: number;
  method: "cod" | "card";
  name: string;
  date: string;
};

type Store = {
  cart: CartItem[];
  wishlist: number[];
  orders: Order[];
  cartCount: number;
  wishCount: number;
  cartDetailed: { product: Product; qty: number }[];
  subtotal: number;
  addToCart: (id: number, qty?: number) => void;
  removeFromCart: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: number) => void;
  inWishlist: (id: number) => boolean;
  placeOrder: (o: Omit<Order, "id" | "items" | "total" | "date"> & { shipping?: number }) => Order;
};

const Ctx = createContext<Store | null>(null);

const load = <T,>(key: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => load("rj_cart", []));
  const [wishlist, setWishlist] = useState<number[]>(() => load("rj_wish", []));
  const [orders, setOrders] = useState<Order[]>(() => load("rj_orders", []));

  useEffect(() => localStorage.setItem("rj_cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("rj_wish", JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem("rj_orders", JSON.stringify(orders)), [orders]);

  const addToCart = (id: number, qty = 1) =>
    setCart((c) => {
      const found = c.find((i) => i.id === id);
      if (found) return c.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...c, { id, qty }];
    });

  const removeFromCart = (id: number) => setCart((c) => c.filter((i) => i.id !== id));
  const setQty = (id: number, qty: number) =>
    setCart((c) => (qty <= 0 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty } : i))));
  const clearCart = () => setCart([]);

  const toggleWishlist = (id: number) =>
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  const inWishlist = (id: number) => wishlist.includes(id);

  const cartDetailed = useMemo(
    () =>
      cart
        .map((i) => {
          const product = products.find((p) => p.id === i.id);
          return product ? { product, qty: i.qty } : null;
        })
        .filter(Boolean) as { product: Product; qty: number }[],
    [cart]
  );

  const subtotal = useMemo(
    () => cartDetailed.reduce((s, i) => s + i.product.price * i.qty, 0),
    [cartDetailed]
  );

  const placeOrder: Store["placeOrder"] = ({ shipping = 0, ...o }) => {
    const order: Order = {
      ...o,
      id: "RJ" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      items: cartDetailed,
      total: subtotal + shipping,
      date: new Date().toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" }),
    };
    setOrders((os) => [order, ...os]);
    clearCart();
    return order;
  };

  const value: Store = {
    cart,
    wishlist,
    orders,
    cartCount: cart.reduce((s, i) => s + i.qty, 0),
    wishCount: wishlist.length,
    cartDetailed,
    subtotal,
    addToCart,
    removeFromCart,
    setQty,
    clearCart,
    toggleWishlist,
    inWishlist,
    placeOrder,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

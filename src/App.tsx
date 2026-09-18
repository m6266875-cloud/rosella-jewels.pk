import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BestSellers from "./components/BestSellers";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Collection from "./pages/Collection";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import { StoreProvider, useStore } from "./store";

type Route =
  | { page: "home" }
  | { page: "collection" }
  | { page: "product"; id: number }
  | { page: "checkout" };

function parseHash(): Route {
  const h = window.location.hash;
  if (h.startsWith("#product/")) {
    const id = parseInt(h.split("/")[1], 10);
    if (!Number.isNaN(id)) return { page: "product", id };
  }
  if (h === "#collection") return { page: "collection" };
  if (h === "#checkout") return { page: "checkout" };
  return { page: "home" };
}

function Shell() {
  const { cartCount, wishCount } = useStore();
  const [route, setRoute] = useState<Route>(parseHash());
  const [cartOpen, setCartOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);

  const nav = (r: Route) => {
    const hash =
      r.page === "collection" ? "#collection"
      : r.page === "product" ? `#product/${r.id}`
      : r.page === "checkout" ? "#checkout"
      : "";
    window.location.hash = hash;
    setRoute(r);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const openProduct = (id: number) => {
    setCartOpen(false);
    setWishOpen(false);
    nav({ page: "product", id });
  };

  const commonHeader = {
    onCart: () => setCartOpen(true),
    onWish: () => setWishOpen(true),
    cartCount,
    wishCount,
  };

  return (
    <>
      {route.page === "collection" && (
        <Collection onBack={() => nav({ page: "home" })} onOpen={openProduct} {...commonHeader} />
      )}

      {route.page === "product" && (
        <ProductPage
          id={route.id}
          onBack={() => window.history.length > 1 ? window.history.back() : nav({ page: "collection" })}
          onOpen={openProduct}
          {...commonHeader}
        />
      )}

      {route.page === "checkout" && (
        <Checkout onBack={() => nav({ page: "collection" })} onDone={() => nav({ page: "home" })} />
      )}

      {route.page === "home" && (
        <div className="min-h-screen bg-[#fcfbfa] text-[#3a2b2b]">
          <Navbar onShopCollection={() => nav({ page: "collection" })} {...commonHeader} />
          <main>
            <Hero onShopCollection={() => nav({ page: "collection" })} />
            <BestSellers onViewAll={() => nav({ page: "collection" })} onOpen={openProduct} />
            <About />
            <Contact />
          </main>
          <Footer />
        </div>
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => nav({ page: "checkout" })}
        onOpen={openProduct}
      />
      <WishlistDrawer open={wishOpen} onClose={() => setWishOpen(false)} onOpen={openProduct} />
    </>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}

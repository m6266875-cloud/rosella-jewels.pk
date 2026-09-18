import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gallery } from "../data";

/* 3D rotating ring of REAL jewellery photos */
function JewelryOrbit() {
  const count = gallery.length;
  const radius = 300;

  return (
    <div className="scene relative mx-auto flex h-[26rem] w-full items-center justify-center sm:h-[30rem]">
      {/* soft platform reflection */}
      <div className="absolute bottom-6 h-10 w-64 rounded-[100%] bg-[#c9a66b]/20 blur-2xl" />

      <div className="orbit-paused preserve-3d relative h-64 w-48">
        <div className="animate-orbit preserve-3d absolute inset-0">
          {gallery.map((item, i) => {
            const angle = (360 / count) * i;
            return (
              <div
                key={item.name}
                className="group absolute inset-0"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-[0_20px_40px_-18px_rgba(58,43,43,0.5)] ring-1 ring-white/40">
                  <img
                    src={item.src}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2b1f1f]/80 to-transparent px-3 py-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="font-display text-sm text-white">{item.name}</p>
                    <p className="text-[11px] text-amber-200/90">{item.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Hero({ onShopCollection }: { onShopCollection: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      {/* ── Animated background layers (subtle, not loud) ── */}
      <div className="absolute inset-0 -z-30 bg-[#fcfbfa]" />
      {/* two soft moving auras */}
      <div
        className="animate-aura absolute -z-20 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(247,222,214,0.9),transparent_65%)]"
        style={{
          left: `calc(8% + ${mouse.x * -18}px)`,
          top: `calc(-8% + ${mouse.y * -14}px)`,
        }}
      />
      <div
        className="animate-aura absolute -z-20 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(233,215,182,0.55),transparent_65%)]"
        style={{
          right: `calc(4% + ${mouse.x * 18}px)`,
          bottom: `calc(-12% + ${mouse.y * 14}px)`,
          animationDelay: "4s",
        }}
      />
      {/* fine grain texture */}
      <div className="grain absolute inset-0 -z-10 opacity-60" />

      {/* twinkles */}
      {[
        "left-[16%] top-[26%] h-2 w-2",
        "right-[20%] top-[32%] h-1.5 w-1.5",
        "left-[24%] bottom-[24%] h-2.5 w-2.5",
        "right-[26%] bottom-[30%] h-2 w-2",
      ].map((c, i) => (
        <span
          key={i}
          className={`animate-twinkle absolute rounded-full bg-[#c9a66b] ${c}`}
          style={{ animationDelay: `${i * 0.8}s` }}
        />
      ))}

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 md:px-10 lg:grid-cols-[1fr_1.05fr]">
        {/* ── Left: copy ── */}
        <motion.div style={{ y: yContent, opacity }} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d9c3a3]/60 bg-white/50 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#8a6d4a]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#b48a4a]" />
            Stainless Steel · Made in Pakistan
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="font-display text-[2.75rem] font-medium leading-[1.05] tracking-tight text-[#2f2222] sm:text-6xl xl:text-[4.5rem]"
          >
            Jewellery that
            <br />
            <span className="text-gold-soft italic">stays</span> with you,
            <br />
            every day.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-6 max-w-md text-[15px] leading-relaxed text-[#6b5a52]"
          >
            Minimalist, tarnish-resistant pieces crafted for real life —
            elegant enough for the moments, gentle enough for the everyday.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <motion.button
              onClick={onShopCollection}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#2f2222] px-8 py-4 text-[13px] font-medium uppercase tracking-[0.15em] text-[#f7e9e6] transition-colors hover:bg-[#432f2f]"
            >
              Shop Collection
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </motion.button>
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full border border-[#3a2b2b]/25 bg-white/40 px-8 py-4 text-[13px] font-medium uppercase tracking-[0.15em] text-[#3a2b2b] transition-colors hover:border-[#3a2b2b]/50"
            >
              Contact Us
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="mt-12 flex items-center gap-10"
          >
            {[
              { n: "5K+", l: "Happy clients" },
              { n: "200+", l: "Designs" },
              { n: "100%", l: "Tarnish-free" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-2xl text-[#2f2222]">{s.n}</p>
                <p className="text-[11px] uppercase tracking-wide text-[#9a857a]">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: 3D real-jewellery orbit ── */}
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          <JewelryOrbit />

          {/* centered brand mark inside the ring */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <div className="animate-float h-24 w-24 overflow-hidden rounded-full opacity-95 ring-1 ring-[#c9a66b]/40 sm:h-28 sm:w-28">
              <img src="/images/rj-logo.png" alt="Rosella Jewels" className="h-full w-full object-cover" />
            </div>
            <p className="mt-3 font-display text-xs uppercase tracking-[0.3em] text-[#8a6d4a]">Rosella</p>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[#9a857a]"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Explore</span>
        <div className="flex h-8 w-5 justify-center rounded-full border border-[#b09a80]/60 p-1">
          <motion.span
            animate={{ y: [0, 9, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-1.5 w-1.5 rounded-full bg-[#b48a4a]"
          />
        </div>
      </motion.div>
    </section>
  );
}

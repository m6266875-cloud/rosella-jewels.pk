import { motion } from "framer-motion";
import { featured } from "../data";

const stats = [
  { n: "5,000+", l: "Happy customers" },
  { n: "200+", l: "Unique designs" },
  { n: "19", l: "Cities delivered" },
  { n: "100%", l: "Tarnish-free" },
];

const values = [
  { icon: "✦", title: "Quality First", desc: "316L stainless steel that never fades or tarnishes." },
  { icon: "❀", title: "Skin Safe", desc: "Hypoallergenic and gentle on sensitive skin." },
  { icon: "◇", title: "Minimal Design", desc: "Timeless pieces made for everyday elegance." },
  { icon: "☾", title: "Made Locally", desc: "Proudly crafted and shipped across Pakistan." },
];

const fade = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

export default function About() {
  return (
    <section id="about" className="relative">
      {/* ── Full-width landscape banner ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative h-[52vh] min-h-[360px] w-full overflow-hidden"
      >
        <img
          src={featured.banner}
          alt="Rosella Jewels craftsmanship"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2f2222]/85 via-[#2f2222]/35 to-[#2f2222]/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-xl"
            >
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-[#e6c983]">
                Our Story
              </p>
              <h2 className="font-display text-4xl font-medium leading-tight text-white sm:text-6xl">
                Crafted with care, worn with love.
              </h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/80">
                Rosella Jewels began with one idea — elegant jewellery that lasts,
                made for real, everyday life.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Owner + business ── */}
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Owner card */}
          <motion.div
            variants={fade}
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lg sm:max-w-md">
              <img src={featured.ownerCraft} alt="Founder crafting jewellery" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-white px-6 py-4 shadow-xl ring-1 ring-[#ece6df] sm:left-10">
              <p className="font-display text-xl text-[#2f2222]">Rosella</p>
              <p className="text-[12px] uppercase tracking-[0.2em] text-[#a08765]">Founder &amp; Designer</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={fade}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#a08765]">
              Meet the Founder
            </p>
            <h3 className="font-display text-3xl font-medium leading-tight text-[#2f2222] sm:text-4xl">
              A passion turned into a promise.
            </h3>
            <p className="mt-5 text-[16px] leading-relaxed text-[#6b5a52]">
              Rosella started this brand from home in 2026 with a simple belief:
              beautiful jewellery shouldn't fade — in quality or in style. Every
              piece is chosen and finished by hand.
            </p>

            {/* signature quote */}
            <blockquote className="mt-7 border-l-2 border-[#c9a66b] pl-5 font-cormorant text-2xl italic leading-snug text-[#5a4a42]">
              "Jewellery should feel personal, last long, and shine every day."
            </blockquote>

            {/* how it works */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                { s: "01", t: "You choose" },
                { s: "02", t: "We pack" },
                { s: "03", t: "COD delivery" },
              ].map((step) => (
                <div key={step.s} className="rounded-2xl bg-white p-4 ring-1 ring-[#ece6df]">
                  <p className="font-display text-2xl text-[#c9a66b]">{step.s}</p>
                  <p className="mt-1 text-[13px] font-medium text-[#5a4a42]">{step.t}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Stats strip ── */}
        <motion.div
          variants={fade}
          custom={2}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 gap-6 rounded-3xl bg-[#2f2222] px-8 py-10 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <p className="font-display text-3xl text-[#e6c983] sm:text-4xl">{s.n}</p>
              <p className="mt-1 text-[13px] tracking-wide text-white/70">{s.l}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Values ── */}
        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              variants={fade}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="rounded-3xl bg-white p-7 text-center ring-1 ring-[#ece6df] transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-3xl text-[#c9a66b]">{v.icon}</span>
              <h4 className="mt-4 font-display text-xl text-[#2f2222]">{v.title}</h4>
              <p className="mt-2 text-[14px] leading-relaxed text-[#6b5a52]">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

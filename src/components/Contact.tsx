import { motion } from "framer-motion";

const channels = [
  { icon: "📷", label: "Instagram", value: "@rosellajewels2026", href: "https://instagram.com/rosellajewels2026" },
  { icon: "💬", label: "WhatsApp", value: "+92 300 0000000", href: "https://wa.me/923000000000" },
  { icon: "✉️", label: "Email", value: "hello@rosellajewels.pk", href: "mailto:hello@rosellajewels.pk" },
  { icon: "📍", label: "Ships from", value: "Pakistan 🇵🇰", href: undefined },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#a08765]">
          Contact
        </p>
        <h2 className="font-display text-4xl font-semibold leading-tight text-[#2f2222] sm:text-5xl">
          Let's talk.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[16px] text-[#6b5a52]">
          Questions or custom orders? We reply fast.
        </p>
      </motion.div>

      <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {channels.map((c, i) => {
          const Card = (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="h-full rounded-3xl bg-white p-7 text-center ring-1 ring-[#ece6df] transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-3xl">{c.icon}</span>
              <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#a08765]">
                {c.label}
              </p>
              <p className="mt-1 font-display text-[17px] font-medium text-[#2f2222]">{c.value}</p>
            </motion.div>
          );
          return c.href ? (
            <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="block">
              {Card}
            </a>
          ) : (
            <div key={c.label}>{Card}</div>
          );
        })}
      </div>
    </section>
  );
}

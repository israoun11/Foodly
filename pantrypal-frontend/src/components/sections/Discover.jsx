import { motion } from "framer-motion";

const MARQUEE_WORDS = [
  "Oranges",
  "Tomatoes",
  "Avocado",
  "Broccoli",
  "Carrots",
  "Peppers",
  "Herbs",
  "Lemons",
];

const reveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function Discover() {
  return (
    <section id="discover" className="py-24 md:py-32">
      <div className="container-page">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={reveal}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">
            Discover
          </span>
          <h2 className="mt-4 font-display text-display-lg italic text-ink">
            Cooking, reimagined around what's already yours.
          </h2>
          <p className="mt-6 max-w-lg text-lg text-ink/60">
            Foodly isn't another recipe database. It's a way to look at
            your own kitchen differently — and find something worth cooking
            in it tonight.
          </p>
        </motion.div>
      </div>

      <div className="mt-16 overflow-hidden border-y border-ink/10 py-6">
        <div className="flex w-max animate-marquee gap-12">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="font-display text-4xl italic text-ink/15 md:text-6xl"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

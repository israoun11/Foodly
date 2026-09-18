import { motion } from "framer-motion";
import { Leaf, Droplets, Scale, Salad, Beef, PieChart } from "lucide-react";
import { HEALTHY_TIPS } from "../../data/healthyTips.js";

const ICONS = [PieChart, Beef, Salad, Scale, Droplets, Leaf];

const TONE_CLASSES = {
  leaf: "bg-leaf text-paper",
  orange: "bg-orange text-paper",
  yolk: "bg-yolk text-ink",
};

export function HealthyLiving() {
  return (
    <section id="healthy" className="bg-cream py-24 md:py-32">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-dark">
            Healthy Living
          </span>
          <h2 className="mt-4 font-display text-display-lg italic text-ink">
            Small habits, real results.
          </h2>
          <p className="mt-6 text-lg text-ink/60">
            No fads, no restrictions — just practical habits that make
            healthy eating feel sustainable.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HEALTHY_TIPS.map((tip, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                whileHover={{ y: -6 }}
                className="group bg-paper p-7"
              >
                <div
                  className={`inline-flex rounded-full p-3 transition-transform duration-300 group-hover:scale-110 ${TONE_CLASSES[tip.color]}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-2xl italic text-ink">
                  {tip.title}
                </h3>
                <p className="mt-2 text-sm text-ink/60">{tip.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

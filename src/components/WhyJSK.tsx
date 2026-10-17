import { motion } from 'framer-motion';
import { whyJskCards } from '../data/services';
import { Stagger } from './motion/Reveal';
import { staggerItem } from './motion/variants';
import SectionHeader from './ui/SectionHeader';
import { trackSpotlight } from '../lib/utils';

export default function WhyJSK() {
  return (
    <section id="why-jsk" className="section pt-8">
      <div className="container-x">
        <SectionHeader
          align="center"
          eyebrow="Why JSK"
          title={<>Why businesses <span className="text-gradient">choose us.</span></>}
        />

        <Stagger className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whyJskCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={staggerItem}
                onPointerMove={trackSpotlight}
                className="card spotlight group p-7 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-electric-400/25"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-electric-400 transition-[transform,background-color,color] duration-500 group-hover:rotate-[-8deg] group-hover:bg-electric-400 group-hover:text-navy-950">
                    <Icon size={22} />
                  </span>
                  <span className="font-display text-4xl font-semibold text-white/[0.06]">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-400">{card.description}</p>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

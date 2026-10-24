import { motion } from 'framer-motion';
import { industries } from '../data/services';
import { Stagger } from './motion/Reveal';
import { staggerItem } from './motion/variants';
import SectionHeader from './ui/SectionHeader';

export default function Industries() {
  return (
    <section id="industries" className="section bg-pine-900/40">
      <div className="container-x">
        <SectionHeader
          align="center"
          eyebrow="Industries"
          title={<>Built for the places <span className="text-gradient">business happens.</span></>}
          description="From offices and retail floors to warehouses and hospitals, we adapt to each environment's systems and constraints."
        />

        <Stagger className="mt-16 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {industries.map((ind) => (
            <motion.article
              key={ind.name}
              variants={staggerItem}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/[0.07] sm:aspect-[4/5]"
            >
              <img
                src={ind.image}
                alt={ind.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pine-950 via-pine-950/50 to-pine-950/10 transition-opacity duration-500" />

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <h3 className="text-base font-semibold text-white sm:text-lg">{ind.name}</h3>
                <div className="mt-2.5 flex flex-wrap gap-1 transition lg:mt-3 lg:flex-nowrap lg:gap-1.5 lg:overflow-hidden-[opacity,transform] duration-500 ease-out lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                  {ind.systems.map((s, i) => (
                    <span key={s} className={`shrink-0 whitespace-nowrap rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-slate-200 sm:text-[11px] ${i > 1 ? "max-sm:hidden" : ""}`}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

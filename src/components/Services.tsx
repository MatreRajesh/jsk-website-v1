import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { featuredServices, moreServices } from '../data/services';
import { Reveal, Stagger } from './motion/Reveal';
import { staggerItem } from './motion/variants';
import SectionHeader from './ui/SectionHeader';
import { trackSpotlight } from '../lib/utils';

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="absolute inset-0 bg-grid opacity-50 mask-fade-y" />

      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow="Our Services"
            title={<>Everything your site needs, <span className="text-gradient">done on the ground.</span></>}
          />
          <p className="max-w-sm text-slate-400 lg:pb-2">
            Twelve technical service lines delivered by one accountable team — from first cable to final sign-off.
          </p>
        </div>

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((svc) => {
            const Icon = svc.icon;
            return (
              <motion.article
                key={svc.id}
                variants={staggerItem}
                onPointerMove={trackSpotlight}
                className="card spotlight group flex flex-col transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-electric-400/30"
              >
                <div className="relative m-2 aspect-[16/10] overflow-hidden rounded-xl">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/10 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-navy-950/70 px-2.5 py-1 font-mono text-[10px] text-slate-300">
                    {svc.id}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-electric-400/10 text-electric-400 transition-colors duration-300 group-hover:bg-electric-400 group-hover:text-navy-950">
                      <Icon size={20} />
                    </span>
                    <ArrowUpRight
                      size={20}
                      className="text-slate-600 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric-400"
                    />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{svc.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-400">{svc.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {svc.tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </Stagger>

        <Reveal className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
          {moreServices.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.title}
                className="group flex items-start gap-4 bg-navy-900 p-6 transition-colors duration-300 hover:bg-navy-850"
              >
                <Icon size={22} className="mt-0.5 shrink-0 text-electric-400 transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <h3 className="font-sans text-base font-semibold text-white">{svc.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{svc.description}</p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

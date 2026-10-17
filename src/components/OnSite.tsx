import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from './motion/Reveal';
import { TextReveal } from './motion/TextReveal';

const points = [
  { title: 'Accurate execution', text: 'Installations that follow the plan, the standard and the site.' },
  { title: 'Clean cable management', text: 'Routed, dressed, labeled — easy to maintain for years.' },
  { title: 'Strict system readiness', text: 'Nothing is handed over until it is tested and verified.' },
];

export default function OnSite() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section ref={ref} className="relative overflow-hidden py-28 sm:py-40">
      <motion.div style={{ y }} className="absolute -inset-y-[15%] inset-x-0 will-change-transform">
        <img src="/images/onsite.webp" alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-navy-950/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-navy-950" />

      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow">Field First</p>
        </Reveal>
        <TextReveal
          text="The work happens on site."
          className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-8xl"
          wordClassName={(_, i) => (i >= 3 ? 'text-gradient' : undefined)}
        />
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300">
            Infrastructure is only as reliable as its installation. We focus on the details that decide whether a
            system works on day one — and on day one thousand.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {points.map((p, i) => (
            <div key={p.title} className="h-full bg-navy-950 p-7">
              <span className="font-mono text-xs text-electric-400">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-slate-400">{p.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

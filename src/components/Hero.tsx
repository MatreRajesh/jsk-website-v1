import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, Activity } from 'lucide-react';
import { MagneticButton } from './motion/MagneticButton';
import { TextReveal } from './motion/TextReveal';

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

const checks = ['Cabling terminated', 'Network configured', 'CCTV online', 'System tested'];

const stats = [
  { value: '12+', label: 'Technical service lines' },
  { value: '6-step', label: 'Delivery process' },
  { value: 'End-to-end', label: 'Install → handover' },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden noise">
      {/* Background photo: parallax on the wrapper, slow zoom-out on the image (both transform-only) */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 will-change-transform">
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/hero-mobile.webp" />
          <img
            src="/images/hero.webp"
            alt=""
            fetchPriority="high"
            className="h-full w-full animate-kenburns object-cover"
          />
        </picture>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/60" />
      <div className="absolute inset-0 bg-grid opacity-40 mask-fade-y" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container-x relative z-10 pb-20 pt-32 sm:pt-36">
        <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2 pr-4 text-xs text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for on-site projects
            </motion.div>

            <TextReveal
              as="h1"
              animateOnMount
              delay={0.2}
              text="Technical infrastructure, installed right."
              className="mt-7 text-[2.75rem] font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
              wordClassName={(_, i) => (i >= 2 ? 'text-gradient' : undefined)}
            />

            <motion.p {...fadeUp(0.65)} className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300/90">
              End-to-end field installation, configuration, testing and commissioning for IT infrastructure,
              networking, CCTV and technical systems.
            </motion.p>

            <motion.div {...fadeUp(0.8)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticButton>
                <a href="#contact" className="btn btn-primary group w-full px-7 py-4 text-base sm:w-auto">
                  Start a Project
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </MagneticButton>
              <a href="#services" className="btn btn-ghost px-7 py-4 text-base">
                Explore Services
              </a>
            </motion.div>

            <motion.dl {...fadeUp(1)} className="mt-14 grid max-w-xl grid-cols-3 gap-4 sm:gap-6 border-t border-white/10 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-lg font-semibold text-white sm:text-2xl">{s.value}</dd>
                  <dd className="mt-1 text-xs leading-snug text-slate-400 sm:text-sm">{s.label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Status card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.7, ease }}
            className="hidden lg:block"
          >
            <div className="card relative p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-electric-400/10 text-electric-400">
                    <Activity size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white">Site Commissioning</p>
                    <p className="font-mono text-[11px] text-slate-500">SITE-0426 · Live</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] font-medium text-emerald-400">ONLINE</span>
              </div>

              <ul className="mt-6 space-y-3">
                {checks.map((c, i) => (
                  <motion.li
                    key={c}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + i * 0.18, duration: 0.6, ease }}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                  >
                    <CheckCircle2 size={18} className="text-electric-400" />
                    <span className="text-sm text-slate-300">{c}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-6">
                <div className="flex justify-between font-mono text-[11px] text-slate-500">
                  <span>Readiness</span>
                  <span className="text-electric-400">100%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.3, duration: 1.6, ease }}
                    className="h-full origin-left rounded-full bg-gradient-to-r from-electric-500 to-electric-300"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 right-8 z-10 hidden flex-col items-center gap-3 text-slate-500 lg:flex"
        aria-label="Scroll to about section"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-electric-400"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  );
}

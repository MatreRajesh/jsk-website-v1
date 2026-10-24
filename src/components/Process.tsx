import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { processSteps } from '../data/services';
import { Reveal } from './motion/Reveal';
import SectionHeader from './ui/SectionHeader';

export default function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="process" className="section">
      <div className="container-x grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        {/* CSS sticky: no scroll listeners needed */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeader
            eyebrow="How We Work"
            title={<>From site <span className="text-gradient">to system.</span></>}
            description="A clear, six-step delivery process that takes your project from requirement to a tested, commissioned and documented system."
          />
          <Reveal delay={0.25}>
            <a href="#contact" className="btn btn-ghost mt-10">
              Discuss your requirement
            </a>
          </Reveal>
        </div>

        <ol ref={listRef} className="relative">
          {/* Track + animated fill */}
          <div className="absolute bottom-6 left-[21px] sm:left-[27px] top-6 w-px bg-white/10" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute bottom-6 left-[21px] sm:left-[27px] top-6 w-px origin-top bg-gradient-to-b from-gold-300 to-gold-500"
          />

          {processSteps.map((step) => {
            const Icon = step.icon;
            return (
              <li key={step.step} className="relative pb-10 pl-16 last:pb-0 sm:pb-12 sm:pl-20">
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '0px 0px -30% 0px' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="absolute left-0 top-0 grid h-11 w-11 place-items-center rounded-xl sm:h-14 sm:w-14 sm:rounded-2xl border border-gold-400/30 bg-pine-900 text-gold-400 shadow-[0_0_0_6px_var(--color-pine-950)]"
                >
                  <Icon size={20} />
                </motion.span>
                <Reveal y={20}>
                  <div className="card p-5 transition-colors duration-300 hover:border-gold-400/25 sm:p-6">
                    <span className="font-mono text-xs text-gold-400">STEP {step.step}</span>
                    <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-slate-400">{step.description}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

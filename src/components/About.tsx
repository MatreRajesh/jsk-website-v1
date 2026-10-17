import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { Reveal } from './motion/Reveal';
import { Parallax } from './motion/Parallax';
import { TextReveal } from './motion/TextReveal';

const phases = ['Installation', 'Configuration', 'Testing', 'Commissioning'];

export default function About() {
  return (
    <section id="about" className="section overflow-hidden">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Image collage */}
        <Reveal className="relative order-2 mx-auto w-full max-w-lg lg:order-1 lg:max-w-none">
          <div className="relative aspect-[4/5] w-[82%] overflow-hidden rounded-3xl">
            <Parallax offset={30} className="absolute -inset-y-10 inset-x-0">
              <img
                src="/images/about-technician.webp"
                alt="Field technician working on an electrical panel"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
          </div>

          <div className="absolute -bottom-8 right-0 aspect-square w-[46%] overflow-hidden rounded-3xl border-[6px] border-navy-950 shadow-2xl">
            <img
              src="/images/about-engineer.webp"
              alt="Engineer testing equipment in a lab"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="card absolute left-4 top-6 flex items-center gap-3 px-4 py-3 shadow-xl sm:left-6"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-electric-400 text-navy-950">
              <ShieldCheck size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Tested before handover</p>
              <p className="text-xs text-slate-400">Every system, every site</p>
            </div>
          </motion.div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow">About JSK</p>
          </Reveal>
          <TextReveal
            text="Technology works when it's installed right."
            className="heading-xl mt-5"
            wordClassName={(_, i) => (i >= 4 ? 'text-gradient' : undefined)}
          />
          <Reveal delay={0.15}>
            <p className="mt-6 text-lg leading-relaxed text-slate-400">
              JSK provides end-to-end field technical support for businesses and project sites. From structured
              cabling and network installation to CCTV, server infrastructure, safety devices, testing and
              commissioning — our team works on the ground so every system is installed correctly, tested
              thoroughly and ready for operation.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 space-y-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">Implementation lifecycle</p>
              {phases.map((phase, i) => (
                <div key={phase} className="flex items-center gap-4">
                  <span className="w-6 font-mono text-xs text-electric-400/70">0{i + 1}</span>
                  <span className="w-32 text-sm font-medium text-slate-300">{phase}</span>
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className="h-full origin-left rounded-full bg-gradient-to-r from-electric-500 to-electric-300"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { capabilities } from '../data/services';
import { Reveal } from './motion/Reveal';
import SectionHeader from './ui/SectionHeader';
import { cn } from '../lib/utils';

export default function Capabilities() {
  const [activeId, setActiveId] = useState(capabilities[0].id);
  const active = capabilities.find((c) => c.id === activeId)!;

  return (
    <section id="capabilities" className="section pt-0">
      <div className="container-x">
        <div className="card relative overflow-hidden p-5 sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />

          <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] [&>*]:min-w-0">
            <div>
              <SectionHeader
                eyebrow="Technical Areas"
                title={<>What we <span className="text-gradient">work with</span></>}
                description="Hands-on experience across the systems that keep modern sites connected, secure and running."
              />

              <Reveal delay={0.2}>
                <div role="tablist" aria-label="Capability areas" className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
                  {capabilities.map((c) => {
                    const isActive = c.id === activeId;
                    return (
                      <button
                        key={c.id}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveId(c.id)}
                        className={cn(
                          'relative shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300',
                          isActive ? 'text-pine-950' : 'text-slate-400 hover:text-white',
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="cap-pill"
                            className="absolute inset-0 rounded-full bg-gold-400"
                            transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                          />
                        )}
                        <span className="relative">{c.title}</span>
                      </button>
                    );
                  })}
                </div>
              </Reveal>
            </div>

            <div role="tabpanel" className="relative min-h-[320px]">
              <AnimatePresence mode="wait">
                <motion.ul
                  key={active.id}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.05 } },
                    exit: { opacity: 0, transition: { duration: 0.15 } },
                  }}
                  className="grid gap-3 sm:grid-cols-2"
                >
                  {active.items.map((item, i) => (
                    <motion.li
                      key={item}
                      variants={{
                        hidden: { opacity: 0, y: 14 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
                      }}
                      className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-pine-950/60 px-5 py-4"
                    >
                      <span className="flex items-center gap-3">
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-gold-400/10 text-gold-400">
                          <Check size={14} strokeWidth={3} />
                        </span>
                        <span className="text-[15px] text-slate-200">{item}</span>
                      </span>
                      <span className="font-mono text-[10px] text-slate-600">{String(i + 1).padStart(2, '0')}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navLinks, site } from '../data/site';
import { cn } from '../lib/utils';
import Logo from './ui/Logo';

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const sectionIds = navLinks.map((l) => l.href.slice(1));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const lenis = useLenis();
  const { scrollY } = useScroll();

  // Hide when scrolling down, reveal when scrolling up
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden((h) => (y > 400 && y > prev + 4 ? true : y < prev - 4 ? false : h));
  });

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open, lenis]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: hidden && !open ? '-110%' : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          className={cn(
            'mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-2.5 transition-[background-color,border-color,box-shadow] duration-500 sm:px-6',
            scrolled
              ? 'border-white/10 bg-pine-950/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md'
              : 'border-transparent bg-transparent',
          )}
        >
          <a href="#home" className="group flex items-center gap-3" aria-label="JSK home">
            <Logo className="w-[84px] transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span className="hidden border-l border-white/15 pl-3 text-[11px] font-medium uppercase leading-tight tracking-[0.14em] text-slate-300 sm:block">
              IT Network
              <span className="block text-gold-400">&amp; ELV Services</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    className={cn(
                      'relative z-10 block rounded-full px-4 py-2 text-sm transition-colors duration-300',
                      isActive ? 'text-white' : 'text-slate-400 hover:text-white',
                    )}
                  >
                    {link.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a href="#contact" className="btn btn-primary hidden !py-2.5 sm:inline-flex">
              Get a Quote <ArrowUpRight size={16} />
            </a>
            <button
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex flex-col bg-pine-950 px-6 pb-10 pt-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-semibold text-white">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <ul className="mt-14 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-white/5 py-4 font-display text-4xl font-semibold text-white"
                  >
                    <span className="font-mono text-xs text-gold-400">0{i + 1}</span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-auto space-y-4"
            >
              <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                Get a Quote <ArrowUpRight size={16} />
              </a>
              <p className="text-center text-sm text-slate-500">
                {site.phone} · {site.email}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

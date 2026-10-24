import { ArrowUp } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { navLinks, site, team } from '../data/site';
import { featuredServices } from '../data/services';
import Logo from './ui/Logo';

const year = new Date().getFullYear();

export default function Footer() {
  const lenis = useLenis();
  const toTop = () => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }));

  return (
    <footer className="relative mt-12 border-t border-white/[0.06] bg-pine-900/50">
      <div className="container-x pb-10 pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#home" className="inline-block" aria-label="JSK home">
              <Logo withTagline className="w-44" />
            </a>
            <p className="mt-5 text-sm font-medium text-gold-400">{site.tagline}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              Reliable on-site installation, configuration, testing and commissioning for modern business environments.
            </p>
          </div>

          <div>
            <h3 className="font-sans text-sm font-semibold text-white">Company</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-slate-400 transition-colors hover:text-gold-400">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-sm font-semibold text-white">Services</h3>
            <ul className="mt-5 space-y-3">
              {featuredServices.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="text-sm text-slate-400 transition-colors hover:text-gold-400">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              {team.map((m) => (
                <li key={m.phone}>
                  <a href={`tel:${m.phone.replace(/[^\d+]/g, '')}`} className="group transition-colors hover:text-gold-400">
                    <span className="block text-xs text-slate-500 group-hover:text-gold-400/70">{m.name}</span>
                    {m.phone}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold-400">
                  {site.email}
                </a>
              </li>
              <li>
                {site.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">© {year} JSK. All rights reserved.</p>
          <button
            onClick={toTop}
            className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
          >
            Back to top
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 transition-transform duration-300 group-hover:-translate-y-0.5">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

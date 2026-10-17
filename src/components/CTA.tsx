import { ArrowRight, Phone } from 'lucide-react';
import { Reveal } from './motion/Reveal';
import { MagneticButton } from './motion/MagneticButton';
import { Parallax } from './motion/Parallax';
import { site } from '../data/site';

export default function CTA() {
  return (
    <section className="py-12 sm:py-20">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
            <Parallax offset={40} className="absolute -inset-y-12 inset-x-0">
              <img src="/images/cta-team.webp" alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/50" />
            <div className="absolute inset-0 bg-grid opacity-30" />

            <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-20 lg:py-24">
              <p className="eyebrow">Let's build it</p>
              <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                Have a technical project <span className="text-gradient">on site?</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg text-slate-300">
                Tell us what needs to be installed, configured, tested or supported. We'll help you plan the next step.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <MagneticButton>
                  <a href="#contact" className="btn btn-primary group w-full px-7 py-4 text-base sm:w-auto">
                    Request a Site Visit
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </MagneticButton>
                <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} className="btn btn-ghost px-7 py-4 text-base">
                  <Phone size={18} /> {site.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

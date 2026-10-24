import { CheckCircle2 } from 'lucide-react';
import { projects } from '../data/services';
import SectionHeader from './ui/SectionHeader';

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container-x">
        <SectionHeader
          eyebrow="Selected Work"
          title={<>Field implementations, <span className="text-gradient">delivered.</span></>}
          description="A look at the kind of projects our team takes from bare site to working system."
        />

        {/* Stacking cards: pure CSS sticky, each card pins slightly lower than the previous one */}
        <div className="mt-16 space-y-6 lg:space-y-10">
          {projects.map((p, i) => (
            <article
              key={p.title}
              style={{ top: `${96 + i * 24}px` }}
              className="card grid bg-pine-900 lg:sticky overflow-hidden shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.8)] lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[440px]">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pine-900/80 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-pine-900/30" />
              </div>

              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1 font-mono text-[11px] text-gold-300">
                    PRJ / 0{i + 1}
                  </span>
                  <span className="text-sm text-slate-400">{p.category}</span>
                </div>
                <h3 className="mt-6 text-3xl font-semibold leading-tight text-white sm:text-4xl">{p.title}</h3>
                <p className="mt-4 leading-relaxed text-slate-400">{p.description}</p>
                <ul className="mt-8 grid grid-cols-2 gap-3">
                  {p.scope.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 size={16} className="shrink-0 text-gold-400" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { ReactNode } from 'react';
import { Reveal } from '../motion/Reveal';
import { cn } from '../../lib/utils';

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  const centered = align === 'center';
  return (
    <div className={cn('max-w-3xl', centered && 'mx-auto text-center', className)}>
      <Reveal>
        <p className={cn('eyebrow', centered && 'justify-center')}>{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="heading-xl mt-5">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className={cn('mt-6 text-lg leading-relaxed text-slate-400', centered && 'mx-auto max-w-2xl')}>{description}</p>
        </Reveal>
      )}
    </div>
  );
}

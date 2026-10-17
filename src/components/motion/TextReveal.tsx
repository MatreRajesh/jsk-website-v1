import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * Word-by-word mask reveal. Each word slides up from behind an overflow-hidden wrapper,
 * which is pure transform work (no blur filters), so it stays at 60fps.
 */
export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  as: Tag = 'h2',
  animateOnMount = false,
}: {
  text: string;
  className?: string;
  wordClassName?: (word: string, index: number) => string | undefined;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  animateOnMount?: boolean;
}) {
  const words = text.split(' ');
  const trigger = animateOnMount
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } };

  return (
    <Tag className={cn(className)} aria-label={text}>
      <motion.span
        aria-hidden
        className="inline"
        initial="hidden"
        {...trigger}
        transition={{ staggerChildren: 0.06, delayChildren: delay }}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className={cn('inline-block', wordClassName?.(word, i))}
              variants={{
                hidden: { y: '110%' },
                show: { y: '0%', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              {word}
              {i < words.length - 1 && ' '}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

import { cn } from '../../lib/utils';

const GOLD = '#ffd60a';
const INK = '#062724'; // pine-900: line work cut into the white feather and flute

const barbs = [-16, -21, -26, -31, -36, -41];
const holes = [92, 104, 116, 128, 140, 152];

/** Peacock feather (mor pankh) drawn upright from its quill at 0,0; placed and tilted by the parent group. */
function Feather() {
  return (
    <g>
      {/* loose barbs near the quill */}
      <path d="M0 -6 C -6 -9 -10 -8 -14 -12 M0 -9 C 6 -12 10 -11 14 -15" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* vane */}
      <path d="M0 -10 C -10 -20 -15 -40 -13 -56 C -11 -70 -5 -78 0 -80 C 5 -78 11 -70 13 -56 C 15 -40 10 -20 0 -10 Z" fill="#fff" />
      {barbs.map((y) => (
        <path key={y} d={`M-11 ${y - 6} L0 ${y} L11 ${y - 6}`} stroke={INK} strokeWidth="1" fill="none" strokeLinecap="round" />
      ))}
      {/* eye */}
      <ellipse cx="0" cy="-60" rx="8.5" ry="11.5" fill={INK} />
      <ellipse cx="0" cy="-59" rx="5.5" ry="7.5" fill="#fff" />
      <ellipse cx="0" cy="-58" rx="2.8" ry="4" fill={INK} />
      {/* quill */}
      <path d="M0 2 L0 -48" stroke={INK} strokeWidth="1.1" strokeLinecap="round" />
    </g>
  );
}

/** Bansuri with tassels hanging from the left end. */
function Flute() {
  return (
    <g>
      <path d="M30 70 C 28 78 31 86 27 96 M30 70 C 33 79 30 88 34 97 M30 70 C 30 80 30 88 30 99" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="30" cy="70" r="3" fill={GOLD} />
      <rect x="20" y="58" width="164" height="10" rx="5" fill="#fff" />
      {[34, 40, 168, 174].map((x) => (
        <rect key={x} x={x} y="58" width="2.5" height="10" fill={INK} />
      ))}
      <ellipse cx="56" cy="63" rx="3" ry="2.2" fill={INK} />
      {holes.map((x) => (
        <circle key={x} cx={x} cy="63" r="2.1" fill={INK} />
      ))}
    </g>
  );
}

type LogoProps = {
  className?: string;
  /** Show the "IT Network & ELV Services" strip under the wordmark (needs ~140px of width to stay legible). */
  withTagline?: boolean;
};

export default function Logo({ className, withTagline = false }: LogoProps) {
  return (
    <svg
      viewBox={withTagline ? '0 -6 204 158' : '0 -6 204 138'}
      role="img"
      aria-label="JSK – IT Network & ELV Services"
      className={cn('h-auto', className)}
    >
      <g transform="translate(124 62) rotate(-38)">
        <Feather />
      </g>
      <Flute />
      <text
        x="102"
        y="129"
        textAnchor="middle"
        fontFamily="var(--font-brand)"
        fontSize="62"
        letterSpacing="1"
        fill={GOLD}
      >
        JSK
      </text>
      {withTagline && (
        <g>
          <rect x="44" y="134" width="116" height="15" rx="1.5" fill={GOLD} />
          <text x="102" y="145" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="8.6" fontWeight="700" fill={INK}>
            IT Network &amp; ELV Services
          </text>
        </g>
      )}
    </svg>
  );
}

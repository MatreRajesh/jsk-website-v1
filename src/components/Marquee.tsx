const items = [
  'LAN Installation', 'CCTV & IP Cameras', 'Server Racks', 'Structured Cabling', 'Wi-Fi',
  'POS Systems', 'Biometric Access', 'I/O Termination', 'Fire Safety Devices', 'Commissioning',
];

/** Infinite ticker driven by a CSS keyframe (compositor-only, no JS per frame). */
export default function Marquee() {
  return (
    <div className="relative border-y border-white/[0.06] bg-pine-900/60 py-5" aria-label="Technical areas">
      <div className="group flex overflow-hidden mask-fade-x">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 animate-marquee items-center gap-10 pr-10 will-change-transform group-hover:[animation-play-state:paused]"
          >
            {items.map((item) => (
              <li key={item} className="flex items-center gap-10 whitespace-nowrap font-display text-lg font-medium text-slate-400">
                {item}
                <span className="h-1.5 w-1.5 rotate-45 bg-gold-400/70" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

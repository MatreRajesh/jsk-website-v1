import { useRef, useState, type SyntheticEvent } from 'react';
import { Play } from 'lucide-react';
import { Reveal } from './motion/Reveal';
import SectionHeader from './ui/SectionHeader';

// Discourages saving the video: no download / PiP / cast in the native controls, no right-click "Save video as",
// no drag-out. A determined visitor can still capture anything a browser plays, so this is a deterrent, not DRM.
const block = (e: SyntheticEvent) => e.preventDefault();

export default function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    // Started from a click, so the browser allows playback with sound
    videoRef.current?.play();
  };

  return (
    <section id="intro-video" className="section">
      <div className="container-x">
        <SectionHeader
          align="center"
          eyebrow="JSK in 70 Seconds"
          title={<>See how we <span className="text-gradient">work on site.</span></>}
          description="A short walkthrough of our IT networking and ELV services: what goes wrong on a site, and how our team fixes it."
        />

        <Reveal delay={0.1} className="mx-auto mt-14 max-w-5xl">
          <div
            onContextMenu={block}
            onDragStart={block}
            className="relative aspect-video select-none overflow-hidden rounded-3xl border border-gold-400/20 bg-pine-900 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]"
          >
            <video
              ref={videoRef}
              src="/video/jsk-intro.mp4"
              poster="/video/jsk-intro-poster.jpg"
              preload="none"
              playsInline
              controls={started}
              controlsList="nodownload noplaybackrate noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              draggable={false}
              className="h-full w-full object-cover"
            />

            {!started && (
              <button
                onClick={start}
                aria-label="Play JSK introduction video with sound"
                className="group absolute inset-0 grid place-items-center bg-pine-950/30 transition-colors duration-300 hover:bg-pine-950/10"
              >
                <span className="relative grid h-20 w-20 place-items-center rounded-full bg-gold-400 text-pine-950 shadow-[0_10px_40px_-6px_rgba(255,214,10,0.6)] transition-transform duration-300 group-hover:scale-110 sm:h-24 sm:w-24">
                  <span className="absolute inset-0 animate-ping-slow rounded-full bg-gold-400/40" />
                  <Play size={34} className="relative translate-x-0.5" fill="currentColor" />
                </span>
                <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-pine-950/70 px-4 py-1.5 font-mono text-xs text-slate-200">
                  1:11 · Hindi · Sound on
                </span>
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

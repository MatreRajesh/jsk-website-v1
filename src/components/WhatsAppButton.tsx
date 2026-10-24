import { useEffect, useRef, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ChevronDown, Loader2, ArrowRight } from 'lucide-react';
import Honeypot from './ui/Honeypot';
import { serviceOptions } from '../data/services';
import { sendEnquiry, whatsappUrl } from '../lib/enquiry';
import { cn } from '../lib/utils';

// Longest we hold the visitor back while the sheet request goes out
const SHEET_WAIT_MS = 1500;

type Errors = Partial<Record<'name' | 'service', string>>;

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    nameRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const service = String(data.get('service') ?? '');
    const location = String(data.get('location') ?? '').trim();

    const found: Errors = {};
    if (!name) found.name = 'Please enter your name';
    if (!service) found.service = 'Please select a service';
    setErrors(found);
    if (Object.keys(found).length) return;

    // Open the tab now, while the click still counts as a user gesture, so popup blockers allow it
    const tab = window.open('', '_blank');
    setSending(true);
    await Promise.race([
      sendEnquiry({ source: 'WhatsApp', name, service, location, website: String(data.get('website') ?? '') }).catch(() => {}),
      new Promise((r) => setTimeout(r, SHEET_WAIT_MS)),
    ]);

    const url = whatsappUrl(['Website Enquiry – JSK', `Name: ${name}`, `Service: ${service}`, `Location: ${location || '-'}`].join('\n'));
    if (tab) {
      tab.opener = null;
      tab.location.href = url;
    } else {
      window.location.href = url;
    }
    setSending(false);
    form.reset();
    setOpen(false);
  };

  const inputCls = (key?: keyof Errors) => cn('input py-2.5 text-sm', key && errors[key] && 'border-rose-400/60');

  return (
    <div
      className="fixed right-4 z-50 sm:right-6"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="false"
            aria-labelledby="wa-title"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            data-lenis-prevent
            className="card absolute bottom-[4.5rem] right-0 w-[calc(100vw-2rem)] max-w-[360px] origin-bottom-right border-white/10 bg-pine-900 p-5 shadow-2xl shadow-black/40"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 id="wa-title" className="text-base font-semibold text-white">Chat with JSK on WhatsApp</h2>
                <p className="mt-1 text-xs text-slate-400">Share a few details and continue in WhatsApp.</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form noValidate onSubmit={onSubmit} className="relative space-y-3">
              <Honeypot />

              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-slate-300">Name *</span>
                <input ref={nameRef} name="name" autoComplete="name" placeholder="Your name" className={inputCls('name')} />
                {errors.name && <span className="block text-xs text-rose-400">{errors.name}</span>}
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-slate-300">Service *</span>
                <span className="relative block">
                  <select name="service" defaultValue="" className={cn(inputCls('service'), 'cursor-pointer appearance-none pr-10 [&>option]:bg-pine-900')}>
                    <option value="">Select a service…</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
                </span>
                {errors.service && <span className="block text-xs text-rose-400">{errors.service}</span>}
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-slate-300">Location</span>
                <input name="location" placeholder="City / site (optional)" className={inputCls()} />
              </label>

              <button
                type="submit"
                disabled={sending}
                aria-busy={sending}
                className="btn mt-1 w-full bg-[#25D366] py-3 text-pine-950 hover:bg-[#3ee07a] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {sending ? (
                  <>
                    Opening WhatsApp...
                    <Loader2 size={16} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Continue to WhatsApp
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close WhatsApp chat' : 'Chat on WhatsApp'}
        aria-expanded={open}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.6 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.55)] ring-4 ring-pine-950/60"
      >
        {open ? <X size={26} /> : <MessageCircle size={28} />}
      </motion.button>
    </div>
  );
}

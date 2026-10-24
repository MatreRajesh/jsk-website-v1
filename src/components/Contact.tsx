import { useState, type FormEvent, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, ChevronDown, Loader2, AlertCircle } from 'lucide-react';
import { Reveal } from './motion/Reveal';
import SectionHeader from './ui/SectionHeader';
import Honeypot from './ui/Honeypot';
import { serviceOptions } from '../data/services';
import { site } from '../data/site';
import { normalizePhone, sendEnquiry } from '../lib/enquiry';
import { cn } from '../lib/utils';

const contactItems = [
  { icon: Phone, label: 'Phone', value: site.phone, href: `tel:${site.phone.replace(/[^\d+]/g, '')}` },
  { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: 'Office', value: site.address.join(', ') },
  { icon: Clock, label: 'Hours', value: site.hours },
];

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'service', string>>;

const FIELDS = ['name', 'company', 'phone', 'email', 'location', 'service', 'message', 'website'] as const;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!String(data.get('name') ?? '').trim()) errors.name = 'Please enter your name';
  const phone = String(data.get('phone') ?? '').trim();
  if (!phone) errors.phone = 'Please enter your phone number';
  else if (!normalizePhone(phone)) errors.phone = 'Enter a valid 10-digit mobile number';
  const email = String(data.get('email') ?? '').trim();
  if (email && !/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Enter a valid email';
  if (!String(data.get('service') ?? '')) errors.service = 'Please select a service';
  return errors;
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="block text-xs text-rose-400"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

export default function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    setSubmitError('');
    if (Object.keys(found).length) return;

    const fields = Object.fromEntries(FIELDS.map((k) => [k, String(data.get(k) ?? '')]));
    setSending(true);
    try {
      await sendEnquiry({ ...fields, phone: normalizePhone(fields.phone) ?? fields.phone, source: 'Contact Form' });
      form.reset();
      setSent(true);
    } catch (err) {
      setSubmitError(
        err instanceof TypeError
          ? `Network error: your enquiry could not be sent. Please check your connection and try again, or call us on ${site.phone}.`
          : err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      );
    } finally {
      setSending(false);
    }
  };

  const inputCls = (key?: keyof Errors) => cn('input', key && errors[key] && 'border-rose-400/60');

  return (
    <section id="contact" className="section">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeader
            eyebrow="Get in Touch"
            title={<>Let's talk about <span className="text-gradient">your project.</span></>}
            description="Whether you need a complete infrastructure setup, a specific installation or on-site troubleshooting, our technical team is ready to help."
          />

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {contactItems.map(({ icon: Icon, label, value, href }, i) => {
              const content = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-400/10 text-gold-400 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-pine-950">
                    <Icon size={20} />
                  </span>
                  <span>
                    <span className="block text-xs text-slate-500">{label}</span>
                    <span className="block text-[15px] text-slate-200">{value}</span>
                  </span>
                </>
              );
              return (
                <Reveal key={label} delay={0.05 * i}>
                  {href ? (
                    <a href={href} className="card group flex items-center gap-4 p-4 transition-colors duration-300 hover:border-gold-400/30">
                      {content}
                    </a>
                  ) : (
                    <div className="card group flex items-center gap-4 p-4">{content}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="card relative overflow-hidden p-6 sm:p-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl" />

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative flex min-h-[480px] flex-col items-center justify-center text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                    className="grid h-16 w-16 place-items-center rounded-full bg-emerald-400/15 text-emerald-400"
                  >
                    <CheckCircle2 size={32} />
                  </motion.span>
                  <h3 className="mt-6 text-2xl font-semibold text-white">Thank you! We will contact you soon.</h3>
                  <p className="mt-3 max-w-sm text-slate-400">Your enquiry has been received by our team.</p>
                  <button onClick={() => setSent(false)} className="btn btn-ghost mt-8">
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  exit={{ opacity: 0 }}
                  noValidate
                  onSubmit={onSubmit}
                  className="relative space-y-5"
                >
                  <Honeypot />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name *" error={errors.name}>
                      <input name="name" autoComplete="name" placeholder="Your name" className={inputCls('name')} />
                    </Field>
                    <Field label="Company">
                      <input name="company" autoComplete="organization" placeholder="Company name" className={inputCls()} />
                    </Field>
                    <Field label="Phone *" error={errors.phone}>
                      <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" className={inputCls('phone')} />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input name="email" type="email" autoComplete="email" placeholder="you@company.com" className={inputCls('email')} />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Site location">
                      <input name="location" placeholder="City / site address" className={inputCls()} />
                    </Field>
                    <Field label="Service required *" error={errors.service}>
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
                    </Field>
                  </div>

                  <Field label="Message">
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell us about the site and what needs to be installed or tested…"
                      className={cn(inputCls(), 'resize-none')}
                      data-lenis-prevent
                    />
                  </Field>

                  {submitError && (
                    <p role="alert" className="flex items-start gap-2 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">
                      <AlertCircle size={18} className="mt-0.5 shrink-0" />
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    aria-busy={sending}
                    className="btn btn-primary group w-full py-4 text-base disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {sending ? (
                      <>
                        Sending...
                        <Loader2 size={17} className="animate-spin" />
                      </>
                    ) : (
                      <>
                        Submit Enquiry
                        <Send size={17} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-500">We usually reply within one business day.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

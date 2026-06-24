import React, { useState } from "react";
import AnimateIn from "../components/ui/AnimateIn";
import SectionHeader from "../components/ui/SectionHeader";
import CredentialsBar from "../components/ui/CredentialsBar";
import { CONTACT_INFO, OFFICE_HOURS } from "../data";
import type { ContactForm } from "../types";

type Errors = Partial<Record<keyof ContactForm, string>>;
const INIT: ContactForm = { name: "", email: "", phone: "", message: "" };

function validate(f: ContactForm): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Full name is required.";
  if (!f.email.trim()) e.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Please enter a valid email.";
  if (!f.message.trim()) e.message = "Please describe your matter.";
  if (!f.phone.trim()) e.phone = "Phone number is required.";
  return e;
}

const FAQ = [
  // { q: "Is the initial consultation free?", a: "Yes — your first consultation is complimentary. We believe you should be able to discuss your matter freely before deciding to engage us." },
  { q: "Which courts do your advocates practice in?", a: "Our advocates practice before the Bombay High Court, Supreme Court of India, and various tribunals and regulatory authorities including SR[...]" },
  { q: "Do you handle urgent legal matters?", a: "Absolutely. Please indicate urgency when you contact us and we will prioritise your matter immediately." },
  { q: "What areas of Maharashtra do you serve?", a: "Our primary practice is in Navi Mumbai and the surrounding districts, but we handle matters across Maharashtra and before national-level court[...]" },
  { q: "How are your fees structured?", a: "We offer matter-specific fee arrangements — fixed fees, retainer-based or time-based billing — discussed transparently at your first consultation." },
  { q: "How do you maintain confidentiality?", a: "All communications are protected by attorney-client privilege from the moment of first contact. We maintain strict data security and confidential[...]" },
];

const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactForm>(INIT);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name as keyof ContactForm]) setErrors(p => ({ ...p, [name]: undefined }));
  };

  const handleWhatsAppBooking = () => {
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const message = `
*New Consultation Request*

*Full Name:* ${form.name}
*Email:* ${form.email}
*Phone:* ${form.phone || "Not provided"}

*Message:*
${form.message}
  `.trim();

    const whatsappNumber = "917977063567"; // your WhatsApp number with country code

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  const inputBase = "w-full bg-navy/[0.03] border text-navy font-sans text-sm px-4 py-3.5 outline-none transition-all duration-300 placeholder-muted/50 focus:bg-navy/[0.06]";
  const inputOk = "border-navy/20 focus:border-navy";
  const inputErr = "border-red-400 focus:border-red-500";

  return (
    <>
      {/* ══ HERO ══ */}
      <section className="page-hero-wrapper" aria-label="Contact page hero">
        <div className="absolute inset-0 bg-page-hero-radial z-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-page-grid-lines z-0" aria-hidden="true" />
        <div className="relative z-10 max-w-[760px] animate-pageFadeIn">
          <div className="eyebrow-row">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">Get in Touch</span>
          </div>
          <h1 className="font-serif font-bold text-cream leading-[1.1] mt-3 mb-5" style={{ fontSize: "clamp(2.4rem,5vw,4rem)" }}>
            Let's Build a <em className="not-italic italic text-gold">Stronger Legal Position</em>
          </h1>
          <p className="font-serif-alt font-light text-cream/70 leading-[1.8] text-[1.15rem] max-w-[600px]">
            Connect with Paul Legal Associates for strategic legal support. Schedule a confidential consultation with our legal experts to discuss your objectives.
          </p>
        </div>
      </section>

      {/* ══ MAIN GRID ══ */}
      <section className="bg-cream py-28 px-[5vw]" aria-labelledby="contact-main">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">

          {/* ── Info ── */}
          <AnimateIn direction="left">
            <div className="eyebrow-row">
              <div className="eyebrow-line" />
              <span className="eyebrow-text">Our Office</span>
            </div>
            <h2 id="contact-main" className="font-serif font-semibold text-navy leading-tight mb-5" style={{ fontSize: "1.8rem" }}>
              Let's Start a <em className="not-italic italic text-gold">Conversation</em>
            </h2>
            <p className="font-serif-alt font-light text-muted leading-[1.8] text-[1.02rem] mb-8">
              Contact us for a confidential, no-obligation first consultation. All communications are protected by attorney-client privilege.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-5 mb-8">
              {[
                { icon: "📍", label: "Office Address", value: CONTACT_INFO.address, href: undefined, multi: true },
                { icon: "📞", label: "Mobile", value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}`, multi: false },
                { icon: "✉️", label: "Email", value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}`, multi: false },
                { icon: "🌐", label: "Website", value: CONTACT_INFO.website, href: `https://${CONTACT_INFO.website}`, multi: false },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 flex-shrink-0 bg-navy flex items-center justify-center text-base" aria-hidden="true">{item.icon}</div>
                  <div>
                    <div className="text-2xs font-semibold tracking-[0.18em] uppercase text-gold mb-1">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className={`text-[0.9rem] text-navy no-underline hover:text-gold transition-colors ${item.multi ? "whitespace-pre-line leading-[1.6]" : ""}`}>{item.value}</a>
                    ) : (
                      <div className={`text-[0.9rem] text-navy ${item.multi ? "whitespace-pre-line leading-[1.6]" : ""}`}>{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div className="p-6 border border-navy/10 bg-white mb-5">
              <h3 className="font-serif text-[1rem] font-semibold text-navy mb-4">Office Hours</h3>
              {OFFICE_HOURS.map((h, i) => (
                <div key={h.day} className={`flex justify-between items-center py-2.5 ${i < OFFICE_HOURS.length - 1 ? "border-b border-navy/8" : ""}`}>
                  <span className="text-[0.85rem] text-muted">{h.day}</span>
                  <span className="text-[0.85rem] text-navy font-medium">{h.time}</span>
                </div>
              ))}
            </div>

            {/* Confidentiality */}
            <div className="flex items-start gap-3 p-4 border border-gold/20 bg-gold/5" role="note">
              <span className="text-lg flex-shrink-0" aria-hidden="true">🔒</span>
              <p className="text-[0.82rem] text-muted leading-[1.6] italic">
                All consultations are strictly confidential and protected by attorney-client privilege from the moment of first contact.
              </p>
            </div>
          </AnimateIn>

          {/* ── Form ── */}
          <AnimateIn direction="right" delay={0.15}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center min-h-[400px] p-16 bg-white border border-navy/10 shadow-sm animate-pageFadeIn" role="alert">
                <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center text-navy text-2xl mb-6">✓</div>
                <h3 className="font-serif text-[1.8rem] font-semibold text-navy mb-4">Message Received</h3>
                <p className="font-serif-alt font-light text-muted leading-[1.8] text-[1.02rem] max-w-[360px] mb-8">
                  Thank you for reaching out. One of our advocates will contact you within one business day.
                </p>
                <button className="btn-outline-navy" onClick={() => setSubmitted(false)}>Send Another Message</button>
              </div>
            ) : (
              <div className="bg-white border border-navy/10 p-10 shadow-sm">
                <div className="eyebrow-row mb-2">
                  <div className="eyebrow-line" />
                  <span className="eyebrow-text">Send a Message</span>
                </div>
                <p className="text-[0.88rem] text-muted mb-7">We'll respond within one business day.</p>

                <form className="flex flex-col gap-5" noValidate aria-label="Contact form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="form-label" htmlFor="name">Full Name *</label>
                      <input id="name" name="name" type="text" className={`${inputBase} ${errors.name ? inputErr : inputOk}`} placeholder="Your full name" value={form.name} onChange={handleChange} />
                      {errors.name && <span className="text-[0.75rem] text-red-500" role="alert">{errors.name}</span>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="form-label" htmlFor="email">Email Address *</label>
                      <input id="email" name="email" type="email" className={`${inputBase} ${errors.email ? inputErr : inputOk}`} placeholder="your@email.com" value={form.email} onChange={handleChange} />
                      {errors.email && <span className="text-[0.75rem] text-red-500" role="alert">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="form-label" htmlFor="phone">Phone Number *</label>
                      <input id="phone" name="phone" type="tel" className={`${inputBase} ${errors.phone ? inputErr : inputOk}`} placeholder="+91 79770 63567" value={form.phone} onChange={handleChange} />
                      {errors.phone && <span className="text-[0.75rem] text-red-500" role="alert">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="form-label" htmlFor="message">Your Message *</label>
                    <textarea id="message" name="message" className={`${inputBase} ${errors.message ? inputErr : inputOk} min-h-[140px] resize-y`} placeholder="Please describe your legal matter briefly..." value={form.message} onChange={handleChange} />
                    {errors.message && <span className="text-[0.75rem] text-red-500" role="alert">{errors.message}</span>}
                  </div>

                  <div className="flex items-center gap-5 flex-wrap pt-1">
                    <button
                      type="button"
                      className="btn-primary flex items-center gap-2 min-w-[220px] justify-center"
                      onClick={handleWhatsAppBooking}
                    >
                      <span>📱</span>
                      Book Consultation
                    </button>
                    <p className="text-[0.74rem] text-muted italic">* Required. All details kept strictly confidential.</p>
                  </div>
                </form>
              </div>
            )}
          </AnimateIn>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="bg-navy py-28 px-[5vw]" aria-labelledby="faq-heading">
        <div className="max-w-8xl mx-auto">
          <SectionHeader eyebrow="Common Questions" title={<>Frequently Asked <em>Questions</em></>} centered light />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-14">
            {FAQ.map((item, i) => (
              <AnimateIn key={i} delay={i * 0.07}>
                <div className="p-7 border border-gold/15 bg-navy-deep hover:border-gold/40 transition-all duration-300">
                  <h3 className="font-serif text-[1rem] font-semibold text-cream mb-3 leading-snug">{item.q}</h3>
                  <p className="text-[0.87rem] text-cream/60 leading-[1.75]">{item.a}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <CredentialsBar />
    </>
  );
};

export default Contact;

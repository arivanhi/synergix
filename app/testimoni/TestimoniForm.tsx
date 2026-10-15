"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, MessageSquareQuote, Send } from "lucide-react";
import { submitTestimoni } from "../actions/submitTestimoni";
import { useSiteContent } from "../../lib/content-context";

export default function TestimoniForm() {
  const { values } = useSiteContent();
  const [state, formAction, pending] = useActionState(submitTestimoni, {});
  const [input, setInput] = useState({ nama: "", jabatan: "", instansi: "", teks: "" });
  const [consent, setConsent] = useState(false);
  const change = (key: keyof typeof input, value: string) => setInput(previous => ({ ...previous, [key]: value }));
  const fieldClass = "w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all";

  return <section className="max-w-3xl mx-auto px-6 pb-20">
    <div className="text-center mb-10">
      <span className="inline-flex items-center gap-2 text-teal-700 bg-teal-100 rounded-full px-4 py-2 text-sm font-bold mb-5"><MessageSquareQuote size={18} />{values.testimonial_form_badge}</span>
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#005a9c] mb-5 leading-tight">{values.testimonial_form_title}</h1>
      <p className="text-gray-500 text-lg leading-relaxed">{values.testimonial_form_intro}</p>
    </div>
    <div className="bg-white rounded-3xl shadow-xl border border-white p-6 md:p-10">
      {state.success ? <div role="status" className="text-center py-8">
        <CheckCircle2 size={56} className="text-teal-600 mx-auto mb-5" />
        <h2 className="text-2xl font-bold text-[#001738] mb-4">{values.testimonial_form_success_title}</h2>
        <p className="text-gray-600 leading-relaxed mb-8">{values.testimonial_form_success}</p>
        <Link href="/" className="inline-flex rounded-xl bg-gradient-to-r from-blue-800 to-teal-500 text-white font-bold px-6 py-3">{values.testimonial_form_home}</Link>
      </div> : <form action={formAction}>
        <fieldset disabled={pending} className="space-y-6 disabled:opacity-70">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div><label htmlFor="testi-nama" className="block text-sm font-bold mb-2">{values.testimonial_form_name}</label><input id="testi-nama" name="nama" value={input.nama} onChange={e => change("nama", e.target.value)} required maxLength={150} autoComplete="name" className={fieldClass} /></div>
            <div><label htmlFor="testi-jabatan" className="block text-sm font-bold mb-2">{values.testimonial_form_role}</label><input id="testi-jabatan" name="jabatan" value={input.jabatan} onChange={e => change("jabatan", e.target.value)} required maxLength={150} autoComplete="organization-title" className={fieldClass} /></div>
          </div>
          <div><label htmlFor="testi-instansi" className="block text-sm font-bold mb-2">{values.testimonial_form_organization}</label><input id="testi-instansi" name="instansi" value={input.instansi} onChange={e => change("instansi", e.target.value)} required maxLength={150} autoComplete="organization" className={fieldClass} /></div>
          <div><label htmlFor="testi-teks" className="block text-sm font-bold mb-2">{values.testimonial_form_message}</label><textarea id="testi-teks" name="teks" value={input.teks} onChange={e => change("teks", e.target.value)} required minLength={20} maxLength={2000} rows={5} aria-describedby="testi-help" className={`${fieldClass} resize-y`} /><p id="testi-help" className="text-xs text-gray-500 mt-2">{values.testimonial_form_message_help}</p></div>
          <div><label htmlFor="testi-foto" className="block text-sm font-bold mb-2">{values.testimonial_form_photo}</label><input id="testi-foto" name="foto" type="file" accept="image/png,image/jpeg,image/webp,image/gif" aria-describedby="testi-photo-help" className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-teal-50 file:px-4 file:py-2 file:text-teal-700 file:font-semibold" /><p id="testi-photo-help" className="text-xs text-gray-500 mt-2">{values.testimonial_form_photo_help}</p></div>
          <div className="hidden" aria-hidden="true"><label htmlFor="testi-website">Website</label><input id="testi-website" name="website" tabIndex={-1} autoComplete="off" /></div>
          <label className="flex gap-3 items-start text-sm text-gray-600 leading-relaxed"><input name="persetujuan" type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} required className="mt-1 h-4 w-4 shrink-0 accent-teal-600" />{values.testimonial_form_consent}</label>
          {state.error && <p role="alert" className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">{state.error}</p>}
          <button type="submit" disabled={pending} className="w-full bg-gradient-to-r from-blue-800 to-teal-500 hover:from-blue-900 hover:to-teal-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 transition-colors">{pending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}{pending ? values.testimonial_form_sending : values.testimonial_form_submit}</button>
          <p className="text-xs text-center text-gray-500 leading-relaxed">{values.testimonial_form_review_note}</p>
        </fieldset>
      </form>}
    </div>
  </section>;
}

"use client";

import { BriefcaseBusiness, CalendarDays, ArrowRight } from "lucide-react";
import { useSiteContent } from "../../lib/content-context";

export default function InternshipInfo() {
  const { values, internships } = useSiteContent();
  const openings = internships.filter(opening => opening.tampil && opening.bidang.trim());

  return <>
    <section aria-labelledby="lowongan-magang" className="mb-16">
      <div className="text-center mb-8">
        <h2 id="lowongan-magang" className="text-2xl font-bold text-[#001738] mb-3">{values.magang_openings_title}</h2>
        <p className="text-gray-500 leading-relaxed">{values.magang_openings_description}</p>
      </div>
      {openings.length ? <div className={`grid gap-6 ${openings.length > 1 ? "md:grid-cols-2" : ""}`}>
        {openings.map((opening, index) => <article key={index} className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col min-w-0">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 text-[#005a9c]"><BriefcaseBusiness size={24} /></div>
            <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1.5 rounded-full">{values.magang_openings_badge}</span>
          </div>
          <h3 className="text-xl font-bold text-[#001738] mb-3 break-words">{opening.bidang}</h3>
          {opening.deskripsi && <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line break-words mb-5">{opening.deskripsi}</p>}
          {opening.persyaratan && <div className="mb-5"><h4 className="font-bold text-[#001738] text-sm mb-2">{values.magang_openings_requirements}</h4><p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line break-words">{opening.persyaratan}</p></div>}
          {opening.periode && <div className="flex items-start gap-2 text-sm text-[#005a9c] mb-6"><CalendarDays size={18} className="shrink-0 mt-0.5" /><p className="break-words"><span className="font-bold">{values.magang_openings_period}: </span>{opening.periode}</p></div>}
          <a href="#form-pendaftaran" className="mt-auto inline-flex items-center gap-2 text-[#005a9c] font-bold text-sm w-fit hover:underline">{values.magang_openings_apply}<ArrowRight size={16} /></a>
        </article>)}
      </div> : <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
        <BriefcaseBusiness size={28} className="text-[#005a9c] mx-auto mb-4" />
        <p className="text-gray-500 leading-relaxed">{values.magang_openings_empty}</p>
      </div>}
    </section>

    <section aria-labelledby="proses-pendaftaran" className="mb-20">
      <h2 id="proses-pendaftaran" className="text-2xl font-bold text-[#001738] mb-8 text-center">{values.magang_MagangClient_18}</h2>
      <div className="overflow-x-auto pb-4">
        <ol className="grid grid-cols-4 gap-6 min-w-[760px]">
          {[19, 21, 23, 25].map((key, index) => <li key={key} className="relative pt-1 text-center">
            {index < 3 && <div aria-hidden="true" className="absolute left-1/2 w-[calc(100%+1.5rem)] top-6 h-0.5 bg-blue-200" />}
            <div aria-hidden="true" className="relative z-10 mx-auto w-10 h-10 bg-[#005a9c] text-white rounded-full flex items-center justify-center font-bold mb-5 ring-4 ring-white shadow-sm">{index + 1}</div>
            <h3 className="font-bold text-[#001738] text-sm mb-2">{values[`magang_MagangClient_${key}`]}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{values[`magang_MagangClient_${key + 1}`]}</p>
          </li>)}
        </ol>
      </div>
    </section>
  </>;
}

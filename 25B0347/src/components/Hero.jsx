import React from 'react'
import { ChevronRight, Stethoscope, Award } from 'lucide-react'

export default function Hero({ setCurrentTab, setIsTriageOpen }) {
  return (
    <section className="bg-gradient-to-b from-hospital-50 to-slate-50 py-16 px-4 text-center max-w-4xl mx-auto space-y-6">
      <span className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-xs font-bold uppercase"><Award className="w-3.5 h-3.5" /> Level-1 Trauma Care</span>
      <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 leading-tight">Next-Gen Digital <span className="text-hospital-600">Healthcare</span> Ecosystem.</h1>
      <p className="text-slate-600 text-lg max-w-2xl mx-auto">Seamlessly coordinate consultations, examine diagnostic insights, and experience virtual urgent care protocols instantly.</p>
      <div className="flex justify-center gap-4 pt-4">
        <button onClick={() => setCurrentTab('booking')} className="bg-hospital-600 hover:bg-hospital-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2">Schedule Appointment <ChevronRight className="w-4 h-4" /></button>
        <button onClick={() => setIsTriageOpen(true)} className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl transition flex items-center gap-2"><Stethoscope className="w-4 h-4 text-rose-400" /> Run Symptom Checker</button>
      </div>
    </section>
  )
}

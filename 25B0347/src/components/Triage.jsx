import React, { useState } from 'react'
import { X, HeartPulse, ChevronRight } from 'lucide-react'

export default function Triage({ isOpen, onClose, setCurrentTab, setSelectedSpecialty }) {
  const [step, setStep] = useState(1)
  const [target, setTarget] = useState(null)

  if (!isOpen) return null

  const handleRoute = (dept) => {
    setSelectedSpecialty(dept)
    setCurrentTab('booking')
    setStep(1)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-xl">
        <button onClick={() => { setStep(1); onClose(); }} className="absolute top-4 right-4 text-slate-400"><X /></button>
        {step === 1 ? (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-rose-600 flex items-center gap-2"><HeartPulse /> Automated Patient Triage</h3>
            <div className="space-y-2">
              <button onClick={() => { setTarget('Cardiology'); setStep(2); }} className="w-full text-left p-3 border rounded-xl hover:bg-slate-50 text-sm flex justify-between items-center"><span>Chest Pressure or Palpitations</span> <ChevronRight className="w-4 h-4 text-slate-400" /></button>
              <button onClick={() => { setTarget('Neurology'); setStep(2); }} className="w-full text-left p-3 border rounded-xl hover:bg-slate-50 text-sm flex justify-between items-center"><span>Severe Sudden Headaches</span> <ChevronRight className="w-4 h-4 text-slate-400" /></button>
              <button onClick={() => { setTarget('Pediatrics'); setStep(2); }} className="w-full text-left p-3 border rounded-xl hover:bg-slate-50 text-sm flex justify-between items-center"><span>Juvenile High Fevers</span> <ChevronRight className="w-4 h-4 text-slate-400" /></button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <h3 className="text-lg font-bold">Clinical Unit Advisory</h3>
            <p className="text-sm text-slate-500">Your selected metrics match our {target} care pipeline framework.</p>
            <button onClick={() => handleRoute(target)} className="px-5 py-2 bg-hospital-600 text-white text-xs font-bold rounded-xl shadow">View {target} Specialists</button>
          </div>
        )}
      </div>
    </div>
  )
}

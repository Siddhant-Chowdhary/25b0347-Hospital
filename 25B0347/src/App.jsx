import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import DoctorGrid from './components/DoctorGrid'
import Dashboard from './components/Dashboard'
import Triage from './components/Triage'

export default function App() {
  const [currentTab, setCurrentTab] = useState('home')
  const [isTriageOpen, setIsTriageOpen] = useState(false)
  const [selectedSpecialty, setSelectedSpecialty] = useState('All')

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="bg-red-600 text-white text-center py-2.5 px-4 text-sm font-semibold flex justify-center items-center gap-3 shadow-md z-50 relative">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <span>24/7 ER Emergency Helpline: <strong>1-800-555-0199</strong></span>
        <button onClick={() => setIsTriageOpen(true)} className="ml-4 bg-white/20 hover:bg-white/30 text-white text-xs px-2.5 py-1 rounded transition border border-white/40">
          Launch Virtual Triage
        </button>
      </div>

      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <main className="flex-grow">
        {currentTab === 'home' && <Hero setCurrentTab={setCurrentTab} setIsTriageOpen={setIsTriageOpen} />}
        {currentTab === 'booking' && <DoctorGrid selectedSpecialty={selectedSpecialty} setSelectedSpecialty={setSelectedSpecialty} setCurrentTab={setCurrentTab} />}
        {currentTab === 'dashboard' && <Dashboard />}
      </main>

      <Triage isOpen={isTriageOpen} onClose={() => setIsTriageOpen(false)} setCurrentTab={setCurrentTab} setSelectedSpecialty={setSelectedSpecialty} />

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-center text-xs">
        <p>&copy; 2026 HopeCare Clinical Networks. All assignment rights reserved.</p>
      </footer>
    </div>
  )
}

import React from 'react'
import { Activity, LayoutDashboard, CalendarPlus, ShieldUser } from 'lucide-react'

export default function Navbar({ currentTab, setCurrentTab }) {
  const links = [
    { id: 'home', label: 'Overview', icon: LayoutDashboard },
    { id: 'booking', label: 'Book Appointment', icon: CalendarPlus },
    { id: 'dashboard', label: 'Patient Dashboard', icon: ShieldUser },
  ]
  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 flex justify-between h-20 items-center">
        <div className="flex items-center gap-3">
          <Activity className="w-7 h-7 text-hospital-600" />
          <span className="text-xl font-black text-slate-900">HopeCare <span className="text-hospital-600">Medical</span></span>
        </div>
        <div className="flex space-x-2">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <button key={link.id} onClick={() => setCurrentTab(link.id)} className={`px-3 py-2 rounded-xl text-sm flex items-center gap-2 transition ${currentTab === link.id ? 'text-hospital-600 bg-hospital-50 font-semibold' : 'text-slate-600'}`}>
                <Icon className="w-4 h-4" /> {link.label}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

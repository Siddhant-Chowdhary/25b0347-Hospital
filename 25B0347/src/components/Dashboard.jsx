import React, { useState } from 'react'
import { Search, Clock, X } from 'lucide-react'

const staffDirectory = [
  { id: 1, name: "Dr. Sarah Jenkins", specialty: "Cardiology", experience: 14, rating: 4.9, availability: "Mon, Wed, Fri" },
  { id: 2, name: "Dr. Michael Chang", specialty: "Pediatrics", experience: 9, rating: 4.8, availability: "Tue, Thu" },
  { id: 3, name: "Dr. Alisha Patel", specialty: "Neurology", experience: 12, rating: 4.9, availability: "Mon, Tue, Thu" },
  { id: 4, name: "Dr. Robert Vance", specialty: "Cardiology", experience: 20, rating: 5.0, availability: "Wed, Thu, Fri" },
  { id: 5, name: "Dr. Elena Rostova", specialty: "Neurology", experience: 16, rating: 4.7, availability: "Fri, Sat" },
  { id: 6, name: "Dr. Marcus Brody", specialty: "Pediatrics", experience: 6, rating: 4.6, availability: "Mon, Tue, Wed" }
]

export default function DoctorGrid({ selectedSpecialty, setSelectedSpecialty, setCurrentTab }) {
  const [searchVal, setSearchVal] = useState('')
  const [activeModalDoc, setActiveModalDoc] = useState(null)
  const [patientName, setPatientName] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('09:00 AM')

  let filteredDocs = selectedSpecialty === 'All' ? staffDirectory : staffDirectory.filter(d => d.specialty === selectedSpecialty)
  if (searchVal) filteredDocs = filteredDocs.filter(d => d.name.toLowerCase().includes(searchVal.toLowerCase()))

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patient: patientName, doctorId: activeModalDoc.id, date: appointmentDate, time: appointmentTime })
      })
      if (response.ok) {
        const data = await response.json()
        const stack = JSON.parse(localStorage.getItem('portal_appointments')) || []
        stack.unshift(data.record)
        localStorage.setItem('portal_appointments', JSON.stringify(stack))
      }
    } catch (err) {
      const fallback = { uid: 'REG-' + Math.floor(100000 + Math.random() * 900000), patient: patientName, doctor: activeModalDoc.name, dept: activeModalDoc.specialty, timestamp: `${appointmentDate} @ ${appointmentTime}`, status: 'Authorized' }
      const stack = JSON.parse(localStorage.getItem('portal_appointments')) || []
      stack.unshift(fallback)
      localStorage.setItem('portal_appointments', JSON.stringify(stack))
    }
    setActiveModalDoc(null)
    setCurrentTab('dashboard')
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-6">
        <input type="text" placeholder="Search doctors..." value={searchVal} onChange={e => setSearchVal(e.target.value)} className="border p-2.5 rounded-xl text-sm w-64 bg-white" />
        <div className="flex gap-2">
          {['All', 'Cardiology', 'Pediatrics', 'Neurology'].map(s => (
            <button key={s} onClick={() => setSelectedSpecialty(s)} className={`px-4 py-2 rounded-xl text-xs uppercase font-bold ${selectedSpecialty === s ? 'bg-hospital-600 text-white' : 'bg-white border text-slate-600'}`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {filteredDocs.map(doc => (
          <div key={doc.id} className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] bg-hospital-100 text-hospital-700 font-bold px-2 py-1 rounded uppercase">{doc.specialty}</span>
              <h4 className="text-lg font-bold mt-2">{doc.name}</h4>
              <p className="text-xs text-slate-400">Experience: {doc.experience} Years</p>
              <p className="text-xs text-slate-600 mt-2 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Availability: {doc.availability}</p>
            </div>
            <button onClick={() => setActiveModalDoc(doc)} className="w-full bg-hospital-600 text-white text-xs py-2.5 rounded-xl font-bold mt-4">Book Appointment</button>
          </div>
        ))}
      </div>

      {activeModalDoc && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl p-6 max-w-md w-full relative space-y-4 shadow-xl">
            <button type="button" onClick={() => setActiveModalDoc(null)} className="absolute top-4 right-4"><X /></button>
            <h3 className="text-lg font-bold">Appointment with {activeModalDoc.name}</h3>
            <input type="text" placeholder="Patient Name" value={patientName} onChange={e => setPatientName(e.target.value)} required className="w-full border p-3 rounded-xl text-sm" />
            <div className="grid grid-cols-2 gap-2">
              <input type="date" value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} required className="border p-3 rounded-xl text-sm" />
              <select value={appointmentTime} onChange={e => setAppointmentTime(e.target.value)} className="border p-3 rounded-xl text-sm text-slate-600"><option>09:00 AM</option><option>11:30 AM</option><option>02:30 PM</option></select>
            </div>
            <button type="submit" className="w-full bg-hospital-600 text-white p-3 rounded-xl font-bold">Confirm Registration</button>
          </form>
        </div>
      )}
    </div>
  )
}

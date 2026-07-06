import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const staffDirectory = [
  { id: 1, name: "Dr. Sarah Jenkins", specialty: "Cardiology", experience: 14, rating: 4.9, availability: "Mon, Wed, Fri" },
  { id: 2, name: "Dr. Michael Chang", specialty: "Pediatrics", experience: 9, rating: 4.8, availability: "Tue, Thu" },
  { id: 3, name: "Dr. Alisha Patel", specialty: "Neurology", experience: 12, rating: 4.9, availability: "Mon, Tue, Thu" },
  { id: 4, name: "Dr. Robert Vance", specialty: "Cardiology", experience: 20, rating: 5.0, availability: "Wed, Thu, Fri" },
  { id: 5, name: "Dr. Elena Rostova", specialty: "Neurology", experience: 16, rating: 4.7, availability: "Fri, Sat" },
  { id: 6, name: "Dr. Marcus Brody", specialty: "Pediatrics", experience: 6, rating: 4.6, availability: "Mon, Tue, Wed" }
];

let appointmentRecords = [
  {
    uid: "REG-884921",
    patient: "Jane Doe (Sample Registration)",
    doctor: "Dr. Sarah Jenkins",
    dept: "Cardiology",
    timestamp: "2026-07-10 @ 11:30 AM",
    status: "Authorized"
  }
];

app.get('/api/health', (req, res) => res.json({ status: "healthy" }));
app.get('/api/doctors', (req, res) => res.json(staffDirectory));
app.get('/api/appointments', (req, res) => res.json(appointmentRecords));

app.post('/api/appointments', (req, res) => {
  const { patient, doctorId, date, time } = req.body;
  const selectedDoctor = staffDirectory.find(d => d.id === parseInt(doctorId));
  
  const newAppointment = {
    uid: 'REG-' + Math.floor(100000 + Math.random() * 900000),
    patient,
    doctor: selectedDoctor ? selectedDoctor.name : "General Practitioner",
    dept: selectedDoctor ? selectedDoctor.specialty : "General",
    timestamp: `${date} @ ${time}`,
    status: 'Authorized'
  };

  appointmentRecords.unshift(newAppointment);
  res.status(201).json({ message: "Success", record: newAppointment });
});

app.delete('/api/appointments', (req, res) => {
  appointmentRecords = [];
  res.json({ message: "Cleared" });
});

app.listen(PORT);

import jsPDF from 'jspdf'; // Add this import at the top
import React, { useState } from 'react';
import PlanDisplay from '../components/PlanDisplay';

export default function Home() {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    bodyFat: '',
    vo2max: '',
    lactateThreshold: '',
    gender: '',
    goal: '',
    experience: '',
    diet: '',
    equipment: '',
  });

  const [planText, setPlanText] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formData }),
    });

    const data = await response.json();
    setPlanText(data.plan); // Assumes the API returns { plan: "<html>...</html>" }
  };

  const downloadPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const lines = doc.splitTextToSize(planText, 180); // Wrap text to fit A4 width
    let y = 10;

    lines.forEach((line, index) => {
      if (y > 280) { // Start new page if space exceeded
        doc.addPage();
        y = 10;
      }
      doc.text(line, 10, y);
      y += 7;
    });

    doc.save('fitness_plan.pdf');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-2 text-center">Build Your Free Fitness Plan</h1>
      <p className="text-center text-lg mb-8 max-w-xl">
        Answer a few quick questions and get a personalized fitness & nutrition plan just for you.
      </p>
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 rounded-xl shadow-xl w-full max-w-md space-y-4">
        {['age', 'weight', 'height', 'bodyFat', 'vo2max', 'lactateThreshold'].map((field) => (
          <input
            key={field}
            type="number"
            name={field}
            placeholder={
              field === 'age' ? 'Age' :
              field === 'weight' ? 'Weight (kg)' :
              field === 'height' ? 'Height (cm)' :
              field === 'bodyFat' ? 'Body Fat %' :
              field === 'vo2max' ? 'VO₂ max' :
              'Lactate Threshold (km/h)'
            }
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-zinc-800 text-white placeholder-gray-400"
            required
          />
        ))}

        <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-3 rounded-md bg-zinc-800 text-white">
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select name="goal" value={formData.goal} onChange={handleChange} required className="w-full p-3 rounded-md bg-zinc-800 text-white">
          <option value="" disabled>Select Goal</option>
          <option value="Longevity">Longevity</option>
          <option value="Fat Loss">Fat Loss</option>
          <option value="Muscle Gain">Muscle Gain</option>
          <option value="Performance">Performance</option>
          <option value="Half-Marathon">Half-Marathon</option>
          <option value="Healthspan">Healthspan</option>
        </select>

        <select name="experience" value={formData.experience} onChange={handleChange} required className="w-full p-3 rounded-md bg-zinc-800 text-white">
          <option value="" disabled>Select Experience Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <select name="diet" value={formData.diet} onChange={handleChange} required className="w-full p-3 rounded-md bg-zinc-800 text-white">
          <option value="" disabled>Select Diet</option>
          <option value="Omnivore">Omnivore</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Pescatarian">Pescatarian</option>
          <option value="Paleo">Paleo</option>
        </select>

        <select name="equipment" value={formData.equipment} onChange={handleChange} required className="w-full p-3 rounded-md bg-zinc-800 text-white">
          <option value="" disabled>Select Equipment Access</option>
          <option value="Full gym access">Full gym access</option>
          <option value="Home gym">Home gym</option>
          <option value="No equipment">No equipment</option>
          <option value="Body weight">Body weight</option>
        </select>

        <button
          type="submit"
          className="w-full p-3 mt-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          Generate Plan
        </button>
      </form>
      {planText && (
        <div className="mt-10 w-full max-w-4xl">
          <PlanDisplay formData={formData} planText={planText} />
          <button
            onClick={downloadPDF}
            className="mt-4 p-3 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            Download Plan as PDF
          </button>
        </div>
      )}
    </div>
  );
}

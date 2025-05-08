import React, { useState } from "react";

export default function TestPage() {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    bodyFat: 0,
    vo2max: "",
    lactateThreshold: "",
    goal: "",
    experience: "",
    diet: "",
    equipment: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background p-6 text-foreground">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Build Your Fitness Plan</h1>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Body Fat %: {formData.bodyFat}</label>
              <input
                type="range"
                name="bodyFat"
                min="0"
                max="100"
                value={formData.bodyFat}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">VO2 Max</label>
              <input
                type="number"
                name="vo2max"
                value={formData.vo2max}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Lactate Threshold</label>
              <input
                type="number"
                name="lactateThreshold"
                value={formData.lactateThreshold}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Fitness Goal</label>
              <select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2"
              >
                <option value="">Select a goal</option>
                <option value="lose_weight">Lose Weight</option>
                <option value="build_muscle">Build Muscle</option>
                <option value="improve_endurance">Improve Endurance</option>
                <option value="increase_strength">Increase Strength</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Training Experience</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2"
              >
                <option value="">Select experience level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Diet Preference</label>
              <select
                name="diet"
                value={formData.diet}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2"
              >
                <option value="">Select diet preference</option>
                <option value="omnivore">Omnivore</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="keto">Keto</option>
                <option value="paleo">Paleo</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Available Equipment</label>
              <select
                name="equipment"
                value={formData.equipment}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2"
              >
                <option value="">Select equipment</option>
                <option value="none">None</option>
                <option value="basic">Basic (dumbbells, bands)</option>
                <option value="full_gym">Full Gym</option>
                <option value="outdoor">Outdoor</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
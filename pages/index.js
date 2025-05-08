import { useState } from 'react';
import { jsPDF } from 'jspdf';

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
    equipment: ''
  });
  const [plan, setPlan] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePlan = () => {
    const {
      goal,
      age,
      weight,
      height,
      gender,
      bodyFat,
      vo2max,
      lactateThreshold,
      experience,
      diet,
      equipment
    } = formData;

    const calorieEstimate = weight * (
      goal === 'Fat Loss' ? 25 :
      goal === 'Muscle Gain' ? 35 :
      goal === 'Endurance' || goal === 'Half-Marathon' ? 33 :
      goal === 'Longevity' || goal === 'Healthspan' ? 28 :
      30
    );

    const macroSplit = {
      carbs: '40%',
      protein: '30%',
      fat: '30%'
    };

    const mealIdeas = `### Meal Ideas

**Breakfast**
- Greek yogurt with berries and oats
- Scrambled eggs with spinach and whole-grain toast

**Lunch**
- Grilled chicken salad with olive oil dressing
- Quinoa bowl with roasted veggies and tofu (vegan option)

**Dinner**
- Baked salmon with sweet potato and broccoli
- Lentil curry with brown rice (vegan option)
`;

    const basePlan = `# Tailored Fitness Plan

## Goal: ${goal}
**Age**: ${age}  
**Weight**: ${weight} kg  
**Height**: ${height} cm  
**Gender**: ${gender}  
**Body Fat %**: ${bodyFat}  
**VO2 Max**: ${vo2max}  
**Lactate Threshold**: ${lactateThreshold}  
**Experience**: ${experience}  
**Diet**: ${diet}  
**Equipment**: ${equipment}

## Training Recommendation
- Weekly split based on goal and experience
- 3–5 workouts per week
- Progressive overload with compound lifts

## Nutrition Guidance
**Estimated Daily Calories**: ${calorieEstimate.toFixed(0)} kcal  
**Macro Split**: Carbs ${macroSplit.carbs}, Protein ${macroSplit.protein}, Fat ${macroSplit.fat}

${mealIdeas}

---
Want more customization, sample meals, and grocery lists? Unlock premium features!
`;

    setPlan(basePlan);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    const lines = plan.split('\n');
    let y = 10;

    lines.forEach((line) => {
      const isHeader = /^#{1,6}\s/.test(line);
      const isBold = /^\*\*.+\*\*[:：]?\s*/.test(line);

      const splitLines = (isHeader || isBold)
        ? [line]
        : doc.splitTextToSize(line, 180);

      splitLines.forEach((l) => {
        if (y >= 280) {
          doc.addPage();
          y = 10;
        }
        doc.text(l, 10, y);
        y += 8;
      });
    });

    doc.save('fitness-plan.pdf');
  };

  const textFields = ["age", "weight", "height", "bodyFat", "vo2max", "lactateThreshold"];
  const dropdowns = {
    gender: ['Male', 'Female', 'Other'],
    goal: ['Fat Loss', 'Muscle Gain', 'Endurance', 'Longevity', 'Healthspan', 'Half-Marathon'],
    experience: ['Beginner', 'Intermediate', 'Advanced'],
    diet: ['Omnivore', 'Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Mediterranean'],
    equipment: ['None', 'Basic (dumbbells/mats)', 'Full gym access', 'Resistance Bands', 'Barbell & Plates', 'Body Weight']
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-2 text-center">Build Your Free Fitness Plan</h1>
      <p className="text-center mb-6">Answer a few quick questions and get a personalized fitness & nutrition plan just for you.</p>

      <div className="bg-zinc-800 p-6 rounded-xl space-y-4">
        {textFields.map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1') + (['bodyFat', 'vo2max', 'lactateThreshold'].includes(field) ? ' (optional)' : '')}
            value={formData[field]}
            onChange={handleChange}
            className="w-full text-white placeholder-gray-300 bg-zinc-700 p-2 rounded h-10"
          />
        ))}

        {Object.entries(dropdowns).map(([field, options]) => (
          <select
            key={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full text-white bg-zinc-700 p-2 rounded h-10"
          >
            <option value="" disabled>{`Select ${field.charAt(0).toUpperCase() + field.slice(1)}`}</option>
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ))}

        <button
          onClick={generatePlan}
          className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded shadow-lg transition"
        >
          Generate My Plan
        </button>
      </div>

      {plan && (
        <>
          <div className="bg-zinc-800 p-6 mt-6 rounded whitespace-pre-wrap text-sm leading-relaxed">
            {plan}
          </div>
          <button
            onClick={downloadPDF}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow-lg transition"
          >
            Download PDF
          </button>
        </>
      )}
    </div>
  );
}

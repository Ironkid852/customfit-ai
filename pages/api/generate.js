export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { formData } = req.body;

  if (!formData) {
    return res.status(400).json({ error: 'Missing form data' });
  }

  try {
    const generatedPlan = `
Your Fitness & Nutrition Plan

👤 Personal Metrics:
- **Goal**: ${formData.goal}
- **Age**: ${formData.age || 'N/A'}
- **Weight**: ${formData.weight || 'N/A'} kg
- **Height**: ${formData.height || 'N/A'} cm
- **Body Fat %**: ${formData.bodyFat || 'N/A'}%
- **VO2max**: ${formData.vo2max || 'N/A'}
- **Lactate Threshold**: ${formData.lactateThreshold || 'N/A'}
- **Diet Preference**: ${formData.diet || 'N/A'}
- **Experience Level**: ${formData.experience || 'N/A'}
- **Gender**: ${formData.gender || 'N/A'}
- **Equipment Available**: ${formData.equipment || 'N/A'}

💪 Training Plan:
Based on your profile and available equipment, your training program will include a mix of resistance training, cardiovascular conditioning, and mobility work. You will train 4–5 times per week, alternating between strength-focused sessions and endurance development.

🍎 Nutrition Plan:
We recommend a nutrient-dense, protein-rich diet tailored to support fat loss and muscle preservation. Your calorie target will be set based on your body composition and activity level, prioritizing whole foods and hydration.

✅ Key Notes:
- Include recovery strategies like sleep optimization and stress management.
- Reassess your VO2max and thresholds every 8–12 weeks.
- Consistency and adherence matter more than perfection.

Let’s get started on your transformation journey!
    `;

    res.status(200).json({ plan: generatedPlan });
  } catch (error) {
    console.error('Error generating plan:', error);
    res.status(500).json({ error: 'Failed to generate plan' });
  }
}
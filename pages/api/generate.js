import html2pdf from 'html2pdf.js';

export default function Home() {
  const handleDownloadPDF = () => {
    const element = document.getElementById("plan-output");
    if (!element) {
      alert("Plan output section not found.");
      return;
    }

    const opt = {
      margin: 0.5,
      filename: 'fitness_plan.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Clone the element and replace its inner HTML with Markdown-styled content for the PDF
    const clonedElement = element.cloneNode(true);
    const markdownContent = `
    ## Your Personalized Fitness & Nutrition Plan

    **Fitness Focus:** Strength & Fat Loss  
    **Workout Split:** 4 Days/week – Upper/Lower Split

    ## Nutrition Guidance
    - Target Calories: 2,100 kcal/day
    - Protein: ~160g/day
    - Carbs: ~180g/day
    - Fats: ~70g/day

    ## Sample Meal Ideas
    - **Breakfast:** Greek yogurt with berries and almonds
    - **Lunch:** Grilled chicken, quinoa, steamed broccoli
    - **Dinner:** Baked salmon, sweet potato, green beans
    - **Snacks:** Boiled eggs, protein shake, apple + peanut butter

    _Want more customization, sample meals, and grocery lists? Unlock premium features!_
    `;

    clonedElement.innerHTML = marked.parse(markdownContent);
    html2pdf().set(opt).from(clonedElement).save();
  };

  return (
    <>
      {/* existing JSX content */}
      <button
        onClick={handleDownloadPDF}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download Styled PDF
      </button>
      {/* rest of existing JSX content */}
    </>
  );
}
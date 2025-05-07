// components/PlanDisplay.jsx
import React from "react";

const PlanDisplay = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Your Fitness & Nutrition Plan</h2>
      <p>Goal: Lose fat and gain muscle</p>
      <p>Age: 45</p>
      <p>Weight: 80kg</p>
      <p>VO2max: 43.2</p>
      {/* Add more dynamic plan details here */}
    </div>
  );
});

export default PlanDisplay;

/* eslint-disable react/display-name */
import React from "react";

const PlanOutput = React.forwardRef(({ formData }, ref) => {
  return (
    <div ref={ref} className="p-6 bg-white rounded shadow text-black">
      <h2 className="text-2xl font-bold mb-4">Your Fitness & Nutrition Plan</h2>
      {formData ? (
        <>
          <p><strong>Goal:</strong> {formData.goal}</p>
          <p><strong>Age:</strong> {formData.age || "N/A"}</p>
          <p><strong>Weight:</strong> {formData.weight || "N/A"} kg</p>
          <p><strong>Height:</strong> {formData.height || "N/A"} cm</p>
          <p><strong>Body Fat %:</strong> {formData.bodyFat || "N/A"}%</p>
          <p><strong>VO2max:</strong> {formData.vo2max || "N/A"}</p>
          <p><strong>Lactate Threshold:</strong> {formData.lactateThreshold || "N/A"}</p>
          <p><strong>Diet Preference:</strong> {formData.diet || "N/A"}</p>
        </>
      ) : (
        <p className="text-red-500">No plan data available</p>
      )}
    </div>
  );
});

PlanOutput.displayName = "PlanOutput";

export default PlanOutput;
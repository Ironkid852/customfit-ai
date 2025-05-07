// components/PlanDisplay.jsx
import React from "react";
import PropTypes from "prop-types";

const PlanDisplay = React.forwardRef((props, ref) => {
  const { formData, planText } = props;

  if (!formData) return <p className="text-red-500">No data provided</p>;

  return (
    <div ref={ref} className="p-6 bg-white rounded shadow text-black">
      <h2 className="text-2xl font-bold mb-4">Your Fitness & Nutrition Plan</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 text-sm">
        <p><strong>Goal:</strong> {formData.goal}</p>
        <p><strong>Age:</strong> {formData.age}</p>
        <p><strong>Weight:</strong> {formData.weight} kg</p>
        <p><strong>Height:</strong> {formData.height} cm</p>
        <p><strong>Body Fat %:</strong> {formData.bodyFat}</p>
        <p><strong>VO2max:</strong> {formData.vo2max}</p>
        <p><strong>Lactate Threshold:</strong> {formData.lactateThreshold}</p>
        <p><strong>Diet Preference:</strong> {formData.diet}</p>
        <p><strong>Experience:</strong> {formData.experience}</p>
        <p><strong>Gender:</strong> {formData.gender}</p>
        <p><strong>Equipment:</strong> {formData.equipment}</p>
      </div>

      <div className="mt-6 whitespace-pre-line text-sm leading-relaxed">
        {planText || "Your personalized plan will appear here."}
      </div>
    </div>
  );
});

PlanDisplay.displayName = "PlanDisplay";

PlanDisplay.propTypes = {
  formData: PropTypes.shape({
    goal: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bodyFat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    vo2max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lactateThreshold: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    diet: PropTypes.string,
    experience: PropTypes.string,
    gender: PropTypes.string,
    equipment: PropTypes.string
  }),
  planText: PropTypes.string
};

export default PlanDisplay;

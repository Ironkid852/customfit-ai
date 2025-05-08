/* eslint-disable react/display-name */
// components/PlanDisplay.jsx
import React from "react";

const MarkdownPage = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Your Fitness & Nutrition Plan</h2>
      <p>Goal: {props.goal || "N/A"}</p>
      <p>Age: {props.age || "N/A"}</p>
      <p>Weight: {props.weight || "N/A"}</p>
      <p>VO2max: {props.vo2max || "N/A"}</p>
      {/* Add more dynamic plan details here */}
    </div>
  );
});

MarkdownPage.displayName = "MarkdownPage";
export default MarkdownPage;

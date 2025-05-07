import { useEffect, useState } from "react";

export default function ExercisePicker() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://wger.de/api/v2/exercise/?language=2&limit=20")
      .then((res) => res.json())
      .then((data) => setExercises(data.results || []))
      .catch((err) => console.error("Failed to fetch exercises:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Sample Exercises</h2>
      {loading ? (
        <p>Loading exercises...</p>
      ) : (
        <ul className="list-disc pl-5">
          {exercises.map((ex) => (
            <li key={ex.id}>{ex.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
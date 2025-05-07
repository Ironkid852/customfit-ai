import { useEffect, useState } from 'react';
import { fetchAllExercises, fetchExercisesByTarget } from '../lib/exerciseDBApi';

const targets = [
  'abs', 'back', 'biceps', 'chest', 'glutes',
  'hamstrings', 'calves', 'shoulders', 'triceps', 'quads',
];

export default function ExercisePage() {
  const [exercises, setExercises] = useState([]);
  const [selectedTarget, setSelectedTarget] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchExercises = async () => {
      const data =
        selectedTarget === 'all'
          ? await fetchAllExercises()
          : await fetchExercisesByTarget(selectedTarget);
      setExercises(data);
    };

    fetchExercises();
  }, [selectedTarget]);

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Exercise List</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search exercises..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        className="mb-6 w-full px-4 py-2 rounded-md border border-gray-700 bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* Target Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setSelectedTarget('all')}
          className={`px-4 py-2 rounded-full ${
            selectedTarget === 'all'
              ? 'bg-purple-600 text-white'
              : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
          }`}
        >
          All
        </button>
        {targets.map((target) => (
          <button
            key={target}
            onClick={() => setSelectedTarget(target)}
            className={`px-4 py-2 rounded-full capitalize ${
              selectedTarget === target
                ? 'bg-purple-600 text-white'
                : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
            }`}
          >
            {target}
          </button>
        ))}
      </div>

      {/* Exercises Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredExercises.map((exercise) => (
          <div
            key={exercise.id}
            className="bg-zinc-900 hover:bg-zinc-800 transition-all duration-200 rounded-xl shadow-md p-4"
          >
            <img
              src={exercise.gifUrl}
              alt={exercise.name}
              className="w-full rounded"
            />
            <h2 className="text-lg font-semibold mt-3">{exercise.name}</h2>
            <p className="text-sm text-gray-400">Target: {exercise.target}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

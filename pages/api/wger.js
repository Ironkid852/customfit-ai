export const fetchExercises = async (categoryId) => {
  const res = await axios.get('/api/exercises');

    const data = await res.json();
    return data.results;
  };
  
  // Optional: Fetch categories (like Chest, Legs, etc.)
  export const fetchCategories = async () => {
    const res = await axios.get('/api/exercises');
    const data = await res.json();
    return data.results;
  };
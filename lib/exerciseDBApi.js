
const BASE_URL = 'https://exercisedb.p.rapidapi.com';

const headers = {
  'X-RapidAPI-Key': '919725cf4amsh084044ddd98aaf8p10e55cjsnef57dc7e789a',
  'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
};

export const fetchAllExercises = async () => {
  try {
    const response = await fetch(`${BASE_URL}/exercises`, {
      method: 'GET',
      headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return [];
  }
};

export const fetchExercisesByTarget = async (target) => {
  try {
    const response = await fetch(`${BASE_URL}/exercises/target/${target}`, {
      method: 'GET',
      headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching exercises by target:', error);
    return [];
  }
};

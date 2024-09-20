const BASE_URL =  'http://localhost:8000';

export const fetchProjects = async () => {
  const response = await fetch(`${BASE_URL}/project`);
  if (!response.ok) {
    const error = new Error('Failed to fetch projects');
    error.status = response.status;
    throw error;
  }
  return response.json();
};
const BASE_URL =  'http://localhost:8000';

export const fetchRoles = async () => {
  const response = await fetch(`${BASE_URL}/role`);
  if (!response.ok) {
    const error = new Error('Failed to fetch roles');
    error.status = response.status;
    throw error;
  }
  return response.json();
};


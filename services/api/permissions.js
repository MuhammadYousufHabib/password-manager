const BASE_URL =  'http://localhost:8000';

export const fetchPermissions = async () => {
  const response = await fetch(`${BASE_URL}/permission`);
  if (!response.ok) {
    const error = new Error('Failed to fetch permissions');
    error.status = response.status;
    throw error;
  }
  return response.json();
};
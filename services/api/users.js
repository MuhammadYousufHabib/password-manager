const BASE_URL =  'http://localhost:8000';
import {get} from './modes'

// export const  fetchUsers = async () => {
//   const response = await fetch(`${BASE_URL}/users`);
//   if (!response.ok) {
//     const error = new Error('Failed to fetch users');
//     error.status = response.status;
//     throw error;
//   }
//   return response.json();
// };

export const fetchUsers = async () => await get("users");

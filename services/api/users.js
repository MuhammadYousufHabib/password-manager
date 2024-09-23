import { del, get, patch, post } from './apiUtils';

export const fetchUsers = async () => await get("users");

export const fetchUserById = async (userId) => await get(`users/${userId}`);

export const createUser = async (userData) => await post("users", userData);

export const updateUser = async (userId, userData) => await patch(`users/${userId}`, userData);

export const deleteUser = async (userId) => await del(`users/${userId}`);

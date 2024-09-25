import { del, get, patch, post } from './apiUtils';

export const fetchUsers = async () => await get("users");

export const fetchUserById = async (userId) => await get(`user/${userId}`);

export const createUser = async (userData) => await post("register", userData);

export const updateUser = async (userId, userData) => await patch(`user/${userId}`, userData);

export const deleteUser = async (userId) => await del(`user/${userId}`);

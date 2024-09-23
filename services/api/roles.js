import { del, get, patch, post } from './apiUtils';

export const fetchRoles = async () => await get("role");

export const fetchRoleById = async (roleId) => await get(`role/${roleId}`);

export const createRole = async (roleData) => await post("role", roleData);

export const updateRole = async (roleId, roleData) => await patch(`role/${roleId}`, roleData);

export const deleteRole = async (roleId) => await del(`role/${roleId}`);

import { del, get, patch, post } from './apiUtils';

export const fetchPermissions = async () => await get("permission");

export const fetchPermissionById = async (permissionId) => await get(`permission/${permissionId}`);

export const createPermission = async (permissionData) => await post("permission", permissionData);

export const updatePermission = async (permissionId, permissionData) => await patch(`permission/${permissionId}`, permissionData);

export const deletePermission = async (permissionId) => await del(`permission/${permissionId}`);

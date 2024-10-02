import { del, get, patch, post,put } from './apiUtils';



export const assign_role = async (roleData) => await post("assign_role/assign", roleData);
export const assign_role_update = async (roleData) => await put(`assign_role/update`, roleData);

export const assign_permission = async (permissionData) => await post("assign_permission/assign", permissionData);
export const assign_permission_update = async (permissionData) => await put(`assign_permission/update`, permissionData);

export const assign_project = async (projectData) => await post("assign_project/assign", projectData);
export const assign_project_update = async (projectData) => await put("assign_project/update", projectData);
export const get_assigned_role = async (userId) => await get(`user/${userId}/roles`);
export const get_assigned_permission = async (roleId) => await get(`role/${roleId}/permissions`);
export const get_assigned_project = async (userId) => await get(`user/${userId}/projects`);


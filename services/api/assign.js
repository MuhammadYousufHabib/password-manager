import { del, get, patch, post } from './apiUtils';



export const assign_role = async (roleData) => await post("assign_role/assign", roleData);
export const assign_permission = async (permissionData) => await post("assign_permission/assign", permissionData);
export const assign_project = async (projectData) => await post("assign_project/", projectData);



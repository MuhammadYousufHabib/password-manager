import { del, get, patch, post } from './apiUtils';

export const fetchProjects = async () => await get("project");

export const fetchProjectById = async (projectId) => await get(`project/${projectId}`);

export const createProject = async (projectData) => await post("project", projectData);

export const updateProject = async (projectId, projectData) => await patch(`project/${projectId}`, projectData);

export const deleteProject = async (projectId) => await del(`project/${projectId}`);

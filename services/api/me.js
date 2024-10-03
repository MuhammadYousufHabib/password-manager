import { del, get, patch, post } from './apiUtils';

export const me_role = async () => await get("me/roles/");
export const me_permission = async () => await get("me/permissions");
export const get_me = async () => await get("me");
export const get_projects = async () => await get("me/projects");
export const update_me = async (meData) => await patch("me", meData);


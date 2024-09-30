import { del, get, patch, post } from './apiUtils';

export const me_role = async () => await get("me/roles/");
export const me_permission = async () => await get("me/permissions");
export const get_me = async () => await get("me");

import { del, get, patch, post } from './apiUtils';



export const assign_role = async (roleData) => await post("assign_role", roleData);



import { del, get, patch, post } from './apiUtils';
export const createField = async (fieldData) => await post("field/add_key", fieldData);

export const deleteField = async (fieldId) => await del(`field/delete_key/${fieldId}`);

export const getField = async (fieldId) => await get(`field/get_key/${fieldId}`);

export const updateKey = async (fieldId, keyData) => await patch(`field/update_key/${fieldId}`, keyData);


import { del, get, patch, post } from './apiUtils';

export const fetchModes = async () => await get("mode");

export const fetchModeById = async (modeId) => await get(`mode/${modeId}`);

export const createMode = async (modeData) => await post("mode", modeData);

export const updateMode = async (modeId, modeData) => await patch(`mode/${modeId}`, modeData);

export const deleteMode = async (modeId) => await del(`mode/${modeId}`);

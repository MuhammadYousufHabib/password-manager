const BASE_URL = 'http://localhost:8000';
import { cookies } from "next/headers"

const buildHeaders = ()=>{
  const token = cookies().get("access_token")
  const headers = {
    "Authorization":`Bearer ${token}`,
    "Content-Type":"applications/json"
  }
  return headers
}


export const get = async (endpoint)=>{
  const url = `${BASE_URL}/${endpoint}`
  const headers = buildHeaders()
  const response = await fetch(url,headers)
  if (!response.ok) {
    const error = new Error('Failed to fetch modes');
    error.status = response.status;
    throw error;
  }
  return response.json();
  
}


const post = async (endpoint,body)=>{
  const url = `${BASE_URL}/${endpoint}`
  const headers = buildHeaders()
  const response = await fetch(url,headers,body)
  if (!response.ok) {
    const error = new Error('Failed to fetch modes');
    error.status = response.status;
    throw error;
  }
  return response.json();
  
}

export const fetchModes = async () => await get("mode");

export const addMode = async (newMode) => {
  const response = await fetch(`${BASE_URL}/mode/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMode),
  });
  if (!response.ok) {
    throw new Error('Failed to add mode');
  }
  return await response.json();
};

export const updateMode = async (modeId, updatedMode) => {
  const response = await fetch(`${BASE_URL}/mode/${modeId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedMode),
  });
  if (!response.ok) {
    throw new Error('Failed to update mode');
  }
  return await response.json();
};

export const deleteMode = async (modeId) => {
  const response = await fetch(`${BASE_URL}/mode/${modeId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete mode');
  }
  return await response.json();
};

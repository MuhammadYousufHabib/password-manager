const BASE_URL = "http://localhost:8000";

let buildHeaders;

if (typeof window === "undefined") {
  //check if its a server component or a client component
  const { cookies } = require("next/headers");

  buildHeaders = () => {
    const token = cookies().get("access_token");
    return {
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json",
      credetials: "include",
    };
  };
} else {
  const Cookies = require("js-cookie");

  buildHeaders = () => {
    const token = Cookies.get("access_token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };
}

export const get = async (endpoint) => {
  const url = `${BASE_URL}/${endpoint}`;
  const headers = buildHeaders();

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      const error = new Error("Failed to GET");
      error.status = response.status;
      throw error;
    }
    return response.json();
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};
export const post = async (endpoint, body) => {
  const url = `${BASE_URL}/${endpoint}`;
  const headers = buildHeaders();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const error = new Error("Failed to POST");
      error.status = response.status;
      throw error;
    }
    return response.json();
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};
export const patch = async (endpoint, body) => {
  const url = `${BASE_URL}/${endpoint}`;
  const headers = buildHeaders();
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const error = new Error("Failed to fetch UPDATE");
      error.status = response.status;
      throw error;
    }
    return response.json();
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};
export const del = async (endpoint) => {
  const url = `${BASE_URL}/${endpoint}`;
  const headers = buildHeaders();
  try {
    const response = await fetch(url, { method: "DELETE", headers });
    if (!response.ok) {
      const error = new Error("Failed to DELETE");
      error.status = response.status;
      throw error;
    }
    return response.json();
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

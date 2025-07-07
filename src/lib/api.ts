import { Auth0ContextInterface } from "@auth0/auth0-react";

interface CallApiOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

export const callApi = async (
  auth0: Auth0ContextInterface,
  endpoint: string,
  options?: CallApiOptions
) => {
  try {
    const token = await auth0.getAccessTokenSilently();
    const response = await fetch(`http://localhost:5000${endpoint}`, {
      method: options?.method || "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options?.headers,
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

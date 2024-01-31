import { BASE_API_URL } from "../lib/constants";

export const ApiService = {
  getData: async (endpoint: string) => {
    if (process.env.VERCEL_ENV === "preview") {
      return null;
    }
    const response = await fetch(`${BASE_API_URL}/api/contentful/${endpoint}`, {
      headers: { Accept: "application/json", method: "GET" },
    });

    return response.json();
  },
};

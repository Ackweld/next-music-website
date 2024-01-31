import { BASE_API_URL } from "../lib/constants";

// export const ApiService = {
//   getData: async (endpoint: string) => {
//     const response = await fetch(`${BASE_API_URL}/api/contentful/${endpoint}`, {
//       headers: { Accept: "application/json", method: "GET" },
//     });

//     return response.json();
//   },
// };

export const ApiService = {
  getData: async (endpoint: string) => {
    const baseURL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://www.wunjan.com"; // Replace with your production domain

    const response = await fetch(`${baseURL}/api/contentful/${endpoint}`, {
      headers: { Accept: "application/json", method: "GET" },
    });

    return response.json();
  },
};

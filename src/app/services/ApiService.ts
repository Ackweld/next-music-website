export const ApiService = {
  getData: async (endpoint: string) => {
    const response = await fetch(`/api/contentful/${endpoint}`, {
      headers: { Accept: "application/json", method: "GET" },
    });

    return response.json();
  },
};
// export const ApiService = {
//   getData: async (endpoint: string) => {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_SITE_URL}/api/contentful/${endpoint}`,
//       {
//         headers: { Accept: "application/json", method: "GET" },
//       }
//     );

//     return response.json();
//   },
// };

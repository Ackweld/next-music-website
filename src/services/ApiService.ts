export const ApiService = {
  getData: async (endpoint: string) => {
    const response = await fetch(
      `${process.env.DOMAIN}/api/contentful/${endpoint}`,
      { headers: { Accept: "application/json", method: "GET" } }
    );

    return response.json();
  },
};

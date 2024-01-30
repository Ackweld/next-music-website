export const ApiService = {
  getData: async (endpoint: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/contentful/${endpoint}`,
      { headers: { Accept: "application/json", method: "GET" } }
    );

    return response.json();
  },
};

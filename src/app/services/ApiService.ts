export const ApiService = {
  getData: async (endpoint: string) => {
    if (process.env.NODE_ENV === "production") {
      // Placeholder data for the build stage
      return null;
    }

    // Fetch the actual data during runtime
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/contentful/${endpoint}`,
      {
        headers: { Accept: "application/json", method: "GET" },
      }
    );

    return response.json();
  },
};

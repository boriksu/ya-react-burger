const BASE_URL = "https://norma.nomoreparties.space/api";
const INGREDIENTS_URL = `${BASE_URL}/ingredients`;

export const getData = async () => {
  return fetch(INGREDIENTS_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `HTTP error: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      if (!data.success) {
        throw new Error("Server responded with success: false");
      }

      if (!data.data || data.data.length === 0) {
        throw new Error("Received empty data array");
      }

      return data.data;
    })
    .catch((error) => {
      console.error("Data loading failed:", error);
      throw error;
    });
};

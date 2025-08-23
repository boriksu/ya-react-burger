const DOMAIN = "https://norma.nomoreparties.space";
const STATUS_OK = 200;
const API_LOAD = "/api/ingredients";

export async function loadIngredients() {
  try {
    const response = await fetch(`${DOMAIN}${API_LOAD}`);

    if (response.status !== STATUS_OK) {
      const errorMessage = `HTTP Error: ${response.status} - ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error("Server responded with success: false");
    }

    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      throw new Error("Returned empty or invalid dataset");
    }

    return data.data;
  } catch (error) {
    console.error("Ingredients loading failed:", error.message);
    throw error;
  }
}

const DOMAIN = "https://norma.nomoreparties.space";

export const createOrder = async (ingredients) => {
  try {
    const response = await fetch(`${DOMAIN}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        ingredients: ingredients.map((item) => item._id),
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Server responded with success: false");
    }

    if (!data.order || typeof data.order.number !== "number") {
      throw new Error("Order number not found in response");
    }

    return data.order.number;
  } catch (error) {
    console.error("Order creation failed:", error.message);
    throw error;
  }
};

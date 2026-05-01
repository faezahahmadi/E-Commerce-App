const API_URL = "https://dummyjson.com/products";

export async function fetchProducts() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch Products.");
  }
  const data = await response.json();
  return data.products;
}
export const fetchProductById = async (id) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch Products.");
  }
  const data = await response.json();
  console.log("data", data);
  return data;
};

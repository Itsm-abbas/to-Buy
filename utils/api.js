import axios from "axios";
const fetchProducts = async () => {
  const response = await axios.get("/api/products");
  return response.data.data;
};

const fetchCatogories = async () => {
  const response = await axios.get("/api/products");
  const data = response.data.data;
  const uniqueCategories = Array.from(
    new Set(data.map((product) => product.category))
  );
  return uniqueCategories;
};

const fetchReviewsAll = async () => {
  const response = await axios.get(`/api/reviews`);
  return response.data.data;
};

const fetchReviews = async (productId) => {
  const response = await axios.get(`/api/reviews/${productId}`);
  return response.data;
};

export { fetchProducts, fetchReviews, fetchReviewsAll, fetchCatogories };

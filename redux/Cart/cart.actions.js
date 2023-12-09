import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADJUST_QUANTITY,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  FETCH_PRODUCTS_SUCCESS,
} from "./cart.types";
import { fetchProducts } from "../../utils/api";
import { toast } from "react-toastify";

export const fetchProductsData = () => {
  return async (dispatch) => {
    try {
      const products = await fetchProducts();
      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: {
          products,
        },
      });
    } catch (error) {
      console.log("Error fetching data: " + error);
    }
  };
};

export const AddToCart = (itemId) => {
  return async (dispatch) => {
    try {
      const products = await fetchProducts();
      dispatch({
        type: ADD_TO_CART,
        payload: {
          product_id: itemId,
          products,
        },
      });
      toast.success("Item added to cart");
    } catch (error) {
      console.log("Error fetching data: " + error);
      toast.error("Error");
    }
  };
};

export const RemoveFromCart = (itemId) => {
  toast.error("Item deleted from cart");
  return {
    type: REMOVE_FROM_CART,
    payload: {
      product_id: itemId,
    },
  };
};

export const AdjustQuantity = (itemId, value) => {
  return {
    type: ADJUST_QUANTITY,
    payload: {
      product_id: itemId,
      quantity: value,
    },
  };
};
export const AddToWishlist = (itemId) => {
  return async (dispatch) => {
    try {
      const products = await fetchProducts();
      dispatch({
        type: ADD_TO_WISHLIST,
        payload: {
          product_id: itemId,
          products,
        },
      });
      toast.success("Item added to wish list");
    } catch (error) {
      console.log("Error fetching data: " + error);
      toast.error("Error fetching product from server try again later");
    }
  };
};
export const RemoveFromWishlist = (itemId) => {
  toast.success("Item removed from wish list");
  return {
    type: REMOVE_FROM_WISHLIST,
    payload: {
      product_id: itemId,
    },
  };
};

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
const InputReview = ({ productId, product_image }) => {
  const [userReviewDetail, setUserReviewDetail] = useState({
    user_name: "",
    user_location: "",
    user_comment: "",
    stars: 0,
  });

  const handleChange = (event) => {
    setUserReviewDetail((prevUserReviewDetail) => ({
      ...prevUserReviewDetail,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmitReview = async (event) => {
    try {
      const response = await axios.post("/api/addreview", {
        user_name: userReviewDetail.user_name,
        user_location: userReviewDetail.user_location,
        user_comment: userReviewDetail.user_comment,
        stars: userReviewDetail.stars,
        productId,
        product_image,
      });

      toast.success(response.data.message);
      setUserReviewDetail({
        user_name: "",
        user_location: "",
        user_comment: "",
        stars: 0,
      }); // Clear form fields
    } catch (error) {
      console.error("Error submitting review:", error);
    }
    event.preventDefault();
  };
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        limit={1}
      />
      <div className="my-10 montserrat">
        <h3 className=" text-lg font-semibold mb-3">Enter your review : </h3>
        <form onSubmit={handleSubmitReview}>
          <div className="flex w-full gap-4">
            <TextField
              id="user_name"
              name="user_name"
              className="bg-white"
              fullWidth
              label="Name"
              type="text"
              value={userReviewDetail.user_name}
              onChange={handleChange}
              required
            />
            <TextField
              id="user_location"
              name="user_location"
              className="bg-white"
              fullWidth
              label="Location"
              type="text"
              value={userReviewDetail.user_location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              id="user_comment"
              name="user_comment"
              value={userReviewDetail.user_comment}
              onChange={handleChange}
              className="w-full px-4 py-2  rounded mt-2 border-2 focus:border-blue-500 outline-none"
              placeholder="Enter your review ...."
              rows="5"
              required
            />
          </div>
          <div className="mb-4 flex items-center gap-2 text-lg">
            <label htmlFor="stars">Rating: </label>
            <Rating
              name="stars"
              id="stars"
              value={userReviewDetail.stars}
              onChange={handleChange}
              size="medium"
              precision={0.5}
            />
          </div>
          <button
            type="submit"
            className="p-2 opensans bg-gray-700 hover:bg-gray-600 transition-all duration-150 text-white rounded"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputReview;

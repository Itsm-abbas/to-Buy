import React from "react";
import Rating from "@mui/material/Rating";

const Reviews = ({ productId, product_image, reviews }) => {
  const productReviews = reviews?.filter(
    (review) => review.product_id === productId
  );

  return (
    <div>
      {productReviews?.length > 0 ? (
        productReviews.map((item) => {
          const {
            review_id,
            user_name,
            user_comment,
            user_image,
            user_location,
            stars,
            posted_at,
          } = item;
          function formatDate(inputDate) {
            const date = new Date(inputDate);

            // Get day, month, and year
            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are zero-based
            const year = date.getFullYear().toString().slice(2);

            return `${day}-${month}-${year}`;
          }

          return (
            <div
              className="flex opensans items-center mb-4 py-3 px-2 pl-5 rounded-sm bg-gray-100"
              key={review_id}
            >
              <img
                src={user_image}
                alt={review_id}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div className="w-full">
                <div className="flex justify-between items-center text-lg font-semibold pr-2">
                  <span>{user_name}</span>
                  <span className="text-sm montserrat font-medium">
                    {formatDate(posted_at)}
                  </span>
                </div>
                <p className="text-gray-500">{user_location}</p>
                <div className="flex items-center mt-2">
                  {/* You can customize the star icon or use an SVG here */}
                  <span className="text-yellow-500 flex">
                    {/* Rating Stars */}
                    <Rating
                      size="small"
                      value={userReviewDetail.stars}
                      precision={0.1}
                      readOnly
                      className="mr-1"
                    />
                  </span>
                  <p className="ml-2">{stars} stars</p>
                </div>
                <p className="mt-2">{user_comment}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p className="mb-10">No reviews for this product yet.</p>
      )}
    </div>
  );
};

export default Reviews;

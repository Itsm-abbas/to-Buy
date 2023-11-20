// Reviews.js
import React from "react";

const Reviews = ({ productId, reviews }) => {
  const productReviews = reviews.filter((review) => review.id === productId);
  return (
    <div className="">
      {productReviews.length > 0 ? (
        productReviews.map((item) => {
          const { name, comment, image, location, stars } = item;
          return (
            <div
              className="flex items-center mb-4 py-3 px-2 pl-5 rounded-sm bg-gray-100"
              key={item.id}
            >
              <img
                src={image}
                alt={image}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-gray-500">{location}</p>
                <div className="flex items-center mt-2">
                  {/* You can customize the star icon or use an SVG here */}
                  <span className="text-yellow-500 flex">
                    {Array.from({ length: stars }).map((_, index) => (
                      <svg
                        key={index}
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 text-yellow-500"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                    ))}
                  </span>
                  <p className="ml-2">{stars} stars</p>
                </div>
                <p className="mt-2">{comment}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p>No reviews for this product yet.</p>
      )}
    </div>
  );
};

export default Reviews;

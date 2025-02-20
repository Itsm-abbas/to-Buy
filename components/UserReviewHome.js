import Rating from "@mui/material/Rating";
const UserReviewHome = ({
  review_id,
  user_name,
  user_location,
  user_comment,
  stars,
  user_image,
  product_image,
}) => {
  return (
    <div className="max-w-md  bg-white p-6 rounded-md shadow-md mb-2">
      <div className="flex items-center mb-4">
        <img
          src={user_image}
          alt={`${user_name}'s Profile`}
          className="w-12 h-12 object-cover rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{user_name}</h3>
          <p className="text-gray-500">{user_location}</p>
        </div>
      </div>
      <div className="mb-4">
        {/* Display stars based on the rating */}
        <div className="flex">
          <span className="text-gray-600 flex items-center">
            {/* Rating Stars */}
            <Rating
              size="small"
              value={stars}
              precision={0.1}
              readOnly
              className="mr-2"
            />
            <span className="text-sm">({stars}) </span>
          </span>
        </div>
      </div>
      <div className="mb-4">
        {/* Display product image */}
        <img
          src={product_image}
          alt={review_id}
          className="w-full h-36 object-cover mb-4 rounded"
        />
      </div>
      <p className="text-gray-700 text-sm mb-4 ">{user_comment}</p>
    </div>
  );
};

export default UserReviewHome;

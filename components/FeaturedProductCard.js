import Link from "next/link";
import Rating from "@mui/material/Rating";
import { useQuery } from "react-query";
import { fetchReviewsAll } from "../utils/api";
const ProductCard = ({ product }) => {
  // Fetching Reviews
  const {
    data: reviews,
    isLoading: loadingReviews,
    error: reviewsError,
  } = useQuery("reviews", fetchReviewsAll);
  const { product_id, image, slug, title, price, newprice } = product;
  // Formatting the number with comma
  const numberWithCommas = (number) => {
    return number?.toLocaleString();
  };
  // Filtering reviews
  const ProductReviews = reviews?.filter((p) => {
    return p.product_id === product_id;
  });
  // Total number of rating stars
  const totalRating = ProductReviews?.reduce(
    (sum, review) => sum + review?.stars,
    0
  );
  // Finding the average of reviews
  const averageRating = totalRating / ProductReviews?.length;
  const offPercentage = 100 - Math.floor((newprice / price) * 100);
  return (
    <div key={product_id}>
      <Link href={`product/${slug}`}>
        <div className="relative overflow-hidden bg-white p-3 pb-10 rounded shadow-md group">
          <img
            src={image}
            alt={title}
            className="w-full h-40 object-cover mb-4 rounded"
          />

          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-gray-600 flex items-center mb-2">
            {/* Rating Stars */}
            <Rating
              size="small"
              value={averageRating}
              precision={0.1}
              readOnly
              className="mr-2"
            />
            <span className="text-sm">({ProductReviews?.length}) </span>
          </span>
          <p className=" title-font font-medium text-gray-900 text-lg flex items-center gap-2 ">
            Rs.{" "}
            <div className="inline-flex relative">
              {!newprice && (
                <div>
                  <span>{numberWithCommas(price)}</span>
                </div>
              )}
              {newprice && (
                <>
                  <span
                    className={`absolute top-6 left-1 text-sm line-through text-gray-600`}
                  >
                    {numberWithCommas(price)}
                  </span>
                  <span className="">
                    {newprice && numberWithCommas(newprice)}
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center">
              {newprice && (
                <p className="text-red-600 text-base">-{offPercentage}%</p>
              )}
            </div>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

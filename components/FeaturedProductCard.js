import Link from "next/link";
import reviewsData from "../utils/reviews";
import Rating from "@mui/material/Rating";
const ProductCard = ({ product }) => {
  const { id, image, slug, title, price, newprice } = product;
  const numberWithCommas = (number) => {
    return number?.toLocaleString();
  };
  const ProductReviews = reviewsData.filter((p) => {
    return p.id === id;
  });
  const totalRating = ProductReviews.reduce(
    (sum, review) => sum + review?.stars,
    0
  );
  const averageRating = totalRating / ProductReviews.length;

  const offPercentage = 100 - Math.floor((newprice / price) * 100);
  return (
    <div key={id} className="">
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
          {/* <p className="text-gray-600 ">
            Rs{" "}
            <span className={`${newprice && "line-through"}`}>
              {numberWithCommas(price)}
            </span>{" "}
            {newprice && numberWithCommas(newprice)}
          </p> */}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

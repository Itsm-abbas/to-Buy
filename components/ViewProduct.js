import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Image from "next/image";
import reviewsData from "../utils/reviews";
import Rating from "@mui/material/Rating";
const ViewProduct = ({ product }) => {
  const { id, image, title, price, brand, desc, reviews, category, newprice } =
    product;
  const [inWishList, setinWishList] = useState(false);
  const ProductReviews = reviewsData.filter((p) => {
    return p.id === id;
  });
  const totalRating = ProductReviews.reduce(
    (sum, review) => sum + review?.stars,
    0
  );
  const averageRating = totalRating / ProductReviews.length;
  const rendered = [];

  const numberWithCommas = (number) => {
    return number?.toLocaleString();
  };
  const offPercentage = 100 - Math.floor((newprice / price) * 100);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-16 mx-auto">
        <div className="lg:w-11/12 mx-auto flex flex-wrap ">
          <Image
            alt="ecommerce"
            height={400}
            width={400}
            className="lg:w-1/2 w-full lg:h-96 h-64 object-cover object-center rounded"
            src={image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 flex flex-col justify-between">
            <div>
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {brand}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {title}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  {rendered}
                  <span className="text-gray-600 flex items-center">
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
                </span>
              </div>
              <p className="leading-relaxed">{desc}</p>
            </div>
            {category == "Shirts" && (
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                {/* Shirts */}
                <div className="flex">
                  <span className="mr-3">Color</span>
                  <button className="border-2 border-gray-300 bg-blue-900 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                </div>
              </div>
            )}
            {/* Shoes */}
            {category == "Shoes" && (
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  <button className="border-2 border-gray-300 bg-blue-900 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    {category === "Shoes" ? (
                      <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                      </select>
                    ) : (
                      <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                        <option>SM</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                      </select>
                    )}
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-between">
              <p className=" title-font font-medium text-gray-900 text-2xl flex items-center gap-2 ">
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
                        className={`absolute top-8 left-1 text-base line-through text-gray-600`}
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
                    <p className="text-red-600 text-lg">-{offPercentage}%</p>
                  )}
                </div>
              </p>
              <button
                onClick={() => {}}
                className=" ml-auto text-white bg-gray-700 py-2 px-6 focus:outline-none hover:bg-gray-600"
              >
                Add to Cart
              </button>
              {inWishList ? (
                <button
                  onClick={() => setinWishList(!inWishList)}
                  className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                >
                  <FaHeart />
                </button>
              ) : (
                <button
                  onClick={() => setinWishList(!inWishList)}
                  className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                >
                  <FaRegHeart />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ViewProduct;

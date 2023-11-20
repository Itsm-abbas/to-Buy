import Image from "next/legacy/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
const ProductItem = ({ product }) => {
  const { id, image, slug, title, price, category, newprice } = product;
  const [inWishList, setinWishList] = useState(false);
  const numberWithCommas = (number) => {
    return number.toLocaleString();
  };
  const offPercentage = Math.floor((newprice / price) * 100);
  return (
    <>
      <div className="relative bg-white p-3 rounded-md pb-5">
        <div className="relative overflow-hidden group rounded-md">
          <Image
            width={100}
            height={70}
            src={image}
            alt={title}
            layout="responsive"
            className=" transition ease-linear duration-300 object-cover object-center w-full transform hover:scale-110"
          />
          <Link href={`/product/${slug}`} legacyBehavior>
            <button className="absolute bg-white left-2/4 transform translate-x-[-50%] translate-y-32 bottom-6  text-black mr-6 text-lg  px-8 py-1  rounded-sm  hover:text-white hover:bg-gray-800 group-hover:-translate-y-8 transition-all duration-300">
              View
            </button>
          </Link>
        </div>
        <div className="mt-4">
          <p className="text-gray-500 text-xs tracking-widest title-font mb-1">
            {category}
          </p>
          <div className="flex justify-between">
            <p className="text-gray-900 title-font text-lg font-medium">
              {title}
            </p>
            {inWishList ? (
              <button
                onClick={() => setinWishList(!inWishList)}
                className="text-2xl"
              >
                <FaHeart />
              </button>
            ) : (
              <button
                onClick={() => setinWishList(!inWishList)}
                className="text-2xl"
              >
                <FaRegHeart />
              </button>
            )}
          </div>
          <p className=" title-font font-medium text-gray-900 text-base flex items-center gap-2 ">
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
                    className={`absolute top-5 left-0 text-xs line-through text-gray-600`}
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
                <p className="text-red-600 text-sm">-{offPercentage}%</p>
              )}
            </div>
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductItem;

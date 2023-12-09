import React from "react";
import ProductItem from "../components/ProductItem";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import Link from "next/link";
const WishList = () => {
  const Products = useSelector((state) => state.Cart.wishList);
  return (
    <Layout title={"Wish List"}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {Products.length > 0 ? (
        <section className="text-gray-600 body-font">
          <div className="py-10 mx-auto ">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {Products?.map((product, index) => {
                return <ProductItem key={index} product={product} />;
              })}
            </div>
          </div>
        </section>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <p className="font-base text-xl">No items in the wish list</p>
          <Link href={"/"}>
            <button className="mt-4 py-3 px-5 bg-gray-700 text-white">
              Go to products
            </button>
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default WishList;

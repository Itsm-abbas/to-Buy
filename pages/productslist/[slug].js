import React from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { fetchProducts } from "../../utils/api";
import { useQuery } from "react-query";
import Loader from "../../components/Loader";
import ProductItem from "../../components/ProductItem";
import { AiOutlineBars } from "react-icons/ai";
const ProductsList = () => {
  const router = useRouter();
  const { slug } = router.query;
  const {
    data: products,
    isLoading: loadingProducts,
    error: productsError,
  } = useQuery("products", fetchProducts);
  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category))
  );
  const filteredProducts = products?.filter((item) => item.category === slug);
  console.log(filteredProducts);
  return (
    <Layout>
      <div className="flex flex-col gap-7 md:flex-row">
        {/* Categories Sidebar */}
        <div className="p-4 md:border-r-2 w-full  lg:w-1/4  montserrat font-medium ">
          <div className="text-xl font-bold mb-4 flex gap-2 items-center px-2">
            <AiOutlineBars className="mr-1" />
            Categories
          </div>
          <ul className="">
            {uniqueCategories.map((category) => (
              <Link
                href={`/productslist/${category}`}
                legacyBehavior
                key={category}
              >
                <li className=" flex items-center gap-4 p-2 hover:bg-gray-500 hover:text-white group rounded-md cursor-pointer ">
                  <p>{category}</p>
                  <FaArrowRight className="text-sm" />
                </li>
              </Link>
            ))}
          </ul>
        </div>
        {loadingProducts && (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        )}
        {!loadingProducts && (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
            {filteredProducts?.map((product) => {
              return <ProductItem key={product.product_id} product={product} />;
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductsList;

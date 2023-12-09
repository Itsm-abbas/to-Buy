import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaArrowRight } from "react-icons/fa";
import { RemoveFromCart, AdjustQuantity } from "../redux/Cart/cart.actions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const Cart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // Fetching from redux
  const CartItems = useSelector((state) => state.Cart.cart);

  //   let isLoggedIn = useSelector((state) => state.User.isLoggedIn);
  const [cartItems, setCartItems] = useState(0);
  const [total, setTotal] = useState(0);

  // Handle form submit
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const numberWithCommas = (number) => {
    return number?.toLocaleString();
  };
  // Handle cart from redux
  useEffect(() => {
    // if (!isLoggedIn) {
    //   alert("You have to logged in first");
    //   router.push("/login-register");
    // }
    let count = 0;
    let total = 0;
    CartItems.forEach((item) => {
      count += item.qty;
      total += item.qty * item.price;
    });
    setCartItems(count);
    setTotal(total);
  }, [CartItems]);

  return (
    <Layout title="Cart">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        limit={1}
      />
      <section className="flex justify-center items-center flex-col w-full">
        <h1 className="text-3xl font-bold mb-16">Shopping Cart</h1>

        {CartItems.length > 0 ? (
          <div className="overflow-auto  sm:rounded-lg w-full">
            <table className="w-full shadow-md text-sm text-left text-gray-500">
              <thead className="md:text-lg text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 md:px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="hidden md:block px-4 md:px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-4 md:px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-4 md:px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-4 md:px-6 py-3">
                    <span>Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {CartItems.map((item) => {
                  return (
                    <>
                      <tr
                        key={Math.random() * 10000}
                        className="border-b even:bg-gray-50 "
                      >
                        <td
                          scope="row"
                          className="px-4 md:px-6 py-4 font-medium text-gray-900 "
                        >
                          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start">
                            <div>
                              <Image
                                width={100}
                                height={80}
                                src={item.image}
                                alt={item.title}
                              />
                            </div>
                            <div className="md:ml-8">
                              <p className=" md:text-xl text-gray-600">
                                {item.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4 hidden md:table-cell md:h-full">
                          {item.category.toUpperCase()}
                        </td>
                        <td className="px-4 md:px-6 py-4">
                          {numberWithCommas(item.price)} Rs
                        </td>
                        <td className="px-4 md:px-6 py-4 ">
                          <div className="flex items-center">
                            {/* Decrementing the quantity */}
                            <button
                              onClick={() =>
                                dispatch(
                                  AdjustQuantity(
                                    item.product_id,
                                    item.qty > 1 ? item.qty - 1 : 1
                                  )
                                )
                              }
                            >
                              <FaMinus />
                            </button>
                            <input
                              readOnly
                              className="outline-none mx-2 border text-center w-10  text-lg"
                              type="text"
                              value={item.qty}
                            />
                            {/* Incrementing the quantity */}
                            <button
                              onClick={() =>
                                dispatch(
                                  AdjustQuantity(item.product_id, item.qty + 1)
                                )
                              }
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 ">
                          <button
                            onClick={() =>
                              dispatch(RemoveFromCart(item.product_id))
                            }
                            className="font-normal bg-red-600 py-2 px-4 md:px-6 text-white hover:bg-red-500"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
            <div className=" w-full flex justify-end items-center py-10">
              <div className="w-full md:w-2/6 rounded-sm flex flex-col justify-between border shadow-md border-gray-300 bg-white border-solid  p-10">
                <div className="mb-6">
                  <p className="text-3xl font-medium text-gray-700 mr-4">
                    Cart Total
                  </p>
                </div>
                <div className="mb-2">
                  <p className=" text-gray-700 mr-4 flex justify-between">
                    Total items :{" "}
                    <span className="text-xl font-medium">{cartItems}</span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className=" text-gray-700 mr-4 flex justify-between">
                    Total Price :{" "}
                    <span className="text-xl font-medium">
                      Rs. {numberWithCommas(total)}
                    </span>
                  </p>
                </div>
                <div className="w-full"></div>
                <Link href={"/checkout"}>
                  <button className="w-full h-10 mt-12 p-2.5 text-white bg-gray-700 hover:bg-gray-600">
                    Procceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className="text-xl">No items in the Cart</p>
            <Link href={"/"}>
              <button className="mt-4 flex items-center bg-gray-700 rounded-sm text-white px-6 py-2 hover:bg-gray-600">
                Continue Shopping &nbsp; <FaArrowRight />
              </button>
            </Link>
          </>
        )}
      </section>
    </Layout>
  );
};
export default dynamic(() => Promise.resolve(Cart), { ssr: false });

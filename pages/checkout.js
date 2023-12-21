import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import {
  FaArrowLeft,
  FaCartArrowDown,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import Image from "next/image";
export default function App() {
  const router = useRouter();
  const [show, setShow] = useState(true);
  const cart = useSelector((state) => state.Cart.cart);
  let totalPrice = cart.reduce((a, b) => {
    return a + b.qty * b.price;
  }, 0);
  let totalItems = 0;
  cart.map((item) => {
    totalItems += item.qty;
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // Merge cart data with other form data
    const requestData = {
      ...data,
      cart,
    };

    axios
      .post("/api/checkout", requestData)
      .then((res) => {
        toast.success("Your order is placed");
        router.push(`/order-summary?orderId=${res.data.data[0].order_id}`);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  useEffect(() => {
    if (cart.length === 0) {
      router.replace("/cart");
    }
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, [cart.length, router]);
  if (cart.length === 0) {
    return;
  }
  return (
    <Layout title={"Checkout"}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        limit={1}
      />
      <div className="w-full flex justify-center items-center mb-8">
        <p className="text-3xl font-bold">Checkout</p>
      </div>
      <section className="flex flex-col-reverse md:flex-row">
        <form
          action="/api/checkout_session"
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:w-1/2 md:px-10 py-6"
        >
          <input
            className="mb-2 p-2.5 text-gray-800 outline-none border border-solid border-gray-200 focus:border-blue-500 rounded-sm "
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors?.email?.type === "required" && (
            <p className=" flex items-center mb-3 text-red-500">
              <BiError /> This field is required
            </p>
          )}
          <input
            className="mb-4 p-2 text-gray-800 outline-none border border-solid border-gray-200 focus:border-blue-500 rounded-sm "
            type="tel"
            placeholder="Phone"
            {...register("phone", { required: true })}
          />
          {errors?.phone?.type === "required" && (
            <p className=" flex items-center mb-3 text-red-500">
              <BiError /> This field is required
            </p>
          )}
          <select
            className="mb-4 p-2 text-gray-800 outline-none border border-solid border-gray-200 focus:border-blue-500 rounded-sm "
            {...register("country", { required: true })}
          >
            <option value="Pakistan">Pakistan</option>
          </select>
          {errors?.country?.type === "required" && (
            <p className=" flex items-center mb-3 text-red-500">
              <BiError /> This field is required
            </p>
          )}
          <input
            className="mb-4 p-2.5 text-gray-800 outline-none border border-solid border-gray-200 focus:border-blue-500 rounded-sm "
            type="text"
            placeholder="Full name"
            {...register("name", { required: true, max: 4, min: 2 })}
          />
          {errors?.name?.type === "required" && (
            <p className=" flex items-center mb-3 text-red-500">
              <BiError /> This field is required
            </p>
          )}
          <input
            className="mb-4 p-2.5 text-gray-800 outline-none border border-solid border-gray-200 focus:border-blue-500 rounded-sm "
            type="text"
            placeholder="Address"
            {...register("address", { required: true })}
          />
          {errors?.address?.type === "required" && (
            <p className=" flex items-center mb-3 text-red-500">
              <BiError /> This field is required
            </p>
          )}
          <input
            className="mb-4 p-2.5 text-gray-800 outline-none border border-solid border-gray-200 focus:border-blue-500 rounded-sm "
            type="text"
            placeholder="City"
            {...register("city", { required: true })}
          />
          {errors?.city?.type === "required" && (
            <p className=" flex items-center mb-3 text-red-500">
              <BiError /> This field is required
            </p>
          )}
          <input
            className="mb-4 p-2.5 text-gray-800 outline-none border border-solid border-gray-200 focus:border-blue-500 rounded-sm "
            type="number"
            placeholder="Postal Code"
            {...register("postal_code", { required: true })}
          />
          {errors?.postal_code?.type === "required" && (
            <p className=" flex items-center mb-3 text-red-500">
              <BiError /> This field is required
            </p>
          )}
          <div className="flex justify-between items-center mt-4">
            <Link href={"/cart"}>
              <button className="capitalize flex justify-center items-center text-blue-700 hover:text-black">
                <FaArrowLeft /> &nbsp; Return to Cart
              </button>
            </Link>
            <button
              className="bg-gray-700 text-white text-lg px-8 py-2  hover:bg-gray-600"
              type="submit"
            >
              Checkout
            </button>
          </div>
        </form>
        <aside className="w-full md:w-1/2 bg-white px-4 md:px-10 py-6">
          <div
            className={`${
              show ? "mb-10" : "mb-0"
            } flex justify-between md:hidden`}
          >
            <button
              onClick={() => setShow(!show)}
              className="flex items-center text-base capitalize text-gray-700 hover:text-black"
            >
              <FaCartArrowDown className="text-xl mr-2" />{" "}
              {show ? "Hide" : "Show"} order summary &nbsp;
              {show ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {!show && (
              <p className="text-2xl text-gray-700 font-bold">
                Rs. {totalPrice}
              </p>
            )}
          </div>
          <div
            className={`${
              show ? "block " : "hidden"
            }   py-2 transition-all ease-linear duration-500`}
          >
            {cart?.map((item) => {
              return (
                <div
                  className="flex justify-between items-center mb-4"
                  key={item.id}
                >
                  <div className="relative">
                    <Image
                      src={item.image}
                      width={50}
                      height={50}
                      alt="image"
                      className="rounded-lg"
                    />
                    <p className="truncate text-gray-700 absolute top-1/4 left-[130%] text-lg font-bold w-40">
                      {item.title}
                    </p>
                    <span className=" absolute -top-2 -right-4 w-6 h-6 flex items-center justify-center bg-gray-700 text-white text-xs rounded-lg">
                      {item.qty}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-700">
                    Rs. {item.qty * item.price}
                  </p>
                </div>
              );
            })}
            <div className="border-t border-gray-400 mb-6"></div>

            <p className="flex justify-between  mb-2">
              Total Items
              <span className="text-gray-700 text-lg font-bold">
                {totalItems}
              </span>
            </p>
            <p className="flex justify-between   mb-2">
              Subtotal
              <span className="text-gray-700 text-lg font-bold">
                Rs. {totalPrice}
              </span>
            </p>
            <p className="flex justify-between   mb-4">
              Shipping
              <span className="text-gray-700 text-lg font-bold">Free</span>
            </p>
            <div className="border-t border-gray-400 mb-6"></div>
            <p className="flex justify-between   mb-4">
              Total
              <div className="flex items-center justify-center">
                <p className="mr-4">PKR</p>
                <span className="text-gray-700 font-bold  text-2xl">
                  Rs. {totalPrice}
                </span>
              </div>
            </p>
          </div>
        </aside>
      </section>
    </Layout>
  );
}

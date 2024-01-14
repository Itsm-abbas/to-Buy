// pages/order-summary.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "../components/MainLoader";
import Layout from "../components/Layout";
import Cookies from "js-cookie";

const OrderSummary = () => {
  const router = useRouter();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const orderId = router.query.orderId;
    if (orderId) {
      fetch(`/api/get-order-details?orderId=${orderId}`)
        .then((response) => response.json())
        .then((data) => {
          setOrderData(data[0]);
        })
        .catch((error) => {
          console.error("Error fetching order details:", error);
        });
    }
  }, [router.query.orderId]);
  const cartProducts = JSON.parse(Cookies.get("cart")) || [];

  if (!orderData) {
    return <Loader />;
  }

  return (
    <Layout title="Order Confirmation">
      {
        <div className="container mx-auto p-4">
          <div className="flex justify-center items-center mb-8">
            <div className="bg-green-500 text-white p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold ml-4">Order Confirmed!</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 montserrat">
            <div className="border p-4 rounded-md shadow-md mb-6">
              <div className="flex gap-6 items-center mb-6">
                <div className="border border-gray-900 p-1 rounded-full inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="flex flex-col ">
                  <p className="text-sm">Order #{orderData?.order_id}</p>
                  <p className="font-bold text-lg">
                    Thank you {orderData?.name}!
                  </p>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
              <table className="w-full  ">
                <tbody className="px-1">
                  <tr className="border border-gray-400 ">
                    <td className="font-bold px-2 py-1">Email:</td>
                    <td>{orderData.email}</td>
                  </tr>
                  <tr className="border border-gray-400 ">
                    <td className="font-bold px-2 py-1">Phone:</td>
                    <td>{orderData.phone}</td>
                  </tr>
                  <tr className="border border-gray-400 ">
                    <td className="font-bold px-2 py-1">Country:</td>
                    <td>{orderData.country}</td>
                  </tr>

                  <tr className="border border-gray-400 ">
                    <td className="font-bold px-2 py-1">Address:</td>
                    <td>{orderData.address}</td>
                  </tr>
                  <tr className="border border-gray-400 ">
                    <td className="font-bold px-2 py-1">City:</td>
                    <td>{orderData.city}</td>
                  </tr>
                  <tr className="border border-gray-400 ">
                    <td className="font-bold px-2 py-1">Postal Code:</td>
                    <td>{orderData.postal_code}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="montserrat">
              <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
              {cartProducts?.map((product) => (
                <div
                  key={product.product_id}
                  className="flex items-center mb-4"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div className="flex flex-col w-full">
                    <p className="text-lg font-bold">{product.title}</p>
                    <div className="flex justify-between">
                      <p className="text-gray-700">&#215;{product.qty}</p>
                      <p className="text-gray-700">
                        Rs .{product.qty * product.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </Layout>
  );
};

export default OrderSummary;

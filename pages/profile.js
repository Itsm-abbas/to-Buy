//profile.js
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { updateUser } from "../redux/User/user.actions";
import Loader from "../components/DotsLoader";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userimage, setUserImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  let isLoggedIn = useSelector((state) => state.User.isLoggedIn);
  const user = useSelector((state) => state.User?.user);
  const formHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post("/api/updateProfile", {
        id: user?.id,
        full_name: e.target.full_name.value,
        password: e.target.password.value,
        change_password: e.target.change_password.value,
        address: e.target.address.value,
        user_image: userimage,
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(updateUser(res.data.data));
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data.message);
        setLoading(false);
      });
  };
  const fileHandler = (e) => {
    if (e.target.files[0].size < 1000001) {
      setUserImage(URL.createObjectURL(e.target.files[0]));
    } else {
      toast.error("Image size is too large");
    }
  };
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login-register");
    }
  }, [isLoggedIn, router]);
  return (
    <Layout>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      <main className="flex flex-col md:gap-10 md:flex-row opensans">
        <div className="flex flex-col bg-white w-full md:w-1/3 p-5 md:p-10 justify-center rounded-md shadow-md mb-12 md:mb-0">
          <h1 className="text-center text-2xl font-bold text-gray-800 mb-5">
            {user?.full_name}
          </h1>
          <div className="mb-8 flex justify-center items-center">
            {userimage && (
              <Image
                src={userimage}
                width={160}
                height={150}
                className="rounded-full "
                alt="profile"
                layout="fixed"
              />
            )}
            {!userimage && user?.user_image && (
              <Image
                src={user?.user_image}
                alt="profile"
                width={160}
                height={150}
                className="rounded-full "
                layout="fixed"
              />
            )}
          </div>
          <button className="capitalize bg-gray-800 hover:bg-gray-700 text-white mb-10">
            <label
              htmlFor="user_image"
              className="cursor-pointer flex flex-col justify-center items-center w-full px-2 py-2"
            >
              <input
                onChange={fileHandler}
                accept="image/x-png,image/jpeg"
                type="file"
                name="user_image"
                id="user_image"
                hidden
              />
              {userimage.length > 0 ? "update photo" : "upload new photo"}
            </label>
          </button>
          <div className="text-center text-sm mb-10  border-gray-400 border-2 bg-gray-200 px-4 py-4 rounded-lg">
            <p className="mb-2">
              Upload a new avatar. Larger image will be resized automatically
            </p>
            <p>Maximum upload size is 1 MB</p>
          </div>
          <div className="text-center text-gray-700  ">
            Member Since : <b>{user?.created_at?.split("T")[0]}</b>
          </div>
          <hr />
          {/* <div className="text-center text-gray-700   ">
            Last Updated : <b>{user?.updatedAt?.split("T")[0]}</b>
          </div> */}
        </div>
        <div className="p-5 md:p-10 bg-white w-full md:w-2/3 rounded-md shadow-md ">
          <h1 className="text-3xl font-bold text-gray-800 mb-10">
            Edit Profile
          </h1>
          <form
            onSubmit={formHandler}
            action="/api/updateProfile"
            method="POST"
          >
            <div className="mb-6 text-black">
              <label htmlFor="name" className="block mb-2 text-sm font-medium ">
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                className="shadow-sm bg-gray-50 border border-gray-300  outline-none text-sm rounded-lg  block w-full p-2.5 "
                placeholder={user?.full_name}
              />
            </div>
            <div className="mb-6 text-black">
              <label htmlFor="name" className="block mb-2 text-sm font-medium ">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="shadow-sm bg-gray-50 border border-gray-300  outline-none text-sm rounded-lg  block w-full p-2.5 "
                placeholder={
                  user?.address == null ? "No address set" : user?.address
                }
              />
            </div>
            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium  "
              >
                Your Current Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="shadow-sm bg-gray-50 border border-gray-300  outline-none text-sm rounded-lg  block w-full p-2.5"
                required
              />
              <div
                className="absolute right-4 top-1/2 transform translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="mb-6 relative">
              <label
                htmlFor="change_password"
                className="block mb-2 text-sm font-medium  "
              >
                Change Password
              </label>
              <input
                type={showPasswordChange ? "text" : "password"}
                id="change_password"
                className="shadow-sm bg-gray-50 border border-gray-300  outline-none text-sm rounded-lg  block w-full p-2.5"
              />
              <div
                className="absolute right-4 top-1/2 transform translate-y-1/2 cursor-pointer"
                onClick={() => setShowPasswordChange(!showPasswordChange)}
              >
                {showPasswordChange ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {!loading ? (
              <button
                type="submit"
                className="flex w-full items-center justify-center capitalize text-white bg-gray-800 hover:bg-gray-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Update Profile
              </button>
            ) : (
              <button className="flex w-full items-center justify-center capitalize text-white bg-gray-800 hover:bg-gray-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-wait">
                <Loader />
              </button>
            )}
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default Profile;

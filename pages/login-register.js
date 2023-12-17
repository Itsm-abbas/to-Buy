/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/User/user.actions";
import { useRouter } from "next/router";
import axios from "axios";
import Loader from "../components/DotsLoader";
import Cookies from "js-cookie";
const LoginRegister = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showRegister, setRegister] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [loader, setLoader] = useState({
    register: false,
    login: false,
  });
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  let validatePassword = watch("repeat_password");
  let validate = errors?.repeat_password?.type === "validate";
  if (validatePassword === password) {
    validate = true;
  }
  // Register Handler
  const RegisterSubmit = (data) => {
    setLoader({ ...loader, register: true });
    if (validate) {
      axios
        .post("/api/register", data)
        .then((res) => {
          toast.success("Now you can login in");
          reset();
          setRegister(false);
          setLoader({ ...loader, register: false });
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoader({ ...loader, register: false });
        });
    } else {
      toast.error("Password not match");
    }
  };
  // Login Handler
  const LoginSubmit = (data) => {
    setLoader({
      ...loader,
      login: true,
    });
    axios
      .post("/api/login", data)
      .then((res) => {
        setLoader({
          ...loader,
          login: true,
        });
        dispatch(loginUser(res.data.data));
      })
      .then(() => {
        setLoader({
          ...loader,
          login: true,
        });
        toast.success("Login success");
        router.push("/");
      })
      .catch((err) => {
        setLoader({
          ...loader,
          login: false,
        });
        toast.error("Either email or password is wrong");
      });
  };
  useEffect(() => {
    if (Cookies.get("isLoggedIn")) {
      router.push("/");
    }
  });

  return (
    <Layout title={`${showRegister ? "Register" : "Login"}`}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        limit={1}
      />
      <div className="container px-2 md:px-6 pb-12 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="hidden md:block md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <img
              src="/images/authentication.svg"
              className="w-full"
              alt="authentication"
            />
          </div>
          <div className="w-full md:w-8/12 lg:w-5/12 lg:ml-20">
            {showRegister ? (
              <>
                <p className="mb-6 text-3xl font-bold text-gray-700">
                  Register
                </p>
                <form
                  action="/api/register"
                  method="POST"
                  onSubmit={handleSubmit(RegisterSubmit)}
                >
                  <div className="mb-6">
                    <input
                      type="text"
                      className={`${
                        errors?.full_name?.type === "required" &&
                        "border-red-800"
                      } form-control block w-full px-4 py-2 text-lg md:text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none`}
                      placeholder="Full Name"
                      {...register("full_name", { required: true })}
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      type="email"
                      className={`${
                        errors?.email?.type === "required" && "border-red-800"
                      } form-control block w-full px-4 py-2 text-lg md:text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none`}
                      placeholder="Email address"
                      {...register("email", { required: true })}
                    />
                  </div>

                  <div className="mb-6 relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`${
                        errors?.password?.type === "required" &&
                        "border-red-800"
                      } form-control block mb-1 w-full px-4 py-2 text-lg md:text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none`}
                      placeholder="Password"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                      })}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors?.password?.type === "minLength" && (
                      <p className="mb-2 text-red-700">
                        Password must be at least 6 characters
                      </p>
                    )}
                    <div
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                  <div className="mb-6 relative">
                    <input
                      type={showPasswordRepeat ? "text" : "password"}
                      className={`${
                        errors?.repeat_password?.type === "required" ||
                        errors?.repeat_password?.type === "minLength" ||
                        (!validate && "border-red-800")
                      } form-control block mb-2 w-full px-4 py-2 text-lg md:text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none`}
                      placeholder="Repeat Password"
                      {...register("repeat_password", {
                        required: true,
                        minLength: 6,
                        validate: true,
                      })}
                    />
                    <div
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPasswordRepeat(!showPasswordRepeat)}
                    >
                      {showPasswordRepeat ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                  {loader?.login ? (
                    <button className="flex justify-center items-center px-7  bg-gray-700 text-white cursor-progress rounded shadow-md w-full">
                      <Loader />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex justify-center items-center px-7 py-3 bg-gray-700 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-600 hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full"
                    >
                      Register
                    </button>
                  )}

                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                    <p className="text-center font-semibold mx-4 mb-0">OR</p>
                  </div>
                  <button
                    onClick={() => setRegister(false)}
                    type="submit"
                    className="inline-block px-7 py-3 bg-gray-700 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-600 hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full"
                  >
                    Log in
                  </button>
                </form>
              </>
            ) : (
              // Login page stars from here
              <>
                <p className="mb-6 text-3xl font-bold text-gray-700">Log in</p>
                <form onSubmit={handleSubmit(LoginSubmit)} method="GET">
                  <div className="mb-6">
                    <input
                      type="email"
                      className={`${
                        errors?.email?.type === "required" && "border-red-800"
                      } form-control block w-full px-4 py-2 text-lg md:text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:outline-none`}
                      placeholder="Email address"
                      {...register("email", { required: true })}
                    />
                  </div>

                  <div className="mb-6 relative">
                    <input
                      type={showPasswordLogin ? "text" : "password"}
                      className={`${
                        errors?.password?.type === "required" &&
                        "border-red-800"
                      } form-control block w-full px-4 py-2 text-lg md:text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none`}
                      placeholder="Password"
                      {...register("password", {
                        required: true,
                      })}
                    />
                    <div
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPasswordLogin(!showPasswordLogin)}
                    >
                      {showPasswordLogin ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <div className="form-group form-validate flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        />
                      </div>
                      <label
                        htmlFor="remember"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  {loader?.login ? (
                    <button className="flex justify-center items-center px-7  bg-gray-700 text-white cursor-progress rounded shadow-md w-full">
                      <Loader />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex justify-center items-center px-7 py-3 bg-gray-700 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-600 hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full"
                    >
                      Login
                    </button>
                  )}

                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                    <p className="text-center font-semibold mx-4 mb-0">OR</p>
                  </div>
                  <button
                    onClick={() => setRegister(true)}
                    type="submit"
                    className="inline-block px-7 py-3 bg-gray-700 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-600 hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full"
                  >
                    Register
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginRegister;

import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { FaBars, FaTimes, FaShoppingCart, FaRegUser } from "react-icons/fa";
import { fetchCatogories } from "../utils/api";
import { useQuery } from "react-query";
import SearchBar from "./SearchBar";
import { FaChevronDown } from "react-icons/fa";
import Badge from "@mui/material/Badge";
import { useSelector, useDispatch } from "react-redux";
import DropDown from "./UserDropdown";
function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cart = useSelector((state) => state.Cart.cart);
  const wishList = useSelector((state) => state.Cart.wishList);
  const IsLoggedIn = useSelector((state) => state.User.isLoggedIn);
  const user = useSelector((state) => state.User.user);
  const {
    data: categories,
    isLoading: loadingCategory,
    error: categoryError,
  } = useQuery("categories", fetchCatogories);
  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };
  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });
    setCartItems(count);
  }, [cart]);
  return (
    <div className="sticky top-0 left-0 right-0 z-30">
      <nav className="bg-white text-black shadow-md md:bg-red dark:bg-gray-700 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 ">
          <div className="flex items-center justify-between h-16 gap-20">
            <div className="flex items-center">
              <div className="flex-shrink-0 cursor-pointer ">
                <Link href={"/"} legacyBehavior>
                  <div className="flex items-center justify-center gap-4">
                    <img src="/logo2.png" alt="logo" className="w-7" />
                    <span className="text-lg font-medium  montserrat hidden md:inline">
                      toBuy
                    </span>
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex items-center flex-grow gap-10">
              {/* Categories Dropdown */}
              <div className="relative" onMouseLeave={handleMouseLeave}>
                <button
                  onMouseEnter={handleMouseEnter}
                  className="focus:outline-none flex items-center h-16 justify-center opensans"
                >
                  <span className="text-base md:text-lg">Categories</span>
                  <FaChevronDown className="w-3 h-3 md:w-4 md:h-4 ml-2 mt-1" />
                </button>

                {/* Dropdown Content */}
                {isDropdownOpen && (
                  <div className="absolute  w-52 border border-gray-300  bg-white rounded-md shadow-lg">
                    <ul className="py-2">
                      {categories?.map((category) => (
                        <Link href={`/productslist/${category}`} key={category}>
                          <li className="px-4 py-2 cursor-pointer text-black hover:bg-gray-200">
                            {category}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* Search Input */}
              <div className="flex-grow hidden md:block">
                <SearchBar />
              </div>
              {/* <div className="hidden md:flex">
                <Link href={"/wishList"} legacyBehavior>
                  <a className=" dark:hover:bg-white montserrat dark:hover:text-black  hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Wish List
                  </a>
                </Link>
              </div> */}
            </div>
            <div className=" flex items-center">
              <div className="md:flex items-center justify-center hidden">
                {IsLoggedIn ? (
                  <button className="hidden sm:flex mr-5">
                    <DropDown />
                  </button>
                ) : (
                  <Link href={"/login-register"}>
                    <button className="relative  flex items-center  dark:hover:bg-white dark:hover:text-black  hover:bg-gray-700 hover:text-white px-3 py-2 md:mr-6 rounded-md text-base font-medium">
                      <FaRegUser className="text-xl md:text-2xl" />
                    </button>
                  </Link>
                )}
              </div>

              <Link href={"/cart"} legacyBehavior>
                <button className="relative md:mr-6 flex items-center capitalize dark:hover:bg-white dark:hover:text-black  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                  <Badge color="primary" badgeContent={cartItems} showZero>
                    <FaShoppingCart className="text-xl md:text-2xl mr-2 " />
                  </Badge>
                </button>
              </Link>

              <button
                className="md:hidden"
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <button className="relative  flex items-center  dark:hover:bg-white dark:hover:text-black  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                    <FaBars className="text-xl " />
                  </button>
                ) : (
                  <button className="relative  flex items-center  dark:hover:bg-white dark:hover:text-black  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                    <FaTimes className="text-xl " />
                  </button>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href={"/"} legacyBehavior>
                  <a className="hover:bg-gray-700 dark:hover:bg-white dark:hover:text-black  hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Home
                  </a>
                </Link>

                <Link href={"/about"} legacyBehavior>
                  <a className=" hover:bg-gray-700 dark:hover:bg-white dark:hover:text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    About
                  </a>
                </Link>

                <Link href={"/contact"} legacyBehavior>
                  <a className=" hover:bg-gray-700 dark:hover:bg-white dark:hover:text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Contact
                  </a>
                </Link>
                <Link href={"/login-register"} legacyBehavior>
                  <a className=" hover:bg-gray-700 dark:hover:bg-white dark:hover:text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Login/Register
                  </a>
                </Link>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Nav;

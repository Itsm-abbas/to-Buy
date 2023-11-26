import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";
import Slider from "react-slick";
import { fetchCatogories } from "../utils/api";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
const HeroSection = () => {
  const {
    data: categories,
    isLoading: loadingCategory,
    error: categoryError,
  } = useQuery("categories", fetchCatogories);
  const Bannerimages = [
    {
      image: "banners/banner1.jpg",
      alt: "banner1",
      href: "discount",
    },
    { image: "banners/banner2.jpeg", alt: "banner2", href: "discount" },
    { image: "banners/banner3.jpg", alt: "banner3", href: "discount" },
    { image: "banners/banner4.jpg", alt: "banner4", href: "discount" },
  ];
  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % categories?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };
  return (
    <div className="flex flex-row-reverse pb-12">
      <div className="w-3/4 ">
        <Slider {...sliderSettings}>
          {Bannerimages.map((item, index) => {
            return (
              <div key={index}>
                <Link href={item.href} legacyBehavior>
                  <a>
                    <img
                      className="w-full h-auto rounded"
                      src={item.image}
                      alt={item.alt}
                    />
                  </a>
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
      {/* Categories Sidebar */}
      <div className="w-1/4 p-8 bg-white rounded-md mr-4 shadow-sm montserrat">
        <div className="text-xl font-bold mb-4 flex gap-2 items-center px-2">
          <AiOutlineBars className="mr-1" />
          Categories
        </div>
        <ul>
          {categories?.map((category) => (
            <Link
              href={`/productslist/${category}`}
              legacyBehavior
              key={category}
            >
              <li className=" flex items-center gap-4 hover:bg-gray-500 hover:text-white group rounded-md p-1 cursor-pointer px-3 font-medium">
                <FaArrowRight className="text-sm" />
                <p>{category}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeroSection;

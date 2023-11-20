import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";
import {
  faBaseball,
  faMobileAlt,
  faTshirt,
  faHome,
  faPersonDress,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
const HeroSection = () => {
  const categories = [
    { name: "Electronics", slug: "electronics", icon: faMobileAlt },
    { name: "Men's fashion", slug: "clothing", icon: faPerson },
    { name: "Women's fashion", slug: "clothing", icon: faPersonDress },
    { name: "Home & Lifestyle", slug: "home-and-lifestyle", icon: faHome },
    { name: "Sports", slug: "sports", icon: faBaseball },
    // Add more categories as needed
  ];
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
      setSlideIndex((prevIndex) => (prevIndex + 1) % categories.length);
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
      <div className="w-1/4 p-8 bg-white rounded-md mr-4 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Product Categories</h2>
        <ul>
          {categories.map((category) => (
            <Link
              href={`/category/${category.slug}`}
              legacyBehavior
              key={category.slug}
            >
              <li className=" flex items-center hover:bg-gray-500 hover:text-white group rounded-md p-1 cursor-pointer">
                <FontAwesomeIcon
                  icon={category.icon}
                  className="mr-2 text-blue-500 w-5 group-hover:text-white"
                />

                <p>{category.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeroSection;

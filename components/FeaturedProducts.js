import Slider from "react-slick";
import FeaturedProductCard from "./FeaturedProductCard";

const FeaturedProducts = ({ products }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const featureProducts = products.filter((product) => product.featureProduct);
  console.log(featureProducts);
  return (
    <div className="container mx-auto my-12">
      <h2 className="text-3xl font-semibold mb-6">Featured Products</h2>
      <Slider {...sliderSettings}>
        {featureProducts.map((product) => (
          <div key={product.id} className="px-2 mb-4 ">
            <FeaturedProductCard product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedProducts;

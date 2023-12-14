import Slider from "react-slick";
import FeaturedProductCard from "./FeaturedProductCard";
import Loader from "./DotsLoader";

const FeaturedProducts = ({ productsData }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,

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

  const featureProducts = productsData?.filter(
    (product) => product.featureProduct
  );
  return (
    <div className="container mx-auto my-12">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        Featured Products
      </h2>
      {productsData?.length > 3 && (
        <Slider {...sliderSettings}>
          {featureProducts?.map((product) => (
            <div key={product?.id} className="px-2 mb-4 ">
              <FeaturedProductCard product={product} />
            </div>
          ))}
        </Slider>
      )}
      {featureProducts?.length <= 3 && (
        <div className="mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {featureProducts?.map((product) => (
            <div key={product.product_id} className="px-2 mb-4">
              <FeaturedProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;

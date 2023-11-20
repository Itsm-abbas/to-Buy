import React from "react";
import { useRouter } from "next/router";
import products from "../../utils/products";
import Layout from "../../components/Layout";
import ViewProduct from "../../components/ViewProduct";
import ReactSlickCarousel from "react-slick";
import ProductItem from "../../components/ProductItem";
import UserReviewProduct from "../../components/UserReviewProduct";
import reviews from "../../utils/reviews";

const Product = () => {
  const router = useRouter();
  const { slug } = router.query;
  const product = products.find((item) => item?.slug === slug);

  // Fetch related products
  const relatedProducts = products
    .filter((p) => p?.category === product?.category && p?.slug !== slug)
    .slice(0, 6); // Limit to the first 6 related products
  const slidesToShow = Math.min(relatedProducts.length, 4); // Adjust the default value (4) as needed

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: slidesToShow,
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

  return (
    <Layout title={product?.title}>
      {product && <ViewProduct product={product} key={slug} />}
      {/* Reviews section */}
      <div className="mt-10 mb-10">
        <h2 className="text-2xl montserrat font-semibold mb-8">
          Customer Reviews
        </h2>
        <UserReviewProduct productId={product?.id} reviews={reviews} />
      </div>
      <h3 className="text-2xl font-semibold my-4">Related Products</h3>

      {relatedProducts.length > 0 ? (
        <div className="mb-20">
          <ReactSlickCarousel {...settings}>
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.slug} className="px-2 py-8">
                <ProductItem
                  product={relatedProduct}
                  key={relatedProduct.slug}
                />
              </div>
            ))}
          </ReactSlickCarousel>
        </div>
      ) : (
        <p>No related products found.</p>
      )}
    </Layout>
  );
};

export default Product;

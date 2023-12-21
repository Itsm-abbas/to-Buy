import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import ViewProduct from "../../components/ViewProduct";
import ReactSlickCarousel from "react-slick";
import ProductItem from "../../components/ProductItem";
import UserReviewProduct from "../../components/UserReviewProduct";
import { fetchProducts, fetchReviewsAll } from "../../utils/api";
import { useQuery } from "react-query";
import Loader from "../../components/MainLoader";
import InputReview from "../../components/InputReview";

const Product = () => {
  const router = useRouter();
  const { slug } = router.query;
  //Fetching Products
  const {
    data: products,
    isLoading: loadingProducts,
    error: productsError,
  } = useQuery("products", fetchProducts);
  // Fetching Reviews
  const {
    data: reviews,
    isLoading: loadingReviews,
    error: reviewsError,
  } = useQuery("reviews", fetchReviewsAll);

  const product = products?.find((item) => item?.slug === slug);
  // Fetch related products
  const relatedProducts = products
    ?.filter((p) => p?.category === product?.category && p?.slug !== slug)
    .slice(0, 6); // Limit to the first 6 related products
  const slidesToShow = Math.min(relatedProducts?.length, 4); // Adjust the default value (4) as needed

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
      {loadingProducts ? (
        <Loader />
      ) : (
        product && <ViewProduct product={product} key={slug} />
      )}
      {/* Reviews section */}
      <div className="mt-10 mb-10">
        <h2 className="text-2xl montserrat font-semibold mb-8">
          Customer Reviews
        </h2>
        <InputReview
          productId={product.product_id}
          product_image={product.image}
        />
        {loadingReviews ? (
          <Loader />
        ) : (
          <UserReviewProduct
            productId={product?.product_id}
            product_image={product?.image}
            reviews={reviews}
          />
        )}
      </div>
      <h3 className="text-2xl font-semibold my-4">Related Products</h3>

      {relatedProducts?.length > 3 && (
        <div className="mb-20">
          <ReactSlickCarousel {...settings}>
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct?.slug} className="px-2 py-8">
                <ProductItem
                  product={relatedProduct}
                  key={relatedProduct?.slug}
                />
              </div>
            ))}
          </ReactSlickCarousel>
        </div>
      )}
      {relatedProducts?.length <= 3 && relatedProducts?.length > 0 && (
        <div className="mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct?.slug}
              className="px-2 py-2 md:py-6 lg:py-8"
            >
              <ProductItem
                product={relatedProduct}
                key={relatedProduct?.slug}
              />
            </div>
          ))}
        </div>
      )}
      {relatedProducts?.length === 0 && <div>No Related Products</div>}
    </Layout>
  );
};

export default Product;

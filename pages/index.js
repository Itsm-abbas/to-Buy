import FeaturedProducts from "../components/FeaturedProducts";
import HeroSection from "../components/HeroSection";
import Layout from "../components/Layout";
import UserReviewHome from "../components/UserReviewHome";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { fetchProducts, fetchReviewsAll } from "../utils/api";

const Home = () => {
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
  return (
    <Layout>
      <>
        <section className="text-gray-600 body-font">
          <div className="py-6 mx-auto ">
            <HeroSection />
            <div>
              <FeaturedProducts
                productsData={products}
                isLoading={loadingProducts}
              />
            </div>
            <div className="container mx-auto my-24">
              <h2 className="text-3xl font-semibold mb-6">User Reviews</h2>
              {loadingReviews ? (
                <Loader />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {reviews?.map((review) => (
                    <UserReviewHome key={review.product_id} {...review} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
};

export default Home;

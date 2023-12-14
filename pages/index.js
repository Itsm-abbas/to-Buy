import FeaturedProducts from "../components/FeaturedProducts";
import HeroSection from "../components/HeroSection";
import Layout from "../components/Layout";
import UserReviewHome from "../components/UserReviewHome";
import { useQuery } from "react-query";
import { fetchProducts, fetchReviewsAll } from "../utils/api";
import Loader from "../components/MainLoader";
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
        {loadingProducts && loadingReviews ? (
          <Loader />
        ) : (
          <section className="text-gray-600 body-font">
            <div className="py-6 mx-auto ">
              <HeroSection />
              <div>
                <FeaturedProducts productsData={products} />
              </div>
              <div className="container mx-auto my-10 md:my-24">
                <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                  User Reviews
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {reviews?.map((review) => (
                    <UserReviewHome key={review.review_id} {...review} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </>
    </Layout>
  );
};

export default Home;

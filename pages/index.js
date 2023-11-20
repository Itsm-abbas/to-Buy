import FeaturedProducts from "../components/FeaturedProducts";
import HeroSection from "../components/HeroSection";
import Layout from "../components/Layout";
import UserReviewHome from "../components/UserReviewHome";
import products from "../utils/products";
import reviews from "../utils/reviews";
const Home = () => {
  return (
    <Layout>
      <>
        <section className="text-gray-600 body-font">
          <div className="py-6 mx-auto ">
            <HeroSection />
            <div>
              <FeaturedProducts products={products} />
            </div>
            <div className="container mx-auto my-24">
              <h2 className="text-3xl font-semibold mb-6">User Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                  <UserReviewHome key={index} {...review} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
};

export default Home;

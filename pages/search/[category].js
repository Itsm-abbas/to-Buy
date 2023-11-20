// pages/search/[category].js
import Layout from "../../components/Layout"; // Import your layout component
import ProductItem from "../../components/ProductItem";
import productsData from "../../utils/products"; // Import your products data

const SearchCategoryPage = ({ products, category }) => {
  return (
    <Layout>
      <div className="container mx-auto my-8">
        <h2 className="text-3xl font-semibold mb-6">Products in {category}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const category = params.category;

  // Filter products based on the category
  const products = productsData.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  return {
    props: {
      products,
      category,
    },
  };
}

export default SearchCategoryPage;

import Layout from "../../components/Layout"; // Import your layout component
import Loader from "../../components/Loader";
import ProductItem from "../../components/ProductItem";
import axios from "axios";

const SearchCategoryPage = ({ products, category }) => {
  const productsData = products.data;
  const filteredProducts = productsData.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <Layout>
      <div className="container mx-auto my-8">
        <h2 className="text-3xl font-semibold mb-6">Products in {category}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts?.map((product) => (
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
  const response = await fetch("http://localhost:3000/api/products");
  const products = await response.json();
  return {
    props: {
      products,
      category,
    },
  };
}

export default SearchCategoryPage;

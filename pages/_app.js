import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "react-query";
function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />;
      </QueryClientProvider>
    </Provider>
  );
}
export default dynamic(() => Promise.resolve(MyApp), { ssr: false });

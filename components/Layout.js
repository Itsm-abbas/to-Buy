import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title ? title + " - toBuy" : "toBuy"}</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="flex flex-col justify-between min-h-screen">
        <Header />
        <main className="p-4 md:p-8 flex-1 bg-gray-300">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;

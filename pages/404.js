// pages/under-construction.js
import React from "react";
import Layout from "../components/Layout";
const UnderConstruction = () => {
  return (
    <Layout title={"Under Construction"}>
      <div className="bg-[url('https://static.pexels.com/photos/259698/pexels-photo-259698.jpeg')] flex items-center justify-center bg-cover bg-center">
        <div className="text-white p-8 rounded-md shadow-md pb-28 backdrop-blur-sm h-full w-full text-center">
          <img
            src="/images/udilia-logo-white.svg"
            alt="Under Construction"
            className="mx-auto mb-6"
            style={{ maxWidth: "150px" }}
          />
          <h1 className="text-3xl font-semibold  mb-4">Under Construction</h1>
          <p className="text-lg">
            We are working on something awesome. Please check back later!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default UnderConstruction;

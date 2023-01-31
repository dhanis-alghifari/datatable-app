import React from "react";

const Loader = ({ loading, data }) => {
  return (
    <>
      {loading && (
        <p className="mt-5 w-full font-bold text-base text-center my-6">
          Loading...
        </p>
      )}
      {data.length === 0 && !loading && (
        <p className="mt-5 w-full font-bold text-base text-center my-6">
          Data not found
        </p>
      )}
    </>
  );
};

export default Loader;

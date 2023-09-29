import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <FadeLoader
  color="black"
  height={50}
  margin={25}
  radius={20}
  speedMultiplier={2}
  width={8}
  className="text-center mt-5"
/>
    </div>
  );
};

export default Loader;

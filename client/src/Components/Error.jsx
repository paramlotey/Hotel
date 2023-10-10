import React from "react";

const Error = ({message}) => {
  return (
    <>
      <div className="alert alert-danger text-center" role="alert">
        {message}
      </div>
    </>
  );
};

export default Error;

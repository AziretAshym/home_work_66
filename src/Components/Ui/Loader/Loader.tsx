import React from "react";

const Loader = () => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <button className="btn btn-primary" type="button" disabled>
        <span
          className="me-3 spinner-border spinner-border-sm"
          aria-hidden="true"
        ></span>
        <span role="status">Loading...</span>
      </button>
    </div>
  );
};

export default Loader;

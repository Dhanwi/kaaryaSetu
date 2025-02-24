import React from "react";
import PropType from "prop-types";

export const ErrorPage = (props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h2 className="text-4xl">Error 404</h2>
    </div>
  );
};

ErrorPage.propTypes = {
  props: PropType.object,
};

export default ErrorPage;

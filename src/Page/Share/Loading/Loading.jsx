import React from "react";
import useAuth from "../../../Hooks/useAuth";

const Loading = ({ children }) => {
  const { loading } = useAuth();   // lowercase

  if (loading) {
    return (
      <p className="text-2xl text-primary flex justify-center items-center">
        Loading...
      </p>
    );
  }

  return children;  // correct way
};

export default Loading;

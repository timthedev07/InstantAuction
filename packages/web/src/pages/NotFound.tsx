import React from "react";
import { useHistory } from "react-router-dom";

export const NotFound: React.FC = () => {
  const history = useHistory();

  return (
    <div>
      <h1>404</h1>
      <button
        onClick={() => {
          history.goBack();
        }}
      >
        Go Back
      </button>
    </div>
  );
};

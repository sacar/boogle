import React from "react";

const ButtonText = (props) => {
  if (props.pending) {
    return (
      <>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        <span style={{ marginLeft: "5px" }}>Verifying...</span>{" "}
      </>
    );
  } else {
    return <span>Submit</span>;
  }
};

export default ButtonText;

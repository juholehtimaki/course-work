import React from "react";

export const Alert = props => {
  /* Supported Bootstrap alert types */
  const supportedTypes = ["success", "danger"];
  const type = props.type;

  if (!type) {
    return null;
  }

  if (supportedTypes.includes(type)) {
    return (
      <div className={"alert alert-" + type} role="alert">
        {props.message}
      </div>
    );
  } else {
    return null;
  }
};

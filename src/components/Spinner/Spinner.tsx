import React from "react";

interface Props {
  text?: string;
}

const Spinner: React.FC<Props> = ({text}) => {
  return (
    <div className = 'col-12'>
      <div className="loading">
        <div>{text}</div>
        <div className="spinner"></div>
      </div>
    </div>
  );
}

export default Spinner;

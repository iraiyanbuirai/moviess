import React from 'react';
import { ClimbingBoxLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="loading-screen d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-white bg-opacity-75 z-index-9999">
      <ClimbingBoxLoader color="#3498db" loading={true} size={20} />
    </div>
  );
};

export default Loading;

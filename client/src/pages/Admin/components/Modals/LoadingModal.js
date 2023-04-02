import React from "react";

function LoadingModal() { 
  
  return (
    <>
       <button class="btn btn-primary" type="button" disabled>
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> &nbsp;
            Loading...
        </button>
    </>
  );
}

export default LoadingModal;

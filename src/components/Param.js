import React from "react";
import { useParams } from "react-router-dom";


const Param = () => {
    const params = useParams();
    const id = params.id;
    console.log(id);
    
  return (
    <div>
      <h1>Param</h1>
      <p>param</p>
    </div>
  );
};

export default Param;

import React from "react";
import { useSearchParams } from "react-router-dom";

const Query = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("name"));
  console.log(searchParams.get("age"));
  console.log(searchParams.get("address"));
     
  return (
    <div>
      <h1>Query</h1>
      <p>hoQueryme</p>
    </div>
  );
};

export default Query;

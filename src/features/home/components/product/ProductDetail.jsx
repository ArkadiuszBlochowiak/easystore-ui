import React from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const params = useParams();
  console.log(params);
  return <div>{params.productId}</div>;
}

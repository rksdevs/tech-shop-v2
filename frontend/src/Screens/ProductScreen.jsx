import { useGetProductDetailsQuery } from "../Features/productApiSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading: productLoading,
    error: productError,
    refetch,
  } = useGetProductDetailsQuery(productId);
  const { userInfo } = useSelector((state) => state.auth);
  return <div>ProductScreen</div>;
};

export default ProductScreen;

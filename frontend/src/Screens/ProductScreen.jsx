import Container from "../components/Container";
import { useGetProductDetailsQuery } from "../Features/productApiSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";

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
  return (
    <div className="flex w-full flex-col gap-8">
      <Container>
        <div className="bread-crumb mt-4">
          <Breadcrumbs />
        </div>
        <div className="product-section">
          <div className="product-image-section">
            <div className="product-image"></div>
          </div>
          <div className="product-price-section"></div>
        </div>
        <div className="product-details-section"></div>
        <div className="related-products-section"></div>
      </Container>
    </div>
  );
};

export default ProductScreen;

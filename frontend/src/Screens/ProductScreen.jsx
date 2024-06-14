import Container from "../components/Container";
import { useGetProductDetailsQuery } from "../Features/productApiSlice";
import ProductImg from "../components/assets/images/Designer.png";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import {
  Headset,
  ShieldCheck,
  Truck,
  IndianRupee,
  Star,
  ShoppingCart,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [noOfProduct, setNoOfProduct] = useState(1);
  const {
    data: product,
    isLoading: productLoading,
    error: productError,
    refetch,
  } = useGetProductDetailsQuery(productId);
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="flex w-full flex-col gap-8">
      <Container className="flex flex-col gap-8">
        <div className="bread-crumb mt-4">
          <Breadcrumbs />
        </div>
        <div className="product-section flex gap-8 my-4">
          <div className="product-image-section flex flex-col gap-8 flex-1">
            <div className="product-image ">
              <img
                src={ProductImg}
                alt="product-img"
                className="w-[500px] h-auto"
              />
            </div>
            <div className="product-services flex justify-between">
              {/* <div className="flex items-start gap-4 text-left">
                <Headset className="hidden h-6 w-6 sm:flex" />
                <div className="grid gap-1">
                  <p className="text-xs font-medium leading-none">Reliable</p>
                  <p className="text-xs text-muted-foreground">
                    Reliable support on Hotline
                  </p>
                </div>
              </div> */}
              <div className="flex items-start gap-4 text-left">
                <ShieldCheck className="hidden h-6 w-6 sm:flex" />
                <div className="grid gap-1">
                  <p className="text-xs font-medium leading-none">Secure</p>
                  <p className="text-xs text-muted-foreground">
                    Certified marketplace since 2010
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-left">
                <Truck className="hidden h-6 w-6 sm:flex" />
                <div className="grid gap-1">
                  <p className="text-xs font-medium leading-none">Shipping</p>
                  <p className="text-xs text-muted-foreground">
                    Shipping all over India
                  </p>
                </div>
              </div>
              {/* <div className="flex items-start gap-4 text-left">
                <IndianRupee className="hidden h-8 w-8 sm:flex" />
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">Payment</p>
                  <p className="text-sm text-muted-foreground">
                    Safe and secure payments
                  </p>
                </div>
              </div> */}
            </div>
          </div>
          <div className="product-price-section flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center mt-2">
                <div className="flex items-center text-yellow-500">
                  {Array.from({ length: 5 }, (product, index) => (
                    <Star
                      key={index}
                      // className={`h-4 w-4 ${
                      //   index < product?.rating ? "fill-current" : ""
                      // }`}
                      className={`h-4 w-4 ${index < 4 ? "fill-current" : ""}`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500 ml-2">
                  {/* ({product?.numReviews}) */}
                  (129)
                </div>
              </div>
              <div className="flex items-center mt-2 font-bold text-l text-left pb-2 border-b">
                {product?.name}
              </div>
              <div className="flex items-center mt-2 font-extrabold text-left text-[2rem] pt-2 text-primary flex gap-4">
                ₹ {product?.price}{" "}
                <span className="font-semibold text-muted-foreground text-base line-through pt-4">
                  {" "}
                  ₹ 30000
                </span>
              </div>
              <div className="item-details flex gap-12 justify-start mt-4">
                <div className="flex flex-col gap-8 justify-between">
                  <div className="item-details-heading text-left font-semibold">
                    Brand
                  </div>
                  <div className="font-semibold item-details-heading text-left">
                    Category
                  </div>
                  <div className="font-semibold item-details-heading text-left">
                    Condition
                  </div>
                  <div className="font-semibold item-details-heading text-left">
                    Shipping
                  </div>
                </div>
                <div className="flex flex-col gap-8 justify-between">
                  <div className="item-details-content text-left">
                    {product?.brand}
                  </div>
                  <div className="item-details-content text-left">
                    {product?.category}
                  </div>
                  <div className="item-details-content text-left">
                    Brand New
                  </div>
                  <div className="item-details-content text-left">
                    Anywhere in India
                  </div>
                </div>
              </div>
            </div>
            <div className="cart-section flex gap-8 mt-4">
              <div className="count-section flex gap-4 justify-center items-center">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-3xl"
                  disabled={noOfProduct}
                >
                  -
                </Button>
                {noOfProduct}
                <Button variant="secondary" size="icon" className="rounded-3xl">
                  +
                </Button>
              </div>
              <div className="buy-section flex gap-4 items-center">
                <Button>Buy Now</Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="p-2 border border-solid border-primary"
                >
                  <ShoppingCart className="text-primary" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="product-details-section flex">
          <Tabs defaultValue="description" className="w-full">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specification">Specification</TabsTrigger>
              <TabsTrigger value="returns">Returns & Warranty</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="specification">
              Change your password here.
            </TabsContent>
            <TabsContent value="returns">Change your Returns.</TabsContent>
            <TabsContent value="reviews">Change your reviews.</TabsContent>
          </Tabs>
        </div>
        <div className="related-products-section"></div>
      </Container>
    </div>
  );
};

export default ProductScreen;

import { Button } from "../components/ui/button";
import bannerOne from "../components/assets/images/banner-4.png";
import saleOne from "../components/assets/images/sale-3.jpg";
import saleTwo from "../components/assets/images/sale-1.jpg";
import saleThree from "../components/assets/images/sale-7.jpg";
import customPcImg from "../components/assets/images/pc-build-1.jpg";
import customPcImgTwo from "../components/assets/images/pc-build-9.jpg";
import appleLogo from "../components/assets/images/apple-logo.png";
import asusRogLogo from "../components/assets/images/Asus-rog.png";
import asusLogo from "../components/assets/images/Asus.png";
import AmdLogo from "../components/assets/images/Amd.png";
import AmdRyzenLogo from "../components/assets/images/Ryzen.png";
import NvidiaLogo from "../components/assets/images/Nvidia.png";
import IntelLogo from "../components/assets/images/intel.png";
import React, { useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Headset, ShieldCheck, Truck, IndianRupee } from "lucide-react";
import {
  useGetLatestProductsQuery,
  useGetProductsQuery,
  useGetTopProductsQuery,
} from "../Features/productApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const { theme } = useSelector((state) => state.theme);
  const { keyword, pageNumber } = useParams();
  const navigate = useNavigate();

  const {
    data: topProducts,
    isLoading: topProductsLoading,
    error: topProductsError,
  } = useGetTopProductsQuery();

  const {
    data: latestProducts,
    isLoading: latestProductsLoading,
    error: latestProductsError,
  } = useGetLatestProductsQuery();

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="banner flex bg-muted max-w-full max-h-[40vh] mt-4 py-4 rounded-md">
        <div className="content flex flex-col gap-4 flex-1 p-[5rem] items-start text-left">
          <h2 className="tracking-[0.025rem] font-[700] text-[2.5rem] leading-[2.5rem]">
            Your Favorite Computer Market
          </h2>
          <p className="font-medium text-muted-foreground">
            Welcome to computermakers, a place where you can buy everything
            about computers.
          </p>
          <Button onClick={() => navigate("/allproducts")}>Shop Now</Button>
        </div>
        <div className="image flex-1">
          <img src={bannerOne} alt="banner" className="w-full h-full" />
        </div>
      </div>
      <div className="about-service flex justify-between">
        <div className="flex items-start gap-4 text-left">
          <Headset className="hidden h-8 w-8 sm:flex" />
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Reliable</p>
            <p className="text-sm text-muted-foreground">
              Reliable support on Hotline
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 text-left">
          <ShieldCheck className="hidden h-8 w-8 sm:flex" />
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Secure</p>
            <p className="text-sm text-muted-foreground">
              Certified marketplace since 2010
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 text-left">
          <Truck className="hidden h-8 w-8 sm:flex" />
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Shipping</p>
            <p className="text-sm text-muted-foreground">
              Shipping all over India
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 text-left">
          <IndianRupee className="hidden h-8 w-8 sm:flex" />
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Payment</p>
            <p className="text-sm text-muted-foreground">
              Safe and secure payments
            </p>
          </div>
        </div>
      </div>
      <div className="top-rated flex flex-col gap-4">
        <div className="flex w-full justify-between items-center">
          <div>
            <h3 className="text-[18px] font-[700]">Top Rated Products</h3>
          </div>
          <div>
            <Button onClick={() => navigate("/allproducts")}>View All</Button>
          </div>
        </div>
        <Carousel className="w-full">
          <CarouselContent className="-ml-1 h-[40vh] pt-5">
            {topProducts?.map((product, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/5"
              >
                <div className="p-1">
                  <ProductCard
                    category={product?.category}
                    name={product?.name}
                    rating={product?.rating}
                    ratingCount={product?.numReviews}
                    price={product?.price}
                    productId={product?._id}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-[-15px]" />
          <CarouselNext className="right-[-15px]" />
        </Carousel>
      </div>
      <div className="latest flex flex-col gap-6">
        <div className="flex w-full justify-between items-center">
          <div>
            <h3 className="text-[18px] font-[700]">Latest Products</h3>
          </div>
          <div>
            <Button onClick={() => navigate("/allproducts")}>View All</Button>
          </div>
        </div>
        <Carousel className="w-full">
          <CarouselContent className="-ml-1 h-[40vh] pt-5">
            {latestProducts?.map((product, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/5"
              >
                <div className="p-1">
                  <ProductCard
                    category={product?.category}
                    name={product?.name}
                    rating={product?.rating}
                    ratingCount={product?.numReviews}
                    price={product?.price}
                    productId={product?._id}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-[-15px]" />
          <CarouselNext className="right-[-15px]" />
        </Carousel>
      </div>
      <div className="banner flex flex-col max-w-full rounded-md gap-4">
        <div className="flex h-full w-full bg-muted rounded-md">
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col gap-4 max-w-md text-left">
              <h2 className="font-[700] text-[2.5rem] leading-[2.5rem]">
                Summer Days, Offers Have Arrived!
              </h2>
              <p className="font-medium text-muted-foreground">
                Check out all Summer Days offers, limited stock check out now!
              </p>
              <Button
                className="max-w-[10rem]"
                onClick={() => navigate("/allproducts")}
              >
                Shop Now
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <img
              src={saleOne}
              alt="banner"
              className="w-full h-full object-cover rounded-r-md"
            />
          </div>
        </div>
        <div className="flex gap-2 max-h-[25vh]">
          <div className="custom-pc-one flex-1 flex bg-muted rounded-md">
            <div className="content flex flex-col gap-4 flex-1 p-[3rem] items-start text-left">
              <h2 className="tracking-[0.015rem] font-[700] text-[1.5rem] leading-[1.5rem]">
                Pre-built Custom PCs
              </h2>
              <p className="font-medium text-muted-foreground">
                Choose from wide ranges of pre-built PCs.
              </p>
              <Button
                className="min-w-[75px]"
                onClick={() => navigate("/prebuilt-pc")}
              >
                Check Now
              </Button>
            </div>
            <div className="image flex-1">
              <img
                src={customPcImgTwo}
                alt="banner"
                className="w-full h-[95%] rounded-r-md"
              />
            </div>
          </div>
          <div className="custom-pc-two flex-1 flex bg-muted rounded-md">
            <div className="content flex flex-col gap-4 flex-1 p-[3rem] items-start text-left">
              <h2 className="tracking-[0.015rem] font-[700] text-[1.5rem] leading-[1.5rem]">
                AI Powered PC Builder
              </h2>
              <p className="font-medium text-muted-foreground">
                Build your PC, with the help of our AI!
              </p>
              <Button
                className="min-w-[7rem]"
                onClick={() => navigate("/buildcustompc")}
              >
                Try Now
              </Button>
            </div>
            <div className="image flex-1">
              <img
                src={customPcImg}
                alt="banner"
                className="w-full h-[95%] rounded-r-md"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="featured-brands flex flex-col gap-6">
        <div className="flex w-full justify-between items-center">
          <div>
            <h3 className="text-[18px] font-[700]">Featured Brands</h3>
          </div>
          <div>
            <Button onClick={() => navigate("/allproducts")}>View All</Button>
          </div>
        </div>
        <div
          className={`all-featured-brands flex justify-between items-center ${
            theme === "dark" && "bg-muted-foreground rounded-md"
          }`}
        >
          <div className="brand flex justify-center items-center w-[18%] h-[20%]">
            <img src={appleLogo} alt="apple" className="brand-img" />
          </div>
          <div className="brand flex justify-center items-center w-[18%] h-[20%]">
            <img src={asusLogo} alt="Asus" className="brand-img w-1/2 h-1/2" />
          </div>
          <div className="brand flex justify-center items-center w-[18%] h-[20%]">
            <img src={AmdRyzenLogo} alt="Ryzen" className="brand-img" />
          </div>
          <div className="brand flex justify-center items-center w-[18%] h-[20%]">
            <img src={IntelLogo} alt="Intel" className="brand-img" />
          </div>
          <div className="brand flex justify-center items-center w-[18%] h-[20%]">
            <img src={NvidiaLogo} alt="Nvidia" className="brand-img" />
          </div>
        </div>
      </div>
      <div className="banner flex bg-muted max-w-full max-h-[30vh] rounded-md">
        <div className="image flex-1 rounded-l-md">
          <img
            src={saleTwo}
            alt="banner"
            className="w-full h-full rounded-l-md"
          />
        </div>
        <div className="content flex flex-col gap-4 flex-1 p-[3.5rem] items-start text-left">
          <h2 className="tracking-[0.025rem] font-[700] text-[2.5rem] leading-[2.5rem]">
            Newsletter
          </h2>
          <p className="font-light text-[12px] text-muted-foreground">
            Subscribe to our letter, get notified about latest offers!
          </p>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Email" />
            <Button type="submit">Subscribe</Button>
          </div>
        </div>
        <div className="image flex-1 rounded-r-md">
          <img
            src={saleThree}
            alt="banner"
            className="w-full h-full rounded-r-md"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

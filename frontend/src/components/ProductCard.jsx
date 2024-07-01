import React from "react";
import { Card, CardContent } from "./ui/card";
import imageToAdd from "./assets/images/psu-1.png";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { current } from "@reduxjs/toolkit";

const ProductCard = ({
  image,
  category,
  name,
  rating,
  ratingCount,
  price,
  productId,
  className = "",
  imgClass = "",
  cardContentClass = "",
  categoryClass = "",
  nameClass = "",
  sectionClass = "",
  ratingClass = "",
  numReviewsClass = "",
  priceClass = "",
  productDiscount,
  currentPrice,
  isOnOffer,
}) => {
  return (
    <Link to={`/product/${productId}`}>
      <Card
        className={`w-50 h-70 min-h-[310px] max-h-[310px] flex flex-col overflow-hidden border border-transparent transition-transform transform hover:scale-105 hover:border-gray-300 hover:shadow-lg p-2 text-left relative group ${className}`}
      >
        {isOnOffer && <Badge className="absolute right-3">Offer</Badge>}
        <img
          src={imageToAdd}
          alt="product"
          className={`h-1/2 object-cover ${imgClass}`}
        />
        <CardContent
          className={`h-1/2 p-4 flex flex-col justify-between ${cardContentClass}`}
        >
          <div>
            <div
              className={`text-xs font-semibold text-gray-500 ${categoryClass}`}
            >
              {category}
            </div>
            <h2
              className={`text-[12px] font-bold transition-colors group-hover:text-primary group-hover:underline ${nameClass}`}
            >
              {name?.length > 20 ? `${name?.substring(0, 20)}...` : name}
            </h2>
          </div>
          <div className={`flex items-center mt-2 ${sectionClass}`}>
            <div className={`flex items-center text-primary`}>
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className={`h-4 w-4 ${ratingClass} ${
                    index < rating ? "fill-current" : ""
                  }`}
                />
              ))}
            </div>
            <div className={`text-sm text-gray-500 ml-2 ${numReviewsClass}`}>
              ({ratingCount})
            </div>
          </div>
          {productDiscount ? (
            <div
              className={`text-l font-bold mt-2 flex gap-2 items-center justify-center ${priceClass}`}
            >
              <span className=" text-[15px]">
                ₹{Number(currentPrice).toFixed(2)}
              </span>{" "}
              <span className="text-xs text-muted-foreground line-through pt-1">
                ₹{Number(price).toFixed(2)}
              </span>
            </div>
          ) : (
            <div className={`text-l font-bold mt-2 ${priceClass}`}>
              ₹{Number(price).toFixed(2)}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
    // <div className="relative">
    //   {/* Add a wrapper with position relative */}
    //   <Card className="w-50 h-80 flex flex-col border border-transparent transition-transform transform hover:scale-105 hover:border-gray-300 hover:shadow-lg p-2 text-left group">
    //     <img src={imageToAdd} alt="product" className="h-1/2 object-cover" />
    //     <CardContent className="h-1/2 p-4 flex flex-col justify-between">
    //       <div>
    //         <div className="text-sm font-semibold text-gray-500">
    //           {category}
    //         </div>
    //         <h2 className="text-[16px] font-bold transition-colors group-hover:text-primary group-hover:underline">
    //           {name.length > 25 ? `${name.substring(0, 25)}...` : name}
    //         </h2>
    //       </div>
    //       <div className="flex items-center mt-2">
    //         <div className="flex items-center text-yellow-500">
    //           {Array.from({ length: 5 }, (_, index) => (
    //             <Star
    //               key={index}
    //               className={`h-4 w-4 ${index < rating ? "fill-current" : ""}`}
    //             />
    //           ))}
    //         </div>
    //         <div className="text-sm text-gray-500 ml-2">({ratingCount})</div>
    //       </div>
    //       <div className="text-lg font-bold mt-2">${price}</div>
    //     </CardContent>
    //   </Card>
    //   {/* Add absolute positioned border */}
    //   <div className="absolute inset-0 border border-transparent group-hover:border-gray-300 pointer-events-none"></div>
    // </div>
  );
};

export default ProductCard;

import React from "react";
import { Card, CardContent } from "./ui/card";
import imageToAdd from "./assets/images/psu-1.png";
import { Star } from "lucide-react";

const ProductCard = ({ image, category, name, rating, ratingCount, price }) => {
  return (
    <div>
      <Card className="w-50 h-70 flex flex-col overflow-hidden border border-transparent transition-transform transform hover:scale-105 hover:border-gray-300 hover:shadow-lg p-2 text-left group">
        <img src={imageToAdd} alt="product" className="h-1/2 object-cover" />
        <CardContent className="h-1/2 p-4 flex flex-col justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-500">
              {category}
            </div>
            <h2 className="text-[16px] font-bold transition-colors group-hover:text-primary group-hover:underline">
              {name.length > 25 ? `${name.substring(0, 25)}...` : name}
            </h2>
          </div>
          <div className="flex items-center mt-2">
            <div className="flex items-center text-yellow-500">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className={`h-4 w-4 ${index < rating ? "fill-current" : ""}`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500 ml-2">({ratingCount})</div>
          </div>
          <div className="text-lg font-bold mt-2">${price}</div>
        </CardContent>
      </Card>
    </div>
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

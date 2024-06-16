import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

const { useState } = require("react");

export const BrandsComponent = ({ allBrands }) => {
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="flex flex-col items-start justify-start gap-3">
      {allBrands
        ?.slice(0, showAll ? allBrands.length : 5)
        .map((brand, index) => (
          <div key={index} className="flex justify-start items-center gap-3">
            <Checkbox id={brand} />
            <label
              htmlFor={brand}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pt-1"
            >
              {brand}
            </label>
          </div>
        ))}
      {allBrands?.length > 5 && (
        <Button
          onClick={handleToggle}
          className="text-sm font-medium mt-2"
          size="sm"
        >
          {showAll ? "Show Less" : "Show More"}
        </Button>
      )}
    </div>
  );
};

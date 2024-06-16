import { useState } from "react";
import { Slider } from "./ui/slider";

const PriceSlider = () => {
  const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h2 className="text-lg font-medium">Range</h2>
      <Slider
        value={[value]}
        max={300000}
        min={0}
        step={10000}
        onValueChange={handleChange}
      />
      <div className="text-sm font-medium ">upto ₹{value}</div>
    </div>
  );
};

export default PriceSlider;

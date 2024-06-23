import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";
import {
  removeCategoryFilter,
  setCategoryFilter,
} from "../Features/filterSlice";

const { useState } = require("react");

export const CategoriesComponent = ({ allCategories }) => {
  const { categoryFilter } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleCheckbox = (e) => {
    if (categoryFilter.includes(e)) {
      let newPayload = categoryFilter.filter((item) => item !== e);
      dispatch(removeCategoryFilter(newPayload));
    } else {
      dispatch(setCategoryFilter(e));
    }
  };

  return (
    <ScrollArea className="h-72">
      {allCategories?.map((category, index) => (
        <div key={index} className="flex justify-start items-center gap-3 mb-1">
          <Checkbox
            id={category}
            onCheckedChange={() => handleCheckbox(category)}
            checked={JSON.parse(
              localStorage.getItem("filter")
            )?.categoryFilter?.includes(category)}
          />
          <label
            htmlFor={category}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pt-1"
          >
            {category}
          </label>
        </div>
      ))}
    </ScrollArea>
  );
};

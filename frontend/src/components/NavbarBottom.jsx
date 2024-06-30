import { Link, useNavigate } from "react-router-dom";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Container from "./Container";
import { useGetAllCategoriesQuery } from "../Features/productApiSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllCategoryFilters,
  removeCategoryFilter,
  setCategoryFilter,
  setPrimaryCategoryFilter,
} from "../Features/filterSlice";

export function NavbarBottom() {
  const { categoryFilter } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: allCategories,
    isLoading: categoryLoading,
    error: categoryError,
  } = useGetAllCategoriesQuery();
  const [categoryToFilter, setCategoryToFilter] = useState("");

  const handleCategorySelect = (e) => {
    dispatch(clearAllCategoryFilters());
    dispatch(setCategoryFilter(e));
    dispatch(setPrimaryCategoryFilter(true));
    navigate("/allProducts");
  };

  return (
    <div className="flex w-full flex-col">
      <header className="sticky top-0 flex h-12 items-center bg-primary border-b px-4 md:px-6">
        <Container className="flex w-full items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <div className="flex gap-2">
                  <Menu className="h-5 w-5 " />
                  <span className="sr-only">Toggle categories</span>
                  <span>All Categories</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {allCategories?.map((category, index) => (
                <DropdownMenuItem
                  key={index}
                  value={category}
                  onClick={() => handleCategorySelect(category)}
                  className="hover:cursor-pointer"
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <nav className="flex-1 hidden md:flex justify-center gap-5 lg:gap-6  font-medium">
            <Link
              to="/allproducts"
              className="text-background transition-colors hover:text-foreground"
            >
              All Products
            </Link>
            <Link
              to="/prebuilt-pc"
              className="text-background transition-colors hover:text-foreground"
            >
              Pre-built PC
            </Link>
            <Link
              to="/buildcustompc"
              className="text-background transition-colors hover:text-foreground"
            >
              Custom PC
            </Link>
          </nav>

          <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
            <Link
              to="/aboutus"
              className="text-background transition-colors hover:text-foreground"
            >
              About Us
            </Link>
            <Link
              to="/contactus"
              className="text-background transition-colors hover:text-foreground"
            >
              Contact Us
            </Link>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link href="#" className="hover:text-foreground">
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Orders
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Products
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Customers
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Analytics
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </Container>
      </header>
    </div>
  );
}

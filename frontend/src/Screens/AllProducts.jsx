import Container from "../components/Container";
import { Breadcrumbs } from "../components/Breadcrumbs";
import saleTwo from "../components/assets/images/sale-1.jpg";
import saleThree from "../components/assets/images/sale-7.jpg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Settings, ListFilter } from "lucide-react";
import { useParams } from "react-router-dom";
import {
  useGetAllBrandsQuery,
  useGetAllCategoriesQuery,
  useGetProductsQuery,
} from "../Features/productApiSlice";
import ProductCard from "../components/ProductCard";
import { Checkbox } from "../components/ui/checkbox";
import { useEffect } from "react";
import PaginationComponent from "../components/PaginationComponent";
import { BrandsComponent } from "../components/BrandsComponent";
import { CategoriesComponent } from "../components/CategoriesComponent";
import PriceSlider from "../components/PriceSlider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const AllProducts = () => {
  const { keyword, pageNumber } = useParams();
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const {
    data: allCategories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetAllCategoriesQuery();

  const {
    data: allBrands,
    isLoading: brandsLoading,
    error: brandsError,
  } = useGetAllBrandsQuery();

  useEffect(() => {
    if (products?.products?.length) {
      console.log(products?.pages);
      console.log(allCategories);
    }
  }, [products, allCategories]);
  return (
    <div className="flex w-full flex-col gap-8">
      <Container className="flex flex-col gap-8">
        <div className="bread-crumb mt-4">
          <Breadcrumbs />
        </div>
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background md:justify-between lg:justify-between">
            <h1 className="text-xl font-semibold">All Products</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1 text-sm"
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Price
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Ratings</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Recent Items
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Settings className="size-4" />
                  <span className="sr-only">Categories</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[80vh]">
                <DrawerHeader>
                  <DrawerTitle>Filters</DrawerTitle>
                  <DrawerDescription>
                    Filter the products based on categories and brands
                  </DrawerDescription>
                </DrawerHeader>
                <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                  <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">
                      Filters
                    </legend>
                    <div className="grid gap-3">
                      <Label htmlFor="Categories">Categories</Label>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="brands">Brands</Label>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="top-p">Start Price</Label>
                      <Input id="top-p" type="number" placeholder="0.7" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="top-k">End Price</Label>
                      <Input id="top-k" type="number" placeholder="0.0" />
                    </div>
                  </fieldset>
                </form>
              </DrawerContent>
            </Drawer>
          </header>
          <main className="grid flex-1 gap-4 overflow-auto py-4 md:grid-cols-5 lg:grid-cols-5">
            <div
              className="relative hidden flex-col items-start gap-8 md:flex md:col-span-1"
              x-chunk="dashboard-03-chunk-0"
            >
              <form className="grid w-full items-start gap-6">
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Categories
                  </legend>
                  {allCategories?.length && (
                    <CategoriesComponent allCategories={allCategories} />
                  )}
                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Brands
                  </legend>
                  {allBrands?.length && (
                    <BrandsComponent allBrands={allBrands} />
                  )}
                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Price
                  </legend>
                  <div className="grid gap-3">
                    <PriceSlider />
                  </div>
                </fieldset>
              </form>
            </div>
            <div className="relative grid grid-cols-4 grid-rows-4 gap-4 rounded-xl bg-muted/50 p-4 md:col-span-4">
              {products?.products?.map((product, index) => (
                <div className="p-1" key={index}>
                  <ProductCard
                    category={product?.category}
                    name={product?.name}
                    rating={product?.rating}
                    ratingCount={product?.numReviews}
                    price={product?.price}
                    productId={product?._id}
                    className="w-[170px]"
                    nameClass="text-[14px]"
                    ratingClass="h-3 w-3"
                  />
                </div>
              ))}
              <div className="col-span-4 mt-4 flex justify-center">
                <PaginationComponent
                  currentPage={products?.page}
                  totalPages={products?.pages}
                />
              </div>
            </div>
          </main>
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
      </Container>
    </div>
  );
};

export default AllProducts;

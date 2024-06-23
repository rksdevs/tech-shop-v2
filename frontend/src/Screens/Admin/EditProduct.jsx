import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react";

import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Textarea } from "../../components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";
import Container from "../../components/Container";
import placeHolderImg from "../../components/assets/images/placeholder.svg";
import { useDispatch } from "react-redux";
import {
  useGetAllBrandsQuery,
  useGetAllCategoriesQuery,
  useGetProductDetailsQuery,
} from "../../Features/productApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetAllOffersQuery } from "../../Features/offersApiSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

function EditProduct() {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading: productLoading,
    isError: productError,
  } = useGetProductDetailsQuery(productId);

  const {
    data: allCategories,
    isLoading: categoryLoading,
    error: categoryError,
  } = useGetAllCategoriesQuery();

  const {
    data: allBrands,
    isLoading: brandsLoading,
    error: brandsError,
  } = useGetAllBrandsQuery();

  const {
    data: allOffers,
    isLoading: offersLoading,
    error: offersError,
  } = useGetAllOffersQuery();

  useEffect(() => {
    console.log(product, "61");
  }, [product]);
  return (
    <div className="flex w-full gap-6">
      <Container className="flex flex-col gap-8 p-4">
        {productLoading ? (
          <>Loading..</>
        ) : productError ? (
          <>Error</>
        ) : (
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 text-left">
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => navigate(-1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  {product?.name.split(" ").length > 10
                    ? product?.name.split(" ").slice(0, 7).join(" ")
                    : product?.name}
                </h1>
                <Badge variant="outline" className="ml-auto sm:ml-0">
                  In stock
                </Badge>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button variant="outline" size="sm">
                    Discard
                  </Button>
                  <Button size="sm">Save Product</Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-0">
                    <CardHeader>
                      <CardTitle>Product Details</CardTitle>
                      <CardDescription>
                        Existing product information is pre-populated, update
                        them and click save product.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            type="text"
                            className="w-full"
                            defaultValue={
                              product?.name.split(" ").length > 10
                                ? product?.name.split(" ").slice(0, 7).join(" ")
                                : product?.name
                            }
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            defaultValue={product?.description}
                            className="min-h-24"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-1">
                    <CardHeader>
                      <CardTitle>Stock</CardTitle>
                      <CardDescription>
                        Product stock and unit price
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">SKU</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Price (₹)</TableHead>
                            <TableHead>Discount (%)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-semibold">
                              {product?.sku}
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="stock-1" className="sr-only">
                                Stock
                              </Label>
                              <Input
                                id="stock-1"
                                type="number"
                                defaultValue={product?.countInStock}
                              />
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="price-1" className="sr-only">
                                Price
                              </Label>
                              <Input
                                id="price-1"
                                type="number"
                                defaultValue={product?.price}
                              />
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="discount" className="sr-only">
                                Discount
                              </Label>
                              <Input
                                id="discount"
                                type="number"
                                defaultValue={product?.productDiscount}
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-2">
                    <CardHeader>
                      <CardTitle>Category & Brand</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 sm:grid-cols-3">
                        <div className="grid gap-3">
                          <Label htmlFor="category">Category</Label>
                          <Select>
                            <SelectTrigger
                              id="category"
                              aria-label="Select category"
                            >
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {allCategories?.map((category, index) => (
                                <SelectItem key={index} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="brand">Brand</Label>
                          <Select>
                            <SelectTrigger id="brand" aria-label="Change Brand">
                              <SelectValue placeholder="Change Brand" />
                            </SelectTrigger>
                            <SelectContent>
                              {allBrands?.map((brand, index) => (
                                <SelectItem key={index} value={brand}>
                                  {brand}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-3">
                    <CardHeader>
                      <CardTitle>Offers</CardTitle>
                      <CardDescription>
                        {product?.isOnOffer
                          ? "Current on below offer"
                          : "Not on offer, add offer below"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        {allOffers?.length ? (
                          <div className="grid gap-3">
                            <Label htmlFor="status">Availble Offers</Label>
                            <Select>
                              <SelectTrigger
                                id="status"
                                aria-label="Select status"
                              >
                                <SelectValue
                                  placeholder={
                                    product?.isOnOffer
                                      ? product?.offerName
                                      : "Select offer"
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {allOffers?.map((offer) => (
                                  <SelectItem key={offer?._id} value={offer}>
                                    <span className="font-semibold text-muted-foreground">
                                      {offer?.offerDiscount}% -{" "}
                                    </span>
                                    {offer?.offerName}
                                  </SelectItem>
                                ))}
                                {/* <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="published">
                                  Active
                                </SelectItem>
                                <SelectItem value="archived">
                                  Archived
                                </SelectItem> */}
                              </SelectContent>
                            </Select>
                          </div>
                        ) : (
                          <div className="grid gap-3">
                            <Input placeholder="No offers available" disabled />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  <Card
                    className="overflow-hidden"
                    x-chunk="dashboard-07-chunk-4"
                  >
                    <CardHeader>
                      <CardTitle>Product Image</CardTitle>
                      <CardDescription className="flex gap-6 items-end">
                        Update product image
                        <Upload className="h-5 w-5 hover:text-primary hover:cursor-pointer" />
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <img
                          src={placeHolderImg}
                          alt=""
                          className="aspect-square w-full rounded-md object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-5">
                    <CardHeader>
                      <CardTitle>Compatibility</CardTitle>
                      <CardDescription>
                        Update compatibility options below
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Edit Compatibility</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit compatibility</DialogTitle>
                            <DialogDescription>
                              Update the compatibility details of this product
                              here
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="socket" className="text-right">
                                Socket
                              </Label>
                              <Input
                                id="socket"
                                value=""
                                className="col-span-3"
                                onChange={() => console.log("socket")}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="power" className="text-right">
                                Power
                              </Label>
                              <Input
                                id="power"
                                value=""
                                className="col-span-3"
                                onChange={() => console.log("socket")}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="chipset" className="text-right">
                                Chipset
                              </Label>
                              <Input
                                id="chipset"
                                value=""
                                className="col-span-3"
                                onChange={() => console.log("socket")}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="formFactor"
                                className="text-right"
                              >
                                Form Factor
                              </Label>
                              <Input
                                id="formFactor"
                                value=""
                                className="col-span-3"
                                onChange={() => console.log("socket")}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="memorySlots"
                                className="text-right"
                              >
                                Memory Slots
                              </Label>
                              <Input
                                id="memorySlots"
                                value=""
                                className="col-span-3"
                                onChange={() => console.log("socket")}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="ramType" className="text-right">
                                Ram Type
                              </Label>
                              <Input
                                id="ramType"
                                value=""
                                className="col-span-3"
                                onChange={() => console.log("socket")}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="ramFormFactor"
                                className="text-right"
                              >
                                RAM form factor
                              </Label>
                              <Input
                                id="ramFormFactor"
                                value=""
                                className="col-span-3"
                                onChange={() => console.log("socket")}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Save changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm">
                  Discard
                </Button>
                <Button size="sm">Save Product</Button>
              </div>
            </div>
          </main>
        )}
      </Container>
    </div>
  );
}

export default EditProduct;

import {
  ChevronLeft,
  Delete,
  DeleteIcon,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Recycle,
  Search,
  Settings,
  ShoppingCart,
  Trash2,
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
  useUpdateProductMutation,
} from "../../Features/productApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { useToast } from "../../components/ui/use-toast";

function EditProduct() {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    data: product,
    isLoading: productLoading,
    isError: productError,
    refetch,
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

  const [
    updateProduct,
    { isLoading: updateProductLoading, error: updateProductError },
  ] = useUpdateProductMutation();

  const [openCompDialog, setOpenCompDialog] = useState(false);
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [image, setImage] = useState(product?.image || "");
  const [sku, setSku] = useState(product?.sku || "");
  const [category, setCategory] = useState(product?.category || "");
  const [brand, setBrand] = useState(product?.brand || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [countInStock, setCountInStock] = useState(product?.countInStock || 0);
  const [productDiscount, setProductDiscount] = useState(
    product?.productDiscount || 0
  );
  // const [isOnOffer, setIsOnOffer] = useState(product?.isOnOffer || false);
  // const [offerName, setOfferName] = useState(product?.offerName || "");
  const [socketType, setSocketType] = useState(
    product?.compatibilityDetails?.socketType || ""
  );
  const [powerConsumption, setPowerConsumption] = useState(
    product?.compatibilityDetails?.powerConsumption || ""
  );
  const [chipsetModel, setChipsetModel] = useState(
    product?.compatibilityDetails?.chipsetModel || ""
  );
  const [formFactor, setFormFactor] = useState(
    product?.compatibilityDetails?.formFactor || ""
  );
  const [memorySlots, setMemorySlots] = useState(
    product?.compatibilityDetails?.memorySlots || ""
  );
  const [ramType, setRamType] = useState(
    product?.compatibilityDetails?.ramType || ""
  );
  const [ramFormFactor, setRamFormFactor] = useState(
    product?.compatibilityDetails?.ramFormFactor || ""
  );

  const handleProductUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct({
        name,
        description,
        image,
        sku,
        category,
        brand,
        price,
        countInStock,
        productDiscount,
        socketType,
        powerConsumption,
        chipsetModel,
        formFactor,
        memorySlots,
        ramType,
        ramFormFactor,
        productId,
      }).unwrap();
      // console.log(res);
      toast({
        title: `Product Updated: ${res?.name}!`,
      });
      refetch();
    } catch (error) {
      console.log(error);
      toast({
        title: `Product Updated Failed!`,
        description: error,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (product?.name) {
      setName(product?.name);
      setDescription(product?.description);
      setImage(product?.image);
      setSku(product?.sku);
      setCategory(product?.category);
      setBrand(product?.brand);
      setPrice(product?.price);
      setCountInStock(product?.countInStock);
      setProductDiscount(product?.productDiscount);
      // setIsOnOffer(product?.isOnOffer);
      // setOfferName(product?.offerName || "");
      setSocketType(product?.compatibilityDetails?.socketType);
      setPowerConsumption(product?.compatibilityDetails?.powerConsumption);
      setChipsetModel(product?.compatibilityDetails?.chipsetModel);
      setFormFactor(product?.compatibilityDetails?.formFactor);
      setMemorySlots(product?.compatibilityDetails?.memorySlots);
      setRamType(product?.compatibilityDetails?.ramType);
      setRamFormFactor(product?.compatibilityDetails?.ramFormFactor || "NA");
    }
  }, [product]);

  // const handleRemoveOffer = () => {
  //   setIsOnOffer(false);
  //   setOfferName("");
  // };

  // useEffect(() => {
  //   if (!offerName) {
  //     setIsOnOffer(true);
  //   }
  // }, [offerName]);

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
                {/* {product?.countInStock && (
                  <Badge variant="outline" className="ml-auto sm:ml-0">
                    In stock
                  </Badge>
                )} */}
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button variant="outline" size="sm" className="pt-1">
                    Discard
                  </Button>
                  <Button
                    size="sm"
                    className="pt-1"
                    onClick={(e) => handleProductUpdate(e)}
                  >
                    Save Product
                  </Button>
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
                            placeholder={
                              product?.name.split(" ").length > 10
                                ? product?.name.split(" ").slice(0, 7).join(" ")
                                : product?.name
                            }
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            placeholder={product?.description}
                            className="min-h-24"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                            <TableHead className="pl-3">SKU</TableHead>
                            <TableHead className="pl-3">Stock</TableHead>
                            <TableHead className="pl-3">Price (₹)</TableHead>
                            <TableHead className="pl-3">Discount (%)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="">
                              <Label htmlFor="sku" className="sr-only">
                                SKU
                              </Label>
                              <Input
                                id="sku"
                                type="text"
                                placeholder={product?.sku}
                                value={sku}
                                onChange={(e) => setSku(e.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="stock-1" className="sr-only">
                                Stock
                              </Label>
                              <Input
                                id="stock-1"
                                type="number"
                                placeholder={product?.countInStock}
                                value={countInStock}
                                onChange={(e) =>
                                  setCountInStock(e.target.value)
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="price-1" className="sr-only">
                                Price
                              </Label>
                              <Input
                                id="price-1"
                                type="number"
                                placeholder={product?.price}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="discount" className="sr-only">
                                Discount
                              </Label>
                              <Input
                                id="discount"
                                type="number"
                                placeholder={product?.productDiscount}
                                value={productDiscount}
                                onChange={(e) =>
                                  setProductDiscount(e.target.value)
                                }
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
                          <Select
                            value={category}
                            onValueChange={(e) => setCategory(e)}
                          >
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
                          <Select
                            value={brand}
                            onValueChange={(e) => setBrand(e)}
                          >
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
                      <CardTitle className="flex items-center justify-between">
                        Offers{" "}
                        {/* <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Trash2
                                className={`${
                                  !isOnOffer ? "hidden" : ""
                                } hover:text-primary hover:cursor-pointer w-4 h-4`}
                                onClick={handleRemoveOffer}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Remove Offers</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider> */}
                      </CardTitle>
                      <CardDescription>
                        {product?.isOnOffer
                          ? "Current on below offer"
                          : "Not on offer"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        {product?.isOnOffer ? (
                          <div className="grid gap-3">
                            {/* <Input placeholder={product?.offerName} readOnly /> */}
                            <Input placeholder="Offername" readOnly />
                          </div>
                        ) : (
                          <div className="grid gap-3">
                            <Input placeholder="No offer applied" readOnly />
                          </div>
                        )}
                        {/* {allOffers?.length ? (
                          <div className="grid gap-3">
                            <Label htmlFor="status">Availble Offers</Label>
                            <Select
                              value={offerName}
                              onValueChange={(e) => setOfferName(e)}
                            >
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
                              </SelectContent>
                            </Select>
                          </div>
                        ) : (
                          <div className="grid gap-3">
                            <Input placeholder="No offers available" readOnly />
                          </div>
                        )} */}
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
                      <Dialog
                        open={openCompDialog}
                        onOpenChange={setOpenCompDialog}
                      >
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
                                className="col-span-3"
                                value={socketType}
                                onChange={(e) => setSocketType(e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="power" className="text-right">
                                Power
                              </Label>
                              <Input
                                id="power"
                                className="col-span-3"
                                value={powerConsumption}
                                onChange={(e) =>
                                  setPowerConsumption(e.target.value)
                                }
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="chipset" className="text-right">
                                Chipset
                              </Label>
                              <Input
                                id="chipset"
                                className="col-span-3"
                                value={chipsetModel}
                                onChange={(e) =>
                                  setChipsetModel(e.target.value)
                                }
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
                                className="col-span-3"
                                value={formFactor}
                                onChange={(e) => setFormFactor(e.target.value)}
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
                                className="col-span-3"
                                value={memorySlots}
                                onChange={(e) => setMemorySlots(e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="ramType" className="text-right">
                                Ram Type
                              </Label>
                              <Input
                                id="ramType"
                                className="col-span-3"
                                value={ramType}
                                onChange={(e) => setRamType(e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="ramFormFactor"
                                className="text-right"
                              >
                                RAM form factor
                              </Label>
                              <Select
                                value={ramFormFactor}
                                onValueChange={(e) => setRamFormFactor(e)}
                              >
                                <SelectTrigger
                                  id="ramFormFactor"
                                  aria-label="Select RAM form factor"
                                  className="col-span-3"
                                >
                                  <SelectValue placeholder="RAM form factor" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Desktop">
                                    Desktop
                                  </SelectItem>
                                  <SelectItem value="Laptop">Laptop</SelectItem>
                                  <SelectItem value="NA">
                                    Not Applicable
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              type="submit"
                              onClick={() => setOpenCompDialog(false)}
                            >
                              Save changes
                            </Button>
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

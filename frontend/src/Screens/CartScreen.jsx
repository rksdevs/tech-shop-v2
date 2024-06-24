import Container from "../components/Container";
import { Breadcrumbs } from "../components/Breadcrumbs";
import {
  Headset,
  ShieldCheck,
  Truck,
  IndianRupee,
  Trash2,
  Share2,
  CopyIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import ProductImg from "../components/assets/images/Designer.png";
import { useRef, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../components/ui/input";
import { removeFromCart } from "../Features/cartSlice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";

const CartScreen = () => {
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCopyLinkToClipboard = async (e, id) => {
    e.preventDefault();
    const baseUrl = window?.location?.href.split("/");
    baseUrl.pop();
    const text = `${baseUrl.join("/")}/product/${id}`;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Link Copied!",
        });
      })
      .catch((err) => {
        toast({
          title: "Something went wrong!",
          variant: "destructive",
        });
      });
  };
  return (
    <div className="flex w-full flex-col gap-8">
      <Container className="flex flex-col gap-4">
        <div className="bread-crumb mt-4">
          <Breadcrumbs />
        </div>
        <div className="flex flex-col gap-4">
          <div className="section-heading flex">
            <h1 className="text-[28px] font-extrabold">Your Cart</h1>
          </div>
          <div className="flex flex-col gap-2 min-h-[45vh]">
            <div className="cart-heading flex p-4 bg-muted rounded-lg gap-4 ">
              <div className="w-1/2 font-bold text-left">Product</div>
              <div className="flex flex-grow flex-1">
                <div className="w-full font-bold">Price</div>
                <div className="w-full font-bold">Quantity</div>
                <div className="w-full font-bold">Total</div>
                <div className="w-full font-bold">Actions</div>
              </div>
            </div>
            {cartItems.length ? (
              cartItems?.map((item) => (
                <div className="cart-content" key={item?._id}>
                  <Card className="flex">
                    <CardHeader className="flex w-1/2 flex-row text-left">
                      <div className="product-img">
                        <img
                          src={ProductImg}
                          alt="Product img"
                          className="w-[100px] h-[100px]"
                        />
                      </div>
                      <Link
                        className="product-name flex flex-col"
                        to={`/product/${item?._id}`}
                      >
                        <p className="px-8 font-bold text-muted-foreground">
                          {item?.category}
                        </p>
                        <h3 className="px-8 font-extrabold text-l">
                          {item?.name.split(" ").length > 10
                            ? `${item?.name
                                .split(" ")
                                .slice(0, 10)
                                .join(" ")}...`
                            : item?.name}{" "}
                        </h3>
                      </Link>
                    </CardHeader>
                    <CardContent className="flex flex-grow flex-1 justify-center items-center">
                      <div className="product-price w-full font-bold">
                        ₹ {item?.priceAfterDiscount}
                      </div>
                      <div className="product-qty w-full flex gap-2 justify-center items-center">
                        <Select>
                          <SelectTrigger className="w-[75px]">
                            <SelectValue
                              defaultValue={item?.qty}
                              placeholder={item?.qty}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: item?.countInStock }).map(
                              (_, index) => (
                                <SelectItem
                                  key={index}
                                  value={index + 1}
                                  className="w-[75px]"
                                >
                                  {index + 1}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="product-total w-full font-bold">
                        ₹ {item?.qty * item?.priceAfterDiscount}
                      </div>
                      <div className="product-actions w-full">
                        <div className="flex justify-center gap-4">
                          <Trash2
                            className="hover:cursor-pointer hover:text-primary"
                            onClick={() => dispatch(removeFromCart(item?._id))}
                          />
                          <Dialog>
                            <DialogTrigger asChild>
                              <Share2 className="hover:cursor-pointer hover:text-primary" />
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Share link</DialogTitle>
                                <DialogDescription>
                                  Anyone who has this link will be able to view
                                  this.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex items-center space-x-2">
                                <div className="grid flex-1 gap-2">
                                  <Label htmlFor="link" className="sr-only">
                                    Link
                                  </Label>
                                  <Input
                                    id="link"
                                    defaultValue={`http://${window.location?.host}/product/${item?._id}`}
                                    readOnly
                                  />
                                </div>
                                <Button
                                  type="submit"
                                  size="sm"
                                  className="px-3"
                                  onClick={(e) =>
                                    handleCopyLinkToClipboard(e, item?._id)
                                  }
                                >
                                  <span className="sr-only">Copy</span>
                                  <CopyIcon className="h-4 w-4" />
                                </Button>
                              </div>
                              <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                  <Button type="button" variant="secondary">
                                    Close
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : (
              <>No items in cart</>
            )}
            {/* <div className="cart-content">
              <Card className="flex">
                <CardHeader className="flex w-1/2 flex-row text-left">
                  <div className="product-img">
                    <img
                      src={ProductImg}
                      alt="Product img"
                      className="w-[250px]"
                    />
                  </div>
                  <div className="product-name flex flex-col">
                    <p className="px-8 font-bold text-muted-foreground">
                      Processor
                    </p>
                    <h3 className="px-8 font-extrabold text-l">
                      Amd Ryzen 3 3200G Processor With Radeon Rx Vega 8 Graphics
                      (YD3200C5FHBOX)
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-grow flex-1 justify-center items-center">
                  <div className="product-price w-full font-bold">₹ 30000</div>
                  <div className="product-qty w-full flex gap-2 justify-center items-center">
                    <Select>
                      <SelectTrigger className="w-[75px]">
                        <SelectValue defaultValue={1} placeholder="Qty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={1}>1</SelectItem>
                        <SelectItem value={2}>2</SelectItem>
                        <SelectItem value={3}>3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="product-total w-full font-bold">₹ 30000</div>
                  <div className="product-actions w-full">
                    <div className="flex justify-center gap-4">
                      <Trash2 />
                      <Share2 />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div> */}
          </div>
        </div>
        <div className="total-container flex items-center justify-between py-4 px-2 bg-muted rounded-lg">
          <div className="flex max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Enter coupon" />
            <Button type="submit">Apply Coupon</Button>
          </div>
          <div className="flex gap-2">
            <div className="text-l font-bold">Total</div>
            <div className="text-l font-bold text-primary">₹ {totalPrice}</div>
          </div>
          <div className="flex gap-1">
            <Button variant="outline" onClick={() => navigate("/allproducts")}>
              Continue Shopping
            </Button>
            <Button onClick={() => navigate("/checkout")}>
              Proceed to Buy
            </Button>
          </div>
        </div>

        <div className="about-service flex justify-between gap-8 hidden">
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
      </Container>
    </div>
  );
};

export default CartScreen;

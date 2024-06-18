import Container from "../components/Container";
import { Breadcrumbs } from "../components/Breadcrumbs";
import {
  Headset,
  ShieldCheck,
  Truck,
  IndianRupee,
  Trash2,
  Share2,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import ProductImg from "../components/assets/images/Designer.png";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useSelector } from "react-redux";
import { Input } from "../components/ui/input";

const CartScreen = () => {
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const [qty, setQty] = useState(0);
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
          <div className="flex flex-col gap-2">
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
                          className="w-[250px]"
                        />
                      </div>
                      <div className="product-name flex flex-col">
                        <p className="px-8 font-bold text-muted-foreground">
                          {item?.category}
                        </p>
                        <h3 className="px-8 font-extrabold text-l">
                          {item?.name}
                        </h3>
                      </div>
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
                          <Trash2 />
                          <Share2 />
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
            <Button variant="outline">Continue Shopping</Button>
            <Button>Proceed to Buy</Button>
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

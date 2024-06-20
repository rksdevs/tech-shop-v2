import Container from "../components/Container";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Truck,
  Copy,
  CircleUser,
  Home,
  LogOut,
  ScrollText,
  ShoppingCart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../components/ui/card";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../Features/cartSlice";
import { Separator } from "../components/ui/separator";

const PrebuiltPCScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [state, setState] = useState(shippingAddress?.state || "");
  const [phone, setPhone] = useState(shippingAddress?.phone || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShippingAddress = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ address, city, postalCode, country, phone, state })
    );
  };
  return (
    <div className="flex w-full flex-col gap-8">
      <Container className="flex flex-col gap-4">
        <div className="bread-crumb mt-4">
          <Breadcrumbs />
        </div>
        <div className="flex flex-col gap-4">
          <div className="section-heading flex justify-center">
            <h1 className="text-[28px] font-extrabold">Prebuilt PCs</h1>
          </div>
          <Separator />
          <div className="flex gap-2">
            <Card>
              <Card className="h-fit">
                <CardHeader className="items-center border-b">
                  <Avatar className="h-[150px] w-[150px] mb-4">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <CardTitle>Striker</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="flex flex-col gap-4">
                    <li className="flex gap-4">
                      {" "}
                      <span>
                        {" "}
                        <CircleUser />
                      </span>{" "}
                      <span>Account Details</span>
                    </li>
                    <li className="flex gap-4">
                      {" "}
                      <span>
                        {" "}
                        <Home />
                      </span>{" "}
                      <span>Addresses</span>
                    </li>
                    <li className="flex gap-4">
                      {" "}
                      <span>
                        {" "}
                        <ScrollText />
                      </span>{" "}
                      <span>Orders</span>
                    </li>
                    <li className="flex gap-4">
                      {" "}
                      <span>
                        {" "}
                        <ShoppingCart />
                      </span>{" "}
                      <span>Cart</span>
                    </li>
                    <li className="flex gap-4">
                      {" "}
                      <span>
                        {" "}
                        <LogOut />
                      </span>{" "}
                      <span>Logout</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </Card>
            <Card className="overflow-hidden w-1/3">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Cart Summary
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Copy className="h-3 w-3" />
                      <span className="sr-only">Copy Order ID</span>
                    </Button>
                  </CardTitle>
                  <CardDescription>Date: November 23, 2023</CardDescription>
                </div>
                <div className="hidden ml-auto flex items-center gap-1">
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                    <Truck className="h-3.5 w-3.5" />
                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                      Track Order
                    </span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Order Details</div>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Glimmer Lamps x <span>2</span>
                      </span>
                      <span>$250.00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Aqua Filters x <span>1</span>
                      </span>
                      <span>$49.00</span>
                    </li>
                  </ul>
                  <Separator className="my-2" />
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>$299.00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>$5.00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>$25.00</span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Total</span>
                      <span>$329.00</span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Customer Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Customer</dt>
                      <dd>Liam Johnson</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Email</dt>
                      <dd>
                        <a href="mailto:">liam@acme.com</a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  Created <time dateTime="2023-11-23">November 23, 2023</time>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PrebuiltPCScreen;

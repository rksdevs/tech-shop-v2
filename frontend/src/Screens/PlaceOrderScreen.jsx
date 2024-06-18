import Container from "../components/Container";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import {
  Headset,
  ShieldCheck,
  Truck,
  IndianRupee,
  Trash2,
  Share2,
  Copy,
  CreditCard,
  DollarSign,
  Users,
  Activity,
  ArrowUpRight,
  Clock,
  ArrowDownUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../components/ui/card";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible";

const PlaceOrderScreen = () => {
  // const { cartItems, totalPrice } = useSelector((state) => state.cart);
  // const [qty, setQty] = useState(0);
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
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShippingAddress = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ address, city, postalCode, country, phone, state })
    );
  };

  const orderData = {
    shippingAddress: {
      address: "304, 4th Main Road",
      city: "Bangalore",
      postalCode: "123456",
      phone: 1234566777,
      state: "Karnataka",
      country: "India",
    },
    _id: "667185f4642afe030fe97a8a",
    user: {
      _id: "659bd5899cab8a77cd636608",
      name: "John Smith",
      email: "john@gmail.com",
    },
    orderItems: [
      {
        name: "Amd Ryzen 3 3200G Processor With Radeon Rx Vega 8 Graphics (YD3200C5FHBOX)",
        qty: 1,
        image: "/images/sample.jpg",
        price: 6250,
        product: "6661c7a6f1321280a3808ce0",
        _id: "667185f4642afe030fe97a8b",
      },
    ],
    paymentMethod: "RazorPay",
    itemsPrice: 6250,
    taxPrice: 1125,
    shippingPrice: 0,
    totalPrice: 7375,
    isPaid: false,
    isDelivered: false,
    isShipped: false,
    createdAt: "2024-06-18T13:04:52.337Z",
    updatedAt: "2024-06-18T13:04:52.337Z",
    __v: 0,
  };
  return (
    <div className="flex w-full flex-col gap-8">
      <Container className="flex flex-col gap-4">
        <div className="bread-crumb mt-4">
          <Breadcrumbs />
        </div>
        <div className="flex flex-col">
          <div className="section-heading flex justify-center">
            <h1 className="text-[28px] font-extrabold">Place Order</h1>
          </div>
          <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
              <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-l font-bold">
                    Shipping Details
                  </CardTitle>
                  <Truck className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent className="text-left text-sm">
                  <Separator className="my-4" />
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Address</span>
                      <span>{shippingAddress?.address}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">City</span>
                      <span>{shippingAddress?.city}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">State</span>
                      <span>{shippingAddress?.state}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Postal Code</span>
                      <span>{shippingAddress?.postalCode}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Contact</span>
                      <span>{shippingAddress?.phone}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-l font-bold">
                    Order Status
                  </CardTitle>
                  <Clock className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent className="text-left text-sm">
                  <Separator className="my-4" />
                  <Collapsible
                    open={open}
                    onOpenChange={setOpen}
                    className="w-[350px] space-y-2"
                  >
                    <div className="flex items-center justify-between space-x-4">
                      <h4 className="text-sm font-semibold">
                        Check Order Status
                      </h4>
                      <CollapsibleTrigger asChild>
                        <Button size="sm">
                          <ArrowDownUp className="h-4 w-4" />
                          <span className="sr-only">Toggle</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <div className="rounded-md border px-4 py-1 font-mono text-sm bg-muted shadow-sm flex gap-4">
                      <span className="font-bold text-muted-foreground">
                        Payment:
                      </span>{" "}
                      <span className="pl-2">Pending</span>
                    </div>
                    <CollapsibleContent className="space-y-2">
                      <div className="rounded-md bg-muted border px-4 py-1 font-mono text-sm shadow-sm flex gap-4">
                        <span className="font-bold text-muted-foreground">
                          Shipping:
                        </span>{" "}
                        <span>Pending</span>
                      </div>
                      <div className="rounded-md bg-muted border px-4 py-1 font-mono text-sm shadow-sm flex gap-4">
                        <span className="font-bold text-muted-foreground">
                          Delivery:
                        </span>{" "}
                        <span>Pending</span>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
                <CardHeader className="flex flex-row items-center">
                  <div className="flex flex-col items-start gap-2 ">
                    <CardTitle>Order Items</CardTitle>
                    <CardDescription>All items from your order</CardDescription>
                  </div>
                  {/* <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="#">
                      View All
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button> */}
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Quantity</TableHead>
                        {/* <TableHead className="hidden xl:table-column">
                          Type
                        </TableHead>
                        <TableHead className="hidden xl:table-column">
                          Status
                        </TableHead>
                        <TableHead className="hidden xl:table-column">
                          Date
                        </TableHead> */}
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderData?.orderItems?.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell className="text-left">
                            <div className="font-medium">{item.name}</div>
                          </TableCell>
                          {/* <TableCell className="hidden xl:table-column">
                          Sale
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          <Badge className="text-xs" variant="outline">
                            Approved
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                          2023-06-23
                        </TableCell> */}
                          <TableCell>X {item?.qty}</TableCell>

                          <TableCell className="text-right">
                            ₹{item?.price}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-5">
                <CardHeader className="bg-muted rounded-t-lg">
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <ul className="grid gap-3 pt-4">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{orderData?.itemsPrice} </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>₹{orderData?.shippingPrice}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>₹{orderData?.taxPrice}</span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Total</span>
                      <span>₹{orderData?.totalPrice}</span>
                    </li>
                  </ul>
                  <Button>Pay Now</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PlaceOrderScreen;

import Container from "../components/Container";
import { Link, useParams } from "react-router-dom";
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
import { useEffect, useState } from "react";
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
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useInitiateRazorpayPaymentMutation,
  usePayOrderMutation,
  useShipOrderMutation,
} from "../Features/orderApiSlice";
import { useUpdateProductStockMutation } from "../Features/productApiSlice";
import { useToast } from "../components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

const PlaceOrderScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { id: orderId } = useParams();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [courierService, setCourierService] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [open, setOpen] = useState(false);

  const {
    data: orderData,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const [shipOrder, { isLoading: loadingShipping }] = useShipOrderMutation();

  const handleOrderDeliver = async (e) => {
    e.preventDefault();
    try {
      await deliverOrder(orderId);
      refetch();
      toast({
        title: "Marked order as Delivered",
      });
    } catch (error) {
      toast({
        title: "Failed to mark as delivered",
        description: error?.data?.message || error?.message,
        variant: "destructive",
      });
    }
  };

  const handleOrderShipped = async (e) => {
    e.preventDefault();
    try {
      await shipOrder({ orderId, courierService, trackingNumber });
      refetch();
      toast({
        title: "Marked order as Shipped",
      });
    } catch (error) {
      toast({
        title: "Failed to mark as shipped",
        description: error?.data?.message || error?.message,
        variant: "destructive",
      });
    }
  };

  const [
    initiatePayment,
    { isLoading: rzpPaymentLoading, error: rzpPaymentInitiateError },
  ] = useInitiateRazorpayPaymentMutation();

  const [confirmPayment] = usePayOrderMutation();

  //rzp script for instance window
  const loadScript = async (url) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const handleRzpPayment = async () => {
    try {
      if (process.env.REACT_APP_RAZORPAY_TEST_KEY) {
        const paymentData = await initiatePayment({
          amount: parseFloat(orderData.totalPrice).toFixed(2),
          currency: "INR",
          receipt: "test-receipt",
          notes: {
            user: userInfo.name,
            email: userInfo.email,
          },
        }).unwrap();
        console.log("payment data", paymentData);
        // After receiving payment data from the server, proceed with Razorpay payment initialization
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
          toast.error(
            "Razorpay SDK failed to load, please check your connection."
          );
          return;
        }
        const options = {
          key: process.env.REACT_APP_RAZORPAY_TEST_KEY,
          amount: paymentData.amount, // Amount in paise (100 paise = 1 INR)
          currency: paymentData.currency,
          name: "Computer Makers",
          description: "Test Payment", // URL of your logo
          order_id: paymentData.orderId, // Razorpay order ID
          handler: async (response) => {
            try {
              const paymentConfirmation = await confirmPayment({
                orderId,
                details: {
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
                },
              });
              toast({
                title: "Payment Confirmed",
              });
              refetch();
              console.log("Payment confirmation:", paymentConfirmation.data);
              // Handle payment confirmation success
            } catch (error) {
              console.error("Error confirming payment:", error);
              toast({
                title: "Error Confirming payment",
                description: error,
                variant: "destructive",
              });
            }
          },
          prefill: {
            name: "John Doe",
            email: "john.doe@example.com",
            contact: "+919876543210",
          },
          notes: {
            // Additional notes, if any
          },
          theme: {
            color: "#3399cc", // Theme color
          },
        };

        // Initialize Razorpay payment
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      toast.error("An error occurred while confirming your payment: ", error);
    }
  };

  // useEffect(() => {
  //   console.log(process.env.REACT_APP_RAZORPAY_TEST_KEY);
  //   console.log(process.env.REACT_APP_RAZORPAY_TEST_SECRET);
  // }, []);
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
              <Card
                x-chunk="dashboard-01-chunk-0"
                className="flex flex-col justify-between"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-muted/50">
                  <CardTitle className="text-l font-bold ">
                    Shipping Details
                  </CardTitle>
                  <Truck className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent className="text-left text-sm">
                  <ul className="grid gap-3 pt-6">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Address</span>
                      <span>{orderData?.shippingAddress?.address}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">City</span>
                      <span>{orderData?.shippingAddress?.city}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">State</span>
                      <span>{orderData?.shippingAddress?.state}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Postal Code</span>
                      <span>{orderData?.shippingAddress?.postalCode}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Contact</span>
                      <span>{orderData?.shippingAddress?.phone}</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex w-full flex-row items-center border-t bg-muted/50 px-6 py-3">
                  <div className="text-xs text-muted-foreground flex gap-8">
                    Created{" "}
                    <time dateTime="2023-11-23">
                      {orderData?.createdAt.substring(0, 10)}
                    </time>
                  </div>
                </CardFooter>
              </Card>
              <Card
                x-chunk="dashboard-01-chunk-1"
                className="relative flex flex-col justify-between"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-muted/50">
                  <CardTitle className="text-l font-bold ">
                    Order Status
                  </CardTitle>
                  <Clock className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent className="text-left text-sm">
                  <div className="flex flex-col gap-2 pt-6">
                    <div className="rounded-md border px-4 py-1 font-mono text-sm bg-muted shadow-sm flex gap-4">
                      <span className="font-bold text-muted-foreground">
                        Payment:
                      </span>{" "}
                      <span className="pl-2">
                        {orderData?.isPaid ? "Paid" : "Pending"}
                      </span>
                    </div>
                    <div className="rounded-md bg-muted border px-4 py-1 font-mono text-sm shadow-sm flex gap-4">
                      <span className="font-bold text-muted-foreground">
                        Shipping:
                      </span>{" "}
                      <span>
                        {orderData?.isShipped
                          ? `${orderData?.trackingDetails?.courierService} : ${orderData?.trackingDetails?.trackingNumber} `
                          : "Pending"}
                      </span>
                    </div>
                    <div className="rounded-md bg-muted border px-4 py-1 font-mono text-sm shadow-sm flex gap-4">
                      <span className="font-bold text-muted-foreground">
                        Delivery:
                      </span>{" "}
                      <span>
                        {orderData?.isDelivered
                          ? `Delivered on: ${orderData.deliveredAt.substring(
                              0,
                              10
                            )}`
                          : "Pending"}
                      </span>
                    </div>
                  </div>
                </CardContent>
                {userInfo && userInfo?.isAdmin && (
                  <CardFooter className="flex w-full flex-row items-center border-t bg-muted/50 px-6 py-3">
                    <div className="text-xs text-muted-foreground flex gap-8">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Mark as Shipped</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Shipping Details</DialogTitle>
                            <DialogDescription>
                              Update shipping details below
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="courierService"
                                className="text-right"
                              >
                                Courier
                              </Label>
                              <Input
                                id="courierService"
                                value={courierService}
                                className="col-span-3"
                                onChange={(e) =>
                                  setCourierService(e.target.value)
                                }
                                placeholder="Enter courier name"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="trackingNumber"
                                className="text-right"
                              >
                                Tracking No
                              </Label>
                              <Input
                                id="trackingNumber"
                                value={trackingNumber}
                                className="col-span-3"
                                onChange={(e) =>
                                  setTrackingNumber(e.target.value)
                                }
                                placeholder="Enter tracking no"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              type="submit"
                              onClick={(e) => handleOrderShipped(e)}
                            >
                              Shipped
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Mark as Delivered</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Mark as Delivered</DialogTitle>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              type="submit"
                              onClick={(e) => handleOrderDeliver(e)}
                            >
                              Delivered
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardFooter>
                )}
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
                  {!orderData?.isPaid && (
                    <Button onClick={handleRzpPayment}>Pay Now</Button>
                  )}
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

import {
  ChevronLeft,
  Copy,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Truck,
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
import { useGetOrderDetailsQuery } from "../../Features/orderApiSlice";
import { Separator } from "../../components/ui/separator";

function EditOrder() {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: order,
    isLoading: orderLoading,
    isError: orderError,
  } = useGetOrderDetailsQuery(orderId);

  useEffect(() => {
    console.log(order, "61");
  }, [order]);
  return (
    <div className="flex w-full gap-6">
      <Container className="flex flex-col gap-8 p-4">
        {orderLoading ? (
          <>Loading..</>
        ) : orderError ? (
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
                  {order?._id}
                </h1>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button variant="outline" size="sm">
                    Discard
                  </Button>
                  <Button size="sm">Save Order</Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-0">
                    <CardHeader>
                      <CardTitle>Billing Details</CardTitle>
                      <CardDescription>
                        Existing order information is pre-populated, update them
                        and click save order.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="grid gap-3 col-span-1">
                          <Label htmlFor="username">User</Label>
                          <Input
                            id="username"
                            type="text"
                            className="w-full"
                            defaultValue={order?.user?.name}
                            disabled
                          />
                        </div>
                        <div className="grid gap-3 col-span-1">
                          <Label htmlFor="email">User Email</Label>
                          <Input
                            id="email"
                            defaultValue={order?.user?.email}
                            disabled
                          />
                        </div>
                        <div className="grid gap-3 col-span-1">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            type="text"
                            className="w-full"
                            defaultValue={order?.shippingAddress?.address}
                          />
                        </div>
                        <div className="grid gap-3 col-span-1">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            defaultValue={order?.shippingAddress?.city}
                          />
                        </div>
                        <div className="grid gap-3 col-span-1">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            type="text"
                            className="w-full"
                            defaultValue={order?.shippingAddress?.state}
                          />
                        </div>
                        <div className="grid gap-3 col-span-1">
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            defaultValue={order?.shippingAddress?.country}
                          />
                        </div>
                        <div className="grid gap-3 col-span-1">
                          <Label htmlFor="postalCode">Zip Code</Label>
                          <Input
                            id="postalCode"
                            defaultValue={order?.shippingAddress?.postalCode}
                          />
                        </div>
                        <div className="grid gap-3 col-span-1">
                          <Label htmlFor="contact">Contact</Label>
                          <Input
                            id="contact"
                            defaultValue={order?.shippingAddress?.phone}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-1">
                    <CardHeader>
                      <CardTitle>Order Items</CardTitle>
                      <CardDescription>Items in this order</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price (₹)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {order?.orderItems?.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item?.name}</TableCell>
                              <TableCell>{item?.qty}</TableCell>
                              <TableCell>{item?.price}</TableCell>
                            </TableRow>
                          ))}
                          {/* <TableRow>
                            <TableCell className="font-semibold">
                              {product?.sku}
                            </TableCell>
                          </TableRow> */}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-2">
                    <CardHeader>
                      <CardTitle>Payment & Delivery</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 sm:grid-cols-3">
                        <div className="grid gap-3">
                          <Label htmlFor="category">Payment Status</Label>
                          {order?.isPaid ? (
                            <Button size="sm" className="pointer-events-none">
                              Paid
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="pb-0"
                            >
                              Mark as Paid
                            </Button>
                          )}
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="category">Shipping</Label>
                          {order?.isShipped ? (
                            <Button size="sm" className="pointer-events-none">
                              Shipped
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="pb-0"
                            >
                              Mark as Shipped
                            </Button>
                          )}
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="category">Delivery</Label>
                          {order?.isDelivered ? (
                            <Button size="sm" className="pointer-events-none">
                              Delivered
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="pb-0"
                            >
                              Mark as Delivered
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-3">
                    <CardHeader className="flex flex-row items-start bg-muted/50">
                      <div className="grid gap-0.5">
                        <CardTitle className="group flex items-center gap-2 text-lg">
                          Order Details
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <Copy className="h-3 w-3" />
                            <span className="sr-only">Copy Order ID</span>
                          </Button>
                        </CardTitle>
                        <CardDescription>
                          Date: {order?.createdAt.substring(0, 10)}
                        </CardDescription>
                      </div>
                      <div className="hidden ml-auto flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1"
                        >
                          <Truck className="h-3.5 w-3.5" />
                          <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                            Track Order
                          </span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 text-sm">
                      <div className="grid gap-3">
                        <div className="font-semibold">Order Items</div>
                        <ul className="grid gap-3">
                          {order?.orderItems?.map((item) => (
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground">
                                {item?.name.split(" ").length > 5
                                  ? item?.name.split(" ").slice(0, 5).join(" ")
                                  : item?.name}{" "}
                                x <span>{item?.qty}</span>
                              </span>
                              <span>₹{item?.price}</span>
                            </li>
                          ))}
                        </ul>
                        <Separator className="my-2" />
                        <ul className="grid gap-3">
                          <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                              Subtotal
                            </span>
                            <span>₹{order?.itemsPrice}</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                              Shipping
                            </span>
                            <span>₹{order?.shippingPrice}</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Tax</span>
                            <span>₹{order?.taxPrice}</span>
                          </li>
                          <li className="flex items-center justify-between font-semibold">
                            <span className="text-muted-foreground">Total</span>
                            <span>₹{order?.totalPrice}</span>
                          </li>
                        </ul>
                      </div>
                      <Separator className="my-4" />
                      <div className="grid gap-3">
                        <div className="font-semibold">
                          Shipping Information
                        </div>
                        <dl className="grid gap-3">
                          <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Address</dt>
                            <dd>{order?.shippingAddress?.address}</dd>
                          </div>
                          <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">City</dt>
                            <dd>{order?.shippingAddress?.city}</dd>
                          </div>
                          <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">State</dt>
                            <dd>{order?.shippingAddress?.state}</dd>
                          </div>
                          <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">
                              Postal Code
                            </dt>
                            <dd>{order?.shippingAddress?.postalCode}</dd>
                          </div>
                          <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Country</dt>
                            <dd>{order?.shippingAddress?.country}</dd>
                          </div>
                          <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Phone</dt>
                            <dd>{order?.shippingAddress?.phone}</dd>
                          </div>
                        </dl>
                      </div>
                      <Separator className="my-4" />
                      <div className="grid gap-3">
                        <div className="font-semibold">
                          Customer Information
                        </div>
                        <dl className="grid gap-3">
                          <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Customer</dt>
                            <dd>{order?.user?.name}</dd>
                          </div>
                          <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Email</dt>
                            <dd>
                              <a href="mailto:">{order?.user?.email}</a>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                      <div className="text-xs text-muted-foreground">
                        Created{" "}
                        <time dateTime="2023-11-23">November 23, 2023</time>
                      </div>
                    </CardFooter>
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

export default EditOrder;

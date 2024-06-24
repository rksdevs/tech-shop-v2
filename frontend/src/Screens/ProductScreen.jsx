import Container from "../components/Container";
import { useGetProductDetailsQuery } from "../Features/productApiSlice";
import ProductImg from "../components/assets/images/Designer.png";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Badge } from "../components/ui/badge";
import ProductCard from "../components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

import {
  Headset,
  ShieldCheck,
  Truck,
  IndianRupee,
  Star,
  ShoppingCart,
  Pencil,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useGetProductsQuery } from "../Features/productApiSlice";
import { addToCart } from "../Features/cartSlice";

const ProductScreen = () => {
  const reviews = [
    {
      id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      name: "Ava Taylor",
      email: "avataylor@example.com",
      subject: "Re: Meeting Agenda",
      text: "Here's the agenda for our meeting next week. I've included all the topics we need to cover, as well as time allocations for each.\n\nIf you have any additional items to discuss or any specific points to address, please let me know, and we can integrate them into the agenda.\n\nIt's essential that our meeting is productive and addresses all relevant matters.\n\nLooking forward to our meeting! Ava",
      date: "2022-10-10T10:45:00",
      read: true,
      labels: ["meeting", "work"],
      rating: 4,
    },
    {
      id: "c1a0ecb4-2540-49c5-86f8-21e5ce79e4e6",
      name: "William Anderson",
      email: "williamanderson@example.com",
      subject: "Product Launch Update",
      text: "The product launch is on track. I'll provide an update during our call. We've made substantial progress in the development and marketing of our new product.\n\nI'm excited to share the latest updates with you during our upcoming call. It's crucial that we coordinate our efforts to ensure a successful launch. Please come prepared with any questions or insights you may have.\n\nLet's make this product launch a resounding success!\n\nBest regards, William",
      date: "2022-09-20T12:00:00",
      read: false,
      labels: ["meeting", "work", "important"],
      rating: 4,
    },
    {
      id: "ba54eefd-4097-4949-99f2-2a9ae4d1a836",
      name: "Mia Harris",
      email: "miaharris@example.com",
      subject: "Re: Travel Itinerary",
      text: "I've received the travel itinerary. It looks great! Thank you for your prompt assistance in arranging the details. I've reviewed the schedule and the accommodations, and everything seems to be in order. I'm looking forward to the trip, and I'm confident it'll be a smooth and enjoyable experience.\n\nIf there are any specific activities or attractions you recommend at our destination, please feel free to share your suggestions.\n\nExcited for the trip! Mia",
      date: "2022-09-10T13:15:00",
      read: true,
      labels: ["personal", "travel"],
      rating: 4,
    },
    {
      id: "df09b6ed-28bd-4e0c-85a9-9320ec5179aa",
      name: "Ethan Clark",
      email: "ethanclark@example.com",
      subject: "Team Building Event",
      text: "Let's plan a team-building event for our department. Team cohesion and morale are vital to our success, and I believe a well-organized team-building event can be incredibly beneficial. I've done some research and have a few ideas for fun and engaging activities.\n\nPlease let me know your thoughts and availability. We want this event to be both enjoyable and productive.\n\nTogether, we'll strengthen our team and boost our performance.\n\nRegards, Ethan",
      date: "2022-08-25T15:30:00",
      read: false,
      labels: ["meeting", "work"],
      rating: 4,
    },
    {
      id: "d67c1842-7f8b-4b4b-9be1-1b3b1ab4611d",
      name: "Chloe Hall",
      email: "chloehall@example.com",
      subject: "Re: Budget Approval",
      text: "The budget has been approved. We can proceed with the project. I'm delighted to inform you that our budget proposal has received the green light from the finance department. This is a significant milestone, and it means we can move forward with the project as planned.\n\nI've attached the finalized budget for your reference. Let's ensure that we stay on track and deliver the project on time and within budget.\n\nIt's an exciting time for us! Chloe",
      date: "2022-08-10T16:45:00",
      read: true,
      labels: ["work", "budget"],
      rating: 4,
    },
    {
      id: "6c9a7f94-8329-4d70-95d3-51f68c186ae1",
      name: "Samuel Turner",
      email: "samuelturner@example.com",
      subject: "Weekend Hike",
      text: "Who's up for a weekend hike in the mountains? I've been craving some outdoor adventure, and a hike in the mountains sounds like the perfect escape. If you're up for the challenge, we can explore some scenic trails and enjoy the beauty of nature.\n\nI've done some research and have a few routes in mind.\n\nLet me know if you're interested, and we can plan the details.\n\nIt's sure to be a memorable experience! Samuel",
      date: "2022-07-28T17:30:00",
      read: false,
      labels: ["personal"],
      rating: 4,
    },
  ];
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const {
    data: product,
    isLoading: productLoading,
    error: productError,
    refetch,
  } = useGetProductDetailsQuery(productId);
  const { keyword, pageNumber } = useParams();
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  const { userInfo } = useSelector((state) => state.auth);
  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <Container className="flex flex-col gap-8">
        <div className="bread-crumb mt-4">
          <Breadcrumbs />
        </div>
        <div className="product-section flex gap-8 my-4">
          <div className="product-image-section flex flex-col gap-8 flex-1">
            <div className="product-image ">
              <img
                src={ProductImg}
                alt="product-img"
                className="w-[500px] h-auto"
              />
            </div>
            {userInfo && userInfo?.isAdmin && (
              <Badge
                className="absolute left-[40rem]"
                onClick={() =>
                  navigate(`/admin/allproducts/editProduct/${productId}`)
                }
              >
                <Pencil />
              </Badge>
            )}
            <div className="product-services flex justify-between">
              {/* <div className="flex items-start gap-4 text-left">
                <Headset className="hidden h-6 w-6 sm:flex" />
                <div className="grid gap-1">
                  <p className="text-xs font-medium leading-none">Reliable</p>
                  <p className="text-xs text-muted-foreground">
                    Reliable support on Hotline
                  </p>
                </div>
              </div> */}
              <div className="flex items-start gap-4 text-left">
                <ShieldCheck className="hidden h-6 w-6 sm:flex" />
                <div className="grid gap-1">
                  <p className="text-xs font-medium leading-none">Secure</p>
                  <p className="text-xs text-muted-foreground">
                    Certified marketplace since 2010
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-left">
                <Truck className="hidden h-6 w-6 sm:flex" />
                <div className="grid gap-1">
                  <p className="text-xs font-medium leading-none">Shipping</p>
                  <p className="text-xs text-muted-foreground">
                    Shipping all over India
                  </p>
                </div>
              </div>
              {/* <div className="flex items-start gap-4 text-left">
                <IndianRupee className="hidden h-8 w-8 sm:flex" />
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">Payment</p>
                  <p className="text-sm text-muted-foreground">
                    Safe and secure payments
                  </p>
                </div>
              </div> */}
            </div>
          </div>
          <div className="product-price-section flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center mt-2">
                <div className="flex items-center text-yellow-500">
                  {Array.from({ length: 5 }, (product, index) => (
                    <Star
                      key={index}
                      // className={`h-4 w-4 ${
                      //   index < product?.rating ? "fill-current" : ""
                      // }`}
                      className={`h-4 w-4 ${
                        index < product?.rating ? "fill-current" : ""
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500 ml-2">
                  ({product?.numReviews})
                </div>
              </div>
              <div className="flex items-center mt-2 font-bold text-l text-left pb-2 border-b">
                {product?.name}
              </div>
              <div className="flex items-center mt-2 font-extrabold text-left text-[2rem] pt-2 text-primary flex gap-4">
                ₹ {product?.price}{" "}
                <span className="font-semibold text-muted-foreground text-base line-through pt-4">
                  {" "}
                  ₹ 30000
                </span>
              </div>
              <div className="item-details flex gap-12 justify-start mt-4">
                <div className="flex flex-col gap-8 justify-between">
                  <div className="item-details-heading text-left font-semibold">
                    Brand
                  </div>
                  <div className="font-semibold item-details-heading text-left">
                    Category
                  </div>
                  <div className="font-semibold item-details-heading text-left">
                    Condition
                  </div>
                  <div className="font-semibold item-details-heading text-left">
                    Shipping
                  </div>
                </div>
                <div className="flex flex-col gap-8 justify-between">
                  <div className="item-details-content text-left">
                    {product?.brand}
                  </div>
                  <div className="item-details-content text-left">
                    {product?.category}
                  </div>
                  <div className="item-details-content text-left">
                    Brand New
                  </div>
                  <div className="item-details-content text-left">
                    Anywhere in India
                  </div>
                </div>
              </div>
            </div>
            <div className="cart-section flex gap-8 mt-4">
              <div className="count-section flex gap-4 justify-center items-center">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-3xl"
                  disabled={qty === 1}
                  onClick={() => setQty(qty - 1)}
                >
                  -
                </Button>
                {qty}
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setQty(qty + 1)}
                  className="rounded-3xl"
                >
                  +
                </Button>
              </div>
              <div className="buy-section flex gap-4 items-center">
                <Button>Buy Now</Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="p-2 border border-solid border-primary"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="text-primary" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="product-details-section flex">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specification">Specification</TabsTrigger>
              <TabsTrigger value="returns">Returns & Warranty</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent
              value="description"
              className="flex flex-col text-left"
            >
              <h3 className="font-bold text-xl my-4">Features & Overview</h3>
              <p className="font-bold text-xl my-2 text-muted-foreground">
                {product?.name}
              </p>
              <ul className="list-inside list-disc px-2 text-sm">
                <li className="my-1">
                  Powered by NVIDIA DLSS3, ultra-efficient Ada Lovelace arch,
                  and full ray tracing
                </li>
                <li className="my-1">
                  4th Generation Tensor Cores: Up to 4x performance with DLSS 3
                  vs. brute-force rendering
                </li>
                <li className="my-1">
                  3rd Generation RT Cores: Up to 2x ray tracing performance
                </li>
                <li className="my-1">
                  OC edition: Boost Clock 2535 MHz (OC Mode)/ 2505 MHz (Default
                  Mode)
                </li>
                <li className="my-1">
                  Axial-tech fan design features a smaller fan hub that
                  facilitates longer blades and a barrier ring that increases
                  downward air pressure.
                </li>
                <li className="my-1">
                  0dB technology lets you enjoy light gaming in relative
                  silence.
                </li>
                <li className="my-1">
                  Dual ball fan bearings can last up to twice as long as sleeve
                  bearing designs.
                </li>
                <li className="my-1">
                  A protective backplate secures components during
                  transportation and installation.
                </li>
                <li className="my-1">
                  Auto-Extreme Technology uses automation to enhance
                  reliability.
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="specification">
              <Table className="rounded-md border">
                <TableCaption>Specifications</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] text-left">
                      Specification
                    </TableHead>
                    <TableHead className="text-center">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-left">
                      MODEL
                    </TableCell>
                    <TableCell>DUAL-RTX4060-O8G-EVO</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-left">
                      CHIPSET
                    </TableCell>
                    <TableCell>NVIDIA GEFORCE</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-left">GPU</TableCell>
                    <TableCell>RTX 4060</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-left">
                      PCI EXPRESS
                    </TableCell>
                    <TableCell>4.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-left">
                      GPU BASE CLOCK
                    </TableCell>
                    <TableCell>1830 MHz</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-left">
                      GPU BOOST CLOCK
                    </TableCell>
                    <TableCell>
                      <ul>
                        <li>OC mode : 2535 MHz</li>{" "}
                        <li>Default mode : 2505 MHz (Boost)</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-left">
                      MEMORY CLOCK
                    </TableCell>
                    <TableCell>17 Gbps</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-left">
                      MEMORY SIZE
                    </TableCell>
                    <TableCell>8 GB</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-left">
                      MEMORY INTERFACE
                    </TableCell>
                    <TableCell>128 Bit</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-left">
                      MEMORY TYPE
                    </TableCell>
                    <TableCell>GDDR6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-left">
                      DIRECT X SUPPORT
                    </TableCell>
                    <TableCell>12 Ultimate</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-left">
                      OPEN GL
                    </TableCell>
                    <TableCell>4.6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-left">
                      PORTS
                    </TableCell>
                    <TableCell>
                      <ul>
                        <li>Yes x 1 (Native HDMI 2.1a)</li>{" "}
                        <li>Yes x 3 (Native DisplayPort 1.4a)</li>{" "}
                        <li>HDCP Support Yes (2.3)</li>
                      </ul>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-left">
                      RESOLUTION
                    </TableCell>
                    <TableCell>7680 x 4320</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-left">
                      GPU CORE (CUDA CORE)
                    </TableCell>
                    <TableCell>3072</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-left">
                      POWER CONNECTORS
                    </TableCell>
                    <TableCell>1 x 8-pin</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-left">
                      WARRANTY
                    </TableCell>
                    <TableCell>3 Years</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="returns">
              <Card className="text-left">
                <CardHeader>
                  <CardTitle>Warraty & Returns</CardTitle>
                  <CardDescription>
                    Below listed is the warranty and returns policy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Name</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-muted-foreground">
                          {product?.name}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Warranty</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground">
                          Standard 3 Years warranty. Physical damage is not
                          covered
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Returns</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground">
                          7 days return policy if the product seal is not broken
                          or product is not used.
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews">
              <Card className="text-left">
                <CardHeader>
                  <CardTitle>Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 mb-8">
                    <div className="grid gap-3">
                      <Label htmlFor="description">Add Review</Label>
                      <Textarea
                        id="description"
                        defaultValue="Your review here ..."
                        className="min-h-32"
                      />
                    </div>
                    <div>
                      <Button>Add Review</Button>
                    </div>
                  </div>
                  <div>
                    {reviews.map((item) => (
                      <button
                        key={item.id}
                        className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent my-1"
                      >
                        <div className="flex w-full flex-col gap-1">
                          <div className="flex items-center">
                            <div className="flex items-center gap-2">
                              <div className="font-semibold">{item.name}</div>
                              {!item.read && (
                                <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                              )}
                            </div>
                            <div className="ml-auto text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(item.date), {
                                addSuffix: true,
                              })}
                            </div>
                          </div>
                          <div className="text-xs font-medium">
                            <div className="flex items-center text-primary">
                              {Array.from({ length: 5 }, (_, index) => (
                                <Star
                                  key={index}
                                  className={`h-4 w-4 ${
                                    index < item?.rating ? "fill-current" : ""
                                  }`}
                                  // className={`h-4 w-4 ${
                                  //   index < 4 ? "fill-current" : ""
                                  // }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="line-clamp-2 text-xs text-muted-foreground">
                          {item.text.substring(0, 300)}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div className="related-products flex flex-col gap-8">
          <div className="flex w-full justify-between items-center">
            <div>
              <h3 className="text-[18px] font-[700]">Related Products</h3>
            </div>
            <div>
              <Button>View All</Button>
            </div>
          </div>
          <Carousel className="w-full">
            <CarouselContent className="-ml-1 h-[40vh] pt-5">
              {products?.products?.map((product, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/5"
                >
                  <div className="p-1">
                    <ProductCard
                      category={product?.category}
                      name={product?.name}
                      rating={product?.rating}
                      ratingCount={product?.numReviews}
                      price={product?.price}
                      productId={product?._id}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-[-15px]" />
            <CarouselNext className="right-[-15px]" />
          </Carousel>
        </div>
        <div className="same-brand flex flex-col gap-8">
          <div className="flex w-full justify-between items-center">
            <div>
              <h3 className="text-[18px] font-[700]">
                More Products From {product?.brand}
              </h3>
            </div>
            <div>
              <Button>View All</Button>
            </div>
          </div>
          <Carousel className="w-full">
            <CarouselContent className="-ml-1 h-[40vh] pt-5">
              {products?.products?.map((product, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/5"
                >
                  <div className="p-1">
                    <ProductCard
                      category={product?.category}
                      name={product?.name}
                      rating={product?.rating}
                      ratingCount={product?.numReviews}
                      price={product?.price}
                      productId={product?._id}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-[-15px]" />
            <CarouselNext className="right-[-15px]" />
          </Carousel>
        </div>
      </Container>
    </div>
  );
};

export default ProductScreen;

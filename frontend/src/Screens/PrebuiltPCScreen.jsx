import Container from "../components/Container";
import { Breadcrumbs } from "../components/Breadcrumbs";
import customPcImg from "../components/assets/images/pc-build-4.jpg";
import {
  Truck,
  Copy,
  Cpu,
  GalleryThumbnails,
  Gamepad2,
  Eye,
  IndianRupee,
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
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../Features/cartSlice";
import { Separator } from "../components/ui/separator";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

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
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="h-fit ">
              <CardHeader className="items-center border-b p-4">
                <img
                  src={customPcImg}
                  alt="custom pc"
                  className="w-[250px] h-[250px]"
                />
                <CardTitle>Striker</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div>
                  <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                    <Cpu />
                    <div className="space-y-1 text-left">
                      <p className="text-sm font-medium leading-none">
                        Platform
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Based on Intel Platform
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                    <GalleryThumbnails />
                    <div className="space-y-1 text-left">
                      <p className="text-sm font-medium leading-none">
                        Category
                      </p>
                      <p className="text-sm text-muted-foreground">Gaming</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                    <Gamepad2 />
                    <div className="space-y-1 text-left">
                      <p className="text-sm font-medium leading-none">
                        Recommended Uses
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Entry-mid level gaming
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                    <IndianRupee />
                    <div className="space-y-1 text-left">
                      <p className="text-sm font-medium leading-none">Budget</p>
                      <p className="text-sm text-muted-foreground">
                        Between ₹150000
                      </p>
                    </div>
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="flex gap-2 mt-4 w-full">
                      <span>Preview</span>
                      <Eye />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[450px]">
                    <Card className="overflow-hidden w-full">
                      <CardHeader className="flex flex-row items-start bg-muted/50 p-5">
                        <div className="grid gap-0.5">
                          <CardTitle className="group flex items-center gap-2 text-lg">
                            Specifications
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 text-sm">
                        <div className="grid gap-3">
                          <ul className="grid gap-3">
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Processor
                              </span>
                              <span>
                                Intel i9 13900K 4.5Ghz 9 Core 18 Threads
                              </span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Motherboard
                              </span>
                              <span>MSI Z650 Gaming Pro Motherboard</span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Graphics
                              </span>
                              <span>
                                Asus ROG Nvidia 4070 TI 12 GB Triple Fans
                              </span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">RAM</span>
                              <span>Gskill Ripjaws 16x2 DDR5 3600Ghz</span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Memory
                              </span>
                              <span>2x 1TB WD Black NVM.e</span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Cooler
                              </span>
                              <span>Nzxt Kraken 3x120mm Liquid Cooler</span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Power Supply
                              </span>
                              <span>Corsair 1000w Gold - Fully Modular</span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Cabinet
                              </span>
                              <span>Lian Li - Mid Tower</span>
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center border-t bg-muted/50 px-6 py-3">
                        <span className="text-xl font-bold text-primary">
                          ₹150000
                        </span>
                        <Button>Add to Cart</Button>
                      </CardFooter>
                    </Card>
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>
            <Card className="h-fit ">
              <CardHeader className="items-center border-b p-4">
                <img
                  src={customPcImg}
                  alt="custom pc"
                  className="w-[250px] h-[250px]"
                />
                <CardTitle>Striker</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div>
                  <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                    <Cpu />
                    <div className="space-y-1 text-left">
                      <p className="text-sm font-medium leading-none">
                        Platform
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Based on Intel Platform
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                    <GalleryThumbnails />
                    <div className="space-y-1 text-left">
                      <p className="text-sm font-medium leading-none">
                        Category
                      </p>
                      <p className="text-sm text-muted-foreground">Gaming</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                    <Gamepad2 />
                    <div className="space-y-1 text-left">
                      <p className="text-sm font-medium leading-none">
                        Recommended Uses
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Entry-mid level gaming
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                    <IndianRupee />
                    <div className="space-y-1 text-left">
                      <p className="text-sm font-medium leading-none">Budget</p>
                      <p className="text-sm text-muted-foreground">
                        Between ₹150000
                      </p>
                    </div>
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="flex gap-2 mt-4 w-full">
                      <span>Preview</span>
                      <Eye />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[450px]">
                    <Card className="overflow-hidden w-full">
                      <CardHeader className="flex flex-row items-start bg-muted/50 p-5">
                        <div className="grid gap-0.5">
                          <CardTitle className="group flex items-center gap-2 text-lg">
                            Specifications
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 text-sm">
                        <div className="grid gap-3">
                          <ul className="grid gap-3">
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Processor
                              </span>
                              <span>
                                Intel i9 13900K 4.5Ghz 9 Core 18 Threads
                              </span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Motherboard
                              </span>
                              <span>MSI Z650 Gaming Pro Motherboard</span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Graphics
                              </span>
                              <span>
                                Asus ROG Nvidia 4070 TI 12 GB Triple Fans
                              </span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">RAM</span>
                              <span>Gskill Ripjaws 16x2 DDR5 3600Ghz</span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Memory
                              </span>
                              <span>2x 1TB WD Black NVM.e</span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Cooler
                              </span>
                              <span>Nzxt Kraken 3x120mm Liquid Cooler</span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Power Supply
                              </span>
                              <span>Corsair 1000w Gold - Fully Modular</span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Cabinet
                              </span>
                              <span>Lian Li - Mid Tower</span>
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center border-t bg-muted/50 px-6 py-3">
                        <span className="text-xl font-bold text-primary">
                          ₹150000
                        </span>
                        <Button>Add to Cart</Button>
                      </CardFooter>
                    </Card>
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>
            <Card className="h-fit ">
              <CardHeader className="items-center border-b p-4">
                <img
                  src={customPcImg}
                  alt="custom pc"
                  className="w-[250px] h-[250px]"
                />
                <CardTitle>Striker</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div>
                  <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                    <Cpu />
                    <div className="space-y-1 text-left">
                      <p className="text-sm font-medium leading-none">
                        Platform
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Based on Intel Platform
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                    <GalleryThumbnails />
                    <div className="space-y-1 text-left">
                      <p className="text-sm font-medium leading-none">
                        Category
                      </p>
                      <p className="text-sm text-muted-foreground">Gaming</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                    <Gamepad2 />
                    <div className="space-y-1 text-left">
                      <p className="text-sm font-medium leading-none">
                        Recommended Uses
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Entry-mid level gaming
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                    <IndianRupee />
                    <div className="space-y-1 text-left">
                      <p className="text-sm font-medium leading-none">Budget</p>
                      <p className="text-sm text-muted-foreground">
                        Between ₹150000
                      </p>
                    </div>
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="flex gap-2 mt-4 w-full">
                      <span>Preview</span>
                      <Eye />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[450px]">
                    <Card className="overflow-hidden w-full">
                      <CardHeader className="flex flex-row items-start bg-muted/50 p-5">
                        <div className="grid gap-0.5">
                          <CardTitle className="group flex items-center gap-2 text-lg">
                            Specifications
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 text-sm">
                        <div className="grid gap-3">
                          <ul className="grid gap-3">
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Processor
                              </span>
                              <span>
                                Intel i9 13900K 4.5Ghz 9 Core 18 Threads
                              </span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Motherboard
                              </span>
                              <span>MSI Z650 Gaming Pro Motherboard</span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Graphics
                              </span>
                              <span>
                                Asus ROG Nvidia 4070 TI 12 GB Triple Fans
                              </span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">RAM</span>
                              <span>Gskill Ripjaws 16x2 DDR5 3600Ghz</span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Memory
                              </span>
                              <span>2x 1TB WD Black NVM.e</span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Cooler
                              </span>
                              <span>Nzxt Kraken 3x120mm Liquid Cooler</span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Power Supply
                              </span>
                              <span>Corsair 1000w Gold - Fully Modular</span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Cabinet
                              </span>
                              <span>Lian Li - Mid Tower</span>
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center border-t bg-muted/50 px-6 py-3">
                        <span className="text-xl font-bold text-primary">
                          ₹150000
                        </span>
                        <Button>Add to Cart</Button>
                      </CardFooter>
                    </Card>
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>
            <Card className="h-fit ">
              <CardHeader className="items-center border-b p-4">
                <img
                  src={customPcImg}
                  alt="custom pc"
                  className="w-[250px] h-[250px]"
                />
                <CardTitle>Striker</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div>
                  <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                    <Cpu />
                    <div className="space-y-1 text-left">
                      <p className="text-sm font-medium leading-none">
                        Platform
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Based on Intel Platform
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                    <GalleryThumbnails />
                    <div className="space-y-1 text-left">
                      <p className="text-sm font-medium leading-none">
                        Category
                      </p>
                      <p className="text-sm text-muted-foreground">Gaming</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                    <Gamepad2 />
                    <div className="space-y-1 text-left">
                      <p className="text-sm font-medium leading-none">
                        Recommended Uses
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Entry-mid level gaming
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                    <IndianRupee />
                    <div className="space-y-1 text-left">
                      <p className="text-sm font-medium leading-none">Budget</p>
                      <p className="text-sm text-muted-foreground">
                        Between ₹150000
                      </p>
                    </div>
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="flex gap-2 mt-4 w-full">
                      <span>Preview</span>
                      <Eye />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[450px]">
                    <Card className="overflow-hidden w-full">
                      <CardHeader className="flex flex-row items-start bg-muted/50 p-5">
                        <div className="grid gap-0.5">
                          <CardTitle className="group flex items-center gap-2 text-lg">
                            Specifications
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 text-sm">
                        <div className="grid gap-3">
                          <ul className="grid gap-3">
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Processor
                              </span>
                              <span>
                                Intel i9 13900K 4.5Ghz 9 Core 18 Threads
                              </span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Motherboard
                              </span>
                              <span>MSI Z650 Gaming Pro Motherboard</span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Graphics
                              </span>
                              <span>
                                Asus ROG Nvidia 4070 TI 12 GB Triple Fans
                              </span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">RAM</span>
                              <span>Gskill Ripjaws 16x2 DDR5 3600Ghz</span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Memory
                              </span>
                              <span>2x 1TB WD Black NVM.e</span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Cooler
                              </span>
                              <span>Nzxt Kraken 3x120mm Liquid Cooler</span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Power Supply
                              </span>
                              <span>Corsair 1000w Gold - Fully Modular</span>
                            </li>
                            <li className="flex items-center justify-between border p-1 rounded">
                              <span className="text-muted-foreground">
                                Cabinet
                              </span>
                              <span>Lian Li - Mid Tower</span>
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center border-t bg-muted/50 px-6 py-3">
                        <span className="text-xl font-bold text-primary">
                          ₹150000
                        </span>
                        <Button>Add to Cart</Button>
                      </CardFooter>
                    </Card>
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PrebuiltPCScreen;

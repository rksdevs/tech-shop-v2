import Container from "../components/Container";
import { Breadcrumbs } from "../components/Breadcrumbs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/card";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../Features/cartSlice";
import { Separator } from "../components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  Cpu,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../components/ui/tooltip";
import { Table, TableCell, TableRow } from "../components/ui/table";
import { Skeleton } from "../components/ui/skeleton";

const BuildCustomPCScreen = () => {
  const tableData = [
    { title: "Processor" },
    { title: "Motherboard" },
    { title: "Graphics" },
    { title: "Memory One" },
    { title: "Memory Two" },
    { title: "RAM" },
    { title: "Power Supply" },
    { title: "Cabinet" },
    { title: "Cpu Cooler" },
  ];
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
            <h1 className="text-[28px] font-extrabold">Customize Your PC</h1>
          </div>
          <Separator className="hidden" />
          <Card>
            <CardHeader className="bg-muted rounded-t-lg">
              <CardTitle>AI Powered Performance Calculator</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
                <div
                  className="relative hidden flex-col items-start gap-4 md:flex lg:col-span-2"
                  x-chunk="dashboard-03-chunk-0"
                >
                  <form className="grid w-full items-start gap-6">
                    <fieldset className="grid gap-4 rounded-lg border p-4 md:grid-cols-2">
                      <legend className="-ml-1 px-1 text-sm font-medium">
                        Configure
                      </legend>
                      <div className="flex flex-col gap-4">
                        <div className="grid gap-3">
                          <Label htmlFor="model">Platform</Label>
                          <Select>
                            <SelectTrigger
                              id="model"
                              className="items-start [&_[data-description]]:hidden"
                            >
                              <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="intel">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                  <Cpu className="size-5" />
                                  <div className="grid gap-0.5">
                                    <p>
                                      <span className="font-medium text-foreground">
                                        Intel
                                      </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                      Team Blue
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                              <SelectItem value="AMD">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                  <Cpu className="size-5" />
                                  <div className="grid gap-0.5">
                                    <p>
                                      <span className="font-medium text-foreground">
                                        AMD
                                      </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                      Team Red
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="model">Processor</Label>
                          <Select>
                            <SelectTrigger
                              id="model"
                              className="items-start [&_[data-description]]:hidden"
                            >
                              <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="intel">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                  <Cpu className="size-5" />
                                  <div className="grid gap-0.5">
                                    <p>
                                      <span className="font-medium text-foreground">
                                        Intel
                                      </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                      Team Blue
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                              <SelectItem value="AMD">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                  <Cpu className="size-5" />
                                  <div className="grid gap-0.5">
                                    <p>
                                      <span className="font-medium text-foreground">
                                        AMD
                                      </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                      Team Red
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="model">Motherboard</Label>
                          <Select>
                            <SelectTrigger
                              id="model"
                              className="items-start [&_[data-description]]:hidden"
                            >
                              <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="intel">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                  <Cpu className="size-5" />
                                  <div className="grid gap-0.5">
                                    <p>
                                      <span className="font-medium text-foreground">
                                        Intel
                                      </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                      Team Blue
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                              <SelectItem value="AMD">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                  <Cpu className="size-5" />
                                  <div className="grid gap-0.5">
                                    <p>
                                      <span className="font-medium text-foreground">
                                        AMD
                                      </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                      Team Red
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="model">Graphics</Label>
                          <Select>
                            <SelectTrigger
                              id="model"
                              className="items-start [&_[data-description]]:hidden"
                            >
                              <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="intel">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                  <Cpu className="size-5" />
                                  <div className="grid gap-0.5">
                                    <p>
                                      <span className="font-medium text-foreground">
                                        Intel
                                      </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                      Team Blue
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                              <SelectItem value="AMD">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                  <Cpu className="size-5" />
                                  <div className="grid gap-0.5">
                                    <p>
                                      <span className="font-medium text-foreground">
                                        AMD
                                      </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                      Team Red
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="model">Memory One</Label>
                          <Select>
                            <SelectTrigger
                              id="model"
                              className="items-start [&_[data-description]]:hidden"
                            >
                              <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="intel">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                  <Cpu className="size-5" />
                                  <div className="grid gap-0.5">
                                    <p>
                                      <span className="font-medium text-foreground">
                                        Intel
                                      </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                      Team Blue
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                              <SelectItem value="AMD">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                  <Cpu className="size-5" />
                                  <div className="grid gap-0.5">
                                    <p>
                                      <span className="font-medium text-foreground">
                                        AMD
                                      </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                      Team Red
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="grid gap-3">
                          <Label htmlFor="model">Power Supply</Label>
                          <Select>
                            <SelectTrigger
                              id="model"
                              className="items-start [&_[data-description]]:hidden"
                            >
                              <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="intel">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                  <Cpu className="size-5" />
                                  <div className="grid gap-0.5">
                                    <p>
                                      <span className="font-medium text-foreground">
                                        Intel
                                      </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                      Team Blue
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                              <SelectItem value="AMD">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                  <Cpu className="size-5" />
                                  <div className="grid gap-0.5">
                                    <p>
                                      <span className="font-medium text-foreground">
                                        AMD
                                      </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                      Team Red
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="model">CPU Cooler</Label>
                          <Select>
                            <SelectTrigger
                              id="model"
                              className="items-start [&_[data-description]]:hidden"
                            >
                              <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="intel">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                  <Cpu className="size-5" />
                                  <div className="grid gap-0.5">
                                    <p>
                                      <span className="font-medium text-foreground">
                                        Intel
                                      </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                      Team Blue
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                              <SelectItem value="AMD">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                  <Cpu className="size-5" />
                                  <div className="grid gap-0.5">
                                    <p>
                                      <span className="font-medium text-foreground">
                                        AMD
                                      </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                      Team Red
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="model">Cabinet</Label>
                          <Select>
                            <SelectTrigger
                              id="model"
                              className="items-start [&_[data-description]]:hidden"
                            >
                              <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="intel">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                  <Cpu className="size-5" />
                                  <div className="grid gap-0.5">
                                    <p>
                                      <span className="font-medium text-foreground">
                                        Intel
                                      </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                      Team Blue
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                              <SelectItem value="AMD">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                  <Cpu className="size-5" />
                                  <div className="grid gap-0.5">
                                    <p>
                                      <span className="font-medium text-foreground">
                                        AMD
                                      </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                      Team Red
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="model">RAM</Label>
                          <Select>
                            <SelectTrigger
                              id="model"
                              className="items-start [&_[data-description]]:hidden"
                            >
                              <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="intel">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                  <Cpu className="size-5" />
                                  <div className="grid gap-0.5">
                                    <p>
                                      <span className="font-medium text-foreground">
                                        Intel
                                      </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                      Team Blue
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                              <SelectItem value="AMD">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                  <Cpu className="size-5" />
                                  <div className="grid gap-0.5">
                                    <p>
                                      <span className="font-medium text-foreground">
                                        AMD
                                      </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                      Team Red
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="model">Memory Two</Label>
                          <Select>
                            <SelectTrigger
                              id="model"
                              className="items-start [&_[data-description]]:hidden"
                            >
                              <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="intel">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                  <Cpu className="size-5" />
                                  <div className="grid gap-0.5">
                                    <p>
                                      <span className="font-medium text-foreground">
                                        Intel
                                      </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                      Team Blue
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                              <SelectItem value="AMD">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                  <Cpu className="size-5" />
                                  <div className="grid gap-0.5">
                                    <p>
                                      <span className="font-medium text-foreground">
                                        AMD
                                      </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                      Team Red
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                  <div className="grid md:grid-cols-2 w-full gap-6">
                    <fieldset className="grid w-full rounded-lg border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium">
                        Settings
                      </legend>
                      <form className="flex flex-col gap-4">
                        <div className="grid gap-3">
                          <Label htmlFor="resolution">Resolution</Label>
                          <Select defaultValue="1080">
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1080">
                                1080 Pixels - 1K Resolution
                              </SelectItem>
                              <SelectItem value="1440">
                                1440 Pixels - 2K Resolution
                              </SelectItem>
                              <SelectItem value="2160">
                                2160 Pixels - 4K Resolution
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="settings">Display Settings</Label>
                          <Select defaultValue="high">
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ultra">
                                Ultra High Settings
                              </SelectItem>
                              <SelectItem value="high">
                                High Settings
                              </SelectItem>
                              <SelectItem value="medium">
                                Medium Settings
                              </SelectItem>
                              <SelectItem value="low">Low Settings</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="games">Enter Games</Label>
                          <Input
                            id="games"
                            placeholder='Enter games separated by "," or space'
                          />
                        </div>
                        <Button>Ask AI</Button>
                      </form>
                    </fieldset>
                    <fieldset className="grid w-full gap-6 rounded-lg border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium">
                        Estimated Performance
                      </legend>
                      <div className="flex flex-col space-y-3">
                        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[250px]" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[200px]" />
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>

                <Card className="overflow-hidden w-full">
                  <CardHeader className="flex flex-row items-start bg-muted/50 p-5">
                    <div className="grid gap-0.5">
                      <CardTitle className="group flex items-center gap-2 text-lg">
                        Specifications
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2 text-sm">
                    <div className="grid gap-3">
                      <div className="font-semibold">Order Details</div>
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            Processor
                          </span>
                          <span className="text-right text-[10px] font-bold">
                            MSI Z650 Gaming Pro Motherboard
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            Motherboard
                          </span>
                          <span className="text-right text-[10px] font-bold">
                            MSI Z650 Gaming Pro Motherboard
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            Graphics
                          </span>
                          <span className="text-right text-[10px] font-bold">
                            MSI Z650 Gaming Pro Motherboard
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            RAM
                          </span>
                          <span className="text-right text-[10px] font-bold">
                            MSI Z650 Gaming Pro Motherboard
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            Memory One
                          </span>
                          <span className="text-right text-[10px] font-bold">
                            MSI Z650 Gaming Pro Motherboard
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            Memory Two
                          </span>
                          <span className="text-right text-[10px] font-bold">
                            MSI Z650 Gaming Pro Motherboard
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            Cpu Cooler
                          </span>
                          <span className="text-right text-[10px] font-bold">
                            MSI Z650 Gaming Pro Motherboard
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            Cabinet
                          </span>
                          <span className="text-right text-[10px] font-bold">
                            MSI Z650 Gaming Pro Motherboard
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            Power Supply
                          </span>
                          <span className="text-right text-[10px] font-bold">
                            MSI Z650 Gaming Pro Motherboard
                          </span>
                        </li>
                      </ul>

                      <Separator className="mt-2" />
                      <div className="font-semibold">Performance</div>
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Power Consumption
                          </span>
                          <span>300 WH</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Power Consumption
                          </span>
                          <span>300 WH</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Warranty
                          </span>
                          <span>Standard</span>
                        </li>
                      </ul>
                      <Separator className="my-2" />
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Subtotal
                          </span>
                          <span>$299.00</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Shipping
                          </span>
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
                  </CardContent>
                  <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                    <Button className="w-full">Add to Cart</Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default BuildCustomPCScreen;

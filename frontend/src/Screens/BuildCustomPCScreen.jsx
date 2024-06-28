import Container from "../components/Container";
import { Breadcrumbs } from "../components/Breadcrumbs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, saveShippingAddress } from "../Features/cartSlice";
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
  Trash2,
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
import ProcessorTable from "../components/TableComponentsCustomPc/ProcessorTable";
import MotherboardTable from "../components/TableComponentsCustomPc/MotherboardTable";
import GraphicsCardTable from "../components/TableComponentsCustomPc/GraphicsCardTable";
import RAMTable from "../components/TableComponentsCustomPc/RAMTable";
import MemorySSDTable from "../components/TableComponentsCustomPc/MemorySSDTable";
import MemoryHDDTable from "../components/TableComponentsCustomPc/MemoryHDDTable";
import PowerSupplyTable from "../components/TableComponentsCustomPc/PowerSupplyTable";
import CPUCoolerTable from "../components/TableComponentsCustomPc/CPUCoolerTable";
import CabinetTable from "../components/TableComponentsCustomPc/CabinetTable";
import { SidebarNav } from "../components/SideNavbar";
import sampleImg from "../components/assets/images/psu-1.png";
import MonitorTable from "../components/TableComponentsCustomPc/MonitorTable";
import KeyboardTable from "../components/TableComponentsCustomPc/KeyboardTable";
import MouseTable from "../components/TableComponentsCustomPc/MouseTable";
import MousepadTable from "../components/TableComponentsCustomPc/MousepadTable";
import HeadsetTable from "../components/TableComponentsCustomPc/HeadsetTable";
import {
  clearAllBuild,
  deleteCurrentSelection,
} from "../Features/pcBuilderSlice";

const BuildCustomPCScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const {
    cpu,
    motherboard,
    coolingSystem,
    ram,
    ssd,
    hdd,
    gpu,
    psu,
    monitor,
    keyboard,
    mouse,
    mousepad,
    headphone,
    cabinet,
    totalBuildPrice,
  } = useSelector((state) => state.customPc);
  const customPcItems = useSelector((state) => state.customPc);
  const [section, setSection] = useState("Processor");
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShippingAddress = (e) => {
    e.preventDefault();
    // dispatch(
    //   saveShippingAddress({ address, city, postalCode, country, phone, state })
    // );
  };

  const handleAddAllToCart = () => {
    let customBuildItems = Object.values(customPcItems);
    customBuildItems.pop();
    customBuildItems.forEach((item) => {
      if (Object.keys(item).length > 0) {
        dispatch(addToCart(item));
      }
    });
    dispatch(clearAllBuild());
  };

  const sidebarNavItems = [
    {
      title: "Processor",
      section: "Processor",
    },
    {
      title: "Motherboard",
      section: "Motherboard",
    },
    {
      title: "Graphics Card",
      section: "Graphics Card",
    },
    {
      title: "RAM",
      section: "RAM",
    },
    {
      title: "Memory SSD",
      section: "Memory SSD",
    },
    {
      title: "Memory HDD",
      section: "Memory HDD",
    },
    {
      title: "Power Supply",
      section: "Power Supply",
    },
    {
      title: "CPU Cooler",
      section: "CPU Cooler",
    },
    {
      title: "Cabinet",
      section: "Cabinet",
    },
    {
      title: "Monitor",
      section: "Monitor",
    },
    {
      title: "Keyboard",
      section: "Keyboard",
    },
    {
      title: "Mouse",
      section: "Mouse",
    },
    {
      title: "Mousepad",
      section: "Mousepad",
    },
    {
      title: "Headset",
      section: "Headset",
    },
  ];

  const handleMerlinQuery = async (e) => {
    e.preventDefault();
    console.log("Hi I'm Merlin!");
  };

  const handleDeleteSelection = (item) => {
    dispatch(deleteCurrentSelection(item));
  };

  useEffect(() => {
    // console.log(section);
  }, [section]);

  return (
    <div className="flex w-full flex-col gap-8">
      <Container className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="section-heading flex justify-center mt-4">
            <h1 className="text-[28px] font-extrabold">Configure Your PC</h1>
          </div>
          <Separator className="hidden" />
          <Card>
            <CardHeader className="bg-muted rounded-t-lg">
              <CardTitle>Customize and build your own PC</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <>
                <div className="space-y-6 p-10 pb-16 md:block">
                  <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">
                      <SidebarNav
                        items={sidebarNavItems}
                        section={section}
                        setSection={setSection}
                      />
                    </aside>
                    <div className="flex-1 lg:max-w-2xl">
                      {section === "Processor" && <ProcessorTable />}
                      {section === "Motherboard" && <MotherboardTable />}
                      {section === "Graphics Card" && <GraphicsCardTable />}
                      {section === "RAM" && <RAMTable />}
                      {section === "Memory SSD" && <MemorySSDTable />}
                      {section === "Memory HDD" && <MemoryHDDTable />}
                      {section === "Power Supply" && <PowerSupplyTable />}
                      {section === "CPU Cooler" && <CPUCoolerTable />}
                      {section === "Cabinet" && <CabinetTable />}
                      {section === "Monitor" && <MonitorTable />}
                      {section === "Keyboard" && <KeyboardTable />}
                      {section === "Mouse" && <MouseTable />}
                      {section === "Mousepad" && <MousepadTable />}
                      {section === "Headset" && <HeadsetTable />}
                    </div>
                  </div>
                </div>
              </>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="bg-muted rounded-t-lg">
              <CardTitle>Details of Custom PC</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <fieldset className="flex flex-col gap-4 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Your Custom PC
                  </legend>
                  <CardContent className="p-4 pt-2 text-sm">
                    <div className="grid gap-3">
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            Processor
                          </span>
                          <span className="text-right text-xs font-semibold flex gap-2 items-center">
                            {cpu?.name
                              ? cpu?.name?.length > 40
                                ? `${cpu?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ")}...`
                                : cpu?.name
                              : "Not Selected"}
                            {cpu?.name && (
                              <span>
                                {" "}
                                <Trash2
                                  className="h-3 w-3 text-primary hover:cursor-pointer"
                                  onClick={() => handleDeleteSelection("cpu")}
                                />
                              </span>
                            )}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            Motherboard
                          </span>
                          <span className="text-right text-xs font-semibold flex gap-2 items-center">
                            {motherboard?.name
                              ? motherboard?.name?.length > 40
                                ? `${motherboard?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ")}...`
                                : motherboard?.name
                              : "Not Selected"}
                            {motherboard?.name && (
                              <span>
                                {" "}
                                <Trash2
                                  className="h-3 w-3 text-primary hover:cursor-pointer"
                                  onClick={() =>
                                    handleDeleteSelection("motherboard")
                                  }
                                />
                              </span>
                            )}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            Graphics
                          </span>
                          <span className="text-right text-xs font-semibold flex gap-2 items-center">
                            {gpu?.name
                              ? gpu?.name?.length > 40
                                ? `${gpu?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ")}...`
                                : gpu?.name
                              : "Not Selected"}
                            {gpu?.name && (
                              <span>
                                {" "}
                                <Trash2
                                  className="h-3 w-3 text-primary hover:cursor-pointer"
                                  onClick={() => handleDeleteSelection("gpu")}
                                />
                              </span>
                            )}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            RAM
                          </span>
                          <span className="text-right text-xs font-semibold flex gap-2 items-center">
                            {ram?.name
                              ? ram?.name?.length > 40
                                ? `${ram?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ")}...`
                                : ram?.name
                              : "Not Selected"}
                            {ram?.name && (
                              <span>
                                {" "}
                                <Trash2
                                  className="h-3 w-3 text-primary hover:cursor-pointer"
                                  onClick={() => handleDeleteSelection("ram")}
                                />
                              </span>
                            )}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            Memory SSD
                          </span>
                          <span className="text-right text-xs font-semibold flex gap-2 items-center">
                            {ssd?.name
                              ? ssd?.name?.length > 40
                                ? `${ssd?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ")}...`
                                : ssd?.name
                              : "Not Selected"}
                            {ssd?.name && (
                              <span>
                                {" "}
                                <Trash2
                                  className="h-3 w-3 text-primary hover:cursor-pointer"
                                  onClick={() => handleDeleteSelection("ssd")}
                                />
                              </span>
                            )}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            Memory HDD
                          </span>
                          <span className="text-right text-xs font-semibold flex gap-2 items-center">
                            {hdd?.name
                              ? hdd?.name?.length > 40
                                ? `${hdd?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ")}...`
                                : hdd?.name
                              : "Not Selected"}
                            {hdd?.name && (
                              <span>
                                {" "}
                                <Trash2
                                  className="h-3 w-3 text-primary hover:cursor-pointer"
                                  onClick={() => handleDeleteSelection("hdd")}
                                />
                              </span>
                            )}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            Cpu Cooler
                          </span>
                          <span className="text-right text-xs font-semibold flex gap-2 items-center">
                            {coolingSystem?.name
                              ? coolingSystem?.name?.length > 40
                                ? `${coolingSystem?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ")}...`
                                : coolingSystem?.name
                              : "Not Selected"}
                            {coolingSystem?.name && (
                              <span>
                                {" "}
                                <Trash2
                                  className="h-3 w-3 text-primary hover:cursor-pointer"
                                  onClick={() =>
                                    handleDeleteSelection("coolingSystem")
                                  }
                                />
                              </span>
                            )}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            Cabinet
                          </span>
                          <span className="text-right text-xs font-semibold flex gap-2 items-center">
                            {cabinet?.name
                              ? cabinet?.name?.length > 40
                                ? `${cabinet?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ")}...`
                                : cabinet?.name
                              : "Not Selected"}
                            {cabinet?.name && (
                              <span>
                                {" "}
                                <Trash2
                                  className="h-3 w-3 text-primary hover:cursor-pointer"
                                  onClick={() =>
                                    handleDeleteSelection("cabinet")
                                  }
                                />
                              </span>
                            )}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            Power Supply
                          </span>
                          <span className="text-right text-xs font-semibold flex gap-2 items-center">
                            {psu?.name
                              ? psu?.name?.length > 40
                                ? `${psu?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ")}...`
                                : psu?.name
                              : "Not Selected"}
                            {psu?.name && (
                              <span>
                                {" "}
                                <Trash2
                                  className="h-3 w-3 text-primary hover:cursor-pointer"
                                  onClick={() => handleDeleteSelection("psu")}
                                />
                              </span>
                            )}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            Monitor
                          </span>
                          <span className="text-right text-xs font-semibold flex gap-2 items-center">
                            {monitor?.name
                              ? monitor?.name?.length > 40
                                ? `${monitor?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ")}...`
                                : monitor?.name
                              : "Not Selected"}
                            {monitor?.name && (
                              <span>
                                {" "}
                                <Trash2
                                  className="h-3 w-3 text-primary hover:cursor-pointer"
                                  onClick={() =>
                                    handleDeleteSelection("monitor")
                                  }
                                />
                              </span>
                            )}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            Keyboard
                          </span>
                          <span className="text-right text-xs font-semibold flex gap-2 items-center">
                            {keyboard?.name
                              ? keyboard?.name?.length > 40
                                ? `${keyboard?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ")}...`
                                : keyboard?.name
                              : "Not Selected"}
                            {keyboard?.name && (
                              <span>
                                {" "}
                                <Trash2
                                  className="h-3 w-3 text-primary hover:cursor-pointer"
                                  onClick={() =>
                                    handleDeleteSelection("keyboard")
                                  }
                                />
                              </span>
                            )}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            Mouse
                          </span>
                          <span className="text-right text-xs font-semibold flex gap-2 items-center">
                            {mouse?.name
                              ? mouse?.name?.length > 40
                                ? `${mouse?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ")}...`
                                : mouse?.name
                              : "Not Selected"}
                            {mouse?.name && (
                              <span>
                                {" "}
                                <Trash2
                                  className="h-3 w-3 text-primary hover:cursor-pointer"
                                  onClick={() => handleDeleteSelection("mouse")}
                                />
                              </span>
                            )}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            Headphone
                          </span>
                          <span className="text-right text-xs font-semibold flex gap-2 items-center">
                            {headphone?.name
                              ? headphone?.name?.length > 40
                                ? `${headphone?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ")}...`
                                : headphone?.name
                              : "Not Selected"}
                            {headphone?.name && (
                              <span>
                                {" "}
                                <Trash2
                                  className="h-3 w-3 text-primary hover:cursor-pointer"
                                  onClick={() =>
                                    handleDeleteSelection("headphone")
                                  }
                                />
                              </span>
                            )}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground text-left">
                            Mousepad
                          </span>
                          <span className="text-right text-xs font-semibold flex gap-2 items-center">
                            {mousepad?.name
                              ? mousepad?.name?.length > 40
                                ? `${mousepad?.name
                                    ?.split(" ")
                                    .slice(0, 5)
                                    .join(" ")}...`
                                : mousepad?.name
                              : "Not Selected"}
                            {mousepad?.name && (
                              <span>
                                {" "}
                                <Trash2
                                  className="h-3 w-3 text-primary hover:cursor-pointer"
                                  onClick={() =>
                                    handleDeleteSelection("mousepad")
                                  }
                                />
                              </span>
                            )}
                          </span>
                        </li>
                      </ul>
                      <Separator className="mt-2" />
                      <ul className="grid gap-3">
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
                          <span>
                            ₹{" "}
                            {Number(
                              totalBuildPrice - totalBuildPrice * 0.18
                            ).toFixed(2)}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">Tax</span>
                          <span>
                            ₹ {Number(totalBuildPrice * 0.18).toFixed(2)}
                          </span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">Total</span>
                          <span>₹ {Number(totalBuildPrice).toFixed(2)}</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                  <div className="px-3">
                    <Button
                      className="w-full"
                      onClick={(e) => handleAddAllToCart()}
                    >
                      Add all to Cart
                    </Button>
                  </div>
                </fieldset>
              </div>
              <div className="col-span-1">
                <fieldset className="flex flex-col gap-4 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Ask Our AI
                  </legend>
                  <CardContent className="p-4 pb-2 pt-2 text-sm">
                    <div className="grid gap-3">
                      <form className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                          <Label
                            htmlFor="resolution"
                            className="w-1/4 text-left"
                          >
                            Resolution
                          </Label>
                          <Select defaultValue="1080" className="w-3/4">
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
                        <div className="flex items-center gap-3">
                          <Label htmlFor="settings" className="w-1/4 text-left">
                            Display Settings
                          </Label>
                          <Select defaultValue="high" className="w-3/4">
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
                        <div className="flex items-center gap-3">
                          <Label htmlFor="games" className="w-1/5 text-left">
                            Games
                          </Label>
                          <Input
                            id="games"
                            placeholder='Enter games separated by "," or space'
                            className="w-4/5"
                          />
                        </div>
                        {userInfo ? (
                          <Button
                            className="mt-2"
                            onClick={(e) => handleMerlinQuery(e)}
                          >
                            Ask Merlin
                          </Button>
                        ) : (
                          <Button
                            className="mt-2"
                            onClick={() => navigate("/login")}
                          >
                            Login To Access AI
                          </Button>
                        )}
                      </form>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3 hidden">
                    <Button className="w-full">Add to Cart</Button>
                  </CardFooter>
                </fieldset>
                <fieldset className="flex flex-col gap-4 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Merlin
                  </legend>
                  <CardContent className="p-4 pt-2 text-sm">
                    <div className="grid gap-3">
                      <div className="flex flex-col space-y-3">
                        <Skeleton className="h-[252px] w-[380px] rounded-xl" />
                        {/* <Skeleton className="h-[170px] w-[380px] rounded-xl" /> */}
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[380px]" />
                          <Skeleton className="h-4 w-[380px]" />
                          <Skeleton className="h-4 w-[380px]" />
                          <Skeleton className="h-4 w-[380px]" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[380px]" />
                          <Skeleton className="h-4 w-[380px]" />
                          <Skeleton className="h-4 w-[300px]" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </fieldset>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default BuildCustomPCScreen;

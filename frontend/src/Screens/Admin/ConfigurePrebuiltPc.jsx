import Container from "../../components/Container";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../../Features/cartSlice";
import { Separator } from "../../components/ui/separator";
import sampleImg from "../../components/assets/images/psu-1.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  Cpu,
  Eye,
  GalleryThumbnails,
  Gamepad2,
  IndianRupee,
  LifeBuoy,
  Mic,
  Paperclip,
  Plus,
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
import { Badge } from "../../components/ui/badge";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../../components/ui/tooltip";
import { Table, TableCell, TableRow } from "../../components/ui/table";
import { Skeleton } from "../../components/ui/skeleton";
import ProcessorTable from "../../components/TableComponentsCustomPc/ProcessorTable";
import { SidebarNav } from "../../components/SideNavbar";
import MotherboardTable from "../../components/TableComponentsCustomPc/MotherboardTable";
import GraphicsCardTable from "../../components/TableComponentsCustomPc/GraphicsCardTable";
import RAMTable from "../../components/TableComponentsCustomPc/RAMTable";
import MemorySSDTable from "../../components/TableComponentsCustomPc/MemorySSDTable";
import MemoryHDDTable from "../../components/TableComponentsCustomPc/MemoryHDDTable";
import PowerSupplyTable from "../../components/TableComponentsCustomPc/PowerSupplyTable";
import CPUCoolerTable from "../../components/TableComponentsCustomPc/CPUCoolerTable";
import CabinetTable from "../../components/TableComponentsCustomPc/CabinetTable";
import {
  deleteCurrentSelection,
  clearAllBuild,
} from "../../Features/pcConfigureSlice";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import customPcImg from "../../components/assets/images/pc-build-4.jpg";
import {
  useCreateNewPrebuiltPcMutation,
  useGetAllPrebuiltPcsQuery,
} from "../../Features/pcConfigureApiSlice";
import { useToast } from "../../components/ui/use-toast";
import AllPrebuiltPcTable from "../../components/TableComponentsCustomPc/AllPrebuiltPcTable";

const ConfigurePrebuiltPc = ({ children }) => {
  const cart = useSelector((state) => state.cart);
  const [pcName, setPcName] = useState("");
  const [pcCategory, setPcCategory] = useState("");
  const [platform, setPlatform] = useState("");
  const [pcUses, setPcUses] = useState("");
  const [pcImage, setPcImage] = useState("/images/sample.jpg");
  const [countInStock, setCountInStock] = useState(0);
  const [pcTotalPrice, setPcTotalPrice] = useState(0);
  const [pcComponents, setPcComponents] = useState(0);
  const location = useLocation();
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
  } = useSelector((state) => state.PcConfigure);
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
  ];

  const { toast } = useToast();
  const [
    createPrebuiltPC,
    { isLoading: createPCLoading, error: createPCError },
  ] = useCreateNewPrebuiltPcMutation();

  const {
    data: allPrebuiltPcs,
    isLoading: allPrebuiltPcsLoading,
    error: allPrebuiltPcsError,
  } = useGetAllPrebuiltPcsQuery();

  const handleMerlinQuery = async (e) => {
    e.preventDefault();
    console.log("Hi I'm Merlin!");
  };

  const handleDeleteSelection = (item) => {
    dispatch(deleteCurrentSelection(item));
  };

  const handleCreatePrebuiltPc = async (e) => {
    e.preventDefault();
    //setup the payload
    if (
      !pcCategory ||
      !pcName ||
      !pcImage ||
      !pcUses ||
      !totalBuildPrice ||
      !platform ||
      !cpu ||
      !motherboard ||
      !ram ||
      !ssd ||
      !cabinet ||
      !psu
    ) {
      toast({
        title: "Missing all details!",
        variant: "destructive",
      });
      return;
    } else {
      const payload = {
        pcCategory,
        pcName,
        platform,
        pcUses,
        pcImage,
        countInStock,
        pcTotalPrice: totalBuildPrice,
        pcComponents: {
          cpu,
          gpu,
          motherboard,
          ram,
          ssd,
          hdd,
          coolingSystem,
          psu,
          cabinet,
        },
      };
      try {
        const res = await createPrebuiltPC(payload).unwrap();
        dispatch(clearAllBuild());
        setPcName("");
        setPcCategory("");
        setPlatform("");
        setPcUses("");
        setCountInStock(0);
        setPcImage("/images/sample.jpg");
        toast({
          title: `Created prebuilt PC: ${res?.pcName}`,
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Failed to create prebuilt PC!",
          description: error?.message || error?.data?.message,
          variant: "destructive",
        });
      }
    }
  };

  useEffect(() => {
    // console.log(section);
  }, [section]);

  return (
    <div className="flex w-full flex-col gap-8">
      <Container className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="section-heading flex justify-center mt-4">
            <h1 className="text-[28px] font-extrabold">
              Configure Prebuilt PCs
            </h1>
          </div>
          <Tabs defaultValue="edit" className="w-full col-span-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit">Create Prebuilt PCs</TabsTrigger>
              <TabsTrigger value="apply">Edit Prebuilt PCs</TabsTrigger>
            </TabsList>
            <TabsContent value="edit" className="flex flex-col mt-0 pt-4 gap-4">
              <div className="space-y-6 p-10 pb-16 md:block border rounded-lg">
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                  <aside className="-mx-4 lg:w-1/5">
                    <SidebarNav
                      items={sidebarNavItems}
                      section={section}
                      setSection={setSection}
                    />
                  </aside>
                  <div className="flex-1 lg:max-w-2xl">
                    {/* {section === "Platform" && (
                        <Container className="flex flex-col gap-4">
                          <div className="section-heading flex justify-between items-center">
                            <h1 className="font-extrabold">Choose Platform</h1>
                            <div className="flex items-end gap-4">
                              <Input
                                placeholder="Search products by name"
                                // value={
                                //   allProductstable
                                //     .getColumn("name")
                                //     ?.getFilterValue() ?? ""
                                // }
                                // onChange={(event) =>
                                //   allProductstable
                                //     .getColumn("name")
                                //     ?.setFilterValue(event.target.value)
                                // }
                                className="max-w-sm"
                              />
                            </div>
                          </div>
                        </Container>
                      )} */}
                    {section === "Processor" && <ProcessorTable />}
                    {section === "Motherboard" && <MotherboardTable />}
                    {section === "Graphics Card" && <GraphicsCardTable />}
                    {section === "RAM" && <RAMTable />}
                    {section === "Memory SSD" && <MemorySSDTable />}
                    {section === "Memory HDD" && <MemoryHDDTable />}
                    {section === "Power Supply" && <PowerSupplyTable />}
                    {section === "CPU Cooler" && <CPUCoolerTable />}
                    {section === "Cabinet" && <CabinetTable />}
                  </div>
                </div>
              </div>
              <Card>
                <CardHeader className="bg-muted rounded-t-lg">
                  <CardTitle>Details of Custom PC</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <fieldset className="flex flex-col gap-4 rounded-lg border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium">
                        Prebuilt PC Configuration
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
                                      onClick={() =>
                                        handleDeleteSelection("cpu")
                                      }
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
                                      onClick={() =>
                                        handleDeleteSelection("gpu")
                                      }
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
                                      onClick={() =>
                                        handleDeleteSelection("ram")
                                      }
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
                                      onClick={() =>
                                        handleDeleteSelection("ssd")
                                      }
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
                                      onClick={() =>
                                        handleDeleteSelection("hdd")
                                      }
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
                                      onClick={() =>
                                        handleDeleteSelection("psu")
                                      }
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
                                      onClick={() =>
                                        handleDeleteSelection("mouse")
                                      }
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
                          <div className="flex items-center gap-3">
                            <Label
                              htmlFor="countInStock"
                              className="w-1/5 text-left"
                            >
                              Stock
                            </Label>
                            <Input
                              id="countInStock"
                              type="number"
                              className="w-4/5"
                              value={countInStock}
                              onChange={(e) => setCountInStock(e.target.value)}
                            />
                          </div>
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
                              <span className="text-muted-foreground">
                                Total
                              </span>
                              <span>
                                ₹ {Number(totalBuildPrice).toFixed(2)}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                      <div className="px-3">
                        <Button
                          className="w-full"
                          onClick={(e) => handleCreatePrebuiltPc(e)}
                        >
                          Create Prebuilt PC
                        </Button>
                      </div>
                    </fieldset>
                  </div>
                  <div className="col-span-1">
                    <fieldset className="flex flex-col gap-4 rounded-lg border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium">
                        Prebuilt PC Details
                      </legend>
                      <CardContent className="p-0 text-sm">
                        <div className="grid gap-3">
                          <form className="grid grid-cols-2 gap-2">
                            <div className="grid col-span-1 gap-1">
                              <div className="flex items-center gap-3">
                                <Label
                                  htmlFor="pcName"
                                  className="w-1/5 text-left text-xs"
                                >
                                  Name
                                </Label>
                                <Input
                                  id="pcName"
                                  placeholder="Enter name of this PC"
                                  className="w-4/5 text-xs"
                                  value={pcName}
                                  onChange={(e) => setPcName(e.target.value)}
                                />
                              </div>
                              <div className="flex items-center gap-3">
                                <Label
                                  htmlFor="platform"
                                  className="w-1/5 text-left text-xs"
                                >
                                  Platform
                                </Label>
                                <Input
                                  id="platform"
                                  placeholder="Enter platform name"
                                  className="w-4/5 text-xs"
                                  value={platform}
                                  onChange={(e) => setPlatform(e.target.value)}
                                />
                              </div>
                              <div className="flex items-center gap-3">
                                <Label
                                  htmlFor="pcCategory"
                                  className="w-1/5 text-left text-xs"
                                >
                                  Category
                                </Label>
                                <Input
                                  id="pcCategory"
                                  placeholder="Enter pc category"
                                  className="w-4/5 text-xs"
                                  value={pcCategory}
                                  onChange={(e) =>
                                    setPcCategory(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="grid col-span-1 gap-1">
                              <div className="flex items-center gap-3">
                                <Label
                                  htmlFor="pcUses"
                                  className="w-1/5 text-left text-xs"
                                >
                                  Uses
                                </Label>
                                <Input
                                  id="pcUses"
                                  placeholder="Recommended uses"
                                  className="w-4/5 text-xs"
                                  value={pcUses}
                                  onChange={(e) => setPcUses(e.target.value)}
                                />
                              </div>
                              <div className="flex items-center gap-3">
                                <Label
                                  htmlFor="totalPrice"
                                  className="w-1/5 text-left text-xs"
                                >
                                  Price
                                </Label>
                                <Input
                                  id="totalPrice"
                                  className="w-4/5 text-xs"
                                  value={totalBuildPrice}
                                  readOnly
                                  // onChange={(e) => setPcTotalPrice(e.target.value)}
                                />
                              </div>
                              <div className="flex items-center gap-3">
                                <Label
                                  htmlFor="pcImage"
                                  className="w-1/5 text-left text-xs"
                                >
                                  Image
                                </Label>
                                <Input
                                  id="pcImage"
                                  placeholder="Enter image link"
                                  className="w-4/5 text-xs"
                                  value={pcImage}
                                  onChange={(e) => setPcImage(e.target.value)}
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                      </CardContent>
                    </fieldset>
                    <fieldset className="flex flex-col gap-4 rounded-lg border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium">
                        Preview
                      </legend>
                      <Card className="h-fit ">
                        <CardHeader className="items-center border-b p-4">
                          <img
                            src={customPcImg}
                            alt="custom pc"
                            className="w-[200px] h-[200px]"
                          />
                          <CardTitle>{pcName || "Not Decided"}</CardTitle>
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
                                  {platform
                                    ? `Based on ${platform} Platform`
                                    : "Not decided"}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                              <GalleryThumbnails />
                              <div className="space-y-1 text-left">
                                <p className="text-sm font-medium leading-none">
                                  Category
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {pcCategory || "Not added"}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                              <Gamepad2 />
                              <div className="space-y-1 text-left">
                                <p className="text-sm font-medium leading-none">
                                  Recommended Uses
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {pcUses || "Not added"}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-4 items-start pb-4 last:mb-0 last:pb-0">
                              <IndianRupee />
                              <div className="space-y-1 text-left">
                                <p className="text-sm font-medium leading-none">
                                  Budget
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Between ₹ {totalBuildPrice || "Not added"}
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
                                          {cpu?.name
                                            ? cpu?.name?.length > 40
                                              ? `${cpu?.name
                                                  ?.split(" ")
                                                  .slice(0, 5)
                                                  .join(" ")}...`
                                              : cpu?.name
                                            : "Not Selected"}
                                        </span>
                                      </li>
                                      <li className="flex items-center justify-between border p-1 rounded">
                                        <span className="text-muted-foreground">
                                          Motherboard
                                        </span>
                                        <span>
                                          {motherboard?.name
                                            ? motherboard?.name?.length > 40
                                              ? `${motherboard?.name
                                                  ?.split(" ")
                                                  .slice(0, 5)
                                                  .join(" ")}...`
                                              : motherboard?.name
                                            : "Not Selected"}
                                        </span>
                                      </li>
                                      <li className="flex items-center justify-between border p-1 rounded">
                                        <span className="text-muted-foreground">
                                          Graphics
                                        </span>
                                        <span>
                                          {gpu?.name
                                            ? gpu?.name?.length > 40
                                              ? `${gpu?.name
                                                  ?.split(" ")
                                                  .slice(0, 5)
                                                  .join(" ")}...`
                                              : gpu?.name
                                            : "Not Selected"}
                                        </span>
                                      </li>
                                      <li className="flex items-center justify-between border p-1 rounded">
                                        <span className="text-muted-foreground">
                                          RAM
                                        </span>
                                        <span>
                                          {ram?.name
                                            ? ram?.name?.length > 40
                                              ? `${ram?.name
                                                  ?.split(" ")
                                                  .slice(0, 5)
                                                  .join(" ")}...`
                                              : ram?.name
                                            : "Not Selected"}
                                        </span>
                                      </li>
                                      <li className="flex items-center justify-between border p-1 rounded">
                                        <span className="text-muted-foreground">
                                          Memory SSD
                                        </span>
                                        <span>
                                          {ssd?.name
                                            ? ssd?.name?.length > 40
                                              ? `${ssd?.name
                                                  ?.split(" ")
                                                  .slice(0, 5)
                                                  .join(" ")}...`
                                              : ssd?.name
                                            : "Not Selected"}
                                        </span>
                                      </li>
                                      <li className="flex items-center justify-between border p-1 rounded">
                                        <span className="text-muted-foreground">
                                          Memory HDD
                                        </span>
                                        <span>
                                          {hdd?.name
                                            ? hdd?.name?.length > 40
                                              ? `${hdd?.name
                                                  ?.split(" ")
                                                  .slice(0, 5)
                                                  .join(" ")}...`
                                              : hdd?.name
                                            : "Not Selected"}
                                        </span>
                                      </li>
                                      <li className="flex items-center justify-between border p-1 rounded">
                                        <span className="text-muted-foreground">
                                          Cooler
                                        </span>
                                        <span>
                                          {coolingSystem?.name
                                            ? coolingSystem?.name?.length > 40
                                              ? `${coolingSystem?.name
                                                  ?.split(" ")
                                                  .slice(0, 5)
                                                  .join(" ")}...`
                                              : coolingSystem?.name
                                            : "Not Selected"}
                                        </span>
                                      </li>
                                      <li className="flex items-center justify-between border p-1 rounded">
                                        <span className="text-muted-foreground">
                                          Power Supply
                                        </span>
                                        <span>
                                          {psu?.name
                                            ? psu?.name?.length > 40
                                              ? `${psu?.name
                                                  ?.split(" ")
                                                  .slice(0, 5)
                                                  .join(" ")}...`
                                              : psu?.name
                                            : "Not Selected"}
                                        </span>
                                      </li>
                                      <li className="flex items-center justify-between border p-1 rounded">
                                        <span className="text-muted-foreground">
                                          Cabinet
                                        </span>
                                        <span>
                                          {cabinet?.name
                                            ? cabinet?.name?.length > 40
                                              ? `${cabinet?.name
                                                  ?.split(" ")
                                                  .slice(0, 5)
                                                  .join(" ")}...`
                                              : cabinet?.name
                                            : "Not Selected"}
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                </CardContent>
                                <CardFooter className="flex justify-between items-center border-t bg-muted/50 px-6 py-3">
                                  <span className="text-xl font-bold text-primary">
                                    ₹ {totalBuildPrice}
                                  </span>
                                  <Button variant="ghost" disabled>
                                    Add to Cart
                                  </Button>
                                </CardFooter>
                              </Card>
                            </PopoverContent>
                          </Popover>
                        </CardContent>
                      </Card>
                    </fieldset>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="apply" className="flex flex-col mt-0 gap-4">
              <AllPrebuiltPcTable />
            </TabsContent>
          </Tabs>
          <></>
          {/* </CardContent> */}
        </div>
      </Container>
    </div>
  );
};

export default ConfigurePrebuiltPc;

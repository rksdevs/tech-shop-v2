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
import { useNavigate } from "react-router-dom";
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

const ConfigurePrebuiltPc = ({ children }) => {
  const cart = useSelector((state) => state.cart);
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
                <div className="md:hidden">
                  <img
                    src={sampleImg}
                    width={1280}
                    height={791}
                    alt="Forms"
                    className="block dark:hidden"
                  />
                  <img
                    src={sampleImg}
                    width={1280}
                    height={791}
                    alt="Forms"
                    className="hidden dark:block"
                  />
                </div>
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
              </>
              <div className="grid hidden flex-1 gap-4 overflow-auto p-4 md:grid-cols-3 lg:grid-cols-3">
                <div
                  className="relative hidden flex items-start gap-4 md:flex lg:col-span-3"
                  x-chunk="dashboard-03-chunk-0"
                >
                  <fieldset className="flex flex-col gap-4 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">
                      Select
                    </legend>
                    <Button size="sm">Platform</Button>
                    <Button size="sm">Processor</Button>
                    <Button size="sm">Motherboard</Button>
                    <Button size="sm">Graphics Card</Button>
                    <Button size="sm">RAM</Button>
                    <Button size="sm">CPU Cooler</Button>
                    <Button size="sm">Power Supply</Button>
                    <Button size="sm">Cabinet</Button>
                    <Button size="sm">Memory One</Button>
                    <Button size="sm">Memory Two</Button>
                  </fieldset>
                  <fieldset className="flex flex-col gap-4 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">
                      Choose
                    </legend>
                    <ProcessorTable />
                  </fieldset>
                </div>

                <Card className="overflow-hidden w-full hidden">
                  <CardHeader className="flex flex-row items-start bg-muted/50 p-5">
                    <div className="grid gap-0.5">
                      <CardTitle className="group flex items-center gap-2 text-lg">
                        Specifications
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2 text-sm">
                    <div className="grid gap-3">
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
                      <Separator className="my-2" />
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Subtotal
                          </span>
                          <span>$299.00</span>
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
                          <span>$299.00</span>
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
                </fieldset>
              </div>
              <div className="col-span-1">
                <fieldset className="flex flex-col gap-4 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Ask Our AI
                  </legend>
                  <CardContent className="p-4 pt-2 text-sm">
                    <div className="grid gap-3">
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
                      <Separator className="my-2" />
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Subtotal
                          </span>
                          <span>$299.00</span>
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
                  <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3 hidden">
                    <Button className="w-full">Add to Cart</Button>
                  </CardFooter>
                </fieldset>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default ConfigurePrebuiltPc;

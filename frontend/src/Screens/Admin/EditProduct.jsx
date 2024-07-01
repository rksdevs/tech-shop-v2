import {
  ChevronLeft,
  Delete,
  DeleteIcon,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Recycle,
  Search,
  Settings,
  ShoppingCart,
  Trash2,
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
  useUpdateProductMutation,
  useUploadImageMutation,
} from "../../Features/productApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { useToast } from "../../components/ui/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import axios from "axios";

function EditProduct() {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    data: product,
    isLoading: productLoading,
    isError: productError,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const {
    data: allCategories,
    isLoading: categoryLoading,
    error: categoryError,
  } = useGetAllCategoriesQuery();

  const {
    data: allBrands,
    isLoading: brandsLoading,
    error: brandsError,
  } = useGetAllBrandsQuery();

  const {
    data: allOffers,
    isLoading: offersLoading,
    error: offersError,
  } = useGetAllOffersQuery();

  const [
    updateProduct,
    { isLoading: updateProductLoading, error: updateProductError },
  ] = useUpdateProductMutation();

  const [openCompDialog, setOpenCompDialog] = useState(false);
  const [openFeatDialog, setOpenFeatDialog] = useState(false);
  const [openSpecDialog, setOpenSpecDialog] = useState(false);

  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [image, setImage] = useState(product?.image || "");
  const [sku, setSku] = useState(product?.sku || "");
  const [category, setCategory] = useState(product?.category || "");
  const [brand, setBrand] = useState(product?.brand || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [countInStock, setCountInStock] = useState(product?.countInStock || 0);
  const [productDiscount, setProductDiscount] = useState(
    product?.productDiscount || 0
  );
  // const [isOnOffer, setIsOnOffer] = useState(product?.isOnOffer || false);
  // const [offerName, setOfferName] = useState(product?.offerName || "");
  const [socketType, setSocketType] = useState(
    product?.compatibilityDetails?.socketType || ""
  );
  const [powerConsumption, setPowerConsumption] = useState(
    product?.compatibilityDetails?.powerConsumption || ""
  );
  const [chipsetModel, setChipsetModel] = useState(
    product?.compatibilityDetails?.chipsetModel || ""
  );
  const [formFactor, setFormFactor] = useState(
    product?.compatibilityDetails?.formFactor || ""
  );
  const [memorySlots, setMemorySlots] = useState(
    product?.compatibilityDetails?.memorySlots || ""
  );
  const [ramType, setRamType] = useState(
    product?.compatibilityDetails?.ramType || ""
  );
  const [ramFormFactor, setRamFormFactor] = useState(
    product?.compatibilityDetails?.ramFormFactor || ""
  );

  const [featureDetails, setFeatureDetails] = useState([]);
  // const [specifications, setSpecifications] = useState({
  //   modelNumber: null,
  //   gpuChipset: null,
  //   gpuModel: null,
  //   pciExpress: null,
  //   gpuBaseClock: null,
  //   gpuBoostClock: [],
  //   gpuMemoryClock: null,
  //   gpuMemorySize: null,
  //   gpuMemoryInterface: null,
  //   gpuMemoryType: null,
  //   gpuDirectX: null,
  //   gpuOpenGl: null,
  //   gpuResolution: null,
  //   gpuPorts: [],
  //   gpuPowerConnectors: null,
  //   gpuCudaCores: null,
  //   wattage: null,
  //   networkCardInterfaces: null,
  //   cpuModel: null,
  //   cpuChipset: null,
  //   cpuCores: null,
  //   cpuThreads: null,
  //   cpuBaseFrequency: null,
  //   cpuMaxTurboFrequency: null,
  //   cpuCache: null,
  //   cpuBusSpeed: null,
  //   cpuTDP: null,
  //   cpuProcessorGraphics: null,
  //   cpuSupportSockets: null,
  //   moboCpu: null,
  //   moboChipset: null,
  //   moboMemory: null,
  //   moboGraphics: null,
  //   moboEthernet: null,
  //   moboAudio: null,
  //   moboExpansionSlots: [],
  //   moboStorage: [],
  //   moboUSB: [],
  //   moboBackPanelIO: [],
  //   moboInternalIO: [],
  //   moboBIOS: null,
  //   moboFormFactor: null,
  //   moboOS: null,
  //   RAMModel: null,
  //   RAMMemorySeries: null,
  //   RAMMemoryType: null,
  //   RAMCapacity: null,
  //   RAMKitType: null,
  //   RAMSpeed: null,
  //   coolerModelNumber: null,
  //   coolerWaterBlock: null,
  //   coolerFan: null,
  //   coolerRadiator: null,
  //   coolerPump: null,
  //   coolerSockets: null,
  //   coolerNoise: null,
  //   coolerDimensions: null,
  //   psuModelNumber: null,
  //   psuFormFactor: null,
  //   psuDimensions: null,
  //   psuInputRange: null,
  //   psuTotalOutput: null,
  //   psuConnectors: [],
  //   psuPackageContents: [],
  //   psuEfficiency: null,
  //   cabinetModelNumber: null,
  //   cabinetChassis: null,
  //   cabinetFormFactor: null,
  //   cabinetPreinstalledFans: null,
  //   cabinetDriveBays: null,
  //   cabinetFanSupport: [],
  //   cabinetLiquidCooling: [],
  //   cabinetIOPanel: null,
  //   memoryModelNumber: null,
  //   memoryFormFactor: null,
  //   memoryInterface: null,
  //   memoryCapacity: null,
  //   memorySpeed: null,
  //   memoryDimensions: null,
  // });

  const [specifications, setSpecifications] = useState({
    modelNumber: product?.specificationDetails?.modelNumber || null,
    gpuChipset: product?.specificationDetails?.gpuChipset || null,
    gpuModel: product?.specificationDetails?.gpuModel || null,
    pciExpress: product?.specificationDetails?.pciExpress || null,
    gpuBaseClock: product?.specificationDetails?.gpuBaseClock || null,
    gpuBoostClock: product?.specificationDetails?.gpuBoostClock || [],
    gpuMemoryClock: product?.specificationDetails?.gpuMemoryClock || null,
    gpuMemorySize: product?.specificationDetails?.gpuMemorySize || null,
    gpuMemoryInterface:
      product?.specificationDetails?.gpuMemoryInterface || null,
    gpuMemoryType: product?.specificationDetails?.gpuMemoryType || null,
    gpuDirectX: product?.specificationDetails?.gpuDirectX || null,
    gpuOpenGl: product?.specificationDetails?.gpuOpenGl || null,
    gpuResolution: product?.specificationDetails?.gpuResolution || null,
    gpuPorts: product?.specificationDetails?.gpuPorts || [],
    gpuPowerConnectors:
      product?.specificationDetails?.gpuPowerConnectors || null,
    gpuCudaCores: product?.specificationDetails?.gpuCudaCores || null,
    wattage: product?.specificationDetails?.wattage || null,
    networkCardInterfaces:
      product?.specificationDetails?.networkCardInterfaces || null,
    cpuModel: product?.specificationDetails?.cpuModel || null,
    cpuChipset: product?.specificationDetails?.cpuChipset || null,
    cpuCores: product?.specificationDetails?.cpuCores || null,
    cpuThreads: product?.specificationDetails?.cpuThreads || null,
    cpuBaseFrequency: product?.specificationDetails?.cpuBaseFrequency || null,
    cpuMaxTurboFrequency:
      product?.specificationDetails?.cpuMaxTurboFrequency || null,
    cpuCache: product?.specificationDetails?.cpuCache || null,
    cpuBusSpeed: product?.specificationDetails?.cpuBusSpeed || null,
    cpuTDP: product?.specificationDetails?.cpuTDP || null,
    cpuProcessorGraphics:
      product?.specificationDetails?.cpuProcessorGraphics || null,
    cpuSupportSockets: product?.specificationDetails?.cpuSupportSockets || null,
    moboCpu: product?.specificationDetails?.moboCpu || null,
    moboChipset: product?.specificationDetails?.moboChipset || null,
    moboMemory: product?.specificationDetails?.moboMemory || null,
    moboGraphics: product?.specificationDetails?.moboGraphics || null,
    moboEthernet: product?.specificationDetails?.moboEthernet || null,
    moboAudio: product?.specificationDetails?.moboAudio || null,
    moboExpansionSlots: product?.specificationDetails?.moboExpansionSlots || [],
    moboStorage: product?.specificationDetails?.moboStorage || [],
    moboUSB: product?.specificationDetails?.moboUSB || [],
    moboBackPanelIO: product?.specificationDetails?.moboBackPanelIO || [],
    moboInternalIO: product?.specificationDetails?.moboInternalIO || [],
    moboBIOS: product?.specificationDetails?.moboBIOS || null,
    moboFormFactor: product?.specificationDetails?.moboFormFactor || null,
    moboOS: product?.specificationDetails?.moboOS || null,
    RAMModel: product?.specificationDetails?.RAMModel || null,
    RAMMemorySeries: product?.specificationDetails?.RAMMemorySeries || null,
    RAMMemoryType: product?.specificationDetails?.RAMMemoryType || null,
    RAMCapacity: product?.specificationDetails?.RAMCapacity || null,
    RAMKitType: product?.specificationDetails?.RAMKitType || null,
    RAMSpeed: product?.specificationDetails?.RAMSpeed || null,
    coolerModelNumber: product?.specificationDetails?.coolerModelNumber || null,
    coolerWaterBlock: product?.specificationDetails?.coolerWaterBlock || null,
    coolerFan: product?.specificationDetails?.coolerFan || null,
    coolerRadiator: product?.specificationDetails?.coolerRadiator || null,
    coolerPump: product?.specificationDetails?.coolerPump || null,
    coolerSockets: product?.specificationDetails?.coolerSockets || null,
    coolerNoise: product?.specificationDetails?.coolerNoise || null,
    coolerDimensions: product?.specificationDetails?.coolerDimensions || null,
    psuModelNumber: product?.specificationDetails?.psuModelNumber || null,
    psuFormFactor: product?.specificationDetails?.psuFormFactor || null,
    psuDimensions: product?.specificationDetails?.psuDimensions || null,
    psuInputRange: product?.specificationDetails?.psuInputRange || null,
    psuTotalOutput: product?.specificationDetails?.psuTotalOutput || null,
    psuConnectors: product?.specificationDetails?.psuConnectors || [],
    psuPackageContents: product?.specificationDetails?.psuPackageContents || [],
    psuEfficiency: product?.specificationDetails?.psuEfficiency || null,
    cabinetModelNumber:
      product?.specificationDetails?.cabinetModelNumber || null,
    cabinetChassis: product?.specificationDetails?.cabinetChassis || null,
    cabinetFormFactor: product?.specificationDetails?.cabinetFormFactor || null,
    cabinetPreinstalledFans:
      product?.specificationDetails?.cabinetPreinstalledFans || null,
    cabinetDriveBays: product?.specificationDetails?.cabinetDriveBays || null,
    cabinetFanSupport: product?.specificationDetails?.cabinetFanSupport || [],
    cabinetLiquidCooling:
      product?.specificationDetails?.cabinetLiquidCooling || [],
    cabinetIOPanel: product?.specificationDetails?.cabinetIOPanel || null,
    memoryModelNumber: product?.specificationDetails?.memoryModelNumber || null,
    memoryFormFactor: product?.specificationDetails?.memoryFormFactor || null,
    memoryInterface: product?.specificationDetails?.memoryInterface || null,
    memoryCapacity: product?.specificationDetails?.memoryCapacity || null,
    memorySpeed: product?.specificationDetails?.memorySpeed || null,
    memoryDimensions: product?.specificationDetails?.memoryDimensions || null,
  });

  const arrayFields = [
    "gpuBoostClock",
    "gpuPorts",
    "moboExpansionSlots",
    "moboStorage",
    "moboUSB",
    "moboBackPanelIO",
    "moboInternalIO",
    "psuConnectors",
    "psuPackageContents",
    "cabinetFanSupport",
    "cabinetLiquidCooling",
  ];

  const [featureOne, setFeatureOne] = useState(
    product?.featureDetails?.featureOne || ""
  );
  const [featureTwo, setFeatureTwo] = useState(
    product?.featureDetails?.featureTwo || ""
  );
  const [featureThree, setFeatureThree] = useState(
    product?.featureDetails?.featureThree || ""
  );
  const [featureFour, setFeatureFour] = useState(
    product?.featureDetails?.featureFour || ""
  );
  const [featureFive, setFeatureFive] = useState(
    product?.featureDetails?.featureFive || ""
  );
  const [featureSix, setFeatureSix] = useState(
    product?.featureDetails?.featureSix || ""
  );
  const [featureSeven, setFeatureSeven] = useState(
    product?.featureDetails?.featureSeven || ""
  );
  const [featureEight, setFeatureEight] = useState(
    product?.featureDetails?.featureEight || ""
  );
  const [featureNine, setFeatureNine] = useState(
    product?.featureDetails?.featureNine || ""
  );
  const [featureTen, setFeatureTen] = useState(
    product?.featureDetails?.featureTen || ""
  );

  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const [uploadImageFunc, { isLoading: uploadLoading, error: uploadError }] =
    useUploadImageMutation();

  const handleFileChange = (event) => {
    setSelectedImageFile(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedImageFile) return;

    const formData = new FormData();
    formData.append("image", selectedImageFile);

    try {
      const res = await uploadImageFunc(formData).unwrap();
      setImage(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct({
        name,
        description,
        image,
        sku,
        category,
        brand,
        price,
        countInStock,
        productDiscount,
        socketType,
        powerConsumption,
        chipsetModel,
        formFactor,
        memorySlots,
        ramType,
        ramFormFactor,
        productId,
        warrantyDetails,
        featureDetails: {
          featureOne,
          featureEight,
          featureFive,
          featureFour,
          featureNine,
          featureSeven,
          featureSix,
          featureTen,
          featureThree,
          featureTwo,
        },
        specificationDetails: specifications,
      }).unwrap();
      // console.log(res);
      toast({
        title: `Product Updated: ${res?.name}!`,
      });
      refetch();
    } catch (error) {
      console.log(error);
      toast({
        title: `Product Updated Failed!`,
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  // const getImageSignedUrl = async (imageKey) => {
  //   try {
  //     const response = await axios.get(
  //       `/api/getImage/getSignedUrl/${imageKey}`
  //     ); // Fetch signed URL for the image
  //     return response.data.signedUrl;
  //   } catch (error) {
  //     console.error("Error fetching signed URL:", error);
  //     return null;
  //   }
  // };

  const [warrantyDetails, setWarrantyDetails] = useState({
    warrantyPeriod: product?.warrantyDetails?.warrantyPeriod || "1",
    returnPeriod: product?.warrantyDetails?.returnPeriod || "7",
  });

  const handleWarrantyDetailsChange = (key, value) => {
    setWarrantyDetails((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleFeatureDetailsSubmit = () => {
    setOpenFeatDialog(false);
    toast({
      title: "Feature Details Saved",
    });
  };

  useEffect(() => {
    if (product?.name) {
      setName(product?.name);
      setDescription(product?.description);
      setImage(product?.image);
      setSku(product?.sku);
      setCategory(product?.category);
      setBrand(product?.brand);
      setPrice(product?.price);
      setCountInStock(product?.countInStock);
      setProductDiscount(product?.productDiscount);
      // setIsOnOffer(product?.isOnOffer);
      // setOfferName(product?.offerName || "");
      setSocketType(product?.compatibilityDetails?.socketType);
      setPowerConsumption(product?.compatibilityDetails?.powerConsumption);
      setChipsetModel(product?.compatibilityDetails?.chipsetModel);
      setFormFactor(product?.compatibilityDetails?.formFactor);
      setMemorySlots(product?.compatibilityDetails?.memorySlots);
      setRamType(product?.compatibilityDetails?.ramType);
      setRamFormFactor(product?.compatibilityDetails?.ramFormFactor || "NA");

      setFeatureOne(product?.featureDetails?.featureOne || "");
      setFeatureTwo(product?.featureDetails?.featureTwo || "");
      setFeatureThree(product?.featureDetails?.featureThree || "");
      setFeatureFour(product?.featureDetails?.featureFour || "");
      setFeatureFive(product?.featureDetails?.featureFive || "");
      setFeatureSix(product?.featureDetails?.featureSix || "");
      setFeatureSeven(product?.featureDetails?.featureSeven || "");
      setFeatureEight(product?.featureDetails?.featureEight || "");
      setFeatureNine(product?.featureDetails?.featureNine || "");
      setFeatureTen(product?.featureDetails?.featureTen || "");

      setFeatureDetails(product?.featureDetails || []);
      setWarrantyDetails({
        warrantyPeriod: product?.warrantyDetails?.warrantyPeriod || "",
        returnPeriod: product?.warrantyDetails?.returnPeriod || "",
      });
      setSpecifications({
        modelNumber: product?.specificationDetails?.modelNumber || null,
        gpuChipset: product?.specificationDetails?.gpuChipset || null,
        gpuModel: product?.specificationDetails?.gpuModel || null,
        pciExpress: product?.specificationDetails?.pciExpress || null,
        gpuBaseClock: product?.specificationDetails?.gpuBaseClock || null,
        gpuBoostClock: product?.specificationDetails?.gpuBoostClock || [],
        gpuMemoryClock: product?.specificationDetails?.gpuMemoryClock || null,
        gpuMemorySize: product?.specificationDetails?.gpuMemorySize || null,
        gpuMemoryInterface:
          product?.specificationDetails?.gpuMemoryInterface || null,
        gpuMemoryType: product?.specificationDetails?.gpuMemoryType || null,
        gpuDirectX: product?.specificationDetails?.gpuDirectX || null,
        gpuOpenGl: product?.specificationDetails?.gpuOpenGl || null,
        gpuResolution: product?.specificationDetails?.gpuResolution || null,
        gpuPorts: product?.specificationDetails?.gpuPorts || [],
        gpuPowerConnectors:
          product?.specificationDetails?.gpuPowerConnectors || null,
        gpuCudaCores: product?.specificationDetails?.gpuCudaCores || null,
        wattage: product?.specificationDetails?.wattage || null,
        networkCardInterfaces:
          product?.specificationDetails?.networkCardInterfaces || null,
        cpuModel: product?.specificationDetails?.cpuModel || null,
        cpuChipset: product?.specificationDetails?.cpuChipset || null,
        cpuCores: product?.specificationDetails?.cpuCores || null,
        cpuThreads: product?.specificationDetails?.cpuThreads || null,
        cpuBaseFrequency:
          product?.specificationDetails?.cpuBaseFrequency || null,
        cpuMaxTurboFrequency:
          product?.specificationDetails?.cpuMaxTurboFrequency || null,
        cpuCache: product?.specificationDetails?.cpuCache || null,
        cpuBusSpeed: product?.specificationDetails?.cpuBusSpeed || null,
        cpuTDP: product?.specificationDetails?.cpuTDP || null,
        cpuProcessorGraphics:
          product?.specificationDetails?.cpuProcessorGraphics || null,
        cpuSupportSockets:
          product?.specificationDetails?.cpuSupportSockets || null,
        moboCpu: product?.specificationDetails?.moboCpu || null,
        moboChipset: product?.specificationDetails?.moboChipset || null,
        moboMemory: product?.specificationDetails?.moboMemory || null,
        moboGraphics: product?.specificationDetails?.moboGraphics || null,
        moboEthernet: product?.specificationDetails?.moboEthernet || null,
        moboAudio: product?.specificationDetails?.moboAudio || null,
        moboExpansionSlots:
          product?.specificationDetails?.moboExpansionSlots || [],
        moboStorage: product?.specificationDetails?.moboStorage || [],
        moboUSB: product?.specificationDetails?.moboUSB || [],
        moboBackPanelIO: product?.specificationDetails?.moboBackPanelIO || [],
        moboInternalIO: product?.specificationDetails?.moboInternalIO || [],
        moboBIOS: product?.specificationDetails?.moboBIOS || null,
        moboFormFactor: product?.specificationDetails?.moboFormFactor || null,
        moboOS: product?.specificationDetails?.moboOS || null,
        RAMModel: product?.specificationDetails?.RAMModel || null,
        RAMMemorySeries: product?.specificationDetails?.RAMMemorySeries || null,
        RAMMemoryType: product?.specificationDetails?.RAMMemoryType || null,
        RAMCapacity: product?.specificationDetails?.RAMCapacity || null,
        RAMKitType: product?.specificationDetails?.RAMKitType || null,
        RAMSpeed: product?.specificationDetails?.RAMSpeed || null,
        coolerModelNumber:
          product?.specificationDetails?.coolerModelNumber || null,
        coolerWaterBlock:
          product?.specificationDetails?.coolerWaterBlock || null,
        coolerFan: product?.specificationDetails?.coolerFan || null,
        coolerRadiator: product?.specificationDetails?.coolerRadiator || null,
        coolerPump: product?.specificationDetails?.coolerPump || null,
        coolerSockets: product?.specificationDetails?.coolerSockets || null,
        coolerNoise: product?.specificationDetails?.coolerNoise || null,
        coolerDimensions:
          product?.specificationDetails?.coolerDimensions || null,
        psuModelNumber: product?.specificationDetails?.psuModelNumber || null,
        psuFormFactor: product?.specificationDetails?.psuFormFactor || null,
        psuDimensions: product?.specificationDetails?.psuDimensions || null,
        psuInputRange: product?.specificationDetails?.psuInputRange || null,
        psuTotalOutput: product?.specificationDetails?.psuTotalOutput || null,
        psuConnectors: product?.specificationDetails?.psuConnectors || [],
        psuPackageContents:
          product?.specificationDetails?.psuPackageContents || [],
        psuEfficiency: product?.specificationDetails?.psuEfficiency || null,
        cabinetModelNumber:
          product?.specificationDetails?.cabinetModelNumber || null,
        cabinetChassis: product?.specificationDetails?.cabinetChassis || null,
        cabinetFormFactor:
          product?.specificationDetails?.cabinetFormFactor || null,
        cabinetPreinstalledFans:
          product?.specificationDetails?.cabinetPreinstalledFans || null,
        cabinetDriveBays:
          product?.specificationDetails?.cabinetDriveBays || null,
        cabinetFanSupport:
          product?.specificationDetails?.cabinetFanSupport || [],
        cabinetLiquidCooling:
          product?.specificationDetails?.cabinetLiquidCooling || [],
        cabinetIOPanel: product?.specificationDetails?.cabinetIOPanel || null,
        memoryModelNumber:
          product?.specificationDetails?.memoryModelNumber || null,
        memoryFormFactor:
          product?.specificationDetails?.memoryFormFactor || null,
        memoryInterface: product?.specificationDetails?.memoryInterface || null,
        memoryCapacity: product?.specificationDetails?.memoryCapacity || null,
        memorySpeed: product?.specificationDetails?.memorySpeed || null,
        memoryDimensions:
          product?.specificationDetails?.memoryDimensions || null,
      });
    }
  }, [product]);

  const handleSpecificationChange = (key, value) => {
    const newValue = arrayFields.includes(key)
      ? value.split(",").map((item) => item.trim())
      : value;
    setSpecifications((prevState) => ({
      ...prevState,
      [key]: newValue,
    }));
  };

  const saveWarrantyState = () => {
    toast({
      title: "Warranty Details Saved",
    });
  };
  const saveSpecsState = () => {
    toast({
      title: "Specification Details Saved",
    });
  };

  return (
    <div className="flex w-full gap-6">
      <Container className="flex flex-col gap-8 p-4">
        {productLoading ? (
          <>Loading..</>
        ) : productError ? (
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
                  {product?.name.split(" ").length > 10
                    ? product?.name.split(" ").slice(0, 7).join(" ")
                    : product?.name}
                </h1>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button
                    variant="outline"
                    size="sm"
                    className="pt-1"
                    onClick={() => navigate(-1)}
                  >
                    Discard
                  </Button>
                  <Button
                    size="sm"
                    className="pt-1"
                    onClick={(e) => handleProductUpdate(e)}
                  >
                    Save Product
                  </Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-0">
                    <CardHeader>
                      <CardTitle>Product Details</CardTitle>
                      <CardDescription>
                        Existing product information is pre-populated, update
                        them and click save product.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            type="text"
                            className="w-full"
                            placeholder={
                              product?.name.split(" ").length > 10
                                ? product?.name.split(" ").slice(0, 7).join(" ")
                                : product?.name
                            }
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            placeholder={product?.description}
                            className="min-h-24"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-1">
                    <CardHeader>
                      <CardTitle>Stock</CardTitle>
                      <CardDescription>
                        Product stock and unit price
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="pl-3">SKU</TableHead>
                            <TableHead className="pl-3">Stock</TableHead>
                            <TableHead className="pl-3">Price (₹)</TableHead>
                            <TableHead className="pl-3">Discount (%)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="">
                              <Label htmlFor="sku" className="sr-only">
                                SKU
                              </Label>
                              <Input
                                id="sku"
                                type="text"
                                placeholder={product?.sku}
                                value={sku}
                                onChange={(e) => setSku(e.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="stock-1" className="sr-only">
                                Stock
                              </Label>
                              <Input
                                id="stock-1"
                                type="number"
                                placeholder={product?.countInStock}
                                value={countInStock}
                                onChange={(e) =>
                                  setCountInStock(e.target.value)
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="price-1" className="sr-only">
                                Price
                              </Label>
                              <Input
                                id="price-1"
                                type="number"
                                placeholder={product?.price}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="discount" className="sr-only">
                                Discount
                              </Label>
                              <Input
                                id="discount"
                                type="number"
                                placeholder={product?.productDiscount}
                                value={productDiscount}
                                onChange={(e) =>
                                  setProductDiscount(e.target.value)
                                }
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-2">
                    <CardHeader>
                      <CardTitle>Category & Brand</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 sm:grid-cols-3">
                        <div className="grid gap-3">
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={category}
                            onValueChange={(e) => setCategory(e)}
                          >
                            <SelectTrigger
                              id="category"
                              aria-label="Select category"
                            >
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {allCategories?.map((category, index) => (
                                <SelectItem key={index} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="brand">Brand</Label>
                          <Select
                            value={brand}
                            onValueChange={(e) => setBrand(e)}
                          >
                            <SelectTrigger id="brand" aria-label="Change Brand">
                              <SelectValue placeholder="Change Brand" />
                            </SelectTrigger>
                            <SelectContent>
                              {allBrands?.map((brand, index) => (
                                <SelectItem key={index} value={brand}>
                                  {brand}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-3">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Offers{" "}
                      </CardTitle>
                      <CardDescription>
                        {product?.isOnOffer
                          ? "Current on below offer"
                          : "Not on offer"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        {product?.isOnOffer ? (
                          <div className="grid gap-3">
                            {/* <Input placeholder={product?.offerName} readOnly /> */}
                            <Input placeholder="Offername" readOnly />
                          </div>
                        ) : (
                          <div className="grid gap-3">
                            <Input placeholder="No offer applied" readOnly />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  <Card
                    className="overflow-hidden"
                    x-chunk="dashboard-07-chunk-4"
                  >
                    <CardHeader>
                      <CardTitle>Product Image</CardTitle>
                      <CardDescription className="flex gap-6 items-end">
                        {/* Update product image
                        <Upload className="h-5 w-5 hover:text-primary hover:cursor-pointer" /> */}
                        <Input type="file" onChange={handleFileChange} />
                        <Button onClick={handleImageUpload}>
                          <Upload className="h-4 w-4" />
                        </Button>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <img
                          src={image}
                          alt="upload sample img"
                          className="aspect-square w-full rounded-md object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-5">
                    <CardHeader className="mb-3">
                      <CardTitle>Compatibilities</CardTitle>
                      <CardDescription>
                        Edit compatibility details of the product below
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                      <Dialog
                        open={openCompDialog}
                        onOpenChange={setOpenCompDialog}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            Edit Compatibilities
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit compatibility</DialogTitle>
                            <DialogDescription>
                              Update the compatibility details of this product
                              here
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="socket" className="text-right">
                                Socket
                              </Label>
                              <Input
                                id="socket"
                                className="col-span-3"
                                value={socketType}
                                onChange={(e) => setSocketType(e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="power" className="text-right">
                                Power
                              </Label>
                              <Input
                                id="power"
                                className="col-span-3"
                                value={powerConsumption}
                                onChange={(e) =>
                                  setPowerConsumption(e.target.value)
                                }
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="chipset" className="text-right">
                                Chipset
                              </Label>
                              <Input
                                id="chipset"
                                className="col-span-3"
                                value={chipsetModel}
                                onChange={(e) =>
                                  setChipsetModel(e.target.value)
                                }
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="formFactor"
                                className="text-right"
                              >
                                Form Factor
                              </Label>
                              <Input
                                id="formFactor"
                                className="col-span-3"
                                value={formFactor}
                                onChange={(e) => setFormFactor(e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="memorySlots"
                                className="text-right"
                              >
                                Memory Slots
                              </Label>
                              <Input
                                id="memorySlots"
                                className="col-span-3"
                                value={memorySlots}
                                onChange={(e) => setMemorySlots(e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="ramType" className="text-right">
                                Ram Type
                              </Label>
                              <Input
                                id="ramType"
                                className="col-span-3"
                                value={ramType}
                                onChange={(e) => setRamType(e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="ramFormFactor"
                                className="text-right"
                              >
                                RAM form factor
                              </Label>
                              <Select
                                value={ramFormFactor}
                                onValueChange={(e) => setRamFormFactor(e)}
                              >
                                <SelectTrigger
                                  id="ramFormFactor"
                                  aria-label="Select RAM form factor"
                                  className="col-span-3"
                                >
                                  <SelectValue placeholder="RAM form factor" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Desktop">
                                    Desktop
                                  </SelectItem>
                                  <SelectItem value="Laptop">Laptop</SelectItem>
                                  <SelectItem value="NA">
                                    Not Applicable
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              type="submit"
                              onClick={() => setOpenCompDialog(false)}
                            >
                              Save changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-1 lg:gap-8">
                {(product?.category === "CPU" ||
                  product?.category === "GPU" ||
                  product?.category === "PSU" ||
                  product?.category === "RAM" ||
                  product?.category === "Motherboard" ||
                  product?.category === "CPU COOLER" ||
                  product?.category === "Cabinet" ||
                  product?.category === "SSD" ||
                  product?.category === "HDD") && (
                  <Tabs defaultValue="description" className="w-full">
                    <TabsList className={`grid w-full grid-cols-3`}>
                      <TabsTrigger value="description">Features</TabsTrigger>
                      <TabsTrigger value="specification">
                        Specification
                      </TabsTrigger>
                      <TabsTrigger value="returns">
                        Returns & Warranty
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent
                      value="description"
                      className="flex flex-col text-left"
                    >
                      <Card className="text-left">
                        <CardHeader>
                          <CardTitle className="flex w-full justify-between items-center">
                            Features{" "}
                            <Button
                              onClick={() => handleFeatureDetailsSubmit()}
                            >
                              Save Features
                            </Button>
                          </CardTitle>
                          <CardDescription>
                            Below listed is the features and returns policy
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="feature-1" className="text-right">
                                Feature One
                              </Label>
                              <Input
                                id="feature-1"
                                className="col-span-3"
                                value={featureOne}
                                onChange={(e) => setFeatureOne(e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="feature-2" className="text-right">
                                Feature Two
                              </Label>
                              <Input
                                id="feature-2"
                                className="col-span-3"
                                value={featureTwo}
                                onChange={(e) => setFeatureTwo(e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="feature-3" className="text-right">
                                Feature Three
                              </Label>
                              <Input
                                id="feature-3"
                                className="col-span-3"
                                value={featureThree}
                                onChange={(e) =>
                                  setFeatureThree(e.target.value)
                                }
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="feature-4" className="text-right">
                                Feature Four
                              </Label>
                              <Input
                                id="feature-4"
                                className="col-span-3"
                                value={featureFour}
                                onChange={(e) => setFeatureFour(e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="feature-5" className="text-right">
                                Feature Five
                              </Label>
                              <Input
                                id="feature-5"
                                className="col-span-3"
                                value={featureFive}
                                onChange={(e) => setFeatureFive(e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="feature-6" className="text-right">
                                Feature Six
                              </Label>
                              <Input
                                id="feature-6"
                                className="col-span-3"
                                value={featureSix}
                                onChange={(e) => setFeatureSix(e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="feature-7" className="text-right">
                                Feature Seven
                              </Label>
                              <Input
                                id="feature-7"
                                className="col-span-3"
                                value={featureSeven}
                                onChange={(e) =>
                                  setFeatureSeven(e.target.value)
                                }
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="feature-8" className="text-right">
                                Feature Eight
                              </Label>
                              <Input
                                id="feature-8"
                                className="col-span-3"
                                value={featureEight}
                                onChange={(e) =>
                                  setFeatureEight(e.target.value)
                                }
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="feature-9" className="text-right">
                                Feature Nine
                              </Label>
                              <Input
                                id="feature-9"
                                className="col-span-3"
                                value={featureNine}
                                onChange={(e) => setFeatureNine(e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="feature-10"
                                className="text-right"
                              >
                                Feature Ten
                              </Label>
                              <Input
                                id="feature-10"
                                className="col-span-3"
                                value={featureTen}
                                onChange={(e) => setFeatureTen(e.target.value)}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="specification">
                      <Card className="text-left">
                        <CardHeader>
                          <CardTitle className="flex w-full justify-between items-center">
                            Specifications{" "}
                            <Button onClick={() => saveSpecsState()}>
                              Save Specification
                            </Button>
                          </CardTitle>
                          <CardDescription>
                            Below listed is the specification and returns policy
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-4 py-4">
                            {Object.keys(specifications).map((key, index) => (
                              <div
                                key={index}
                                className="grid grid-cols-4 items-center gap-4"
                              >
                                <Label htmlFor={key} className="text-right">
                                  {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, (str) => str.toUpperCase())}
                                </Label>
                                <Input
                                  id={key}
                                  className="col-span-3"
                                  value={
                                    Array.isArray(specifications[key])
                                      ? specifications[key].join(", ")
                                      : specifications[key] || ""
                                  }
                                  onChange={(e) =>
                                    handleSpecificationChange(
                                      key,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="returns">
                      <Card className="text-left">
                        <CardHeader>
                          <CardTitle className="flex w-full justify-between items-center">
                            Warraty & Returns{" "}
                            <Button onClick={() => saveWarrantyState()}>
                              Save Warranty
                            </Button>
                          </CardTitle>
                          <CardDescription>
                            Below listed is the warranty and returns policy
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-2">
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="warranty"
                                  className="text-right"
                                >
                                  Warranty Period
                                </Label>
                                <Input
                                  id="warranty"
                                  className="col-span-3"
                                  value={warrantyDetails?.warrantyPeriod}
                                  onChange={(e) =>
                                    handleWarrantyDetailsChange(
                                      "warrantyPeriod",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="return" className="text-right">
                                  Return Period
                                </Label>
                                <Input
                                  id="return"
                                  className="col-span-3"
                                  value={warrantyDetails?.returnPeriod}
                                  onChange={(e) =>
                                    handleWarrantyDetailsChange(
                                      "returnPeriod",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                )}
                {product?.category !== "CPU" &&
                  product?.category !== "GPU" &&
                  product?.category !== "PSU" &&
                  product?.category !== "RAM" &&
                  product?.category !== "Motherboard" &&
                  product?.category !== "CPU COOLER" &&
                  product?.category !== "Cabinet" &&
                  product?.category !== "SSD" &&
                  product?.category !== "HDD" && (
                    <Tabs defaultValue="description" className="w-full">
                      <TabsList className={`grid w-full grid-cols-2`}>
                        <TabsTrigger value="description">Features</TabsTrigger>
                        <TabsTrigger value="returns">
                          Returns & Warranty
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent
                        value="description"
                        className="flex flex-col text-left"
                      >
                        <Card className="text-left">
                          <CardHeader>
                            <CardTitle className="flex w-full justify-between items-center">
                              Features{" "}
                              <Button
                                onClick={() => handleFeatureDetailsSubmit()}
                              >
                                Save Features
                              </Button>
                            </CardTitle>
                            <CardDescription>
                              Below listed is the features and returns policy
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="feature-1"
                                  className="text-right"
                                >
                                  Feature One
                                </Label>
                                <Input
                                  id="feature-1"
                                  className="col-span-3"
                                  value={featureOne}
                                  onChange={(e) =>
                                    setFeatureOne(e.target.value)
                                  }
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="feature-2"
                                  className="text-right"
                                >
                                  Feature Two
                                </Label>
                                <Input
                                  id="feature-2"
                                  className="col-span-3"
                                  value={featureTwo}
                                  onChange={(e) =>
                                    setFeatureTwo(e.target.value)
                                  }
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="feature-3"
                                  className="text-right"
                                >
                                  Feature Three
                                </Label>
                                <Input
                                  id="feature-3"
                                  className="col-span-3"
                                  value={featureThree}
                                  onChange={(e) =>
                                    setFeatureThree(e.target.value)
                                  }
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="feature-4"
                                  className="text-right"
                                >
                                  Feature Four
                                </Label>
                                <Input
                                  id="feature-4"
                                  className="col-span-3"
                                  value={featureFour}
                                  onChange={(e) =>
                                    setFeatureFour(e.target.value)
                                  }
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="feature-5"
                                  className="text-right"
                                >
                                  Feature Five
                                </Label>
                                <Input
                                  id="feature-5"
                                  className="col-span-3"
                                  value={featureFive}
                                  onChange={(e) =>
                                    setFeatureFive(e.target.value)
                                  }
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="feature-6"
                                  className="text-right"
                                >
                                  Feature Six
                                </Label>
                                <Input
                                  id="feature-6"
                                  className="col-span-3"
                                  value={featureSix}
                                  onChange={(e) =>
                                    setFeatureSix(e.target.value)
                                  }
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="feature-7"
                                  className="text-right"
                                >
                                  Feature Seven
                                </Label>
                                <Input
                                  id="feature-7"
                                  className="col-span-3"
                                  value={featureSeven}
                                  onChange={(e) =>
                                    setFeatureSeven(e.target.value)
                                  }
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="feature-8"
                                  className="text-right"
                                >
                                  Feature Eight
                                </Label>
                                <Input
                                  id="feature-8"
                                  className="col-span-3"
                                  value={featureEight}
                                  onChange={(e) =>
                                    setFeatureEight(e.target.value)
                                  }
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="feature-9"
                                  className="text-right"
                                >
                                  Feature Nine
                                </Label>
                                <Input
                                  id="feature-9"
                                  className="col-span-3"
                                  value={featureNine}
                                  onChange={(e) =>
                                    setFeatureNine(e.target.value)
                                  }
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="feature-10"
                                  className="text-right"
                                >
                                  Feature Ten
                                </Label>
                                <Input
                                  id="feature-10"
                                  className="col-span-3"
                                  value={featureTen}
                                  onChange={(e) =>
                                    setFeatureTen(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="returns">
                        <Card className="text-left">
                          <CardHeader>
                            <CardTitle className="flex w-full justify-between items-center">
                              Warraty & Returns{" "}
                              <Button onClick={() => saveWarrantyState()}>
                                Save Warranty
                              </Button>
                            </CardTitle>
                            <CardDescription>
                              Below listed is the warranty and returns policy
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid gap-2">
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="warranty"
                                    className="text-right"
                                  >
                                    Warranty Period
                                  </Label>
                                  <Input
                                    id="warranty"
                                    className="col-span-3"
                                    value={warrantyDetails?.warrantyPeriod}
                                    onChange={(e) =>
                                      handleWarrantyDetailsChange(
                                        "warrantyPeriod",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="return"
                                    className="text-right"
                                  >
                                    Return Period
                                  </Label>
                                  <Input
                                    id="return"
                                    className="col-span-3"
                                    value={warrantyDetails?.returnPeriod}
                                    onChange={(e) =>
                                      handleWarrantyDetailsChange(
                                        "returnPeriod",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  )}
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

export default EditProduct;

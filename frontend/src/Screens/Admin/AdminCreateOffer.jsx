import Container from "../../components/Container";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Label } from "../../components/ui/label";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../../Features/cartSlice";
import { Separator } from "../../components/ui/separator";
import { Plus, Truck } from "lucide-react";
import {
  useApplyOfferMutation,
  useCreateOfferMutation,
  useGetAllOffersQuery,
  useUpdateOfferMutation,
} from "../../Features/offersApiSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useToast } from "../../components/ui/use-toast";
import { useGetAllCategoriesQuery } from "../../Features/productApiSlice";

const AdminCreateOffer = () => {
  const [offerName, setOfferName] = useState("");
  const [offerDiscount, setOfferDiscount] = useState("");
  const [status, setStatus] = useState("");
  const [offerId, setOfferId] = useState("");
  const { toast } = useToast();
  const [productCategory, setProductCategory] = useState("");

  const [selectedOffer, setSelectedOffer] = useState({
    offerName: null,
    offerDiscount: 0,
    status: "Inactive",
    offerId: "",
  });
  const [selectedOfferToApply, setSelectedOfferToApply] = useState({
    offerName: null,
    offerDiscount: 0,
    status: "Inactive",
  });

  const {
    data: allOffers,
    isLoading: offersLoading,
    error: offersError,
    refetch,
  } = useGetAllOffersQuery();

  const [
    updateOffer,
    { isLoading: updateOfferLoading, error: updateOfferError },
  ] = useUpdateOfferMutation();

  const [
    createOffer,
    { isLoading: createOfferLoading, error: createOfferError },
  ] = useCreateOfferMutation();

  const {
    data: allCategories,
    isLoading: allCategoriesLoading,
    error: allCategoriesError,
  } = useGetAllCategoriesQuery();

  const [applyOffer, { isLoading: applyOfferLoading, error: applyOfferError }] =
    useApplyOfferMutation();

  useEffect(() => {
    // console.log(allOffers);
  }, [allOffers]);

  const handleCreateOffer = async () => {
    try {
      const res = await createOffer({
        offerName: "New Offer",
        offerDiscount: 0,
        status: "Inactive",
      }).unwrap();
      toast({
        title: "New Offer Created, edit now!",
      });
      refetch();
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create offer!",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateOffer = async (e) => {
    e.preventDefault();
    try {
      const res = await updateOffer({
        offerName,
        offerDiscount,
        status,
        offerId,
      }).unwrap();
      toast({
        title: `${res?.offerName} Offer Updated!`,
      });
      refetch();
      setSelectedOffer(() => ({
        offerName: "",
        offerDiscount: 0,
        status: "Inactive",
        offerId: "",
      }));
      setOfferName("");
      setOfferDiscount(0);
      setStatus("");
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create offer!",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handleOfferSelection = (e) => {
    setSelectedOffer((prevstate) => ({
      ...prevstate,
      offerName: e.offerName,
      offerDiscount: e.offerDiscount,
      status: e.status,
      offerId: e._id,
    }));
    setOfferId(e._id);
  };

  const handleApplyOfferSelection = (e) => {
    setSelectedOfferToApply((prevstate) => ({
      ...prevstate,
      offerName: e.offerName,
      offerDiscount: e.offerDiscount,
      status: e.status,
    }));
    // setOfferId(e._id);
  };

  const handleApplyOffer = async (e) => {
    e.preventDefault();
    console.log({ offer: { ...selectedOfferToApply }, productCategory });
    try {
      await applyOffer({
        offer: { ...selectedOfferToApply },
        productCategory,
      }).unwrap();
      toast({
        title: "Offer applied",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create offer!",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <Container className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="section-heading flex justify-center">
            <h1 className="text-[28px] font-extrabold">Offers</h1>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <Tabs defaultValue="edit" className="w-full col-span-2">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="edit">Edit Offer</TabsTrigger>
                <TabsTrigger value="apply">Apply Offer</TabsTrigger>
              </TabsList>
              <TabsContent value="edit" className="flex flex-col mt-0 gap-4">
                <div className="flex justify-between mt-4 items-center">
                  <h1 className="text-lg font-bold">Create and Edit Offer</h1>
                  <Button className="flex gap-1" onClick={handleCreateOffer}>
                    {" "}
                    <Plus className="h-4 w-4" /> Create Offer
                  </Button>
                </div>
                <div className="flex flex-col gap-4 text-left mt-2">
                  <Label htmlFor="offer">Select Offer To Edit</Label>
                  <Select onValueChange={(e) => handleOfferSelection(e)}>
                    <SelectTrigger id="offer" aria-label="offer">
                      <SelectValue placeholder="Select offer to edit" />
                    </SelectTrigger>
                    <SelectContent>
                      {allOffers?.map((offer, index) => (
                        <SelectItem key={index} value={offer}>
                          {offer?.offerName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Card className="p-4">
                  <form
                    className="flex flex-col gap-8 text-left flex-grow mt-4"
                    onSubmit={(e) => handleUpdateOffer(e)}
                  >
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="offername">Offer Name</Label>
                      <Input
                        id="offername"
                        placeholder="Update offer name"
                        type="text"
                        required
                        value={offerName}
                        onChange={(e) => setOfferName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="discount">Discount (%)</Label>
                      <Input
                        id="discount"
                        placeholder="Enter discount %"
                        type="number"
                        required
                        value={offerDiscount}
                        onChange={(e) => setOfferDiscount(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        onValueChange={(e) => setStatus(e)}
                        value={status}
                      >
                        <SelectTrigger id="status" aria-label="Status">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="offerId">Offer Id</Label>
                      <Input
                        id="offerId"
                        type="text"
                        required
                        defaultValue={selectedOffer?.offerId || ""}
                        readOnly
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Update
                    </Button>
                  </form>
                </Card>
              </TabsContent>
              <TabsContent value="apply" className="flex flex-col mt-0 gap-4">
                <div className="flex justify-between mt-4 items-center">
                  <h1 className="text-lg font-bold">Apply Offers</h1>
                </div>
                <div className="flex flex-col gap-4 text-left mt-2">
                  <Label htmlFor="offer">Select Offer To Apply</Label>
                  <Select onValueChange={(e) => handleApplyOfferSelection(e)}>
                    <SelectTrigger id="offer" aria-label="offer">
                      <SelectValue placeholder="Select offer to edit" />
                    </SelectTrigger>
                    <SelectContent>
                      {allOffers?.map((offer, index) => (
                        <SelectItem key={index} value={offer}>
                          {offer?.offerName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Card className="p-4">
                  <form
                    className="flex flex-col gap-8 text-left flex-grow mt-4"
                    onSubmit={(e) => handleApplyOffer(e)}
                  >
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="productcategory">
                        Select Product By Category
                      </Label>
                      <Select onValueChange={(e) => setProductCategory(e)}>
                        <SelectTrigger id="offer" aria-label="offer">
                          <SelectValue placeholder="Select offer to edit" />
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
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="discount">Discount (%)</Label>
                      <Input
                        id="discount"
                        placeholder="Discount %"
                        type="number"
                        required
                        value={selectedOfferToApply?.offerDiscount}
                        readOnly
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="status">Status</Label>
                      <Input
                        id="status"
                        placeholder="Status"
                        type="text"
                        required
                        value={selectedOfferToApply?.status}
                        readOnly
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={
                        selectedOfferToApply?.status === "Inactive"
                          ? true
                          : false
                      }
                    >
                      Apply Offer
                    </Button>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
            <Card className="overflow-hidden flex flex-col justify-between">
              <div>
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      Available Offers
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm text-left">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Discount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allOffers?.map((offer, index) => (
                        <TableRow key={index}>
                          <TableCell>{offer.offerName}</TableCell>
                          <TableCell className="text-center">
                            {offer.offerDiscount} %
                          </TableCell>
                          <TableCell>{offer.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </div>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  Created <time dateTime="2023-11-23">November 23, 2023</time>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminCreateOffer;

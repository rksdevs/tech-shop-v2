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
import { Truck } from "lucide-react";
import { useGetAllOffersQuery } from "../../Features/offersApiSlice";
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

const AdminCreateOffer = () => {
  const [offerName, setOfferName] = useState("");
  const [offerDiscount, setOfferDiscount] = useState("");
  const [status, setStatus] = useState("");

  const {
    data: allOffers,
    isLoading: offersLoading,
    error: offersError,
  } = useGetAllOffersQuery();

  useEffect(() => {
    // console.log(allOffers);
  }, [allOffers]);

  const handleShippingAddress = () => {};

  return (
    <div className="flex w-full flex-col gap-8">
      <Container className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="section-heading flex justify-center">
            <h1 className="text-[28px] font-extrabold">Offers</h1>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <Tabs defaultValue="create" className="w-full col-span-2">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="create">Create Offer</TabsTrigger>
                <TabsTrigger value="edit">Edit Offer</TabsTrigger>
              </TabsList>
              <TabsContent
                value="create"
                className="flex gap-8 justify-between mt-0"
              >
                <form
                  className="flex flex-col gap-8 text-left flex-grow mt-4"
                  onSubmit={(e) => handleShippingAddress(e)}
                >
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter offer name"
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
                    <Select onValueChange={(e) => setStatus(e)}>
                      <SelectTrigger id="status" aria-label="Status">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">
                    Create
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="edit" className="flex gap-8 mt-0">
                <form
                  className="flex flex-col gap-8 text-left flex-grow mt-4"
                  onSubmit={(e) => handleShippingAddress(e)}
                >
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="offer">Select Offer</Label>
                    <Select onValueChange={(e) => console.log(e)}>
                      <SelectTrigger id="offer" aria-label="offer">
                        <SelectValue placeholder="Select offer to edit" />
                      </SelectTrigger>
                      <SelectContent>
                        {allOffers?.map((offer, index) => (
                          <SelectItem key={index} value={offer?.offerName}>
                            {offer?.offerName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <Select onValueChange={(e) => setStatus(e)}>
                      <SelectTrigger id="status" aria-label="Status">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">
                    Update
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            <Card className="overflow-hidden">
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

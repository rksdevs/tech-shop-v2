import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import Container from "../components/Container";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  CircleUser,
  Home,
  LogOut,
  ScrollText,
  ShoppingCart,
} from "lucide-react";
import orderOne from "../components/assets/images/orders-2.jpg";
import addressOne from "../components/assets/images/address-1.jpg";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";

const AccountSettings = () => {
  return (
    <div className="flex w-full flex-col gap-8">
      <Container className="flex flex-col gap-8">
        <div className="grid gap-4 overflow-auto py-4 md:grid-cols-4 lg:grid-cols-4">
          <div className="side-bar grid md:col-span-1">
            <Card className="h-fit">
              <CardHeader className="items-center border-b">
                <Avatar className="h-[150px] w-[150px] mb-4">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle>John Doe</CardTitle>
                <CardDescription>johndoe@mail.com</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="flex flex-col gap-4">
                  <li className="flex gap-4">
                    {" "}
                    <span>
                      {" "}
                      <CircleUser />
                    </span>{" "}
                    <span>Account Details</span>
                  </li>
                  <li className="flex gap-4">
                    {" "}
                    <span>
                      {" "}
                      <Home />
                    </span>{" "}
                    <span>Addresses</span>
                  </li>
                  <li className="flex gap-4">
                    {" "}
                    <span>
                      {" "}
                      <ScrollText />
                    </span>{" "}
                    <span>Orders</span>
                  </li>
                  <li className="flex gap-4">
                    {" "}
                    <span>
                      {" "}
                      <ShoppingCart />
                    </span>{" "}
                    <span>Cart</span>
                  </li>
                  <li className="flex gap-4">
                    {" "}
                    <span>
                      {" "}
                      <LogOut />
                    </span>{" "}
                    <span>Logout</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="content grid md:col-span-3 gap-8">
            <div className="flex gap-2 max-h-[20vh]">
              <div className="custom-pc-one flex-1 flex bg-muted rounded-md">
                <div className="content flex flex-col gap-4 flex-1 items-center justify-center text-left">
                  <div className="flex flex-col p-3 gap-4">
                    <h2 className="tracking-[0.015rem] font-[700] text-[1.5rem] leading-[0.5rem]">
                      Orders
                    </h2>
                    <p className="font-medium text-xs text-muted-foreground">
                      Your orders here
                    </p>
                    <Button className="min-w-1/2">Check Now</Button>
                  </div>
                </div>
                <div className="image flex-1">
                  <img
                    src={orderOne}
                    alt="banner"
                    className="w-full h-full rounded-r-md"
                  />
                </div>
              </div>
              <div className="custom-pc-one flex-1 flex bg-muted rounded-md">
                <div className="content flex flex-col gap-4 flex-1 items-center justify-center text-left">
                  <div className="flex flex-col p-3 gap-4">
                    <h2 className="tracking-[0.015rem] font-[700] text-[1.5rem] leading-[0.5rem]">
                      Addresses
                    </h2>
                    <p className="font-medium text-xs text-muted-foreground">
                      Your addresses here
                    </p>
                    <Button className="min-w-1/2">Check Now</Button>
                  </div>
                </div>
                <div className="image flex-1">
                  <img
                    src={addressOne}
                    alt="banner"
                    className="w-full h-full rounded-r-md"
                  />
                </div>
              </div>
            </div>
            <div className="content flex flex-col gap-8 account-details">
              <div className="flex justify-start items-center">
                <h1 className="text-[28px] font-bold tracking-wide pb-1 border-b-4 border-primary">
                  Account Details
                </h1>
              </div>
              <div>
                <Card className="mx-auto ">
                  <CardHeader>
                    <CardTitle className="text-xl">Update Account</CardTitle>
                    <CardDescription>
                      Update your account details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-8">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="first-name">First name</Label>
                          <Input id="first-name" placeholder="Max" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="last-name">Last name</Label>
                          <Input
                            id="last-name"
                            placeholder="Robinson"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Enter Password"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="confirmPassword">
                            Confirm Password
                          </Label>
                          <Input
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            type="password"
                            required
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-1/3">
                        Update
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="content flex flex-col gap-8 address-list hidden">
              <div className="flex justify-start items-center">
                <h1 className="text-[28px] font-bold tracking-wide pb-1 border-b-4 border-primary">
                  Adresses
                </h1>
              </div>
              <div>
                <Card className="mx-auto ">
                  <CardHeader>
                    <CardTitle className="text-xl">Update Address</CardTitle>
                    <CardDescription>Update your address below</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-8">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="address-one">Address One</Label>
                          <Input
                            id="address-one"
                            placeholder="House No"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="address-two">Address Two</Label>
                          <Input
                            id="address-two"
                            placeholder="Street"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="locality">Locality</Label>
                          <Input
                            id="locality"
                            placeholder="Locality"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="landmark">Landmark</Label>
                          <Input id="landmark" placeholder="Landmark" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="City" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="state">State</Label>
                          <Input id="state" placeholder="State" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="zipcode">Zipcode</Label>
                          <Input id="zipcode" placeholder="Zipcode" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="contact">Contact</Label>
                          <Input
                            id="contact"
                            placeholder="Contact"
                            type="Number"
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-1/3">
                        Update
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AccountSettings;
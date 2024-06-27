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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useLogoutMutation,
  useUpdateUserMutation,
  useUpdateUserProfileMutation,
} from "../Features/usersApiSlice";
import { logout, setCredentials } from "../Features/authSlice";
import { useEffect, useState } from "react";
import { useToast } from "../components/ui/use-toast";

const AccountSettings = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [logoutUser] = useLogoutMutation();
  const [
    updateUserProfile,
    { isLoading: updateUserLoading, error: updateUserError },
  ] = useUpdateUserProfileMutation();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    try {
      if (password !== "") {
        if (confirmPassword === password) {
          const res = await updateUserProfile({
            name,
            email: userInfo?.email,
            password,
          }).unwrap();
          dispatch(setCredentials({ ...res }));
          toast({
            title: "Profile updated successfully!",
          });
        } else {
          toast({
            title: "Confirm Password doesn't match!",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Password can not be empty!",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to update profile!",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap;
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userInfo?.name) {
      setName(userInfo?.name);
      setPassword("");
    }
  }, [userInfo]);

  return (
    <div className="flex w-full flex-col gap-8 h-[63vh]">
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
                <CardTitle>{userInfo?.name}</CardTitle>
                <CardDescription>{userInfo?.email}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="flex flex-col gap-4">
                  {/* <li className="flex gap-4">
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
                  </li> */}
                  <li
                    className="flex gap-4 hover:cursor-pointer"
                    onClick={() => navigate("/myorders")}
                  >
                    {" "}
                    <span>
                      {" "}
                      <ScrollText />
                    </span>{" "}
                    <span>Orders</span>
                  </li>
                  <li
                    className="flex gap-4 hover:cursor-pointer"
                    onClick={() => navigate("/cart")}
                  >
                    {" "}
                    <span>
                      {" "}
                      <ShoppingCart />
                    </span>{" "}
                    <span>Cart</span>
                  </li>
                  <li
                    className="flex gap-4 hover:cursor-pointer"
                    onClick={handleLogout}
                  >
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
            {/* <div className="flex gap-2 max-h-[20vh]">
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
            </div> */}
            <div className="content flex flex-col gap-6 account-details">
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
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            placeholder={userInfo?.name}
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="last-name">Email</Label>
                          <Input
                            id="last-name"
                            value={userInfo?.email}
                            readOnly
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-1/3"
                        onClick={(e) => handleUserUpdate(e)}
                      >
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

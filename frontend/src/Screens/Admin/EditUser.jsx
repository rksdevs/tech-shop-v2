import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import Container from "../../components/Container";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  CircleUser,
  Home,
  LogOut,
  ScrollText,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import orderOne from "../../components/assets/images/orders-2.jpg";
import addressOne from "../../components/assets/images/address-1.jpg";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetUserDetailsQuery,
} from "../../Features/usersApiSlice";
const EditUser = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { id: userId } = useParams();
  const {
    data: selectedUser,
    isLoading: userLoading,
    error: userError,
  } = useGetUserDetailsQuery(userId);

  const [deleteUser, { isLoading: deleteUserLoading, error: deleteUserError }] =
    useDeleteUserMutation();

  // const handleDeleteUser = async (e, brandId) => {
  //   e.preventDefault();
  //   try {
  //     await deleteUser(brandId).unwrap();
  //     refetch();
  //     toast({
  //       title: "User deleted!",
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Error deleting brand!",
  //       description: error?.message || error?.data?.message,
  //       variant: "destructive",
  //     });
  //   }
  // };

  return (
    <div className="flex w-full flex-col gap-8 h-[63vh] items-start justify-start">
      <div className="flex flex-col justify-start items-center pl-4">
        <h1 className="text-[28px] font-bold tracking-wide py-2 pb-1 border-b-4 border-primary">
          Edit User Details
        </h1>
      </div>
      <Container className="mt-4">
        <div className="flex flex-col gap-8 m-auto">
          {/* <div className="flex flex-col justify-start items-center">
            <h1 className="text-[28px] font-bold tracking-wide pb-1 border-b-4 border-primary">
              Account Details
            </h1>
          </div> */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Card className="mx-auto ">
                <CardHeader>
                  <CardTitle className="text-xl">Update Account</CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-8">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder={selectedUser?.name}
                          disabled
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="last-name">Email</Label>
                        <Input
                          id="last-name"
                          placeholder={selectedUser?.email}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {userInfo &&
                        userInfo?.isAdmin &&
                        userInfo?.email !== selectedUser?.email && (
                          <div className="flex items-center">
                            <Button
                              size="sm"
                              className="flex gap-2 items-center justify-center"
                            >
                              <Trash2 className="w-4 h-4" /> Delete User
                            </Button>
                          </div>
                        )}
                    </div>
                    {userInfo?.email === selectedUser?.email && (
                      <Button type="submit" className="w-1/3">
                        Update
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid md:col-span-1">
              <Card className="h-full flex flex-col justify-between">
                <CardHeader className="items-center">
                  <Avatar className="h-[150px] w-[150px] mb-4">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <CardTitle>{selectedUser?.name}</CardTitle>
                  <CardDescription>{selectedUser?.email}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
        {/* <div className="grid gap-4 overflow-auto py-4 md:grid-cols-4 lg:grid-cols-4">
          <div className="content grid md:col-span-2 gap-8">
            <div className="content flex flex-col gap-8 account-details">
              <div className="flex flex-col justify-start items-center">
                <h1 className="text-[28px] font-bold tracking-wide pb-1 border-b-4 border-primary">
                  Account Details
                </h1>
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
        </div> */}
      </Container>
    </div>
  );
};

export default EditUser;

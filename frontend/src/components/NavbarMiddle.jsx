import { CircleUser, Search, ShoppingCart, Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import Container from "./Container";
import { Badge } from "./ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useLogoutMutation } from "../Features/usersApiSlice";
import { logout } from "../Features/authSlice";

export function NavbarMiddle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      setOpen(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  return (
    <div className="flex w-full flex-col">
      <header className="sticky top-0 flex h-14 items-center gap-4 bg-background px-4 md:px-6">
        <Container className="flex items-center">
          <div className="flex w-full items-center flex-row">
            <Link to="/">
              <h2 className="text-[24px] font-semibold flex flex-row items-center">
                COMPUTERMAKERS
                <div className="text-primary text-[48px] mt-[5px] flex h-[50px] items-end">
                  .
                </div>
              </h2>
            </Link>
          </div>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
            {userInfo && userInfo.isAdmin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <div className="flex gap-2">
                      <Menu className="h-5 w-5 " />
                      <span className="sr-only">Toggle admin</span>
                      <span>Admin Pages</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => navigate("/admin/all-products")}
                  >
                    Products
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/admin/all-orders")}
                  >
                    Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/admin/all-offers")}
                  >
                    Offers
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/admin/all-users")}
                  >
                    Users
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <div
              className="flex items-center gap-4 hover:cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="h-[28px] w-[28px]" />
              <div className="flex flex-col">
                <span>Cart</span>
                {cartItems?.length > 0 ? (
                  <Badge className="h-[12px]">
                    {cartItems.reduce((sum, item) => sum + item.qty, 0)}
                  </Badge>
                ) : (
                  <Badge className="h-[12px]">0</Badge>
                )}
              </div>
            </div>
            {userInfo ? (
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setOpen(!open)}
                  >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/myaccount" onClick={() => setOpen(false)}>
                      Account Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={(e) => logoutHandler(e)}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button>
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>
        </Container>
      </header>
    </div>
  );
}

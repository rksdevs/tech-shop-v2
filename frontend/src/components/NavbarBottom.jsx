import { Link } from "react-router-dom";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
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
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Container from "./Container";

export function NavbarBottom() {
  return (
    <div className="flex w-full flex-col">
      <header className="sticky top-0 flex h-12 items-center bg-primary border-b px-4 md:px-6">
        <Container className="flex w-full items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <div className="flex gap-2">
                  <Menu className="h-5 w-5 " />
                  <span className="sr-only">Toggle categories</span>
                  <span>All Categories</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Category One</DropdownMenuLabel>
              <DropdownMenuItem>Category Two</DropdownMenuItem>
              <DropdownMenuItem>Category Three</DropdownMenuItem>
              <DropdownMenuItem>Category Four</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <nav className="flex-1 hidden md:flex justify-center gap-5 lg:gap-6  font-medium">
            <Link
              href="#"
              className="text-background transition-colors hover:text-foreground"
            >
              Accessories
            </Link>
            <Link
              href="#"
              className="text-background transition-colors hover:text-foreground"
            >
              Custom PC
            </Link>
          </nav>

          <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
            <Link
              href="#"
              className="text-background transition-colors hover:text-foreground"
            >
              Best Sellers
            </Link>
            <Link
              href="#"
              className="text-background transition-colors hover:text-foreground"
            >
              Offers
            </Link>
            <Link
              href="#"
              className="text-background transition-colors hover:text-foreground"
            >
              Blogs
            </Link>
            <Link
              href="#"
              className="text-background transition-colors hover:text-foreground"
            >
              Contact Us
            </Link>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link href="#" className="hover:text-foreground">
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Orders
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Products
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Customers
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Analytics
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </Container>
      </header>
    </div>
  );
}

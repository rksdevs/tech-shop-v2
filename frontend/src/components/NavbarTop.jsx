import { Phone, Facebook, Instagram, Youtube } from "lucide-react";
import Container from "./Container";
import { ModeToggle } from "./toggle-theme";

export function NavbarTop() {
  return (
    <div className="flex w-full flex-col">
      <header className="sticky top-0 flex h-8 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Container className="flex items-center justify-between">
          <div className="flex flex-rows items-center">
            <span className="text-[12px]">
              <Phone className="h-[14px]" />
            </span>
            <span className="text-[12px]">+91 (123) 456-7890</span>
          </div>
          <div className="flex flex-rows items-center gap-[5px]">
            <div className="pr-[10px] border-r border-solid border-r-1 ">
              <ModeToggle />
            </div>
            <div className="flex flex-rows items-center gap-[5px]">
              <Facebook className="h-[14px]" />
              <Instagram className="h-[14px]" />
              <Youtube className="h-[14px]" />
            </div>
          </div>
        </Container>
      </header>
    </div>
  );
}

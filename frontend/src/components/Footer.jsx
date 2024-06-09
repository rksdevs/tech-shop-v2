import React from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Container from "./Container";
import upiLogo from "../components/assets/images/upi.png";
import gpayLogo from "../components/assets/images/gpay.png";
import masterCardLogo from "../components/assets/images/mastercard.png";
import visaLogo from "../components/assets/images/visa.png";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <div className="flex w-full flex-col mt-8">
      <Container className="flex w-full items-center justify-between my-8">
        <div className="flex w-full items-center flex-col footer-left flex-grow-0 flex-shrink-0 basis-1/4">
          <h2 className="text-[24px] font-semibold flex flex-row items-center">
            COMPUTERMAKERS
            <div className="text-primary text-[48px] flex h-[50px] mt-[5px] items-end">
              .
            </div>
          </h2>
          <div className="flex flex-rows items-center gap-[5px]">
            <Facebook className="h-[14px]" />
            <Instagram className="h-[14px]" />
            <Youtube className="h-[14px]" />
          </div>
        </div>
        <div className="footer-middle flex gap-4 flex-1 text-left flex-grow-0 flex-shrink-0 basis-1/2 justify-evenly">
          <div className="Product flex flex-col gap-2">
            <div className="footer-sub-heading">
              <h2 className="font-bold text-large">Products</h2>
            </div>
            <ul className="footer-list text-muted-foreground">
              <li className="footer-list-item font-semibold text-[12px] hover:underline hover:pointer">
                Computers
              </li>
              <li className="footer-list-item font-semibold text-[12px] hover:underline hover:pointer">
                Laptops
              </li>
              <li className="footer-list-item font-semibold text-[12px] hover:underline hover:pointer">
                Components
              </li>
              <li className="footer-list-item font-semibold text-[12px] hover:underline hover:pointer">
                Accessories
              </li>
            </ul>
          </div>
          <div className="custom-builds flex flex-col gap-2">
            <div className="footer-sub-heading">
              <h2 className="font-bold text-large">Custom Builds</h2>
            </div>
            <ul className="footer-list text-muted-foreground">
              <li className="footer-list-item font-semibold text-[12px] hover:underline hover:pointer">
                Gaming PCs
              </li>
              <li className="footer-list-item font-semibold text-[12px] hover:underline hover:pointer">
                Office PCs
              </li>
              <li className="footer-list-item font-semibold text-[12px] hover:underline hover:pointer">
                Servers
              </li>
              <li className="footer-list-item font-semibold text-[12px] hover:underline hover:pointer">
                Build your pc
              </li>
            </ul>
          </div>
          <div className="About us flex flex-col gap-2">
            <div className="footer-sub-heading">
              <h2 className="font-bold text-large">About Us</h2>
            </div>
            <ul className="footer-list text-muted-foreground">
              <li className="footer-list-item font-semibold text-[12px] hover:underline hover:pointer">
                About us
              </li>
              <li className="footer-list-item font-semibold text-[12px] hover:underline hover:pointer">
                Contact us
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-right flex gap-4 justify-center flex-grow-0 flex-shrink-0 basis-1/4 self-baseline">
          <div className="payments flex flex-col gap-4">
            <div className="footer-sub-heading">
              <h2 className="font-bold text-large">Accepted Payments</h2>
            </div>
            <div className="payment-btns flex gap-2">
              <img src={visaLogo} alt="visa" className="h-[30px] w-[30px]" />
              <img
                src={masterCardLogo}
                alt="mastercard"
                className="h-[30px] w-[30px]"
              />
              <img src={gpayLogo} alt="gpay" className="h-[30px] w-[30px]" />
              <img src={upiLogo} alt="upi" className="h-[30px] w-[30px]" />
            </div>
          </div>
        </div>
      </Container>
      <footer className="sticky text-xs top-0 flex h-8 items-center gap-4 border-t bg-background px-4 md:px-6 mt-4 justify-center border-primary">
        Designed and Developed by{" "}
        <span className="hover:text-primary hover:font-bold hover:underline">
          rksdevs
        </span>
        <span>&copy; copyright {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

export default Footer;

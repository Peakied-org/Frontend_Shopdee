import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <div>
      <div className="bg-[#00BF7A] h-2 mt-10"></div>
      <div className="bg-[#EDEDED] relative w-full h-1/5 p-5">
        <div className="flex flex-row justify-between">
          <div className="content-center">
            Copyright © 2024 ShopDee Inc. All rights reserved.
          </div>
          <div>
            <div className="font-bold">Follow Us</div>
            <div className="flex items-center mx-3">
              <FaInstagram className="mr-2" />
              <span>Instagram</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
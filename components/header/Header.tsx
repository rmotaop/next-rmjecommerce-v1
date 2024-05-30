import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import { SearchBox } from "./SearchBox";
import { LogoIcon } from "@/public/images/logo/logo";

const Header = () => {
  return (
    <header className="md:max-lg:flex">
      <nav>
        <div className="navbar fixed z-50 justify-between bg-base-300">
          <div>
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>

          <div className="object-none bg-base-300">
            <Link href="/" className="btn btn-ghost">
              <LogoIcon className="h-12 w-48" />
            </Link>
          </div>

          <Menu />
        </div>
        <div className="object-cover bg-base-300">
          <Link href="/" className="bg-sky-300 ... btn btn-ghost"></Link>
        </div>
        <div className="bg-base-300 block md:hidden text-center pb-3">
          <SearchBox />
        </div>
      </nav>
    </header>
  );
};

export default Header;

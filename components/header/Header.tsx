import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import { SearchBox } from './SearchBox'
import { LogoIcon } from '@/public/images/logo/logo'

const Header = () => {
  return (
    <header className="">
      <nav>
        <div className="navbar fixed z-50 bg-base-300 min-[500px]:left">
          <div className="">
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost ">
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
          <div className="flex flex-wrap justify-around mx-auto min-[500px]:text-left">
            <div className="left-0">
              <Link href="/" className="btn btn-ghost">
                <LogoIcon className="h-12 w-48" />
              </Link>
            </div>
            <div className="left-0">
              <SearchBox />
            </div>
            <div className="left-0">
              <Menu />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

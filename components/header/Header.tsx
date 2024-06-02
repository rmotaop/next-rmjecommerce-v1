import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import { SearchBox } from './SearchBox'
import { LogoIcon } from '@/public/images/logo/logo'

const Header = () => {
  return (
    <header>
      <nav>
        <div className="flex flex-wrap max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <label
                  htmlFor="my-drawer"
                  className="btn btn-square btn-ghost "
                >
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

              <div className="hidden md:block">
                <div className="ml-4 flex items-center space-x-4">
                  <div className="">
                    <Link href="/" className="btn btn-ghost">
                      <LogoIcon className="h-12 w-48" />
                    </Link>
                  </div>
                  <div className="">
                    <SearchBox />
                  </div>
                </div>
              </div>

              <div>
                <Menu />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

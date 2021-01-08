import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

const Header = (): JSX.Element => {
  return (
    <header className="bg-white z-50 transition-all duration-200 border-b border-gray-200">
      <div className="flex flex-wrap relative justify-start items-center max-w-7xl px-4 py-5 mx-auto">
        <div className="flex flex-1 items-center">
          <nav className="flex-1 inline-flex justify-between font-medium   md:items-center w-full ">
            <NavLink
              aria-current="page"
              className="mr-8"
              exact
              to="/"
              activeClassName={`active-nav-link`}
            >
              <h1 className="flex items-center no-underline">
                <span className="text-xl font-medium">CoroniApp</span>
              </h1>
            </NavLink>
            <div className="hidden md:flex md:flex-1 ">
              {/* <NavLink
                to={'/'}
                exact
                activeClassName={`active-nav-link`}
                className={`block mt-4 no-underline md:inline-block md:mt-0 mx-8 transition-all duration-200 text-gray-500`}
              >
                Inicio
              </NavLink> */}
            </div>
            {/* <div className="hidden md:flex">
              <a
                className="transition-all duration-200 text-secondary-text hover:text-hover-text mt-4 no-underline inline-flex md:inline-block md:mt-0 mr-6"
                href="https://www.github.com/jordicasesnoves"
              >
                <svg
                  className="relative inline-flex items-center w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z"
                  ></path>
                </svg>
              </a>
              <a
                className="transition-all duration-200 text-secondary-text hover:text-hover-text  mt-4 no-underline inline-flex md:inline-block md:mt-0 mr-6"
                href="https://www.twitter.com/jordicasesnoves"
              >
                <svg
                  className="relative inline-flex items-center w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M22,5.8a8.49,8.49,0,0,1-2.36.64,4.13,4.13,0,0,0,1.81-2.27,8.21,8.21,0,0,1-2.61,1,4.1,4.1,0,0,0-7,3.74A11.64,11.64,0,0,1,3.39,4.62a4.16,4.16,0,0,0-.55,2.07A4.09,4.09,0,0,0,4.66,10.1,4.05,4.05,0,0,1,2.8,9.59v.05a4.1,4.1,0,0,0,3.3,4A3.93,3.93,0,0,1,5,13.81a4.9,4.9,0,0,1-.77-.07,4.11,4.11,0,0,0,3.83,2.84A8.22,8.22,0,0,1,3,18.34a7.93,7.93,0,0,1-1-.06,11.57,11.57,0,0,0,6.29,1.85A11.59,11.59,0,0,0,20,8.45c0-.17,0-.35,0-.53A8.43,8.43,0,0,0,22,5.8Z"
                  ></path>
                </svg>
              </a>
              <a
                className="transition-all duration-200 text-secondary-text hover:text-hover-text  mt-4 no-underline inline-flex md:inline-block md:mt-0 "
                href="https://www.linkedin.com/in/jordicasesnoves/"
              >
                <svg
                  className="relative inline-flex items-center w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48h0a1.56,1.56,0,1,1,0-3.12,1.57,1.57,0,1,1,0,3.12ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z"
                  ></path>
                </svg>
              </a>
            </div> */}
          </nav>
          <button className="absolute right-0 items-center block px-4 py-2 rounded md:hidden">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
              <title>Menu</title>
              <svg
                className="relative inline-flex items-center w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M3,8H21a1,1,0,0,0,0-2H3A1,1,0,0,0,3,8Zm18,8H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm0-5H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"
                ></path>
              </svg>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { CloseSquare, HambergerMenu } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { truncateEthAddress } from "../utils/truncAddress";
import Image from 'next/image';
import { useWallet } from "../hooks/useWallet";

function Header() {
  const {
    isWalletConnected,
    account,
    connect, // useWallet からの connect 関数
    disconnectWallet, // useWallet からの disconnect 関数
  } = useWallet();

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const currentRoute = router.pathname;
  const [hasScrolled, setHasScrolled] = useState(false);
      
  const changeNavbar = () => {
    if (window.scrollY >= 20) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", changeNavbar);
  }, []);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <section
        className={` ${
          isOpen
            ? `sticky top-0 z-[100] w-full  sm:px-4 transition duration-250 ease-in-out left-[0] `
            : `sticky top-0 z-[100] w-full  sm:px-4 transition duration-250 ease-in-out left-[-100%]`
        }`}
      >
        <nav
          className={
            hasScrolled
              ? ` font-body flex items-center justify-between max-w-[1240px] mb-2 mx-auto h-16 md:px-4 md:mx-5 backdrop-blur-sm bg-black sm:px-1 ssm:p-1 transition duration-250 ease-in-out border border-solid border-sky-600`
              : ` font-body flex items-center justify-between max-w-[1440px] mb-2 mx-auto h-16 md:px-4 md:mx-5 bg-black sm:px-1 ssm:p-1 transition duration-250 ease-in-out`
          }
        >
          {/* <h2 className="text-2xl sm:text-3xl text-white ml-3">
            <Link href="/">
              <a>Treasure Art</a>
            </Link>
          </h2> */}
          <h2 className="mx-2 mb-2">
            <Link href="/">
              <a>
                <Image
                  src="/images/Treasure Art_LOGO_M.png"
                  alt="Treasure Art Logo"
                  width={130}
                  height={45}
                />
              </a>
            </Link>
          </h2>
          <ul className="flex gap-3 items-center justify-center transition-all list-none sm:hidden">
            <li>
              <Link href="/dashboard">
                <a
                  className={
                    currentRoute === "/dashboard"
                      ? "text-white text-base font-medium"
                      : "text-gray-500 font-normal hover:text-sky-500" // 黒背景に対して見えるように、ホバーカラーを更新
                  }
                >
                  Home
                </a>
              </Link>
            </li>

            <li>
              <Link href="/createnft">
                <a
                  className={
                    currentRoute === "/createnft"
                      ? "text-white text-base font-medium"
                      : "text-gray-500 font-normal hover:text-white"
                  }
                >
                  Create NFTs
                </a>
              </Link>
            </li>
            <li>
              <Link href="/updated_dashboard">
                <a
                  className={
                    currentRoute === "/profile"
                      ? "text-white text-base font-medium"
                      : "text-gray-500 font-normal hover:text-white"
                  }
                >
                  Profile
                </a>
              </Link>
            </li>
            <li>
              <Link href="/square">
                <a
                  className={
                    currentRoute === "/square"
                      ? "text-white text-base font-medium"
                      : "text-gray-500 font-normal hover:text-white"
                  }
                >
                  Playlist
                </a>
              </Link>
            </li>
          </ul>

          <div className="flex items-center justify-end space-x-4">
            {account ? (
              <button
                onClick={disconnectWallet}
                className="text-xs sm:text-sm bg-sky-500 px-1 sm:px-2 py-0.5 sm:py-1 rounded hover:bg-blue-800"
              >
                DisconnectWallet
              </button>
            ) : (
              <button
                onClick={connect}
                className="text-xs sm:text-sm bg-blue-600 px-1 sm:px-2 py-0.5 sm:py-1 rounded hover:bg-blue-700"
              >
                ConnectWallet
              </button>
            )}
            <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800 sm:hidden">
              {truncateEthAddress(account)}
            </p>
          </div>

          <div className="hidden sm:block cursor-pointer" onClick={toggle}>
            <HambergerMenu size="32" color="#d9e3f0" />
          </div>
        </nav>
      </section>

      <section
        className={`${
          isOpen
            ? `block fixed h-screen z-[999] w-screen  backdrop-blur-lg bg-[#000000]/60  top-0 left-0 transition-all font-body`
            : `hidden`
        }`}
      >
        <div className="grid items-center justify-center h-screen grid-rows-3 text-center">
          <CloseSquare
            size="32"
            color="#d9e3f0"
            onClick={toggle}
            className="absolute top-[1.2rem] right-[1.2rem] bg-transparent  cursor-pointer text-center"
          />

          <h2 className="text-2xl ">
            <Link href="/">
              <a>Treasure Art</a>
            </Link>
          </h2>
          <ul className="grid gap-3 grid-rows-3 items-center justify-center transition-all list-none nav_links text-lg">
            <li>
              <Link href="/dashboard">
                <a
                  className={
                    currentRoute === "/dashboard"
                      ? "text-white text-base font-medium"
                      : "text-gray-500 font-normal hover:text-white"
                  }
                >
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href="/createnft">
                <a
                  className={
                    currentRoute === "/createnft"
                      ? "text-white text-base font-medium"
                      : "text-gray-500 font-normal hover:text-white"
                  }
                >
                  Create NFTs
                </a>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <a
                  className={
                    currentRoute === "/profile"
                      ? "text-white text-base font-medium"
                      : "text-gray-500 font-normal hover:text-white"
                  }
                >
                  Profile
                </a>
              </Link>
            </li>
            <li>
              <Link href="/square">
                <a
                  className={
                    currentRoute === "/square"
                      ? "text-white text-base font-medium"
                      : "text-gray-500 font-normal hover:text-white"
                  }
                >
                  Playlist
                </a>
              </Link>
            </li>
          </ul>

          <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800 ">
            {truncateEthAddress(account)}
          </p>
        </div>
      </section>
    </>
  );
};

export default Header;

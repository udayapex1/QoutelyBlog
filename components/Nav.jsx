"use client";
import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

export const Nav = () => {
  const {data : session} = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);


  useEffect(() => {
    const setUpprovider = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpprovider();
  }, []);

  const isUserLoggedIn = true; // Adjust this based on your authentication logic

  return (
    <nav className="p-5 justify-center flex-between  w-full mb-16 pt-3 sticky top-5 z-50  bg-white/35 shadow-custom backdrop-blur-md  border  rounded-[50px] ">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/icons/logo.png"
          width={80}
          height={80}
          className="object-contain"
        />
        <p className="logo_text">Quotely</p>
      </Link>

      {/* Desktop Navbar */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Upload Quotes
            </Link>
            <button className="outline_btn" type="button" onClick={() =>{
              signOut(),
              alert("You are trying to signout, see you soon")
            }}>
              Sign Out
            </button>
            {/* <Link href="/profile"> */}
              <Image
              className="rounded-full "
                src={session?.user.image}
                width={40}
                height={40}
                alt="user-profile"
              />
            {/* </Link> */}
          </div>
        ) : (
          <div>
            {providers && Object.values(providers).map((provider) => (
              <button
                key={provider.id}
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign In with <span className="text-transparent">fsa</span> <Image
                    src="/assets/images/Glogo.png"
                    height={20}
                    width={20}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Navbar */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={40}
              height={40}
              alt="user-profile"
              role="button"
              tabIndex={0}
              onClick={() => setToggleDropdown((prev) => !prev)}
              className="cursor-pointer rounded-full"
            />
            {/* <p>{session?.user.name}</p> */}
            
          

            {/* Dropdown Menu */}
            {toggleDropdown && (
              <div
               className="dropdown">
                {/* <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(!toggleDropdown)}
                >
                  My Profile
                </Link> */}
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Upload Quotes
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button
                key={provider.id}
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign In with {provider.name}
              </button>
            ))}
          </>
        )}
      </div>
    </nav>
  );
};

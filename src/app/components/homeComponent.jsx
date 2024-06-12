"use client";
import "./home.css";
import "../globals.css"
import React, { useRef, useEffect } from "react";
import { Merienda } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa"; //<FaUserCircle />
import { CldImage } from "next-cloudinary";

const merienda = Merienda({ subsets: ["latin"] });

const HomeComponent = (props) => {
  const left = useRef(null);
  const h1Ref = useRef(null);

  useEffect(() => {
    const handleOnMove = (e) => {
      if (left.current && h1Ref.current) {
        const leftWidth = (e.clientX / window.innerWidth) * 100;
        left.current.style.width = `${leftWidth}%`;
        const h1Left = leftWidth > 50 ? `${leftWidth}%` : "50%";
        h1Ref.current.style.left = h1Left;
      };
    }

    window.addEventListener("mousemove", handleOnMove);
    window.addEventListener("touchmove", handleOnMove);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("mousemove", handleOnMove);
      window.removeEventListener("touchmove", handleOnMove);
    };
  }, []);

  return (
    <div className="w-full">
      {/* LEFT SIDE */}
      <div
        ref={left}
        className="bg-sidebar-dark2 text-white h-screen w-screen absolute leading-none side z-10">
        <nav className="bg-transparent w-full text-xl flex items-center justify-between px-6 pt-4 sm:text-3xl sm:pt-12">
          <ul className="flex">
            <li className="mr-6">
              <Link href="/">HOME</Link>
            </li>
            <li className="mr-6">
              <a href="#">About</a>
            </li>
          </ul>
          <div className="flex items-center">
            {props.session &&
              <Link className="mr-6 mt-1.5" href="/hub/leagues">
                Hub
              </Link>}
            {props.session ? (props.user ?
              <CldImage
                src={props.image}
                className={`h-9 w-9 sm:h-14 sm:w-14 border rounded-full`}
                width={50}
                height={50}
                crop={"fill"}
                alt="User Profile Image"
              />
              :
              <Image
                src={props.image}
                width={50}
                height={50}
                className={`h-9 w-9 sm:h-14 sm:w-14 border rounded-full`}
                alt="User Profile Image"
              />
            ) : (
              <button className="">
                <Link className="" href="/login">
                  LogIn / SignIn
                </Link>
              </button>
            )}
          </div>
        </nav>
        <h1
          ref={h1Ref}
          className="title text-5xl sm:text-7xl md:text-8xl xl:px-32"
        >
          Ultimate League & Team{" "}
          <span className={`${merienda.className} text-sidebar-light2`}>
            Manager
          </span>
        </h1>
      </div>
      {/* RIGHT SIDE */}
      <div className="bg-sidebar-light h-screen w-screen absolute leading-none side">
        <nav className="bg-transparent w-full text-xl flex items-center justify-between px-6 pt-4 sm:text-3xl sm:pt-12">
          <ul className="flex">
            <li className="mr-6">
              <Link href="/">HOME</Link>
            </li>
            <li className="mr-6">
              <a href="#">About</a>
            </li>
          </ul>
          <div className="flex items-center">
            {props.session &&
              <Link className="mr-6 mt-1.5" href="/hub/leagues">
                Hub
              </Link>}
            {props.session ? (props.user ?
              <CldImage
                src={props.image}
                className={`h-9 w-9 sm:h-14 sm:w-14 border rounded-full`}
                width={50}
                height={50}
                crop={"fill"}
                alt="User Profile Image"
              /> :
              <Image
                src={props.image}
                width={50}
                height={50}
                className={`h-9 w-9 sm:h-14 sm:w-14 border rounded-full`}
                alt="User Profile Image" />
            ) : (
              <button className="">
                <Link className="" href="/login">
                  LogIn / SignIn
                </Link>
              </button>
            )}
          </div>
        </nav>
        <h1 className="title text-5xl sm:text-7xl md:text-8xl xl:px-32">
          Ultimate League & Team{" "}
          <span className={`${merienda.className} text-sidebar-dark`}>
            Creator
          </span>
        </h1>
      </div>
    </div>
  );
};

export default HomeComponent;

import Link from "next/link";

import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import {FcGoogle} from "react-icons/fc";
import {MdOutlineArrowBackIos} from "react-icons/md";
import "./login.css";

export default function Login() {
  const token = cookies().get("access-token");
  if (token) {
    const user = jwt.decode(token.value);
    console.log(user);
  }

  return (
    <div className="relative h-screen font-light">
      {/* RIGHT SIDE */}
      <div className="absolute right-0 h-screen bg-sidebar-light w-1/3 z-10 flex items-center">
        <div>
          <p className="text-white text-center text-5xl px-3 pb-7">
            New to League Creator?
          </p>
          <p className="text-white text-center text-xl px-6 pb-10">
            Sign up to start and your leagues and tournaments
          </p>
          <div className="flex justify-center">
            <button className="rounded-full bg-background-light border-2 w-2/3 py-3">
              Sign Up
            </button>
          </div>
        </div>
        <div className="triangle -z-10"></div>
      </div>
      {/* LEFT SIDE */}
      <div className="absolute left-0 w-2/3 h-screen flex flex-col justify-center items-center">
        <Link className="absolute left-0 top-0 mt-5 ms-5" href={"/"}>
          <MdOutlineArrowBackIos className="back-icon" />
        </Link>
        <p className="text-center text-6xl mb-10 w-3/5">
          Login to League Creator
        </p>
        <button className="flex items-center justify-center gap-3 rounded-full bg-background-light border-2 w-2/5 py-3">
          Log in With Google{" "}
          <span className="">
            <FcGoogle className="google-icon" />
          </span>
        </button>
        <div className="container flex justify-center items-center gap-5 py-8">
          <div className="border rounded-full h-0 border-gray-400 w-1/4"></div>
          <p>OR</p>
          <div className="border rounded-full h-0 border-gray-400 w-1/4"></div>
        </div>
        <div className="container flex flex-col items-center gap-3">
          <input
            type="text"
            placeholder="Username"
            className="rounded-full bg-background-light border-2 w-2/5 ps-6 py-3"
          ></input>
          <input
            type="password"
            placeholder="Password"
            className="rounded-full bg-background-light border-2 w-2/5 ps-6 py-3"
          ></input>
        </div>
      </div>
    </div>
  );
}

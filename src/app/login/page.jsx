import Link from "next/link";
import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import {FcGoogle} from "react-icons/fc";
import {MdOutlineArrowBackIos} from "react-icons/md";
import "./login.css";
import { login } from "./actions";
import { auth, signOut, signIn } from "auth";
import React from "react";
import google from "next-auth/providers/google";
import NextAuth from "next-auth";


const Login = async () => {
  const token = cookies().get("access-token");
  if (token) {
    const user = jwt.decode(token.value);
    console.log(user);
  }

  const session = await auth()

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
          <Link href={"/login/register"}>
            <button className="rounded-full bg-background-light border-2 w-2/3 py-3">
              Sign Up
            </button>
          </Link>  
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
        <form className="flex items-center justify-center rounded-full bg-background-light border-2 py-3 w-2/5" 
          action={async() => {
            "use server" 
            await signIn("google")
            await Login()
        }}>
          <button type="submit" className="flex items-center justify-center gap-3 rounded-full bg-background-light h-full w-full">
            Log in With Google{" "}
            <span className="h-full">
              <FcGoogle className="google-icon" />
            </span>
          </button>
        </form>
        <div className="container flex justify-center items-center gap-5 py-8">
          <div className="border rounded-full h-0 border-gray-400 w-1/4"></div>
          <p>OR</p>
          <div className="border rounded-full h-0 border-gray-400 w-1/4"></div>
        </div>
        <div className="container">
        <form action={login} className=" flex flex-col items-center gap-3">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Username"
            className="rounded-full bg-background-light border-2 w-2/5 ps-6 py-3"
          ></input>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            className="rounded-full bg-background-light border-2 w-2/5 ps-6 py-3"
          ></input>
          <button type="submit" className="bg-sidebar-light rounded-full border-2 w-2/5 py-3">
            Sign In
          </button>
        </form>
        </div>
        <div>
          {session && session.user &&
            <div>
              <p>{session.user.name}</p>
              <form action={async() => {
                "use server"
                await signOut()
              }}>
                <button type="submit">Sign Out</button>
              </form>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Login;
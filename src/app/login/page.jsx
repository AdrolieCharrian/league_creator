import Link from "next/link";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { logout } from "./actions";
import { login } from "./actions";
import { auth, signOut, signIn } from "auth";
import React from "react";
import "./login.css";
import "../globals.css"

const Login = async () => {
  const token = cookies().get("access-token");
  const user = token && jwt.decode(token.value)

  const session = await auth()

  return (
    <div className="h-screen font-light">
      {/* LEFT/BOT SIDE */}
      <div className="left-0 flex flex-col items-center pt-2 pb-6 md:text-xl md:h-screen md:absolute md:justify-center
      md:w-3/5 xl:text-base xl:w-2/3">
        <Link className="absolute left-0 top-0 mt-5 md:ms-5 z-20" href={"/"}>
          <MdOutlineArrowBackIos className="back-icon md:back-icon" />
        </Link>
        <p className="text-center mb-6 text-4xl w-4/5 pt-8 md:text-7xl md:w-3/5 xl:text-6xl 2xl:text-7xl">
          Login to League Creator
        </p>
        <form className="flex items-center justify-center rounded-full bg-background-light border-2 py-3"
          action={async () => {
            "use server"
            await signIn("google", { redirectTo: "/hub/leagues" })
          }}>
          <button type="submit" className="bg-background-light flex items-center justify-center gap-3 rounded-full
          h-full w-full px-8 md:px-12">
            Log in With Google{" "}
            <span className="">
              <FcGoogle className="google-icon" />
            </span>
          </button>
        </form>
        <div className="container flex justify-center items-center gap-5 py-4 md:py-8">
          <div className="border rounded-full h-0 border-gray-400 w-1/4"></div>
          <p>OR</p>
          <div className="border rounded-full h-0 border-gray-400 w-1/4"></div>
        </div>
        <div className="container">
          <form action={login} className="flex flex-col items-center gap-3">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              required
              className="bg-background-light rounded-full border-2 w-3/5 ps-6 py-3 xl:w-2/6"
            ></input>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              required
              className="bg-background-light rounded-full border-2 w-3/5 ps-6 py-3 xl:w-2/6"
            ></input>
            <button type="submit" className="bg-sidebar-light rounded-full border-2 w-2/5 py-3 xl:w-2/6">
              Sign In
            </button>
          </form>
        </div>
        {(session || user) && <div>
          {session ?
            (<div>
              <p>{session?.user.name}</p>
              <form action={async () => {
                "use server"
                await signOut("google")
              }}>
                <button type="submit">Sign Out</button>
              </form>
            </div>)
            :
            (<div>
              <p>{user?.name}</p>
              <form action={async () => {
                "use server"
                logout(token)
              }}>
                <button type="submit">Sign Out</button>
              </form>
            </div>)
          }
        </div>}
      </div>
      {/* RIGHT/TOP SIDE */}
      <div className="relative bg-sidebar-light flex items-center md:absolute right-0 md:h-screen md:w-2/5 xl:w-1/3 z-10">
        <div className="py-8">
          <p className="text-white text-center text-4xl px-3 md:text-6xl md:pb-4 xl:px-6">
            New to League Creator?
          </p>
          <p className="text-white text-center text-lg px-6 py-4 md:text-xl xl:text-base xl:px-12">
            Sign up to start and your leagues and tournaments
          </p>
          <div className="flex justify-center">
            <Link className="bg-background-light text-center rounded-full border-2 w-1/3 py-3 md:w-2/3 xl:w-3/5" href={"/login/register"}>
              <button className="">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
        <div className="triangle -z-10"></div>
      </div>
    </div>
  );
}

export default Login;
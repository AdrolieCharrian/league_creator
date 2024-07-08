import Link from "next/link";
import { register } from "../actions";
import { MdOutlineArrowBackIos } from "react-icons/md";
import "./register.css"
import DarkButton from "@/app/components/DarkButton";
const Register = async () => {

  return (
    <div className="h-screen font-light bg-white dark:bg-background-dark">
      {/* LEFT/BOT SIDE */}
      <div className="left-0 flex flex-col items-center pt-2 pb-6 md:text-xl md:h-screen md:absolute md:justify-center
      md:w-3/5 xl:text-base xl:w-2/3">
        <Link className="absolute left-0 top-0 mt-5 md:ms-5 z-20" href={"/"}>
          <MdOutlineArrowBackIos className="back-icon md:back-icon dark:text-white" />
        </Link>
        <p className="text-center text-4xl w-4/5 pt-8 md:text-7xl md:w-3/5 xl:text-6xl 2xl:text-7xl dark:text-white">
          Sign up with League Creator
        </p>
        <div className="border rounded-full h-0 border-gray-400 w-4/5 my-4"></div>
        <div className="container">
          <form action={register} className="flex flex-col items-center gap-3">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              className="bg-background-light rounded-full border-2 w-3/5 ps-6 py-3 xl:w-2/6"
            ></input>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              className="bg-background-light rounded-full border-2 w-3/5 ps-6 py-3 xl:w-2/6"
            ></input>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="bg-background-light rounded-full border-2 w-3/5 ps-6 py-3 xl:w-2/6"
            ></input>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm Password"
              className="bg-background-light rounded-full border-2 w-3/5 ps-6 py-3 xl:w-2/6"
            ></input>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="bg-background-light rounded-full border-2 w-3/5 ps-6 py-3 xl:w-2/6"
            ></input>
            <input
              type="text"
              id="surname"
              name="surname"
              placeholder="Surname"
              className="bg-background-light rounded-full border-2 w-3/5 ps-6 py-3 xl:w-2/6"
            ></input>
            <input
              type="text"
              id="favnumber"
              name="favnumber"
              placeholder="Favorite number"
              className="bg-background-light rounded-full border-2 w-3/5 ps-6 py-3 xl:w-2/6"
            ></input>
            <button type="submit" className="bg-sidebar-light dark:bg-sidebar-dark dark:text-white rounded-full border-2 w-2/5 py-3 xl:w-2/6">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      {/* RIGHT/TOP SIDE */}
      <div className="relative bg-sidebar-light dark:bg-sidebar-dark flex items-center md:absolute right-0 md:h-screen md:w-2/5 xl:w-1/3 z-10">
        <div className="py-8">
          <p className="text-white text-center text-4xl pb-4 px-3 md:text-6xl md:pb-6 xl:px-8">
            Already Have an Account?
          </p>
          <div className="flex justify-center">
            <Link className="bg-background-light text-center rounded-full border-2 w-1/3 py-3 md:w-2/3 xl:w-3/5" href={"/login"}>
              <button className="">
                Log In
              </button>
            </Link>
          </div>
          <div className="flex justify-center mt-4">
            <DarkButton />
          </div>
        </div>
        <div className="triangle -z-10 dark:bg-sidebar-dark2"></div>
      </div>
    </div>
  );
}


export default Register
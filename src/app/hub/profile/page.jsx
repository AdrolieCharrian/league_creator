import React from "react";
import { auth } from "auth";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import ImageForm from "@/app/components/profile/imageForm";
import Image from "next/image";
import { saveProfile, saveProfileGoogle } from "./actions";

const Profile = async () => {
  const session = await auth()
  const token = cookies().get("access-token");
  const user = token && jwt.decode(token.value)

  function checkImage() {
    if (session) {
      return session.user.image
    } else if (user) {
      return user.image
    }
  }
  function checkName() {
    if (session) {
      return session.user.name
    } else if (user) {
      return user.name
    }
  }
  function checkSurname() {
    if (session) {
      return session.user.surname
    } else if (user) {
      return user.surname
    }
  }
  function checkEmail() {
    if (session) {
      return session.user.email
    } else if (user) {
      return user.email
    }
  }
  function checkUsername() {
    if (session) {
      return session.user.username
    } else if (user) {
      return user.username
    }
  }
  function checkFavnumber() {
    if (session) {
      return session.user.favnumber
    } else if (user) {
      return user.favnumber
    }
  }
  function checkDescription() {
    if (session) {
      return session.user.description
    } else if (user) {
      return user.description
    }
  }

  return (
    <div className="container">
      <div className="flex flex-col justify-center items-center">
        {user ? (
          <ImageForm image={checkImage()} />
        ) : (
          <div className="rounded-full overflow-hidden">
            <Image width={90} height={90} quality={100} className="object-contain" src={checkImage()} alt="user-image" />
          </div>
        )}
        <h1 className="text-2xl pt-4 dark:text-white">{checkName()}{"'s Profile"}</h1>
      </div>
      <div>
        <form className="flex flex-col items-center" action={!session ? saveProfile : saveProfileGoogle}>
          <label htmlFor="email" className="flex flex-col mt-4 w-full md:w-4/5 xl:w-3/5">
            <span className="text-lg ms-4 dark:text-white" >
              Email
            </span>
            <input id="email" name="email" type="email" defaultValue={checkEmail()}
              className="bg-background-light rounded-full w-full ps-4 py-3 text-sm" />
          </label>
          <label htmlFor="username" className="flex flex-col mt-4 w-full md:w-4/5 xl:w-3/5">
            <span className="text-lg ms-4 dark:text-white" >
              Username
            </span>
            <input id="username" name="username" type="text" defaultValue={checkUsername()}
              className="bg-background-light rounded-full w-full ps-4 py-3 text-sm" />
          </label>
          <label htmlFor="favnumber" className="flex flex-col mt-4 w-full md:w-4/5 xl:w-3/5">
            <span className="text-lg ms-4 dark:text-white" >
              Favorite Number
            </span>
            <input id="favnumber" name="favnumber" type="text" defaultValue={checkFavnumber()}
              className="bg-background-light rounded-full w-full ps-4 py-3 text-sm" />
          </label>
          <label htmlFor="name" className="flex flex-col mt-4 w-full md:w-4/5 xl:w-3/5">
            <span className="text-lg ms-4 dark:text-white" >
              Name
            </span>
            <input id="name" name="name" type="text" defaultValue={checkName()}
              className="bg-background-light rounded-full w-full ps-4 py-3 text-sm" />
          </label>
          <label htmlFor="surname" className="flex flex-col mt-4 w-full md:w-4/5 xl:w-3/5">
            <span className="text-lg ms-4 dark:text-white" >
              Surname
            </span>
            <input id="surname" name="surname" type="text" defaultValue={checkSurname()} placeholder="Your Surname"
              className="bg-background-light rounded-full w-full ps-4 py-3 text-sm" />
          </label>
          <label htmlFor="description" className="flex flex-col mt-4 w-full md:w-4/5 xl:w-3/5">
            <span className="text-lg ms-4 dark:text-white" >
              Description
            </span>
            <textarea id="description" name="description" type="text" defaultValue={checkDescription()} placeholder="Describe Yourself"
              className="bg-background-light rounded-xl h-full w-full ps-4 py-3 text-sm" />
          </label>
          {token &&
            <div className="w-full md:w-4/5 xl:w-3/5">
              <label htmlFor="password" className="flex flex-col mt-4 w-full">
                <span className="text-lg ms-4 dark:text-white" >
                  Change Password
                </span>
                <input id="password" name="password" type="password" placeholder="New Password"
                  className="bg-background-light rounded-full h-full w-full ps-4 py-3 text-sm" />
              </label>
              <label htmlFor="description" className="flex flex-col mt-4 w-full ">
                <span className="text-lg ms-4 dark:text-white" >
                  Confirm Password
                </span>
                <input id="confirm" name="confirm" type="password" placeholder="Confirm Password"
                  className="bg-background-light rounded-full h-full w-full ps-4 py-3 text-sm" />
              </label>
            </div>}
          <button type="submit" className="bg-sidebar-light dark:bg-sidebar-dark dark:text-white rounded-full border-2 w-2/5 py-3 xl:w-2/6 mt-5">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

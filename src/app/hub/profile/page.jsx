import React from "react";
import { auth } from "auth";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

//use CustomProvider to add non-google users to session

const Profile = async () => {
  const session = await auth()
  const token = cookies().get("access-token");
  const user = token && jwt.decode(token.value)

  function checkImage() {
    if(session) {
      return session.user.image
    } else if (user) {
      return user.image
    }
  }
  function checkName() {
    if(session) {
      return session.user.name
    } else if (user) {
      return user.name
    }
  }
  function checkSurname() {
    if(session) {
      return session.user.surname
    } else if (user) {
      return user.surname
    }
  }
  function checkEmail() {
    if(session) {
      return session.user.email
    } else if (user) {
      return user.email
    }
  }
  function checkDescription() {
    if(session) {
      return session.user.description
    } else if (user) {
      return user.description
    }
  }


  return (
    <div className="container">
      <div className="flex flex-col justify-center items-center">
        {session || user.image ? (
          <div className="rounded-full overflow-hidden">
            <Image width={90} height={90} quality={100} className="object-contain" src={checkImage()} alt="user-image" />
          </div>  
          ) : (
          <FaUserCircle style={{width:"90px", height:"90px", color: "gray"}} />)}
        <h1 className="text-2xl pt-4">{checkName()}'s Profile</h1>
      </div>
      <div className="">
        <form action="">
            <label htmlFor="email" className="flex flex-col mt-4">
              <span className="text-lg ms-4" >
                Email
              </span>
              <input id="email" name="email" type="email" defaultValue={checkEmail()} disabled
              className="bg-background-light rounded-full w-full ps-4 py-3 text-sm" />
            </label>
            <label htmlFor="name" className="flex flex-col mt-4">
              <span className="text-lg ms-4" >
                Name
              </span>
              <input id="name" name="name" type="text" defaultValue={checkName()}
              className="bg-background-light rounded-full w-full ps-4 py-3 text-sm" />
            </label>
            <label htmlFor="surname" className="flex flex-col mt-4">
              <span className="text-lg ms-4" >
                Surname
              </span>
              <input id="surname" name="surname" type="text" defaultValue={checkSurname()} placeholder="Your Surname"
              className="bg-background-light rounded-full w-full ps-4 py-3 text-sm" />
            </label>
            <label htmlFor="description" className="flex flex-col mt-4">
              <span className="text-lg ms-4" >
                Description
              </span>
              <textarea id="description" name="description" type="text" defaultValue={checkDescription()} placeholder="Describe Yourself"
              className="bg-background-light rounded-xl h-full w-full ps-4 py-3 text-sm" />
            </label>
            {token && 
            <div>
              <label htmlFor="password" className="flex flex-col mt-4">
                <span className="text-lg ms-4" >
                  Change Password
                </span>
                <input id="password" name="password" type="text" placeholder="New Password"
                className="bg-background-light rounded-full h-full w-full ps-4 py-3 text-sm" />
              </label>
              <label htmlFor="description" className="flex flex-col mt-4">
                <span className="text-lg ms-4" >
                  Confirm Password
                </span>
                <input id="confirm" name="confirm" type="text" placeholder="Confirm Password"
                className="bg-background-light rounded-full h-full w-full ps-4 py-3 text-sm" />
              </label>
            </div>}
            <button type="submit" className="bg-sidebar-light rounded-full border-2 w-2/5 py-3 xl:w-2/6 mt-4">
              Save
            </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

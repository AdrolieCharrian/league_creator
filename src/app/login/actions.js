"use server";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { auth, signOut } from "auth";

export const login = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    console.log("User not found");
    return;
  }
  console.log("User found", user);

  //if user exists desctructure password in DB
  const { salt, hash } = JSON.parse(user.password);

  //assign to a new hash variable the result
  const computedHash = bcrypt.hashSync(password, salt);

  //if the DB hash and the reencrypted hash match, log in
  if (hash !== computedHash) {
    console.log("Invalid password");
    return;
  }
  console.log("Logged in");

  // Generate JWT token
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      surname: user.surname,
      username: user.username,
      image: user.image,
      description: user.description,
    },
    "1234"
  );
  console.log(token);

  // Set token in cookie
  cookies().set("access-token", token);
  console.log("Token Set: ", token);

  redirect("/hub/leagues");
};

export const register = async (formData) => {
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");
  const confirm = formData.get("confirm-password");
  const name = formData.get("name");
  const surname = formData.get("surname");
  const favnumber = formData.get("number");

  if (password == confirm) {
    try {
      //create deafault salt
      const salt = bcrypt.genSaltSync(10);
      //create new hash with the password feom request (pass+salt)
      const hash = bcrypt.hashSync(password, salt);
      //convert to string
      const passwordString = JSON.stringify({ hash, salt });

      const user = await prisma.user.create({
        data: {
          email: email,
          username: username,
          password: passwordString,
          name: name,
          surname: surname,
          favnumber: favnumber
        },
      });
      console.log(NextResponse.json({ user }));
      console.log("Created User");
    } catch (error) {
      console.error(error);
      return NextResponse.error("Error al creating user");
    }
    redirect("/login");
  } else {
    console.error("passwords don't match");
  }
};

export const logout = (token) => {
  cookies().delete(token);
};

export const accountSignOut = async () => {
    const session = await auth();
    const token = cookies().get("access-token");

    if (session) {
      await signOut({ redirectTo: "/" });
    } else if (token) {
      logout(token);
      redirect("/")
    }
};

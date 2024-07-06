"use server"
import { auth } from "auth";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import {redirect} from "next/navigation";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import {NextResponse} from "next/server";

export const saveProfile = async (formData) => {
    const email = formData.get("email")
    const name = formData.get("name")
    const surname = formData.get("surname")
    const username = formData.get("username")
    const description = formData.get("description")
    const password = formData.get("password")
    const confirm = formData.get("confirm")
    const favnumber = formData.get("favnumber")

    if (password && password == confirm) {
        try {
            //create deafault salt
            const salt = bcrypt.genSaltSync(10);
            //create new hash with the password feom request (pass+salt)
            const hash = bcrypt.hashSync(password, salt);
            //convert to string
            const passwordString = JSON.stringify({hash, salt});

            const updatedUser = await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    username: username,
                    password: passwordString,
                    name: name,
                    surname: surname,
                    description: description,
                    favnumber: favnumber
                }
            })
            const token = jwt.sign(
                {
                    id: updatedUser.id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    surname: updatedUser.surname,
                    username: updatedUser.username,
                    image: updatedUser.image,
                    description: updatedUser.description,
                    favnumber: updatedUser.favnumber
                },
                "1234"
            );
            
            // Set token in cookie
            cookies().set("access-token", token);
            console.log(NextResponse.json({updatedUser}));
            console.log("Updated User");
        } catch(error) {
            console.error(error);
            return NextResponse.error("Error updating user");
        }
        redirect("/hub/profile");
    } else if (!password) {
        try {
            const updatedUser = await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    username: username,
                    name: name,
                    surname: surname,
                    description: description,
                    favnumber: favnumber
                }
            })
            const token = jwt.sign(
                {
                    id: updatedUser.id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    surname: updatedUser.surname,
                    username: updatedUser.username,
                    image: updatedUser.image,
                    description: updatedUser.description,
                    favnumber: updatedUser.favnumber
                },
                "1234"
            );
            console.log(token);
            
            // Set token in cookie
            cookies().set("access-token", token);
            console.log(NextResponse.json({updatedUser}));
            console.log("Updated User");
        } catch(error) {
            console.error(error);
            return NextResponse.error("Error updating user");
        }
        redirect("/hub/profile");
    } else {
        console.error("passwords don't match");
    }
}

export const saveProfileGoogle = async (formData) => {
    const email = formData.get("email")
    const username = formData.get("username")
    const name = formData.get("name")
    const surname = formData.get("surname")
    const description = formData.get("description")
    const favnumber = formData.get("favnumber")

        try {
            console.log(email)
            const updatedUser = await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    name: name,
                    surname: surname,
                    username: username,
                    description: description,
                    favnumber: favnumber
                }
            })
            console.log(NextResponse.json({updatedUser}));
            console.log("Updated User");
        } catch(error) {
            console.error(error);
            return NextResponse.error("Error updating user");
        }
}

export const saveImage = async (img) => {
    const session = await auth();
    const token = cookies().get("access-token");
    const localUser = token && jwt.decode(token.value)
    const email = !session ? localUser?.email : session.user.email;

    try {
        const updatedUserImage = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                image: img
            }
        })
        const newToken = jwt.sign(
            {
                id: localUser.id,
                name: localUser.name,
                email: localUser.email,
                surname: localUser.surname,
                username: localUser.username,
                image: updatedUserImage.image,
                description: localUser.description
            },
            "1234"
        );
        console.log(newToken);
        
        // Set token in cookie
        cookies().set("access-token", newToken);
        console.log(NextResponse.json({updatedUserImage}));
        console.log("Updated User");
        } catch(error) {
            console.error(error);
            return NextResponse.error("Error updating user");
        }
}